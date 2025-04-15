// Se define el modelo de datos para superheroes utilizando Mongoose, estableciendo la estructura y las reglas de validacion para los documentos que seran almacenados en MongoDB.

import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
  nombreSuperHeroe: {
    type: String,
    required: [true, 'El nombre del superhéroe es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [60, 'El nombre no puede superar los 60 caracteres'],
  },
  nombreReal: {
    type: String,
    required: [true, 'El nombre real es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre real debe tener al menos 3 caracteres'],
    maxlength: [60, 'El nombre real no puede superar los 60 caracteres'],
  },
  edad: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
    min: [0, 'La edad no puede ser negativa'],
  },
  planetaOrigen: { type: String, default: 'Desconocido' },
  debilidad: String,
  poderes: {
    type: [String],
    required: [true, 'El campo poderes es obligatorio'],
    validate: {
      validator: function (arr) {
        if (!Array.isArray(arr) || arr.length === 0) return false;
        return arr.every(
          (p) =>
            typeof p === 'string' &&
            p.trim().length >= 3 &&
            p.trim().length <= 60
        );
      },
      message:
        'Cada poder debe ser un string entre 3 y 60 caracteres sin espacios, y debe haber al menos uno.',
    },
  },
  aliados: [String],
  enemigos: [String],
  creador: String,
  createdAT: { type: Date, default: Date.now },
});
const superHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-17');
export default superHero;

// Esto asegura que cada documento en la coleccion de superheroes siga una estructura consistente, lo que permite tener un control de calidad sobre los datos.
// Con mongoose se facilita la validacion y gestion de los datos, garantizando que cada documento cumpla con los requisitos del esquema, como la obligatoriedad de ciertos campos y los tipos de datos.
