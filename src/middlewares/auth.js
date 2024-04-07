import User from "../models/user.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Authentication failed' });
    };

    const token = authorization.split(" ")[1];

    try {
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ message: 'Authentication failed' });
        };

        const userFromToken = await User.findOne({ where: { id: decodedToken.id } });

        if (!userFromToken) {
            return res.status(403).json({ message: 'User not allowed' });
        };

        const { password: _, ...user } = userFromToken;

        req.user = user;

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ erro: error.message })
    }
}

export default auth