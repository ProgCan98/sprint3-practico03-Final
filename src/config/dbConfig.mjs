// Este archivo configura la conexion centralizada a MongoDB, permitiendo que la aplicacion tenga una unica instancia de conexion que puede ser utilizada en cualquier parte del proyecto.

import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://Grupo-17:grupo17@cursadanodejs.ls9ii.mongodb.net/Node-js'
    );
    console.log('Conexion exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    ProcessingInstruction.exit(1);
  }
}

// Tener un unico punto de configuracion facilita el mantenimiento y asegura que cualquier cambio en la config. se realice en un solo lugar, mejorando la modularidad y la reusabilidad del codigo.
