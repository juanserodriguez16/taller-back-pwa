import { Request, Response } from 'express';
import GroupModel, { Group } from '../models/Group';
import { validationResult } from 'express-validator';
import UserModel from '../models/User';

// Crear un nuevo grupo con validaciones
export const createGroup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const existingGroup = await GroupModel.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ msg: 'El grupo ya existe' });
    }

    const group: Group = new GroupModel({ name });
    await group.save();

    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Listar todos los grupos y sus usuarios
export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await GroupModel.find().populate('users');
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Obtener un grupo por ID
export const getGroupById = async (req: Request, res: Response) => {
  try {
    const group = await GroupModel.findById(req.params.id).populate('users');
    if (!group) {
      return res.status(404).json({ msg: 'Grupo no encontrado' });
    }
    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Actualizar la información de un grupo por ID
export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const group = await GroupModel.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: 'Grupo no encontrado' });
    }

    group.name = name;
    await group.save();

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Eliminar un grupo por ID
export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const group = await GroupModel.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: 'Grupo no encontrado' });
    }

    await group.deleteOne();

    res.json({ msg: 'Grupo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};
// Agregar usuarios a un grupo
export const addUserToGroup = async (req: Request, res: Response) => {
    try {
      const { groupId, userId } = req.body;
  
      const group = await GroupModel.findById(groupId);
      const user = await UserModel.findById(userId);
  
      if (!group || !user) {
        return res.status(404).json({ msg: 'Grupo o usuario no encontrado' });
      }
  
      // Verificar si el usuario ya está en el grupo
      if (group.users.includes(userId)) {
        return res.status(400).json({ msg: 'El usuario ya está en el grupo' });
      }
  
      group.users.push(userId);
      await group.save();
  
      res.json({ msg: 'Usuario agregado al grupo correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };
  
  // Remover usuarios de un grupo
  export const removeUserFromGroup = async (req: Request, res: Response) => {
    try {
      const { groupId, userId } = req.body;
  
      const group = await GroupModel.findById(groupId);
      const user = await UserModel.findById(userId);
  
      if (!group || !user) {
        return res.status(404).json({ msg: 'Grupo o usuario no encontrado' });
      }
  
      // Filtrar el array de usuarios del grupo para remover el usuario
      group.users = group.users.filter((u) => u.toString() !== userId);
      await group.save();
  
      res.json({ msg: 'Usuario removido del grupo correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };

  // Obtener usuarios en un grupo
  export const getUsersInGroup = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;
  
      const group = await GroupModel.findById(groupId).populate('users');
      if (!group) {
        return res.status(404).json({ msg: 'Grupo no encontrado' });
      }
  
      const usersInGroup = group.users;
  
      res.json(usersInGroup);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };
