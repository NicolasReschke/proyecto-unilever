-- Migración para actualizar la base de datos existente
-- Ejecutar este SQL en Supabase cuando ya existe la tabla productos

-- Paso 1: Crear tabla de categorías (si no existe)
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Paso 2: Insertar categorías (si no existen)
INSERT INTO categorias (nombre, orden) VALUES
('Pelo', 1),
('Jabón de tocador', 2),
('DEOS y fragancias', 3),
('Suavizantes', 4),
('Limpiadores', 5),
('Lavavajillas', 6),
('Jabón para la ropa', 7),
('Savoury', 8),
('Mayonesas y aderezos', 9)
ON CONFLICT (nombre) DO NOTHING;

-- Paso 3: Agregar nueva columna categoria_id (si no existe)
ALTER TABLE productos ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id);

-- Paso 4: Agregar nueva columna stock_status (si no existe)
ALTER TABLE productos ADD COLUMN IF NOT EXISTS stock_status VARCHAR(20) CHECK (stock_status IN ('sin_stock', 'poco_stock', 'stock_normal', 'mucho_stock'));

-- Paso 5: Actualizar productos existentes con categorías y stock_status
-- Asignar categorías basadas en nombres de productos
UPDATE productos SET categoria_id = 9 WHERE nombre LIKE '%HELLMANN%MAY%' AND categoria_id IS NULL;
UPDATE productos SET categoria_id = 8 WHERE (nombre LIKE '%KNORR%' OR nombre LIKE '%SOPA%' OR nombre LIKE '%SALSA%') AND categoria_id IS NULL;
UPDATE productos SET categoria_id = 6 WHERE (nombre LIKE '%ALA%' AND (nombre LIKE '%LIQ%' OR nombre LIKE '%ECOLAV%')) AND categoria_id IS NULL;
UPDATE productos SET categoria_id = 7 WHERE (nombre LIKE '%ALA%' AND nombre LIKE '%POLVO%') AND categoria_id IS NULL;
UPDATE productos SET categoria_id = 5 WHERE nombre LIKE '%CIF%' AND categoria_id IS NULL;
UPDATE productos SET categoria_id = 4 WHERE nombre LIKE '%COMFORT%' AND categoria_id IS NULL;
UPDATE productos SET categoria_id = 2 WHERE nombre LIKE '%DOVE%JAB%' AND categoria_id IS NULL;
UPDATE productos SET categoria_id = 1 WHERE (nombre LIKE '%DOVE%' OR nombre LIKE '%SEDAL%') AND nombre NOT LIKE '%JAB%' AND categoria_id IS NULL;

-- Paso 6: Convertir valores de stock numéricos a stock_status
UPDATE productos SET stock_status = 'sin_stock' WHERE stock = 0 AND stock_status IS NULL;
UPDATE productos SET stock_status = 'poco_stock' WHERE stock > 0 AND stock <= 5 AND stock_status IS NULL;
UPDATE productos SET stock_status = 'stock_normal' WHERE stock > 5 AND stock <= 20 AND stock_status IS NULL;
UPDATE productos SET stock_status = 'mucho_stock' WHERE stock > 20 AND stock_status IS NULL;

-- Paso 7: Hacer stock_status NOT NULL (después de poblar)
ALTER TABLE productos ALTER COLUMN stock_status SET NOT NULL;

-- Paso 8: Eliminar columna stock antigua (opcional, hacer backup primero)
-- ALTER TABLE productos DROP COLUMN IF EXISTS stock;

-- Paso 9: Crear índices si no existen
CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productos (nombre);
CREATE INDEX IF NOT EXISTS idx_productos_fecha ON productos (fecha_pedido);

-- Paso 10: Crear trigger si no existe
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_productos_updated_at ON productos;
CREATE TRIGGER update_productos_updated_at
    BEFORE UPDATE ON productos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Paso 11: Políticas RLS
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir todo" ON productos FOR ALL USING (true);