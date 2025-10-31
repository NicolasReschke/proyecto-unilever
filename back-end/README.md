# Back-end - API de Gestión de Productos

## Configuración de Supabase

### 1. Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Regístrate con tu email
3. Crea un nuevo proyecto

### 2. Configurar la base de datos
1. En tu proyecto de Supabase, ve a "SQL Editor"
2. Copia y pega el contenido del archivo `supabase-schema.sql`
3. Ejecuta el SQL para crear la tabla `productos`

### 3. Obtener las claves API
1. Ve a "Settings" > "API"
2. Copia el "Project URL" y "anon public" key
3. Actualiza el archivo `.env`:
   ```
   SUPABASE_URL=tu_project_url_aqui
   SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```

## Ejecutar el servidor

```bash
cd back-end
npm install
npm start
```

El servidor se ejecutará en `http://localhost:5000`

## Endpoints de la API

- `GET /api/productos` - Obtener todos los productos
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto
- `DELETE /api/productos/:id` - Eliminar un producto

## Estructura del producto

```json
{
  "id": 1,
  "nombre": "Producto ejemplo",
  "stock": 10,
  "fecha_pedido": "2024-01-15",
  "imagen_url": "https://ejemplo.com/imagen.jpg",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}