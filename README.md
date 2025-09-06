# 🤖 Medea Mind - Frontend

**Interfaz Web Moderna para Chatbot Especializado en Psicología Clínica**

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan.svg)](https://tailwindcss.com/)

## 🎯 **Descripción**

Aplicación web React con TypeScript que proporciona una interfaz profesional e intuitiva para el chatbot especializado en psicología clínica. Diseñada para profesionales de la salud mental con funcionalidades avanzadas como streaming en tiempo real, generación de informes PDF y gestión de sesiones de pacientes.

## ✨ **Características Principales**

- 🔄 **Streaming en tiempo real**: Respuestas progresivas sin duplicación como ChatGPT
- 📄 **Exportar PDF**: Informes clínicos con spinner de carga y feedback visual
- 📝 **Prompts especializados**: 4 tipos de consulta (general, análisis, documentación, recursos)
- 💾 **Gestión de sesiones**: Historial persistente organizado por paciente
- 🎨 **UI/UX moderna**: Interfaz responsive, accesible y profesional
- ⚡ **Performance optimizada**: Bundle < 70 kB comprimido
- 🔧 **Multi-ambiente**: Configuración para desarrollo local y producción

## 🚀 **Estado del Proyecto**

- ✅ **Frontend**: Completamente funcional y optimizado
- ✅ **Backend**: Conectado a [API en Render](https://chatbot-api-xfum.onrender.com)
- ✅ **Streaming**: Funcionando sin duplicación de contenido
- ✅ **PDF Export**: Con spinner y estados visuales mejorados
- ✅ **Build**: Listo para producción (195.94 kB → 65.76 kB gzip)

## 🛠️ **Stack Tecnológico**

- **React 18** con TypeScript para type safety
- **Vite** para build rápido y desarrollo
- **Tailwind CSS** para estilos utilitarios
- **Lucide React** para iconografía consistente
- **Axios** para requests HTTP
- **Server-Sent Events** para streaming en tiempo real

### **Estructura del Proyecto**
```
src/
├── components/          # Componentes React
│   ├── ChatContainer.tsx    # Contenedor principal del chat
│   ├── ChatInput.tsx        # Input de mensajes con prompts
│   └── StreamingMessageBubble.tsx  # Burbujas de chat con streaming
├── hooks/               # Custom hooks
│   └── useChat.ts           # Hook principal para lógica de chat
├── services/            # Servicios y API
│   └── api.ts               # Cliente HTTP con Axios
├── types/               # Definiciones TypeScript
│   └── index.ts             # Tipos de la aplicación
└── styles/              # Estilos globales
    └── index.css            # Tailwind y estilos custom
```

## 🚀 **Instalación y Configuración**

### **Prerrequisitos**
- Node.js 18+
- npm o yarn

### **1. Clonar e Instalar**
```bash
git clone https://github.com/franksymon/chatbot-app.git
cd chatbot-app
npm install
```

### **3. Ejecutar en Desarrollo**
```bash
npm run dev
```
**Aplicación disponible en**: `http://localhost:3000` (o el puerto que muestre Vite)

### **4. Build para Producción**
```bash
npm run build
```

## 📱 **Funcionalidades Principales**

### **💬 Chat Inteligente**
- **Streaming en tiempo real**: Las respuestas aparecen progresivamente sin duplicación
- **Múltiples proveedores**: Soporte para OpenAI GPT-4 y Google Gemini
- **Prompts especializados**: 4 tipos de consulta clínica optimizados
- **Historial persistente**: Conversaciones guardadas automáticamente por sesión
- **Interfaz fluida**: Experiencia similar a ChatGPT

### **📄 Exportar PDF Mejorado**
- **Informes profesionales**: Formato clínico estándar para documentación
- **Feedback visual avanzado**:
  - Estado normal: "Generar Informe" con icono de documento
  - Estado cargando: Spinner animado + "Generando..."
  - Estado éxito: Checkmark verde + "¡Generado!" (3 segundos)
- **Descarga automática**: Archivos con nombres descriptivos por fecha
- **Prevención de errores**: No permite múltiples clics durante generación

### **🎨 Interfaz de Usuario**
- **Responsive**: Funciona perfectamente en móvil, tablet y desktop
- **Accesible**: Tooltips informativos, estados claros, navegación por teclado
- **Moderna**: Diseño limpio con Tailwind CSS y componentes profesionales
- **Orientada a clínicos**: UI específicamente diseñada para uso profesional

### **💾 Gestión de Sesiones**
- **Múltiples pacientes**: Cada sesión representa un paciente diferente
- **Sidebar organizado**: Lista de sesiones con navegación fácil
- **Persistencia**: Historial guardado automáticamente
- **Recarga inteligente**: Recupera conversaciones al cambiar de sesión


## 🎨 **Tipos de Consulta Disponibles**

La aplicación incluye 4 tipos especializados de prompts para diferentes necesidades clínicas:

1. **`general`**: Asistente clínico general para consultas diversas
2. **`case_analysis`**: Análisis y evaluación estructurada de casos clínicos
3. **`documentation`**: Ayuda con documentación, informes y notas clínicas
4. **`resources`**: Técnicas terapéuticas, herramientas y recursos profesionales


## 🔒 **Seguridad**

- ✅ **HTTPS**: Comunicación segura con backend
- ✅ **Variables de entorno**: Configuración segura sin exposición de claves
- ✅ **No API keys en frontend**: Claves sensibles solo en backend
- ✅ **CORS**: Configurado correctamente en el backend
- ✅ **Validación**: Input sanitization y validación en frontend


## 📊 **Características Técnicas**

### **Gestión de Estado**
- **React Hooks**: useState, useEffect para estado local
- **Custom Hook**: useChat para centralizar lógica de chat
- **Session Management**: Múltiples sesiones simultáneas

### **Streaming**
- **Server-Sent Events**: Conexión persistente para streaming
- **Acumulación inteligente**: Manejo correcto de chunks de LangChain
- **Error handling**: Reconexión automática y manejo robusto de errores

### **UI/UX**
- **Responsive Design**: Mobile-first con Tailwind CSS
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Lazy loading, code splitting, optimized bundle

## 🤝 **Contribuir**

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 **Autor**

**Frank Symon**
- GitHub: [@franksymon](https://github.com/franksymon)
- Email: franksymonurbina@gmail.com

## 🙏 **Agradecimientos**

- **React Team** por el excelente framework
- **Vite** por la herramienta de build ultrarrápida
- **Tailwind CSS** por el sistema de diseño utilitario
- **Lucide** por los iconos consistentes y modernos

---

**Desarrollado con ❤️ para profesionales de la salud mental**

*¿Encontraste útil este proyecto? ¡Dale una ⭐ en GitHub!*
