import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    stock: '',
    fecha_pedido: '',
    imagen_url: ''
  });
  const [editando, setEditando] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editando
        ? `http://localhost:5000/api/productos/${editando}`
        : 'http://localhost:5000/api/productos';

      const method = editando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        cargarProductos();
        setNuevoProducto({ nombre: '', stock: '', fecha_pedido: '', imagen_url: '' });
        setEditando(null);
      }
    } catch (error) {
      console.error('Error guardando producto:', error);
    }
  };

  const editarProducto = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      stock: producto.stock,
      fecha_pedido: producto.fecha_pedido,
      imagen_url: producto.imagen_url
    });
    setEditando(producto.id);
  };

  const eliminarProducto = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: 'DELETE',
      });
      cargarProductos();
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Productos</h1>

      <form onSubmit={handleSubmit} className="producto-form">
        <h2>{editando ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})}
          required
        />
        <input
          type="date"
          placeholder="Fecha de pedido"
          value={nuevoProducto.fecha_pedido}
          onChange={(e) => setNuevoProducto({...nuevoProducto, fecha_pedido: e.target.value})}
          required
        />
        <input
          type="url"
          placeholder="URL de imagen"
          value={nuevoProducto.imagen_url}
          onChange={(e) => setNuevoProducto({...nuevoProducto, imagen_url: e.target.value})}
        />
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
        {editando && <button type="button" onClick={() => {setEditando(null); setNuevoProducto({ nombre: '', stock: '', fecha_pedido: '', imagen_url: '' });}}>Cancelar</button>}
      </form>

      <div className="productos-lista">
        <h2>Lista de Productos</h2>
        {productos.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Fecha Pedido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    {producto.imagen_url && <img src={producto.imagen_url} alt={producto.nombre} style={{width: '50px', height: '50px'}} />}
                  </td>
                  <td>{producto.nombre}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.fecha_pedido}</td>
                  <td>
                    <button onClick={() => editarProducto(producto)}>Editar</button>
                    <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
