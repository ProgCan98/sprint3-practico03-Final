// Inicializa el servidor, conecta a la base de datos, y carga las rutas para gestionar todas las solicitudes relacionadas con superhéroes.
import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import { createServer } from 'node:http';
import path from 'path';
import { fileURLToPath } from 'url';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';

const app = express();
const server = createServer(app);

// 🔁 Soporte para __dirname con ESModules
const __filename = fileURLToPath(import.meta.url); // Ruta absoluta de app.mjs
const __dirname = path.dirname(__filename); // Directorio de app.mjs
// dirname: Es una variable global en Node.js que devuelve la ruta absoluta del directorio actual del archivo que la está usando

// 🧠 Configurar EJS como motor de vistas
app.set('view engine', 'ejs'); // Usar EJS como motor
app.set('views', path.join(__dirname, 'views')); // Ruta de las vistas

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Para archivos estáticos (CSS/JS)
app.use(methodOverride('_method'));

// Conexion mongodb
connectDB();

//configuracion de rutas
app.use('/api', superHeroRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
// app.mjs centraliza la configuración de la aplicación, conectando a MongoDB y cargando las rutas necesarias. Esto permite una configuración modular y fácilmente escalable, asegurando que la aplicación esté lista para manejar solicitudes en el entorno de desarrollo o producción.
