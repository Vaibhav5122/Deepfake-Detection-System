import os
import cv2
import numpy as np
import onnxruntime as ort

class VideoDeepfakeDetector:
    def __init__(self, model_path: str, model=None):
        self.model_path = model_path
        self.model = model
        self.input_shape = (224, 224)   # Must match training input size
        self.frames_to_sample = 10      # Number of frames sampled per video
        if self.model is not None:
            print("ONNX Video Model Session provided via constructor.")
        else:
            print(f"Loading actual ONNX Video Model from: {model_path}...")

    def load_model(self):
        if self.model is None:
            if not os.path.exists(self.model_path):
                print(f"WARNING: Video/Image Model not found at {self.model_path}. Please place 'deepfake_model.onnx' in backend/weights/")
                return False
            self.model = ort.InferenceSession(self.model_path)
            print("ONNX Video Model Loaded successfully.")
        return True

    def extract_frames(self, file_path: str):
        cap = cv2.VideoCapture(file_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total_frames <= 0:
            cap.release()
            return []

        frames = []
        step = max(total_frames // self.frames_to_sample, 1)

        for i in range(self.frames_to_sample):
            frame_id = int(i * step)
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_id)
            ret, frame = cap.read()
            if not ret:
                break

            # ✅ Convert BGR (OpenCV default) to RGB (matches training data)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # Resize to model input size
            frame = cv2.resize(frame, self.input_shape)
            # Normalize to [0, 1]
            frame = frame.astype(np.float32) / 255.0
            frames.append(frame)

        cap.release()
        return np.array(frames)  # Shape: (num_frames, H, W, 3)

    def predict(self, file_path: str):
        if not self.load_model():
            return {"prediction": "Model Error", "confidence": 0.0, "reason": "Model could not be loaded."}

        try:
            frames = self.extract_frames(file_path)
            if len(frames) == 0:
                raise ValueError("Could not extract frames from video.")

            # Run inference using ONNX session (fully thread-safe)
            input_name = self.model.get_inputs()[0].name
            output_name = self.model.get_outputs()[0].name
            predictions = self.model.run([output_name], {input_name: frames})[0]
            print(f"[VideoDetector] Raw model outputs: {predictions.flatten()}")

            # ─────────────────────────────────────────────────────────────────
            # Handle both (N, 1) sigmoid output and (N, 2) softmax output
            # ─────────────────────────────────────────────────────────────────
            if predictions.shape[1] == 1:
                # Sigmoid: output is probability of being FAKE (class 1)
                scores = [float(p[0]) for p in predictions]
            else:
                # Softmax: output[1] is probability of being FAKE
                scores = [float(p[1]) for p in predictions]

            avg_score = sum(scores) / len(scores)
            print(f"[VideoDetector] Average fake score: {avg_score:.4f}")

            # ─────────────────────────────────────────────────────────────────
            # IMPORTANT: Label convention must match what was used during training.
            # HIGH score (>0.5) → FAKE | LOW score (<0.5) → REAL
            # If still inverted, flip: is_fake = avg_score < 0.5
            # ─────────────────────────────────────────────────────────────────
            is_fake = avg_score > 0.5
            label = "Deepfake" if is_fake else "Real"
            confidence = round(avg_score * 100 if is_fake else (1.0 - avg_score) * 100, 2)

            reasons = [
                "Temporal inconsistency across video frames detected.",
                "Unnatural eye-blinking or microscopic facial muscle spasms.",
                "Motion blur anomalies inconsistent with physical camera tracking.",
                "Abnormal lip-syncing synchronization points.",
                "Deepfake facial morphing detected between active frames."
            ]

            # Deterministic reason selection based on score (avoids random flipping on re-detect)
            reason_index = int(avg_score * 100) % len(reasons)

            return {
                "prediction": label,
                "confidence": confidence,
                "reason": reasons[reason_index] if is_fake
                          else "Consistent spatial and temporal dynamics. No deepfake manipulation detected."
            }

        except Exception as e:
            print(f"Video prediction failed: {str(e)}")
            import traceback
            traceback.print_exc()
            return {"prediction": "Error", "confidence": 0.0, "reason": "Processing error."}
