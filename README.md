# 🔗 Plataforma Acortadora de Enlaces

Un servicio moderno y completo para acortar URLs con analíticas, generación de códigos QR y una interfaz premium responsive. Construido con **FastAPI** (Backend) y **React + Vite** (Frontend).

![Vista Previa del Proyecto](https://via.placeholder.com/800x400?text=Vista+Previa+Link+Shortener)

## ✨ Características

- **🔐 Autenticación de Usuarios**: Inicio de sesión y registro seguro con JWT (OAuth2).
- **🔗 Gestión de Enlaces**: Crea enlaces cortos, visualiza las URLs originales y gestiona tu colección.
- **📊 Analíticas en Tiempo Real**: Rastrea clics, tasas de interacción y registros de acceso (Próximamente).
- **📱 Generación de Códigos QR**: Genera instantáneamente códigos QR para cualquier enlace corto.
- **🎨 Interfaz Premium**: 
  - Estética moderna en **Modo Oscuro**.
  - Diseño estilo **Glassmorphism**.
  - Totalmente **Responsive** (Diseños adaptables para Móvil y Escritorio con pantalla dividida).

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: FastAPI (Python)
- **Base de Datos**: SQLite (SQLAlchemy ORM)
- **Seguridad**: OAuth2 con Flujo de Contraseña (Tokens JWT), Passlib (Hashing Argon2)
- **Utilidades**: Generación de QR (`qrcode`), Procesamiento de imágenes (`Pillow`)

### Frontend
- **Framework**: React 19 + Vite
- **Estilos**: Tailwind CSS v4 (PostCSS)
- **Enrutamiento**: React Router DOM (v7)
- **Cliente HTTP**: Axios con Interceptores
- **Iconos**: Heroicons / SVG

## 🚀 Empezando

Sigue estos pasos para ejecutar el proyecto localmente.

### Prerrequisitos
- Python 3.9+
- Node.js 18+ (LTS Recomendado)

### 1️⃣ Configuración del Backend

```bash
# Navega a la carpeta del backend
cd backend

# Crea un entorno virtual (opcional pero recomendado)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Instala las dependencias
pip install -r requirements.txt

# Ejecuta el servidor
uvicorn main:app --reload
```
*La API del backend correrá en `http://localhost:8000`*

### 2️⃣ Configuración del Frontend

```bash
# Navega a la carpeta del frontend
cd frontend

# Instala las dependencias
npm install

# Ejecuta el servidor de desarrollo
npm run dev
```
*El frontend correrá en `http://localhost:5173`*

## 📁 Estructura del Proyecto

```
link-shortener-platform/
├── backend/            # Servidor FastAPI
│   ├── routers/        # Endpoints de la API (auth, links, etc.)
│   ├── models.py       # Modelos de Base de Datos
│   ├── schemas.py      # Esquemas Pydantic
│   └── main.py         # Punto de Entrada de la App
│
└── frontend/           # Aplicación React
    ├── src/
    │   ├── components/ # UI Reutilizable (Sidebar, Input, Button)
    │   ├── pages/      # Vistas (Login, Dashboard, Register)
    │   └── services/   # Integración con API (Axios)
    └── tailwind.config.js
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor haz un fork del repositorio y envía un Pull Request.

---
*Creado por ryther - 2025*
