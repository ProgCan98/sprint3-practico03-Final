// Este archivo implementa el controlador para gestionar las solicitudes HTTP, llamando a los servicios correspondientes y utilizando las vistas para presentar los datos.

import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30,
  crearSuperheroe,
  actualizarSuperheroe as actualizarService,
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
        .send({ mensaje: 'No se encontraron coincidencias' });
    }

    const superheroesFormateados = renderizarListasSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al buscar', error: error.message });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res.status(404).send({ mensaje: 'No hay mayores de 30 años' });
    }

    const formateados = renderizarListasSuperheroes(superheroes);
    res.status(200).json(formateados);
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al filtrar mayores de 30',
      error: error.message,
    });
  }
}

export async function agregarSuperheroeController(req, res) {
  try {
    await crearSuperheroe(req.body);
    res.redirect('/api/heroes');
  } catch (error) {
    res.status(500).send(`Error al crear el superhéroe: ${error.message}`);
  }
}

export async function renderizarEditarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const heroe = await obtenerSuperheroePorId(id);
    if (!heroe) return res.status(404).send('Superhéroe no encontrado');
    res.render('editSuperhero', {
      superheroe: heroe,
      errores: [], // <== clave para que no explote el EJS
    });
  } catch (error) {
    res.status(500).send('Error al cargar formulario de edición');
  }
}

export async function editarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    await actualizarService(id, req.body);
    res.redirect(`/api/heroes`);
  } catch (error) {
    res.status(500).send('Error al actualizar superhéroe');
  }
}

export async function eliminarSuperheroeController(req, res) {
  const { id } = req.params;
  try {
    const eliminado = await eliminarSuperheroe(id);
    if (!eliminado) {
      return res.status(404).send('Superhéroe no encontrado');
    }
    res.redirect('/api/heroes');
  } catch (error) {
    res.status(500).send(`Error al eliminar superhéroe: ${error.message}`);
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
