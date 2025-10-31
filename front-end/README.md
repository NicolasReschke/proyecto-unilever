# Front-end - Gestión de Productos

## Descripción
Aplicación React para gestionar productos con interfaz editable.

## Características
- Lista de productos en tabla
- Formulario para agregar/editar productos
- Campos: nombre, stock, fecha de pedido, imagen
- Integración con API back-end

## Ejecutar en desarrollo

```bash
cd front-end
npm install
npm start
```

La aplicación se ejecutará en `http://localhost:3000`

## Construir para producción

```bash
npm run build
```

## Despliegue en Vercel

1. Sube el código a GitHub
2. Conecta el repositorio a Vercel
3. Configura las variables de entorno si es necesario
4. Despliega automáticamente

## Variables de entorno (opcional)
Si necesitas cambiar la URL de la API, crea un archivo `.env`:
```
REACT_APP_API_URL=http://localhost:5000
