import UserModel from "../models/User.js";
import ProfileModel from "../models/Profile.js";
import { hashPassword } from "../helpers/bcrypt.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            include: {
                model: ProfileModel,
                as: "profile"
            }
        });

        return res.status(200).json(users);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener los usuarios"
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id, {
            include: {
                model: ProfileModel,
                as: "profile"
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al obtener el usuario"
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role
        } = req.body;

        const passwordHash = await hashPassword(password);

        const user = await UserModel.create({
            username,
            email,
            password: passwordHash,
            role: role || "user"
        });

        return res.status(201).json({
            message: "Usuario creado correctamente",
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al crear el usuario"
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const {
            username,
            email,
            password,
            role
        } = req.body;

        const data = {
            username,
            email,
            role
        };

        if (password) {
            data.password = await hashPassword(password);
        }

        await user.update(data);

        return res.status(200).json({
            message: "Usuario actualizado correctamente",
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al actualizar el usuario"
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        await user.destroy();

        return res.status(200).json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error al eliminar el usuario"
        });
    }
};