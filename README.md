# 🚀 Instrucciones de Uso - GitHub Repository Finder

## Cómo ejecutar el proyecto

### Opción 1: Live Server (VS Code Extension)
1. Instala la extensión "Live Server" en VS Code
2. Abre la carpeta del proyecto en VS Code
3. Haz clic derecho en `index.html`
4. Selecciona "Open with Live Server"

### Opción 2: Servidor HTTP con Node.js (si tienes http-server instalado)
```bash
# Instalar http-server globalmente (solo una vez)
npm install -g http-server

# Navega a la carpeta del proyecto
cd github-repo-finder

# Ejecuta el servidor
http-server -p 8000

# Abre tu navegador en: http://localhost:8000