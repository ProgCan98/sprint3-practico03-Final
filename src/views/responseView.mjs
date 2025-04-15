// Funcionalidad: Este archivo define las funciones de presentación de los datos, organizando la información de los superhéroes en un formato estructurado.

export function renderizarSuperheroe(superheroe) {
  return {
    Nombre: superheroe.nombreSuperHeroe,
    'Nombre Real': superheroe.nombreReal,
    Edad: superheroe.edad,
    'planeta de Origen': superheroe.planetaOrigen,
    Debilidad: superheroe.debilidad,
    Poderes: superheroe.poderes,
    Aliados: superheroe.aliados,
    Enemigos: superheroe.enemigos,
  };
}

export function renderizarListasSuperheroes(superheroes) {
  return superheroes.map((superheroe) => renderizarSuperheroe(superheroe));
}
// La capa de vistas organiza la presentación de los datos, facilitando la lectura y el acceso a la información en un formato estándar para el cliente. Esto mejora la separación de responsabilidades y permite mantener la lógica de presentación en un único lugar.
