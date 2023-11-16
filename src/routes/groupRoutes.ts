import express from 'express';
import { body } from 'express-validator';
import * as groupController from '../controllers/groupController';

const router = express.Router();

// Rutas CRUD para grupos con validaciones
router.post(
  '/create',
  [body('name', 'El nombre del grupo es obligatorio').not().isEmpty()],
  groupController.createGroup
);

router.get('/all', groupController.getAllGroups);

router.get('/:id', groupController.getGroupById);

router.put(
  '/update/:id',
  [body('name', 'El nombre del grupo es obligatorio').not().isEmpty()],
  groupController.updateGroup
);

router.delete('/delete/:id', groupController.deleteGroup);


// Rutas para la asociación de usuarios a grupos
router.post(
    '/addUserToGroup',
    [
      body('groupId', 'El ID del grupo es obligatorio').not().isEmpty(),
      body('userId', 'El ID del usuario es obligatorio').not().isEmpty(),
    ],
    groupController.addUserToGroup
  );
  
  router.post(
    '/removeUserFromGroup',
    [
      body('groupId', 'El ID del grupo es obligatorio').not().isEmpty(),
      body('userId', 'El ID del usuario es obligatorio').not().isEmpty(),
    ],
    groupController.removeUserFromGroup
  );

  
// Obtener usuarios en un grupo
router.get('/:groupId/users', groupController.getUsersInGroup);
    
export default router;
