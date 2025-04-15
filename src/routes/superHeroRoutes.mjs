// Este archivo define las rutas necesarias para cada operación del controlador.

import express from 'express';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroeController,
  eliminarSuperheroePorNombreController,
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller); //'/heroes/buscar/mayores-30' si este endpoint se ubica luego de otros
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get(
  '/heroes/buscar/:atributo/:valor',
  buscarSuperheroesPorAtributoController
);
router.post('/heroes', crearSuperheroeController);
router.put('/heroes/:id', actualizarSuperheroeController);
router.delete('/heroes/:id', eliminarSuperheroeController);
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;
// La capa de rutas define los endpoints y mapea cada uno a su respectivo controlador permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible.
