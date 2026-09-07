import UserModel from "../models/User.js";
import ProfileModel from "../models/Profile.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { generateToken } from "../helpers/jwt.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        await ProfileModel.create({
            user_id: user.id,
            first_name: "Nombre",
            last_name: "Apellido"
        });

        return res.status(201).json({
            message: "Usuario registrado correctamente",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al registrar usuario",
            error: error.message
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                message: "Email o contraseña incorrectos"
            });
        }

        const passwordCorrecta = await comparePassword(password, user.password);

        if (!passwordCorrecta) {
            return res.status(401).json({
                message: "Email o contraseña incorrectos"
            });
        }

        const token = generateToken({
            id: user.id,
            role: user.role
        });

        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(200).json({
            message: "Inicio de sesión correcto"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};
export const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.id, {
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

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profile: user.profile
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el perfil",
            error: error.message
        });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, biography, avatar_url, birth_date } = req.body;

        const profile = await ProfileModel.findOne({
            where: { user_id: req.user.id }
        });

        if (!profile) {
            return res.status(404).json({
                message: "Perfil no encontrado"
            });
        }

        await profile.update({
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date
        });

        return res.status(200).json({
            message: "Perfil actualizado correctamente",
            profile
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el perfil",
            error: error.message
        });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Sesión cerrada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al cerrar sesión",
            error: error.message
        });
    }
};