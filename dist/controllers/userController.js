"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupsByUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const express_validator_1 = require("express-validator");
// Crear un nuevo usuario con validaciones
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validar los datos del cuerpo de la solicitud
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        // Crear el usuario
        const user = new User_1.default({ name, email, password });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.createUser = createUser;
// Obtener todos los usuarios
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.getAllUsers = getAllUsers;
// Obtener un usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.getUserById = getUserById;
// Actualizar un usuario por ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        // Validar los datos del cuerpo de la solicitud
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Actualizar el usuario
        user.name = name;
        user.email = email;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.updateUser = updateUser;
// Eliminar un usuario por ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Utiliza el método deleteOne para eliminar el usuario
        yield user.deleteOne();
        res.json({ msg: 'Usuario eliminado correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.deleteUser = deleteUser;
// Obtener grupos de un usuario
const getGroupsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield User_1.default.findById(userId).populate('groups');
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        const groupsByUser = user.groups;
        res.json(groupsByUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.getGroupsByUser = getGroupsByUser;
