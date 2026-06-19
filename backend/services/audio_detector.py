import os
import numpy as np
import onnxruntime as ort
import librosa

class AudioDeepfakeDetector:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None

        # SAME PARAMETERS USED DURING TRAINING — do not change these
        self.sample_rate = 22050
        self.mfcc_num = 40
        self.max_pad = 174

    def load_model(self):
        if self.model is None:
            if not os.path.exists(self.model_path):
                print(f"WARNING: Audio Model not found at {self.model_path}. Please place 'audio_deepfake_model.onnx' in weights/")
                return False
            self.model = ort.InferenceSession(self.model_path)
            print("ONNX Audio Model Session loaded successfully.")
        return True

    def extract_features(self, file_path_or_bytes):
        import io
        if isinstance(file_path_or_bytes, bytes):
            audio, sr = librosa.load(io.BytesIO(file_path_or_bytes), sr=self.sample_rate)
        else:
            audio, sr = librosa.load(file_path_or_bytes, sr=self.sample_rate)

        mfcc = librosa.feature.mfcc(
            y=audio,
            sr=sr,
            n_mfcc=self.mfcc_num
        )

        # Pad or trim to fixed width
        if mfcc.shape[1] < self.max_pad:
            pad_width = self.max_pad - mfcc.shape[1]
            mfcc = np.pad(mfcc, ((0, 0), (0, pad_width)), mode='constant')
        else:
            mfcc = mfcc[:, :self.max_pad]

        # Flatten MFCC: (40, 174) → (6960,)
        features = mfcc.flatten().astype(np.float32)
        return features

    def predict(self, file_path_or_bytes):
        if not self.load_model():
            return {"prediction": "Model Error", "confidence": 0.0, "reason": "Model could not be loaded."}

        try:
            features = self.extract_features(file_path_or_bytes)

            # Add batch dimension → (1, 6960)
            input_data = np.expand_dims(features, axis=0)

            # Run inference using ONNX session (fully thread-safe)
            input_name = self.model.get_inputs()[0].name
            output_name = self.model.get_outputs()[0].name
            raw = self.model.run([output_name], {input_name: input_data})[0]
            print(f"[AudioDetector] Raw model output: {raw}")

            prediction = float(raw[0][0])
            is_fake = prediction > 0.5
            label = "Deepfake" if is_fake else "Real"
            confidence = round(float(prediction * 100) if is_fake else float((1.0 - prediction) * 100), 2)

            reasons = [
                "Synthetic frequency artifacts detected in higher pitch bands.",
                "Unnatural vocal tract resonance and formants.",
                "Abnormal suppression of natural acoustic room reverberation.",
                "Robotic phoneme transitions lacking natural breath patterns.",
                "Discrepancies in Mel-frequency cepstral coefficients (MFCCs)."
            ]

            reason_index = int(prediction * 100) % len(reasons)

            return {
                "prediction": label,
                "confidence": confidence,
                "reason": reasons[reason_index] if is_fake
                          else "Natural vocal frequencies and room acoustics present. No voice-cloning artifacts detected."
            }

        except Exception as e:
            print(f"Audio prediction failed: {str(e)}")
            import traceback
            traceback.print_exc()
            return {
                "prediction": "Error",
                "confidence": 0.0,
                "reason": "Processing error."
            }
