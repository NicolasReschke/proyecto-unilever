const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Forzar el puerto correcto en Railway
const finalPort = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Middleware CORS configurado para producción
const corsOptions = {
  origin: [
    'http://localhost:3000',           // Desarrollo local
    'https://proyecto-unilever.netlify.app',  // Netlify (producción)
    'https://proyecto-unilever.vercel.app',   // Vercel (alternativo)
    /\.netlify\.app$/,                  // Cualquier subdominio de Netlify
    /\.vercel\.app$/                    // Cualquier subdominio de Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestión de Productos' });
});

// Iniciar servidor
app.listen(finalPort, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${finalPort}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Supabase URL: ${process.env.SUPABASE_URL ? 'Configurado ✅' : 'No configurado ❌'}`);
  console.log(`🔌 Puerto asignado por Railway: ${process.env.PORT || 'No asignado'}`);
  console.log(`📡 Escuchando en: http://0.0.0.0:${finalPort}`);
  console.log(`🔗 Health check: http://0.0.0.0:${finalPort}/`);
});