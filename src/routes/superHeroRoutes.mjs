// Este archivo define las rutas necesarias para cada operación del controlador.

import express from 'express';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  agregarSuperheroeController,
  eliminarSuperheroeController,
  eliminarSuperheroePorNombreController,
  renderizarEditarSuperheroeController,
  editarSuperheroeController,
} from '../controllers/superheroesController.mjs';

const router = express.Router();
// 🧠 Primero las rutas fijas
router.get('/', (req, res) => {
  res.render('home', { mensaje: '¡Todo listo para usar EJS!' });
});
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/agregar', (req, res) => {
  res.render('addSuperhero');
});
router.post('/heroes/agregar', agregarSuperheroeController);

// ✅ Luego las rutas dinámicas
// — ¡ahora edición!:
router.get('/heroes/:id/editar', renderizarEditarSuperheroeController);
router.post('/heroes/:id/editar', editarSuperheroeController);

router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get(
  '/heroes/buscar/:atributo/:valor',
  buscarSuperheroesPorAtributoController
);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller); //'/heroes/buscar/mayores-30' si este endpoint se ubica luego de otros

router.delete('/heroes/:id', eliminarSuperheroeController);
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;
// La capa de rutas define los endpoints y mapea cada uno a su respectivo controlador permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible.
