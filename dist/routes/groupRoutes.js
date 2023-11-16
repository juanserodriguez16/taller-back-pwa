"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const groupController = __importStar(require("../controllers/groupController"));
const router = express_1.default.Router();
// Rutas CRUD para grupos con validaciones
router.post('/create', [(0, express_validator_1.body)('name', 'El nombre del grupo es obligatorio').not().isEmpty()], groupController.createGroup);
router.get('/all', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById);
router.put('/update/:id', [(0, express_validator_1.body)('name', 'El nombre del grupo es obligatorio').not().isEmpty()], groupController.updateGroup);
router.delete('/delete/:id', groupController.deleteGroup);
// Rutas para la asociación de usuarios a grupos
router.post('/addUserToGroup', [
    (0, express_validator_1.body)('groupId', 'El ID del grupo es obligatorio').not().isEmpty(),
    (0, express_validator_1.body)('userId', 'El ID del usuario es obligatorio').not().isEmpty(),
], groupController.addUserToGroup);
router.post('/removeUserFromGroup', [
    (0, express_validator_1.body)('groupId', 'El ID del grupo es obligatorio').not().isEmpty(),
    (0, express_validator_1.body)('userId', 'El ID del usuario es obligatorio').not().isEmpty(),
], groupController.removeUserFromGroup);
// Obtener usuarios en un grupo
router.get('/:groupId/users', groupController.getUsersInGroup);
exports.default = router;
