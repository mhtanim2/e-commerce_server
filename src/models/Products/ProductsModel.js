const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    
    
    title: { type: String },
    description: { type: String },
    price: { type: String },
    quantity: { type: String },
    image: { type: String },
    
    CreatedDate: { type: Date, default: Date.now() }


}, { versionKey: false });
const ProductsModel = mongoose.model('products', DataSchema);
module.exports = ProductsModel