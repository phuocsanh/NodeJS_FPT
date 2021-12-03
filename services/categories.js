// let categories = [
//     { _id: 1, name: "Phone" },
//     { _id: 2, name: "Laptop" },
//     { _id: 3, name: "Camera" },
// ];
const categoryModel = require("../models/categoryModel");
exports.getAllCategories = async function() {
    // console.log(categoryModel.find());
    return await categoryModel.find();
};
exports.getOneCategory = async function(_id) {
    const category = categoryModel.findById(_id);

    return await category;
};

// insert into value
exports.insert = async(category) => {
    const c = new categoryModel(category);
    await c.save();
};
exports.update = async(category) => {
    let doc = await categoryModel.findById(category._id);
    if (doc) {
        doc.name = category.name;

        await doc.save();
    }
};
exports.delete = async(id) => {
    await categoryModel.remove({ _id: id });
};