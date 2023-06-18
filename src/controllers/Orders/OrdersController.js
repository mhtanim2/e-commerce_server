const DataModel = require("../../models/Orders/OrdersModel");
const mongoose = require("mongoose");
/* const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const DropDownService = require("../../services/common/DropDownService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
 */const ListOneJoinService = require("../../services/common/ListOneJoinService");

//Create
exports.CreateOrders = async (req, res) => {

    try {
        let PostBody = req.body;
        PostBody.email = req.headers['email']
        PostBody.name = req.headers['name']
        PostBody.address = req.headers['address']
        let data = await DataModel.create(PostBody);
        res.status(200).json({ status: "success", data: data })
    } catch (error) {
        res.status(200).json({ status: "fail", data: error.toString() })
    }
}
//Update
exports.UpdateOrders = async (req, res) => {
    
    try {
        let email = req.headers['email'];
        let id = req.params.id;
        let PostBody = req.body;
        PostBody.email = email;
        PostBody.name = req.headers['name']
        PostBody.address = req.headers['address']
        let data = await DataModel.updateOne({ _id: id, email: email }, PostBody);
        res.status(200).json({ status: "success", data: data })
    }
    catch (error) {
        res.status(200).json({ status: "fail", data: error.toString() })
    }
}
//List Droupdown
exports.ProductsDropDown = async (req, res) => {

    try {
        let email = req.headers['email'];

        let data = await DataModel.aggregate([
            { $match: { email: email } },
            { $project: { _id: 1, title: 1, description: 1, price: 1, image: 1, quantity: 1 } }
        ])
        res.status(200).json({ status: "success", data: data })
    }
    catch (error) {
        res.status(200).json({ status: "fail", data: error.toString() })
    }
}
//Delete
exports.DeleteOrder = async (req, res) => {
    try{
        let id=req.params.id;
        let email = req.headers['email'];
        let QueryObject={_id:id,email:email};
        

        let Delete=  await DataModel.deleteMany(QueryObject)
        
        res.status(200).json({ status: "success", Delete: Delete })
    }
    catch (error) {
        res.status(200).json({ status: "fail", error: error.toString() })
    }
}

//Order List
exports.OrdersList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ "Product.title": SearchRgx }, { "Product.price": SearchRgx }]
    let JoinStage = { $lookup: { from: "products", localField: "TypeID", foreignField: "_id", as: "Product" } }

    let Result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage);
    res.status(200).json(Result)
}


//Details
exports.OrdersDetailsByID = async (req, res) => {
    try{

        let DetailsID=req.params.id;
        let email = req.headers['email'];
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject={email:email,_id:ObjectId(DetailsID)};
        
        let data = await DataModel.aggregate([
            {$match: QueryObject}
        ])
        res.status(200).json({ status: "success", data: data })
    }
    catch (error) {
        res.status(200).json({ status: "fail", data: error.toString() })
    }
    
}
