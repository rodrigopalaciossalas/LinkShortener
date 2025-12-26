# 🔗 Plataforma Acortadora de Enlaces

Un servicio moderno y completo para acortar URLs con analíticas detalladas, personalización de enlaces y una interfaz premium responsive. Construido con **FastAPI** (Backend) y **React + Vite** (Frontend).

![Vista Previa](https://via.placeholder.com/800x400?text=Link+Shortener+Dashboard)

## ✨ Características Principales

### 🔐 Seguridad y Autenticación
- **Google Login Integrado**: Acceso rápido y seguro con tu cuenta de Google.
- **Registro Tradicional**: Sistema robusto de Email/Contraseña seguro con Hashing.
- **Gestión de Sesiones**: Tokens JWT para una seguridad persistente.

### 🔗 Gestión de Enlaces Avanzada
- **Enlaces Personalizados (Alias)**: Crea tu propia marca (ej: `tudominio.com/tu-marca`).
- **Dashboard Interactivo**: Visualiza y gestiona todos tus enlaces en un solo lugar.
- **Redirección Instantánea**: Backend optimizado para alta velocidad.

### 📊 Analíticas en Tiempo Real
- **Visualización de Datos**: Gráficos interactivos (Recharts) para ver el rendimiento.
- **Métricas Clave (KPIs)**: Rastrea clics totales, enlaces activos y promedios.
- **Tendencias**: Observa la evolución del tráfico en los últimos días.

### 🎨 Experiencia de Usuario Premium
- **Modo Oscuro Elegante**: Diseño moderno con efectos Glassmorphism.
- **Responsive Design**: Funciona perfecto en Móvil, Tablet y Escritorio.

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: FastAPI (Python)
- **Base de Datos**: SQLite (SQLAlchemy ORM)
- **Auth**: Google OAuth2 + JWT + Passlib
- **Librerías Extra**: `qrcode`, `shortuuid`, `google-auth`

### Frontend
- **Framework**: React 19 + Vite
- **Estilos**: Tailwind CSS v4
- **Gráficos**: Recharts
- **Auth Client**: @react-oauth/google
- **HTTP**: Axios

## 🚀 Instalación y Ejecución Rápida

Hemos simplificado el proceso para desarrolladores en Windows.

### Prerrequisitos
- Python 3.9+ instalado.
- Node.js 18+ instalado.

### ⚡ Inicio Automático (Recomendado)

Simplemente ejecuta el script **`start_dev.bat`** haciendo doble clic.
Este script se encargará de:
1. Instalar dependencias faltantes.
2. Iniciar el servidor Frontend (Puerto 5173).
3. Iniciar el servidor Backend (Puerto 8000).

---

### 🔧 Ejecución Manual

Si prefieres usar la terminal paso a paso:

**1. Backend**
```bash
cd backend
python -m venv venv           # Opcional
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
```

Visita la app en: `http://localhost:5173`

## 📁 Estructura del Proyecto

```
link-shortener-platform/
├── backend/            # API Python FastAPI
│   ├── routers/        # Autenticación y Links (Google Auth incluido)
│   ├── models.py       # Modelos SQL (User, Link)
│   └── client_secret.json (Ignorado por git)
│
├── frontend/           # App React
│   ├── src/components/ # Modales, Sidebar, Inputs
│   ├── src/pages/      # Dashboard, Analytics (Gráficos), Login
│   └── src/services/   # Cliente API
│
└── start_dev.bat       # Script de inicio rápido
```

## 🔐 Notas de Seguridad
El archivo `.gitignore` está configurado para ocultar credenciales sensibles (`client_secret.json`, `.db`, etc.) antes de subir tu código.

---
*Desarrollado con ❤️ por ryther - 2025*
