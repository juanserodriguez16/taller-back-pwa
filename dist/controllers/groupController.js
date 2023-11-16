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
exports.getUsersInGroup = exports.removeUserFromGroup = exports.addUserToGroup = exports.deleteGroup = exports.updateGroup = exports.getGroupById = exports.getAllGroups = exports.createGroup = void 0;
const Group_1 = __importDefault(require("../models/Group"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
// Crear un nuevo grupo con validaciones
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name } = req.body;
        const existingGroup = yield Group_1.default.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ msg: 'El grupo ya existe' });
        }
        const group = new Group_1.default({ name });
        yield group.save();
        res.status(201).json(group);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.createGroup = createGroup;
// Listar todos los grupos y sus usuarios
const getAllGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield Group_1.default.find().populate('users');
        res.json(groups);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.getAllGroups = getAllGroups;
// Obtener un grupo por ID
const getGroupById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield Group_1.default.findById(req.params.id).populate('users');
        if (!group) {
            return res.status(404).json({ msg: 'Grupo no encontrado' });
        }
        res.json(group);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.getGroupById = getGroupById;
// Actualizar la información de un grupo por ID
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const group = yield Group_1.default.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ msg: 'Grupo no encontrado' });
        }
        group.name = name;
        yield group.save();
        res.json(group);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.updateGroup = updateGroup;
// Eliminar un grupo por ID
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield Group_1.default.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ msg: 'Grupo no encontrado' });
        }
        yield group.deleteOne();
        res.json({ msg: 'Grupo eliminado correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.deleteGroup = deleteGroup;
// Agregar usuarios a un grupo
const addUserToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupId, userId } = req.body;
        const group = yield Group_1.default.findById(groupId);
        const user = yield User_1.default.findById(userId);
        if (!group || !user) {
            return res.status(404).json({ msg: 'Grupo o usuario no encontrado' });
        }
        // Verificar si el usuario ya está en el grupo
        if (group.users.includes(userId)) {
            return res.status(400).json({ msg: 'El usuario ya está en el grupo' });
        }
        group.users.push(userId);
        yield group.save();
        res.json({ msg: 'Usuario agregado al grupo correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.addUserToGroup = addUserToGroup;
// Remover usuarios de un grupo
const removeUserFromGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupId, userId } = req.body;
        const group = yield Group_1.default.findById(groupId);
        const user = yield User_1.default.findById(userId);
        if (!group || !user) {
            return res.status(404).json({ msg: 'Grupo o usuario no encontrado' });
        }
        // Filtrar el array de usuarios del grupo para remover el usuario
        group.users = group.users.filter((u) => u.toString() !== userId);
        yield group.save();
        res.json({ msg: 'Usuario removido del grupo correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.removeUserFromGroup = removeUserFromGroup;
// Obtener usuarios en un grupo
const getUsersInGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = req.params.groupId;
        const group = yield Group_1.default.findById(groupId).populate('users');
        if (!group) {
            return res.status(404).json({ msg: 'Grupo no encontrado' });
        }
        const usersInGroup = group.users;
        res.json(usersInGroup);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});
exports.getUsersInGroup = getUsersInGroup;
