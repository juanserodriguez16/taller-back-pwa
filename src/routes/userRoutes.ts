import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/userController';

const router = express.Router();

// Rutas CRUD para usuarios con validaciones
router.post(
  '/create',
  [
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'Por favor, incluye un correo electrónico válido').isEmail(),
    body('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  ],
  userController.createUser
);

router.get('/all', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put(
  '/update/:id',
  [
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'Por favor, incluye un correo electrónico válido').isEmail(),
  ],
  userController.updateUser
);

router.delete('/delete/:id', userController.deleteUser);


// Obtener grupos de un usuario
router.get('/:userId/groups', userController.getGroupsByUser);
export default router;
