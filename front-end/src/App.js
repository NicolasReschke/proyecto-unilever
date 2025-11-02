import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal, Alert, Spinner, Accordion, Navbar, Nav } from 'react-bootstrap';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [activeKeys, setActiveKeys] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria_id: '',
    stock_status: 'stock_normal',
    fecha_pedido: '',
    imagen_url: ''
  });
  const [editando, setEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [categoriasAbiertas, setCategoriasAbiertas] = useState({});
  const [isAdmin, setIsAdmin] = useState(() => {
    // Recuperar estado de admin del localStorage
    const savedAdmin = localStorage.getItem('isAdmin');
    return savedAdmin === 'true';
  });
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  // Configurar sensores para drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cargar estado guardado o abrir todo por defecto
  useEffect(() => {
    if (categorias.length === 0) return;

    const saved = localStorage.getItem("accordionState");
    if (saved) {
      setActiveKeys(JSON.parse(saved));
    } else {
      // abrir todas las categorías por defecto
      setActiveKeys(categorias.map((_, i) => i.toString()));
    }
  }, [categorias]);

  // Guardar estado actual cada vez que cambia
  useEffect(() => {
    if (activeKeys.length > 0) {
      localStorage.setItem("accordionState", JSON.stringify(activeKeys));
    }
  }, [activeKeys]);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      // Usar la URL del back-end desplegado cuando esté disponible
      const API_URL = process.env.REACT_APP_API_URL || 'https://proyecto-unilever-backend.onrender.com';
      console.log('Intentando conectar a:', `${API_URL}/api/productos`);
      const response = await fetch(`${API_URL}/api/productos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Respuesta del servidor:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setProductos(Array.isArray(data) ? data : []);

        // Extraer categorías únicas de los productos
        const categoriasUnicas = [...new Set(data.map(p => p.categorias?.nombre).filter(Boolean))];
        setCategorias(categoriasUnicas);

        // Inicializar todas las categorías como abiertas
        const categoriasIniciales = {};
        categoriasUnicas.forEach(cat => {
          categoriasIniciales[cat] = true;
        });
        setCategoriasAbiertas(categoriasIniciales);

        if (data.length > 0) {
          mostrarAlerta(`Cargados ${data.length} productos en ${categoriasUnicas.length} categorías`, 'success');
        }
      } else {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        setProductos([]);
        mostrarAlerta('Error al cargar productos', 'danger');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
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
      const API_URL = process.env.REACT_APP_API_URL || 'https://proyecto-unilever-backend.onrender.com';
      const url = editando
        ? `${API_URL}/api/productos/${editando}`
        : `${API_URL}/api/productos`;

      const method = editando ? 'PUT' : 'POST';

      console.log('Enviando datos:', nuevoProducto);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      console.log('Respuesta del servidor:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('Producto guardado:', data);
        cargarProductos();
        setNuevoProducto({ nombre: '', categoria_id: '', stock_status: 'stock_normal', fecha_pedido: '', imagen_url: '' });
        setEditando(null);
        setShowModal(false);
        mostrarAlerta(editando ? 'Producto actualizado' : 'Producto agregado', 'success');
      } else {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        mostrarAlerta(`Error al guardar producto: ${errorText}`, 'danger');
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
      categoria_id: producto.categoria_id || '',
      stock_status: producto.stock_status || 'stock_normal',
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
      const API_URL = process.env.REACT_APP_API_URL || 'https://proyecto-unilever-backend.onrender.com';
      const response = await fetch(`${API_URL}/api/productos/${id}`, {
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
    setNuevoProducto({ nombre: '', categoria_id: '', stock_status: 'stock_normal', fecha_pedido: '', imagen_url: '' });
    setEditando(null);
    setShowModal(true);
  };

  // Manejador de click para abrir/cerrar
  const handleToggle = (key) => {
    setActiveKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const productosPorCategoria = (categoriaNombre) => {
    // Si es admin, mostrar todos los productos de la categoría
    if (isAdmin) {
      return productos.filter(producto => producto.categorias?.nombre === categoriaNombre);
    }
    // Si no es admin, mostrar solo productos críticos
    return productos.filter(producto =>
      producto.categorias?.nombre === categoriaNombre &&
      (producto.stock_status === 'sin_stock' || producto.stock_status === 'poco_stock')
    );
  };

  const cambiarStockStatus = async (producto) => {
    if (!isAdmin) return; // Solo admins pueden cambiar stock

    const estadosStock = ['sin_stock', 'poco_stock', 'stock_normal', 'mucho_stock'];
    const estadoActualIndex = estadosStock.indexOf(producto.stock_status);
    const nuevoEstadoIndex = (estadoActualIndex + 1) % estadosStock.length;
    const nuevoEstado = estadosStock[nuevoEstadoIndex];

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://proyecto-unilever-backend.onrender.com';
      const response = await fetch(`${API_URL}/api/productos/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: producto.nombre,
          categoria_id: producto.categoria_id,
          stock_status: nuevoEstado,
          fecha_pedido: producto.fecha_pedido,
          imagen_url: producto.imagen_url
        }),
      });

      if (response.ok) {
        cargarProductos();
        mostrarAlerta(`Stock cambiado a ${nuevoEstado.replace('_', ' ').toUpperCase()}`, 'success');
      } else {
        mostrarAlerta('Error al cambiar stock', 'danger');
      }
    } catch (error) {
      console.error('Error cambiando stock:', error);
      mostrarAlerta('Error de conexión', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciales desde variables de entorno (sin valores por defecto hardcodeados)
    const adminUser = process.env.REACT_APP_ADMIN_USER;
    const adminPass = process.env.REACT_APP_ADMIN_PASSWORD;

    console.log('Credenciales esperadas:', adminUser, adminPass);
    console.log('Credenciales ingresadas:', loginData.username, loginData.password);

    if (adminUser && adminPass && loginData.username === adminUser && loginData.password === adminPass) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true'); // Guardar en localStorage
      setShowLoginModal(false);
      setLoginData({ username: '', password: '' });
      mostrarAlerta('Sesión iniciada como administrador', 'success');
    } else {
      mostrarAlerta('Credenciales incorrectas o no configuradas', 'danger');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin'); // Remover de localStorage
    mostrarAlerta('Sesión cerrada', 'info');
  };

  // Componente para elementos arrastrables
  const SortableItem = ({ id, children }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td className="text-center drag-handle" style={{cursor: 'grab', width: '30px'}}>
          {isAdmin && '⋮⋮'}
        </td>
        {children}
      </SortableItem>
    );
  };

  // Función para manejar el fin del arrastre
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id;
    const overId = over.id;

    // Encontrar los productos en la misma categoría
    const categoriaActiva = productos.find(p => p.id === activeId)?.categorias?.nombre;
    const productosCategoria = productos.filter(p => p.categorias?.nombre === categoriaActiva);

    const oldIndex = productosCategoria.findIndex(p => p.id === activeId);
    const newIndex = productosCategoria.findIndex(p => p.id === overId);

    if (oldIndex === -1 || newIndex === -1) return;

    // Reordenar el array
    const reorderedProductos = arrayMove(productosCategoria, oldIndex, newIndex);

    // Actualizar órdenes en la base de datos
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://proyecto-unilever-backend.onrender.com';

      // Actualizar órdenes de todos los productos en la categoría
      const updatePromises = reorderedProductos.map((producto, index) => {
        return fetch(`${API_URL}/api/productos/orden/${producto.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orden: index }),
        });
      });

      await Promise.all(updatePromises);

      // Recargar productos para reflejar cambios
      cargarProductos();
      mostrarAlerta('Orden actualizado', 'success');
    } catch (error) {
      console.error('Error actualizando orden:', error);
      mostrarAlerta('Error al actualizar orden', 'danger');
    }
  };

  return (
    <>
      {/* Navbar con logo y login */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm navbar-custom" style={{marginBottom: '5px'}}>
        <Container fluid className="px-4">
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src="/unilever-logo.png"
              alt="Unilever"
              height="40"
              className="me-2"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home" className="mx-auto navbar-title">
            <span className="fw-bold text-primary">Gestión de Infaltables</span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            {isAdmin ? (
              <div className="d-flex align-items-center">
                <span className="text-success me-3">
                  <i className="bi bi-shield-check"></i> Admin
                </span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} title="Cerrar Sesión">
                  🚪
                </Button>
              </div>
            ) : (
              <Button variant="outline-primary" size="sm" onClick={() => setShowLoginModal(true)}>
                <i className="bi bi-person-circle"></i> Login
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
              {alert && (
                <Alert variant={alert.tipo} dismissible onClose={() => setAlert(null)}>
                  {alert.mensaje}
                </Alert>
              )}

              {isAdmin && (
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                  <Button variant="primary" onClick={abrirModalAgregar} disabled={loading}>
                    ➕ Agregar Producto
                  </Button>
                  <Button variant="outline-secondary" onClick={cargarProductos} disabled={loading}>
                    🔄 Actualizar
                  </Button>
                </div>
              )}

              {loading && (
                <div className="text-center mb-3">
                  <img
                    src="/unilever-spinner-new.png"
                    alt="Cargando..."
                    className="unilever-spinner"
                  />
                  <div className="mt-2 text-muted">Cargando...</div>
                </div>
              )}

              {productos.length === 0 && !loading ? (
                <Alert variant="info" className="text-center">
                  <h5>No hay productos registrados</h5>
                  <p>Haz clic en "Agregar Producto" para comenzar.</p>
                </Alert>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <Accordion activeKey={activeKeys} alwaysOpen>
                  {/* Header de tabla - solo visible para admin */}
                  {isAdmin && (
                    <div className="table-responsive mb-3">
                      <Table striped bordered hover size="sm">
                        {/* <thead className="table-dark">
                          <tr>
                            <th className="text-center"></th>
                            <th>Producto</th>
                            <th className="text-center">Stock</th>
                            <th className="text-center">Acciones</th>
                          </tr>
                        </thead> */}
                      </Table>
                    </div>
                  )}
                  {categorias.map((categoria, index) => {
                    const productosCategoria = productosPorCategoria(categoria);
                    if (productosCategoria.length === 0) return null;

                    return (
                      <Accordion.Item key={categoria} eventKey={index.toString()}>
                        <Accordion.Header onClick={() => handleToggle(index.toString())}>
                          <div className="d-flex justify-content-between align-items-center w-100 me-3">
                            <span><strong>{categoria}</strong> ({productosCategoria.length} productos)</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="table-responsive">
                            <Table striped bordered hover size="sm">
                              {/* Header de tabla solo para usuarios comunes */}
                              {!isAdmin && (
                                <thead className="table-dark">
                                  <tr>
                                    <th className="text-center"></th>
                                    <th>Producto</th>
                                    <th className="text-center">Stock</th>
                                  </tr>
                                </thead>
                              )}
                              <SortableContext items={productosCategoria.map(p => p.id)} strategy={verticalListSortingStrategy}>
                                <tbody>
                                {productosCategoria.map((producto) => {
                                  const getStockStatus = (status) => {
                                    switch (status) {
                                      case 'sin_stock': return { label: 'Sin Stock', variant: 'danger' };
                                      case 'poco_stock': return { label: 'Poco Stock', variant: 'warning' };
                                      case 'stock_normal': return { label: 'Stock Normal', variant: 'success' };
                                      case 'mucho_stock': return { label: 'Mucho Stock', variant: 'info' };
                                      default: return { label: 'Desconocido', variant: 'secondary' };
                                    }
                                  };

                                  const stockStatus = getStockStatus(producto.stock_status);

                                  return (
                                    <SortableItem key={producto.id} id={producto.id}>
                                      <td className="text-center">
                                        {producto.imagen_url ? (
                                          <img
                                            src={producto.imagen_url}
                                            alt={producto.nombre}
                                            style={{width: '50px', height: '50px', objectFit: 'cover'}}
                                            className="rounded"
                                          />
                                        ) : (
                                          <div
                                            className="bg-light d-flex align-items-center justify-content-center rounded"
                                            style={{width: '50px', height: '50px'}}
                                          >
                                            <span className="text-muted">📦</span>
                                          </div>
                                        )}
                                      </td>
                                      <td>
                                        <strong>{producto.nombre}</strong>
                                      </td>
                                      <td className="text-center stock-cell">
                                        {isAdmin ? (
                                          <Button
                                            variant={stockStatus.variant}
                                            size="sm"
                                            className="stock-badge"
                                            onClick={() => cambiarStockStatus(producto)}
                                            title="Click para cambiar estado de stock"
                                          >
                                            {stockStatus.label}
                                          </Button>
                                        ) : (
                                          <span className={`badge bg-${stockStatus.variant} px-2 py-1 stock-badge`}>
                                            {stockStatus.label}
                                          </span>
                                        )}
                                      </td>
                                      {isAdmin && (
                                        <td className="text-center">
                                          <div className="btn-group btn-group-sm">
                                            <Button
                                              variant="outline-primary"
                                              size="sm"
                                              onClick={() => editarProducto(producto)}
                                              disabled={loading}
                                              title="Editar producto"
                                            >
                                              ✏️
                                            </Button>
                                            <Button
                                              variant="outline-danger"
                                              size="sm"
                                              onClick={() => eliminarProducto(producto.id)}
                                              disabled={loading}
                                              title="Eliminar producto"
                                            >
                                              🗑️
                                            </Button>
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                })}
                                </tbody>
                              </SortableContext>
                            </Table>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                  </Accordion>
                </DndContext>
              )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

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
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select
                    value={nuevoProducto.categoria_id}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, categoria_id: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="1">Pelo</option>
                    <option value="2">Jabón de tocador</option>
                    <option value="3">DEOS y fragancias</option>
                    <option value="4">Suavizantes</option>
                    <option value="5">Limpiadores</option>
                    <option value="6">Lavavajillas</option>
                    <option value="7">Jabón para la ropa</option>
                    <option value="8">Savoury</option>
                    <option value="9">Mayonesas y aderezos</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado de Stock *</Form.Label>
                  <Form.Select
                    value={nuevoProducto.stock_status}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, stock_status: e.target.value})}
                    required
                  >
                    <option value="sin_stock">Sin Stock</option>
                    <option value="poco_stock">Poco Stock</option>
                    <option value="stock_normal">Stock Normal</option>
                    <option value="mucho_stock">Mucho Stock</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
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

      {/* Modal de Login */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>🔐 Acceso de Administrador</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleLogin}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="admin"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default App;
