# DeepSight AI

DeepSight AI is a multimodal deepfake forensics web application for detecting manipulated **images**, **videos**, and **audio** using ONNX-optimized deep learning models, a FastAPI backend with JWT authentication and MongoDB persistence, and a React + Vite + Tailwind CSS frontend.

---

## Tech Stack

### Frontend
- **Framework & Build Tool:** React 19, Vite 8
- **Styling & Animation:** Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion, Lucide React
- **Routing & HTTP:** React Router v8, Axios
- **Linting:** ESLint 10

### Backend & ML Inference
- **API Framework:** FastAPI (`0.103.1`), Uvicorn (`0.23.2`), Python (`3.11`)
- **Inference Engine:** ONNX Runtime (`onnxruntime`)
- **Vision & Video Processing:** OpenCV (`opencv-python-headless`), NumPy
- **Audio Processing:** Librosa, SoundFile
- **Database & Authentication:** MongoDB (`motor` async driver + `pymongo`), `bcrypt`, `PyJWT` (`HS256`), `python-dotenv`
- **Containerization:** Docker (`python:3.10-slim` with `ffmpeg` and `libsndfile1`, configured for port `7860`)

---

## Project Structure

```text
Final-Project/
├── backend/
│   ├── auth/                  # JWT auth logic & /api/auth routes
│   ├── config/                # Async MongoDB connection (Motor)
│   ├── models/                # Pydantic schemas (UserCreate, UserLogin, UserResponse)
│   ├── routers/               # Detection endpoints (/api/detect/image, video, audio)
│   ├── services/              # ONNX detectors (Image, Video, Audio) & model manager
│   ├── weights/               # Trained ONNX & Keras model weights
│   ├── main.py                # FastAPI entrypoint (port 8000)
│   ├── main_mock.py           # Lite mock server (serves random predictions + frontend/dist)
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile             # Container build for Hugging Face Spaces / Docker
│   └── .env.example           # Backend environment variable template
├── frontend/
│   ├── src/
│   │   ├── api/               # Axios client & media detection API helper
│   │   ├── components/        # UI views (Hero, DetectionView, Login, Signup, About, Navbar)
│   │   ├── App.jsx            # App shell & particle background
│   │   └── routing.jsx        # Public & JWT-protected routes
│   ├── package.json           # Frontend dependencies & scripts
│   ├── vite.config.js         # Vite + React + Tailwind v4 config
│   └── .env.example           # Frontend environment variable template
├── LICENSE                    # MIT License
└── README.md                  # Project documentation
```

---

## Prerequisites

Make sure the following are installed on your machine before running the project:

1. **Python 3.11+** (recommended; matches `backend/.python-version`) and `pip`
2. **Node.js 18+** (or 20+ recommended for Vite 8) and `npm`
3. **MongoDB** — either a local MongoDB instance (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection URI
4. **System audio/video codecs (optional but recommended):** `ffmpeg` and `libsndfile` for decoding non-WAV audio and video formats via `librosa` and `opencv`
5. **Model Weights:** Verify that `deepfake_model.onnx` and `audio_deepfake_model.onnx` exist inside `backend/weights/`

---

## Environment Configuration (GitHub-Safe)

Real `.env` and `*.local` files are excluded via `.gitignore` so secrets (like database credentials and `JWT_SECRET`) are **never** pushed to GitHub. Instead, `.env.example` template files are committed for both services.

### Backend (`backend/.env`)

Create `backend/.env` from `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
```

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `MONGO_URI` | MongoDB connection string (`deepsight` database is used) | `mongodb://127.0.0.1:27017/deepsight` |
| `JWT_SECRET` | Secret key used to sign HS256 JWT tokens | Generate a random 32+ char hex string |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins (defaults to `*` if unset) | `http://localhost:5173,http://127.0.0.1:5173` |
| `API_KEY` | Optional `X-API-Key` header check for `/api/detect/*` (skipped if empty) | *(empty for local dev)* |

> **Tip:** Generate a secure `JWT_SECRET` with:
> ```bash
> python3 -c "import secrets; print(secrets.token_hex(32))"
> ```

### Frontend (`frontend/.env` or `frontend/.env.local`)

Create your local frontend env file from `frontend/.env.example`:

```bash
cp frontend/.env.example frontend/.env.local
```
*(Vite loads both `.env` and `.env.local`; `.env.local` is ignored by `frontend/.gitignore`.)*

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the running FastAPI backend | `http://127.0.0.1:8000` |
| `VITE_API_KEY` | Optional `X-API-Key` value (must match backend `API_KEY` if set) | *(empty for local dev)* |

---

## Running the Project Locally

Open **two terminal windows** — one for the backend and one for the frontend.

### 1. Start the Backend (FastAPI)

```bash
cd backend
```

Create and activate a virtual environment:

- **macOS / Linux:**
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```
- **Windows (PowerShell):**
  ```powershell
  python -m venv .venv
  .venv\Scripts\Activate.ps1
  ```

Install dependencies and configure environment variables:

```bash
pip install -r requirements.txt
cp .env.example .env   # then edit .env with your MongoDB URI and JWT_SECRET
```

Start the API server:

```bash
python main.py
```

Or run Uvicorn directly:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000
```

> **Note:** `--reload` is intentionally disabled in `main.py` so Uvicorn does not repeatedly reload the ONNX model sessions into memory on file changes.

Once running:
- **API Base URL:** `http://127.0.0.1:8000`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`

---

### 2. Start the Frontend (React + Vite)

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env.local   # ensure VITE_API_URL=http://127.0.0.1:8000
npm run dev
```

Once running:
- **Frontend URL:** `http://localhost:5173`
- Create an account via **Sign Up** (`/signup`) or log in (`/login`) to access the protected detection routes (`/image-detection`, `/video-detection`, `/audio-detection`).

#### Other Frontend Scripts

```bash
npm run build     # Build production bundle into frontend/dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint across the frontend codebase
```

---

## Alternative Run Modes

### Lite / Mock Mode (No ML Models or MongoDB Required)

If you want to preview the UI without running ONNX inference or MongoDB:

```bash
cd frontend && npm run build
cd ../backend && python main_mock.py
```

This serves the built `frontend/dist` bundle alongside mock `/api/detect/*` endpoints on `http://127.0.0.1:8000`.

### Docker (Backend)

```bash
docker build -t deepsight-backend ./backend
docker run -p 7860:7860 --env-file backend/.env deepsight-backend
```

When using the Docker container, set `VITE_API_URL=http://127.0.0.1:7860` in `frontend/.env.local` (and add `http://localhost:5173` to `ALLOWED_ORIGINS` in `backend/.env`).

---

## API Endpoints Overview

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | No | Health check & API status |
| `POST` | `/api/auth/register` | No | Register a new user and return JWT |
| `POST` | `/api/auth/login` | No | Authenticate user and return JWT |
| `GET` | `/api/auth/me` | Bearer JWT | Get current authenticated user profile |
| `POST` | `/api/detect/image` | Bearer JWT (+ optional `X-API-Key`) | Analyze uploaded image (`224x224` RGB ONNX model) |
| `POST` | `/api/detect/video` | Bearer JWT (+ optional `X-API-Key`) | Analyze uploaded video (samples 10 frames) |
| `POST` | `/api/detect/audio` | Bearer JWT (+ optional `X-API-Key`) | Analyze uploaded audio (MFCC extraction + ONNX model) |

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
