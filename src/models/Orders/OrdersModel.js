const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    address: { type: String },
    TypeID: {type:mongoose.Schema.Types.ObjectId},
    total_price: { type: String },
    CreatedDate: { type: Date, default: Date.now() }

}, { versionKey: false });
const OrdersModel = mongoose.model('orders', DataSchema);
module.exports = OrdersModel