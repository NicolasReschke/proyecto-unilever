require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://llgaixjvkmdwbudmtksn.supabase.co') {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas');
  console.log('Por favor, actualiza el archivo .env con tus credenciales de Supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('🚀 Configurando base de datos...');

    // Verificar si la tabla ya existe
    const { data: existingTables, error: checkError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'productos');

    if (checkError) {
      console.error('Error verificando tabla:', checkError);
    }

    if (!existingTables || existingTables.length === 0) {
      console.log('📋 Creando tabla productos...');

      // Crear tabla productos usando SQL directo
      const { error: tableError } = await supabase.rpc('exec_sql', {
        query: `
          CREATE TABLE productos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            stock INTEGER NOT NULL CHECK (stock >= 0),
            fecha_pedido DATE NOT NULL,
            imagen_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });

      if (tableError) {
        console.error('❌ Error creando tabla:', tableError);
        console.log('💡 Intenta crear la tabla manualmente en Supabase SQL Editor');
        return;
      } else {
        console.log('✅ Tabla productos creada');
      }
    } else {
      console.log('✅ Tabla productos ya existe');
    }

    // Insertar datos de ejemplo
    const productosEjemplo = [
      {
        nombre: 'Producto Ejemplo 1',
        stock: 10,
        fecha_pedido: '2024-01-15',
        imagen_url: 'https://via.placeholder.com/100x100?text=Producto+1'
      },
      {
        nombre: 'Producto Ejemplo 2',
        stock: 25,
        fecha_pedido: '2024-01-20',
        imagen_url: 'https://via.placeholder.com/100x100?text=Producto+2'
      },
      {
        nombre: 'Producto Ejemplo 3',
        stock: 5,
        fecha_pedido: '2024-01-25',
        imagen_url: 'https://via.placeholder.com/100x100?text=Producto+3'
      }
    ];

    for (const producto of productosEjemplo) {
      const { error: insertError } = await supabase
        .from('productos')
        .insert([producto]);

      if (insertError) {
        console.error(`Error insertando ${producto.nombre}:`, insertError);
      } else {
        console.log(`✅ Insertado: ${producto.nombre}`);
      }
    }

    console.log('🎉 Base de datos configurada exitosamente!');
    console.log('📊 Datos de ejemplo insertados');

  } catch (error) {
    console.error('❌ Error configurando base de datos:', error);
  }
}

// Ejecutar setup
setupDatabase();