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