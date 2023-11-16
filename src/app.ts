// Importa las dependencias necesarias
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

// Importa las rutas
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

// Configura la aplicación Express
const app = express();

// Configura middleware
app.use(cors());
app.use(bodyParser.json());

// Configura las rutas
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);

// Maneja las rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Conecta a la base de datos MongoDB
const dbOptions: ConnectOptions = {
  //@ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect('mongodb://localhost:27017/back-node', dbOptions);

// Maneja eventos de conexión y error en la base de datos
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

// Puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
