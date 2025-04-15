// Este archivo implementa la lógica de negocio, utilizando los métodos del repositorio para recuperar, buscar y filtrar datos de los superhéroes.

import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
  return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await superHeroRepository.obtenerMayoresDe30();
}

export async function crearSuperheroe(data) {
  return await superHeroRepository.crearSuperheroe(data);
}

export async function actualizarSuperheroe(id, datosActualizados) {
  return await superHeroRepository.actualizarPorId(id, datosActualizados);
}

export async function eliminarSuperheroe(id) {
  return await superHeroRepository.eliminarPorId(id);
}

export async function eliminarSuperheroePorNombre(nombre) {
  return await superHeroRepository.eliminarPorNombre(nombre);
}

// La capa de servicios contiene la lógica de negocio y se encarga de validar y transformar los datos cuando es necesario. Esto permite mantener el repositorio enfocado únicamente en el acceso a la base de datos, facilitando la separación de responsabilidades y asegurando que la lógica de negocio se encuentre en un solo lugar.
