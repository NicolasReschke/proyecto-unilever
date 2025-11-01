require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'tu_supabase_url_aqui') {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas');
  console.log('Por favor, actualiza el archivo .env con tus credenciales de Supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertarProductos() {
  try {
    console.log('🚀 Insertando productos en Supabase...');

    const productos = [
      {
        nombre: "HELLMANN'S MAY CLASICA SCH 2X20X118",
        categoria_id: 9, // Mayonesas y aderezos
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-15",
        imagen_url: "https://via.placeholder.com/100x100?text=HELLMANN%27S+MAY"
      },
      {
        nombre: "HELLMANN'S MAY CLASICA DP 15X475G",
        categoria_id: 9, // Mayonesas y aderezos
        stock_status: "poco_stock",
        fecha_pedido: "2024-01-16",
        imagen_url: "https://via.placeholder.com/100x100?text=HELLMANN%27S+MAY"
      },
      {
        nombre: "KNORR SALSA POMAROLA TRAD 24X340GR",
        categoria_id: 8, // Savoury
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-17",
        imagen_url: "https://via.placeholder.com/100x100?text=KNORR+POMAROLA"
      },
      {
        nombre: "KNORR SOPA POLLO C/FID CAB ANGEL 10X105.6G",
        categoria_id: 8, // Savoury
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-18",
        imagen_url: "https://via.placeholder.com/100x100?text=KNORR+POLLO"
      },
      {
        nombre: "KNORR SOPA CR VEGETALES 10X60G",
        categoria_id: 8, // Savoury
        stock_status: "poco_stock",
        fecha_pedido: "2024-01-19",
        imagen_url: "https://via.placeholder.com/100x100?text=KNORR+VEGETALES"
      },
      {
        nombre: "KNORR SOPA QUICK ZAPALLO BALANCE 24X5 SOBRES",
        categoria_id: 8, // Savoury
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-20",
        imagen_url: "https://via.placeholder.com/100x100?text=KNORR+ZAPALLO"
      },
      {
        nombre: "KNORR SOPA QUICK VEGETALES APIO 24X5 SOBRES",
        categoria_id: 8, // Savoury
        stock_status: "mucho_stock",
        fecha_pedido: "2024-01-21",
        imagen_url: "https://via.placeholder.com/100x100?text=KNORR+APIO"
      },
      {
        nombre: "ALA LIQ CONCENTRADO P/DIL E MAX BLA BOT12X500",
        categoria_id: 6, // Lavavajillas
        stock_status: "poco_stock",
        fecha_pedido: "2024-01-22",
        imagen_url: "https://via.placeholder.com/100x100?text=ALA+LIQ"
      },
      {
        nombre: "ALA LIQ B E ECOLAV MAX BLANC DP 12X800ML",
        categoria_id: 6, // Lavavajillas
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-23",
        imagen_url: "https://via.placeholder.com/100x100?text=ALA+ECOLAV"
      },
      {
        nombre: "ALA LIQ B E ECOLAV MAX BLANC DP 4X3L",
        categoria_id: 6, // Lavavajillas
        stock_status: "poco_stock",
        fecha_pedido: "2024-01-24",
        imagen_url: "https://via.placeholder.com/100x100?text=ALA+3L"
      },
      {
        nombre: "SKIP LIQ CONCENTRADO P/DIL BE BOT 12X500ML",
        categoria_id: 6, // Lavavajillas
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-25",
        imagen_url: "https://via.placeholder.com/100x100?text=SKIP"
      },
      {
        nombre: "ALA POLVO LV MANO CORE E MAX BLANC 24X400G",
        categoria_id: 7, // Jabón para la ropa
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-26",
        imagen_url: "https://via.placeholder.com/100x100?text=ALA+POLVO"
      },
      {
        nombre: "ALA CONCENTRADO LV VAJ LIMON BOT 12X500ML",
        categoria_id: 7, // Jabón para la ropa
        stock_status: "sin_stock",
        fecha_pedido: "2024-01-27",
        imagen_url: "https://via.placeholder.com/100x100?text=ALA+LIMON"
      },
      {
        nombre: "CIF DT BIOACTIVE LIMA 12X300ML",
        categoria_id: 5, // Limpiadores
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-28",
        imagen_url: "https://via.placeholder.com/100x100?text=CIF+LIMA"
      },
      {
        nombre: "CIF EXPERT ANTIGRASAS DP 12X450ML",
        categoria_id: 5, // Limpiadores
        stock_status: "stock_normal",
        fecha_pedido: "2024-01-29",
        imagen_url: "https://via.placeholder.com/100x100?text=CIF+ANTIGRASAS"
      },
      {
        nombre: "CIF CREMA BIO MULTIUSO ORIGINAL 12X750G",
        categoria_id: 5, // Limpiadores
        stock_status: "poco_stock",
        fecha_pedido: "2024-01-30",
        imagen_url: "https://via.placeholder.com/100x100?text=CIF+CREMA+750G"
      },
      {
        nombre: "CIF CREMA BIO MULTIUSO ORIGINAL 12X375G",
        categoria_id: 5, // Limpiadores
        stock_status: "mucho_stock",
        fecha_pedido: "2024-01-31",
        imagen_url: "https://via.placeholder.com/100x100?text=CIF+CREMA+375G"
      },
      {
        nombre: "COMFORT SUAVIZ FRESCOR INTENSO 12X500ML",
        categoria_id: 4, // Suavizantes
        stock_status: "stock_normal",
        fecha_pedido: "2024-02-01",
        imagen_url: "https://via.placeholder.com/100x100?text=COMFORT"
      },
      {
        nombre: "DOVE JAB ORIGINAL 60X90G",
        categoria_id: 2, // Jabón de tocador
        stock_status: "mucho_stock",
        fecha_pedido: "2024-02-02",
        imagen_url: "https://via.placeholder.com/100x100?text=DOVE+JABON"
      },
      {
        nombre: "DOVE AC RECONSTRUCCION 12X4000ML",
        categoria_id: 1, // Pelo
        stock_status: "poco_stock",
        fecha_pedido: "2024-02-03",
        imagen_url: "https://via.placeholder.com/100x100?text=DOVE+ACOND"
      },
      {
        nombre: "SEDAL AC CR BALANCE 12X340ML",
        categoria_id: 1, // Pelo
        stock_status: "stock_normal",
        fecha_pedido: "2024-02-04",
        imagen_url: "https://via.placeholder.com/100x100?text=SEDAL"
      },
      {
        nombre: "DOVE SH RITUAL DE REPAR COCO 12X400ML",
        categoria_id: 1, // Pelo
        stock_status: "stock_normal",
        fecha_pedido: "2024-02-05",
        imagen_url: "https://via.placeholder.com/100x100?text=DOVE+COCO"
      },
      {
        nombre: "DOVE SH RECONSTRUCCION 12X400ML",
        categoria_id: 1, // Pelo
        stock_status: "poco_stock",
        fecha_pedido: "2024-02-06",
        imagen_url: "https://via.placeholder.com/100x100?text=DOVE+RECONSTRUCCION"
      },
      {
        nombre: "DOVE SH REST INSTANTANEA 12X340ML",
        categoria_id: 1, // Pelo
        stock_status: "stock_normal",
        fecha_pedido: "2024-02-07",
        imagen_url: "https://via.placeholder.com/100x100?text=DOVE+REST"
      }
    ];

    console.log(`📦 Insertando ${productos.length} productos...`);

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      try {
        const { data, error } = await supabase
          .from('productos')
          .insert([producto])
          .select();

        if (error) {
          console.error(`❌ Error insertando ${producto.nombre}:`, error.message);
        } else {
          console.log(`✅ ${i + 1}/${productos.length}: ${producto.nombre}`);
        }
      } catch (err) {
        console.error(`❌ Error procesando ${producto.nombre}:`, err.message);
      }
    }

    console.log('🎉 ¡Productos insertados exitosamente!');
    console.log('📊 Total de productos agregados:', productos.length);

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

// Ejecutar inserción
insertarProductos();