const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Solo crear cliente si las variables están definidas
let supabase = null;
if (supabaseUrl && supabaseKey && supabaseUrl !== 'tu_supabase_url_aqui') {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Obtener todos los productos con categorías
router.get('/', async (req, res) => {
  if (!supabase) {
    return res.json([]); // Retornar array vacío si no hay DB configurada
  }
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categorias (
          id,
          nombre,
          orden
        )
      `)
      .order('categorias.orden', { ascending: true })
      .order('nombre', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Base de datos no configurada' });
  }
  try {
    const { nombre, categoria_id, stock_status, fecha_pedido, imagen_url } = req.body;
    const { data, error } = await supabase
      .from('productos')
      .insert([{ nombre, categoria_id, stock_status, fecha_pedido, imagen_url }])
      .select(`
        *,
        categorias (
          id,
          nombre,
          orden
        )
      `);

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Base de datos no configurada' });
  }
  try {
    const { id } = req.params;
    const { nombre, categoria_id, stock_status, fecha_pedido, imagen_url } = req.body;
    const { data, error } = await supabase
      .from('productos')
      .update({ nombre, categoria_id, stock_status, fecha_pedido, imagen_url })
      .eq('id', id)
      .select(`
        *,
        categorias (
          id,
          nombre,
          orden
        )
      `);

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Base de datos no configurada' });
  }
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;