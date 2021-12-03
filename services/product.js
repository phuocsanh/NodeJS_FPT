const productModel = require("../models/productModel");

exports.get = async function() {
    return await productModel.find();
};

exports.getOneProduct = async function(_id) {
    // const product = listPhone.filter((p) => p._id == _id)[0] || null;
    const product = productModel.findById(_id);
    return await product;
};

// insert into value
exports.insert = async(product) => {
    const p = new productModel(product);
    await p.save();
    // listPhone.push(product);
};
exports.update = async(product) => {
    // listPhone = listPhone.map((item, index, arr) => {
    //     if (item._id == product._id) {
    //         return {
    //             ...item,
    //             name: product.name,
    //             price: product.price,
    //             quantity: product.quantity,
    //             category: product.category,
    //             image: product.image ? product.image : item.image,
    //             description: product.description,
    //             available: product.available,
    //             published: product.published,
    //         };
    //     } else {
    //         return item;
    //     }
    // });
    let doc = await productModel.findById(product._id);
    if (doc) {
        doc.name = product.name;
        doc.price = product.price;
        doc.quantity = product.quantity;
        doc.category = product.category;
        doc.image = product.image ? product.image : doc.image;
        doc.description = product.description;
        doc.available = product.available;
        doc.publishe = product.published;
        await doc.save();
    }
};
exports.delete = async(id) => {
    // listPhone = listPhone.filter((item, index, arr) => item._id != id);
    await productModel.remove({ _id: id });
};

// let listPhone = [{
//         _id: 1,
//         name: "Phone 1",
//         price: `100000`,
//         quantity: `100`,
//         category: 1,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 2,
//         name: "Phone 2",
//         price: `200000`,
//         quantity: `100`,
//         category: 1,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },

//     {
//         _id: 3,
//         name: "Phone 3",
//         price: `300000`,
//         quantity: `300`,
//         category: 3,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 4,
//         name: "Phone 4",
//         price: `400000`,
//         quantity: `100`,
//         category: 2,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 5,
//         name: "Phone 5",
//         price: `500000`,
//         quantity: `500`,
//         category: 2,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 6,
//         name: "Phone 6",
//         price: `600000`,
//         quantity: `600`,
//         category: 3,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: false,
//         published: "2021-11-13",
//     },
//     {
//         _id: 7,
//         name: "Phone 7",
//         price: `700000`,
//         quantity: `100`,
//         category: 1,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 8,
//         name: "Phone 8",
//         price: `800000`,
//         quantity: `100`,
//         category: 2,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 9,
//         name: "Phone 9",
//         price: `900000`,
//         quantity: `900`,
//         category: 1,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 10,
//         name: "Phone 10",
//         price: `100000`,
//         quantity: `100`,
//         category: 1,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 11,
//         name: "Phone 11",
//         price: `1100000`,
//         quantity: `100`,
//         category: 1,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
//     {
//         _id: 12,
//         name: "Phone 12",
//         price: `1200000`,
//         quantity: `300`,
//         category: 1,
//         image: "https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg",
//         description: "Hàng mới",
//         available: true,
//         published: "2021-11-13",
//     },
// ];