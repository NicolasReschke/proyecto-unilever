-- Esquema para la tabla de productos en Supabase
-- Ejecutar este SQL en el SQL Editor de Supabase

CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  stock INTEGER NOT NULL CHECK (stock >= 0),
  fecha_pedido DATE NOT NULL,
  imagen_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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