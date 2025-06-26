# 🎯 Fokuso — React Frontend

<div align="center">

<!-- Project Badges -->

<a href="https://github.com/lowskydev/Fokuso"><img src="https://img.shields.io/badge/Skill-Focus-blueviolet?style=for-the-badge&labelColor=black" alt="Skill Badge" /></a>
<a href="https://github.com/lowskydev/Fokuso"><img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge&labelColor=black" alt="Project Status" /></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&labelColor=black" alt="MIT License" /></a>

<br/><br/>

<!-- Technologies -->
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&labelColor=black&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&labelColor=black&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
<img src="https://img.shields.io/badge/Django-API-092E20?style=for-the-badge&labelColor=black&logo=django&logoColor=white" alt="Django" />
<img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&labelColor=black&logo=postgresql&logoColor=white" alt="PostgreSQL" />

<br/><br/>

<!-- Logo -->
<img src="./public/favicon.ico" alt="Fokuso Logo" width="200" height="200" />

</div>

---

## 📑 Table of Contents

- [📚 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#-technologies-used)
- [🚀 Getting Started](#-getting-started)
- [📊 Project Structure](#-project-structure)
- [🔧 Backend Architecture](#-backend-architecture)
- [🔒 Environment Configuration](#-environment-configuration)
- [🧪 Testing](#-testing)
- [📝 API Documentation](#-api-documentation)
- [👥 Contributors](#-contributors)
- [📄 License](#-license)

---

## 📚 Overview

**Fokuso** is a minimalist productivity tool designed to help users stay focused and maximize their efficiency through structured time management techniques, such as the Pomodoro method.

---

### 🎯 Purpose

- **Structured Focus Sessions**
- **Distraction Reduction**
- **Progress Tracking**

---

### 💡 Core Benefits

- Simple and effective tool to improve focus and productivity.
- Collaborative study or work sessions for teams.
- Suitable for both casual users and productivity enthusiasts.

---

### 🌟 Why Choose Fokuso?

- Minimalist Design
- Customizable Pomodoro Timer
- Cross-Platform Friendly
- Dark Mode Support

---

## ✨ Features

| Feature             | Description                                   |
| ------------------- | --------------------------------------------- |
| ⏲️ Pomodoro Timer   | Stay productive using custom focus sessions   |
| 📆 Calendar         | Schedule and plan study tasks easily          |
| 📚 Study Tools      | Designed to support individual or group study |
| 🌙 Dark Mode        | Optional dark mode for eye-friendly usage     |
| 💾 Progress Tracker | Monitor session count and completed goals     |

---

## 🛠️ Technologies Used

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Django REST API
- **Database**: PostgreSQL

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js ≥16
- Docker & Docker Compose

### 🔧 Setup

#### Frontend

```bash
git clone https://github.com/lowskydev/Fokuso.git
cd Fokuso
npm install
npm run dev
# Visit: http://localhost:5173
```

#### Backend (with Docker)

```bash
docker-compose up --build
# Visit: http://localhost:8000/api/
```

#### Backend (without Docker)

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Visit: http://localhost:8000/api/
```

---

## 📊 Project Structure

```
Fokuso/
├── public/                 # Static assets & favicon
├── src/                    # React frontend source code
│   ├── components/
│   ├── pages/
│   ├── services/           # API calls
│   └── ...
├── package.json            # Frontend dependencies & scripts
├── docker-compose.yml      # Docker config for backend + DB
├── README.md
└── ...
```

---

## 🔧 Backend Architecture

- Django REST Framework
- PostgreSQL database
- Token-based authentication
- CRUD support for sessions and goals

<div align="center">

<!-- Backend Tech Stack -->
<img src="https://img.shields.io/badge/Django-REST-092E20?style=for-the-badge&labelColor=black&logo=django&logoColor=white" alt="Django REST" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&labelColor=black&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&labelColor=black&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/JWT-Authentication-yellow?style=for-the-badge&labelColor=black&logo=jsonwebtokens&logoColor=white" alt="JWT Auth" />
<img src="https://img.shields.io/badge/DRF-AutoDocs-orange?style=for-the-badge&labelColor=black&logo=readthedocs&logoColor=white" alt="DRF Docs" />

</div>

---

## 🔒 Environment Configuration

- `.env` for local config (e.g., `SECRET_KEY`, DB credentials)
- Docker uses `docker-compose.yml`

---

## 🧪 Testing

#### Run backend tests:

```bash
python manage.py test
```

_Frontend tests coming soon._

---

## 📝 API Documentation

- Visit: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
  _(if Swagger/OpenAPI is enabled)_

---

## 👥 Contributors

- **LowSkyDev** — Project Creator & Maintainer

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) file. on this code
