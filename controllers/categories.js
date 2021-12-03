const categoryService = require("../services/categories");

exports.getAllCategories = async function() {
    return await categoryService.getAllCategories();
};

exports.getOneCategory = async function(id) {
    const category = await categoryService.getOneCategory(id);
    return category;
};

exports.insert = async(body) => {
    const { name } = body;
    const category = {
        name: name,
    };
    await categoryService.insert(category);
};

exports.update = async(body) => {
    const { id, name } = body;
    const category = {
        _id: id,
        name: name,
    };
    await categoryService.update(category);
};
exports.delete = async(id) => {
    await categoryService.delete(id);
};
const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};