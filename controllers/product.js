const productService = require("../services/product");

exports.get = async function() {
    return await productService.get();
};

exports.getOneProduct = async function(id) {
    const product = productService.getOneProduct(id);
    return await product;
};

exports.insert = async(body) => {
    const {
        name,
        price,
        quantity,
        image,
        description,
        available,
        published,
        category,
    } = body;
    const product = {
        name: name,
        price: Number(price),
        quantity: Number(quantity),
        category: category,
        image: image,
        description: description,
        available: available ? true : false,
        published: published,
    };
    await productService.insert(product);
};

exports.update = async(body) => {
    const {
        id,
        name,
        price,
        quantity,
        image,
        description,
        available,
        published,
        category,
    } = body;
    const product = {
        _id: id,
        name: name,
        price: Number(price),
        quantity: Number(quantity),
        category: category,
        image: image,
        description: description,
        available: available ? true : false,
        published: published,
    };
    await productService.update(product);
};
exports.delete = async(id) => {
    await productService.delete(id);
};
const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};