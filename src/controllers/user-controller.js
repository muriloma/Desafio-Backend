import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import userExists from '../services/user-service.js'

const createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (await userExists(username)) {
            return res.status(400).json({ message: 'Username unavailable' })
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { username, password: hashedPassword };

        await User.create(newUser);

        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ erro: error.message })
    };
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        };

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' })

        return res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ erro: error.message })
    }

}

const detailUser = async (req, res) => {
    const user = req.user

    return res.status(200).json(user);
}

const deleteUser = async (req, res) => {
    const { id } = req.user;

    try {
        const filter = { where: { id } };

        const countDeleted = await User.destroy(filter);

        if (countDeleted <= 0) return res.status(404).json({ mensagem: "User not found" });

        return res.status(200).json({ mensage: "User deleted" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ erro: error.message })
    }
}

export { createUser, login, detailUser, deleteUser }