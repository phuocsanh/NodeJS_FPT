const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "category" },
    image: { type: String },
    description: { type: String },
    available: { type: Boolean },
    published: { type: Date },
});
module.exports = mongoose.model("product", productSchema);