import User from "../models/user.js";

const userExists = async (username) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return false;
    };
    return true;
}
export default userExists