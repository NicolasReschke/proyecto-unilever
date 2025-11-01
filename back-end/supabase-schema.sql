-- Esquema para la tabla de productos en Supabase
-- Ejecutar este SQL en el SQL Editor de Supabase

-- Crear tabla de categorías
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id),
  stock_status VARCHAR(20) NOT NULL CHECK (stock_status IN ('sin_stock', 'poco_stock', 'stock_normal', 'mucho_stock')),
  fecha_pedido DATE NOT NULL,
  imagen_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar categorías
INSERT INTO categorias (nombre, orden) VALUES
('Pelo', 1),
('Jabón de tocador', 2),
('DEOS y fragancias', 3),
('Suavizantes', 4),
('Limpiadores', 5),
('Lavavajillas', 6),
('Jabón para la ropa', 7),
('Savoury', 8),
('Mayonesas y aderezos', 9);

-- Índice para búsquedas por nombre
CREATE INDEX idx_productos_nombre ON productos (nombre);

-- Índice para búsquedas por fecha
CREATE INDEX idx_productos_fecha ON productos (fecha_pedido);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_productos_updated_at
    BEFORE UPDATE ON productos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS (Row Level Security) - opcional pero recomendado
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Permitir todas las operaciones para usuarios autenticados (ajustar según necesidades)
CREATE POLICY "Permitir todo para usuarios autenticados" ON productos
    FOR ALL USING (auth.role() = 'authenticated');

-- Para desarrollo, permitir todo sin autenticación (deshabilitar en producción)
CREATE POLICY "Permitir todo" ON productos FOR ALL USING (true);