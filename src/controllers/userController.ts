import { Request, Response } from 'express';
import UserModel, { User } from '../models/User';
import { validationResult } from 'express-validator';

// Crear un nuevo usuario con validaciones
export const createUser = async (req: Request, res: Response) => {
  try {
    // Validar los datos del cuerpo de la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear el usuario
    const user: User = new UserModel({ name, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // Validar los datos del cuerpo de la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Actualizar el usuario
    user.name = name;
    user.email = email;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
  
      // Utiliza el método deleteOne para eliminar el usuario
      await user.deleteOne();
  
      res.json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };
  // Obtener grupos de un usuario
export const getGroupsByUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
  
      const user = await UserModel.findById(userId).populate('groups');
      if (!user) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
  
      const groupsByUser = user.groups;
  
      res.json(groupsByUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };