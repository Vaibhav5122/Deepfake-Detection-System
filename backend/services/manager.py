import os
from services.image_detector import ImageDeepfakeDetector
from services.video_detector import VideoDeepfakeDetector
from services.audio_detector import AudioDeepfakeDetector

# Paths to the actual weights
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGE_VIDEO_MODEL_PATH = os.path.join(BASE_DIR, "weights", "deepfake_model.onnx")
AUDIO_MODEL_PATH = os.path.join(BASE_DIR, "weights", "audio_deepfake_model.onnx")

print("Starting Application and loading models...")

# 1. Initialize and load the image model
image_model = ImageDeepfakeDetector(IMAGE_VIDEO_MODEL_PATH)
image_model.load_model()

# 2. Initialize video detector sharing the loaded image model session to save memory
video_model = VideoDeepfakeDetector(IMAGE_VIDEO_MODEL_PATH, model=image_model.model)
video_model.load_model()

# 3. Initialize and load the audio model
audio_model = AudioDeepfakeDetector(AUDIO_MODEL_PATH)
audio_model.load_model()
