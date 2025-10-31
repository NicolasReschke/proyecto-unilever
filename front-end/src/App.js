import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal, Alert, Spinner } from 'react-bootstrap';
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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/productos');
      if (response.ok) {
        const data = await response.json();
        setProductos(Array.isArray(data) ? data : []);
      } else {
        console.error('Error en la respuesta:', response.status);
        setProductos([]);
        mostrarAlerta('Error al cargar productos', 'danger');
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setProductos([]);
      mostrarAlerta('Error de conexión', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const mostrarAlerta = (mensaje, tipo) => {
    setAlert({ mensaje, tipo });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setShowModal(false);
        mostrarAlerta(editando ? 'Producto actualizado' : 'Producto agregado', 'success');
      } else {
        mostrarAlerta('Error al guardar producto', 'danger');
      }
    } catch (error) {
      console.error('Error guardando producto:', error);
      mostrarAlerta('Error de conexión', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const editarProducto = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      stock: producto.stock,
      fecha_pedido: producto.fecha_pedido,
      imagen_url: producto.imagen_url || ''
    });
    setEditando(producto.id);
    setShowModal(true);
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        cargarProductos();
        mostrarAlerta('Producto eliminado', 'success');
      } else {
        mostrarAlerta('Error al eliminar producto', 'danger');
      }
    } catch (error) {
      console.error('Error eliminando producto:', error);
      mostrarAlerta('Error de conexión', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const abrirModalAgregar = () => {
    setNuevoProducto({ nombre: '', stock: '', fecha_pedido: '', imagen_url: '' });
    setEditando(null);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h1 className="h4 mb-0">📦 Gestión de Productos</h1>
            </Card.Header>
            <Card.Body>
              {alert && (
                <Alert variant={alert.tipo} dismissible onClose={() => setAlert(null)}>
                  {alert.mensaje}
                </Alert>
              )}

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                <Button variant="primary" onClick={abrirModalAgregar} disabled={loading}>
                  ➕ Agregar Producto
                </Button>
                <Button variant="outline-secondary" onClick={cargarProductos} disabled={loading}>
                  🔄 Actualizar
                </Button>
              </div>

              {loading && (
                <div className="text-center mb-3">
                  <Spinner animation="border" variant="primary" />
                  <span className="ms-2">Cargando...</span>
                </div>
              )}

              {productos.length === 0 && !loading ? (
                <Alert variant="info" className="text-center">
                  <h5>No hay productos registrados</h5>
                  <p>Haz clic en "Agregar Producto" para comenzar.</p>
                </Alert>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th className="d-none d-sm-table-cell">Imagen</th>
                        <th>Producto</th>
                        <th className="text-center">Stock</th>
                        <th className="d-none d-md-table-cell">Fecha Pedido</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((producto) => (
                        <tr key={producto.id}>
                          <td className="d-none d-sm-table-cell">
                            {producto.imagen_url && (
                              <img
                                src={producto.imagen_url}
                                alt={producto.nombre}
                                style={{width: '50px', height: '50px', objectFit: 'cover'}}
                                className="rounded"
                              />
                            )}
                          </td>
                          <td>
                            <div>
                              <strong>{producto.nombre}</strong>
                              {producto.imagen_url && (
                                <div className="d-sm-none mt-1">
                                  <img
                                    src={producto.imagen_url}
                                    alt={producto.nombre}
                                    style={{width: '40px', height: '40px', objectFit: 'cover'}}
                                    className="rounded"
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="text-center">
                            <span className={`badge ${producto.stock > 10 ? 'bg-success' : producto.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                              {producto.stock}
                            </span>
                          </td>
                          <td className="d-none d-md-table-cell">
                            {new Date(producto.fecha_pedido).toLocaleDateString('es-ES')}
                          </td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => editarProducto(producto)}
                                disabled={loading}
                              >
                                ✏️
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => eliminarProducto(producto.id)}
                                disabled={loading}
                              >
                                🗑️
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para agregar/editar producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{editando ? '✏️ Editar Producto' : '➕ Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del producto *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Laptop Dell"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    min="0"
                    value={nuevoProducto.stock}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de pedido *</Form.Label>
                  <Form.Control
                    type="date"
                    value={nuevoProducto.fecha_pedido}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, fecha_pedido: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>URL de imagen</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={nuevoProducto.imagen_url}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, imagen_url: e.target.value})}
                  />
                  <Form.Text className="text-muted">
                    Opcional: URL de una imagen del producto
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : null}
              {editando ? 'Actualizar' : 'Agregar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default App;
