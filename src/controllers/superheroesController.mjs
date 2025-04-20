// Este archivo implementa el controlador para gestionar las solicitudes HTTP, llamando a los servicios correspondientes y utilizando las vistas para presentar los datos.

import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30,
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  eliminarSuperheroePorNombre,
} from '../services/superheroesService.mjs';

import {
  renderizarSuperheroe,
  renderizarListasSuperheroes,
} from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al obtener el superheroe',
      error: error.message,
    });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    const formateados = renderizarListasSuperheroes(superheroes);

    res.render('dashboard', { superheroes: formateados });
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al cargar el dashboard',
      error: error.message,
    });
  }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: 'No se encontraron superheroes con ese atributo' });
    }

    const superheroesFormateados = renderizarListasSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: 'Error al buscar superheroes', error: error.message });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: 'No se encontraron superheroes mayores de 30 años' });
    }
    const superheroesFormateados = renderizarListasSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al obtener superheroes mayores de 30',
      error: error.message,
    });
  }
}

export async function crearSuperheroeController(req, res) {
  try {
    const nuevoSuperheroe = await crearSuperheroe(req.body);
    res.status(201).json(renderizarSuperheroe(nuevoSuperheroe));
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el superhéroe', error });
  }
}

export async function actualizarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const datos = req.body;

    const actualizado = await actualizarSuperheroe(id, datos);

    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
    }

    res.status(200).json(renderizarSuperheroe(actualizado));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar el superhéroe',
      error: error.message,
    });
  }
}

export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperheroe(id);

    if (!superheroeEliminado) {
      return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
    }

    res.status(200).json(renderizarSuperheroe(superheroeEliminado));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el superhéroe',
      error: error.message,
    });
  }
}

export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const eliminado = await eliminarSuperheroePorNombre(nombre);

    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
    }

    res.status(200).json(renderizarSuperheroe(eliminado));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el superhéroe por nombre',
      error: error.message,
    });
  }
}

// La capa de controladores gestiona las solicitudes del cliente y llama a la capa de servicios para realizar las operaciones necesarias. Al usar funciones específicas para cada endpoint, el controlador actúa como intermediario, facilitando la separación de responsabilidades y mejorando la organización del código.
