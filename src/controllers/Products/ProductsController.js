const DataModel = require("../../models/Products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const DropDownService = require("../../services/common/DropDownService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const ListService = require("../../services/common/ListService");


//Create
exports.CreateProducts = async (req, res) => {
    let Result = await CreateService(req, DataModel);
    res.status(200).json(Result)
}
//Update
exports.UpdateProducts = async (req, res) => {
    let Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}
//List
exports.ProductsDropDown = async (req, res) => {
    let Result = await DropDownService(req, DataModel, { _id: 1, title: 1, description: 1, price: 1, image: 1, quantity: 1 })
    res.status(200).json(Result)
}
//Delete
exports.DeleteProduct = async (req, res) => {
    let Result = await DeleteService(req, DataModel)
    res.status(200).json(Result)
}
//Details
exports.ProductsDetailsByID = async (req, res) => {
    let Result = await DetailsByIDService(req, DataModel)
    res.status(200).json(Result)
}

exports.ProductsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{title: SearchRgx},{price:SearchRgx}]
    let Result= await ListService(req,DataModel,SearchArray)
    res.status(200).json(Result)
}

