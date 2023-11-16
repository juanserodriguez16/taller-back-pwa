"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa las dependencias necesarias
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// Importa las rutas
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const groupRoutes_1 = __importDefault(require("./routes/groupRoutes"));
// Configura la aplicación Express
const app = (0, express_1.default)();
// Configura middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Configura las rutas
app.use('/users', userRoutes_1.default);
app.use('/groups', groupRoutes_1.default);
// Maneja las rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});
// Conecta a la base de datos MongoDB
const dbOptions = {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.connect('mongodb://localhost:27017/back-node', dbOptions);
// Maneja eventos de conexión y error en la base de datos
const db = mongoose_1.default.connection;
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
