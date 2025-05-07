export function validarDatosSuperheroe(req, res, next) {
  const {
    nombreSuperHeroe,
    nombreReal,
    edad,
    planetaOrigen,
    debilidad,
    poderes,
    aliados,
    enemigos,
    creador,
  } = req.body;

  const errores = [];

  if (!nombreSuperHeroe || nombreSuperHeroe.trim() === '') {
    errores.push('El nombre del superhéroe es obligatorio.');
  }

  if (!nombreReal || nombreReal.trim() === '') {
    errores.push('El nombre real es obligatorio.');
  }

  if (!edad || isNaN(edad) || edad < 1 || edad > 120) {
    errores.push('La edad debe ser un número entre 1 y 120.');
  }

  if (!planetaOrigen || planetaOrigen.trim() === '') {
    errores.push('El planeta de origen es obligatorio.');
  }

// Validación de debilidad
if (debilidad && debilidad.trim().length > 0 && debilidad.trim().length < 3) {
  errores.push('La debilidad debe tener al menos 3 caracteres si se proporciona.');
}

  // Validación de poderes
  const poderesArray = Array.isArray(poderes)
    ? poderes.map(p => p.trim())
    : poderes?.split(',').map(p => p.trim()).filter(p => p.length > 0);

  const todosPoderesValidos = poderesArray.every(p => p.length >= 3);
  if (poderesArray.length < 2 || !todosPoderesValidos) {
    errores.push('Ingresá al menos 2 poderes y cada uno debe tener más de 3 caracteres.');
  }

  // Validación de aliados
  if (aliados && aliados.trim().length > 0) {
    const aliadosArray = aliados.split(',').map(a => a.trim());
    if (!aliadosArray.every(a => a.length >= 3)) {
      errores.push('Cada aliado debe tener al menos 3 caracteres.');
    }
  }

  // Validación de enemigos
  if (enemigos && enemigos.trim().length > 0) {
    const enemigosArray = enemigos.split(',').map(e => e.trim());
    if (!enemigosArray.every(e => e.length >= 3)) {
      errores.push('Cada enemigo debe tener al menos 3 caracteres.');
    }
  }

  // Validación de creador
  if (creador && creador.trim().length > 0 && creador.trim().length < 3) {
    errores.push('El nombre del creador debe tener al menos 3 caracteres si se proporciona.');
  }

  // Si hay errores, renderiza la vista con los datos ingresados
  if (errores.length > 0) {
    return res.status(400).render('addSuperhero', {
      errores,
      superheroe: req.body
    });
  }

  next(); // Todo bien, continuar
}