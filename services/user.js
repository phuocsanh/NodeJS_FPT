const userModel = require("../models/userModel");

const users = [
    // { id: 1, username: "admin", password: "1" },
    // { id: 1, username: "manager", password: "1" },
];
exports.login = async function(username) {
    // const user = users.filter((u) => u.username === username)[0] || null;
    const user = await userModel.findOne({ username: username },
        "id username password"
    );
    return user;
};
exports.register = async function(username, password) {
    const user = new userModel({ username, password });
    return await user.save();
};