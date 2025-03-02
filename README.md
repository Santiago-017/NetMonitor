# NetMonitor

## 📌 Guía de Instalación
A pesar de contar con un ejecutable para la aplicación, **es necesario clonar el repositorio y ejecutar `npm start` antes de abrir la aplicación**. Esto se debe a que el ejecutable no inicia automáticamente el servidor de Next.js.

### **Pasos para la instalación y ejecución**
1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/Santiago-017/netmonitor.git
   cd netmonitor
   ```
2. **Instalar las dependencias**
   ```sh
   npm install
   ```
3. **Iniciar el servidor**
   ```sh
   npm start
   ```
4. **Ejecutar la aplicación**
   - Abrir `NetMonitor Setup 0.1.0`.
   
---

## 📌 Descripción del Proyecto
NetMonitor es una aplicación diseñada para monitorear la conectividad de red en tiempo real. La aplicación permite visualizar el estado de la conexión y analizar parámetros relevantes del rendimiento de la red.

### **Tecnologías utilizadas**
- **Next.js**: Framework de React para el desarrollo del frontend.
- **React.js**: Para la creación de componentes reutilizables.
- **Electron.js**: Para empaquetar la aplicación en un ejecutable de escritorio.
- **Bootstrap**: Para la interfaz de usuario.
- **Recharts**: Para visualización de datos en gráficas.
- **Express.js**: Para manejar las peticiones del backend.

### **Funcionalidades implementadas**
✔ Monitoreo del estado de la red en tiempo real.  
✔ Interfaz amigable con visualización en modo oscuro/claro.  
✔ Visualización de gráficas con estadísticas de conexión.  
✔ Aplicación empaquetada con Electron para su uso en Windows.  

---

## 📌 Mejoras propuestas
Durante el desarrollo del proyecto, se identificaron varias funciones mencionadas en el código pero que aún no han sido implementadas. A continuación, algunas mejoras propuestas:

🔹 **Iniciar automáticamente el servidor Next.js al ejecutar la aplicación**  
Actualmente, el usuario debe ejecutar `npm start` manualmente antes de abrir el ejecutable. Se sugiere encontrar una solución para integrar esta funcionalidad dentro del ejecutable.  

🔹 **Implementación completa de medición de velocidad de red**  
En el código existen referencias a un posible "medidor de velocidad", pero no está completamente implementado. Se recomienda desarrollar un módulo que mida la latencia y el ancho de banda de la conexión.  

🔹 **Optimización de la integración entre Electron y Next.js**  
Se pueden mejorar las configuraciones de `main.js` para evitar problemas con la carga de la aplicación y el renderizado en blanco.  

🔹 **Notificaciones y alertas en caso de desconexión**  
Agregar una función que notifique al usuario cuando la conexión a internet se interrumpe.

🔹 **Soporte multiplataforma**  
Por ahora, la aplicación está optimizada solo para Windows. Se podría expandir la compatibilidad para macOS y Linux.

---

## 📌 Contribución y contacto
Si deseas contribuir a este proyecto, puedes hacer un `fork` del repositorio y enviar un `pull request` con tus mejoras. Para cualquier duda, puedes contactar a los desarrolladores a través del repositorio en GitHub.

