const CreateToken = require("../../utility/CreateToken");

const UserLoginService= async (Request,DataModel) => {
    try {
        let {email,password}=Request.body;
        let data =await DataModel.aggregate([{$match:{email:email,password:password}}, {$project:{_id:0,email:1,name:1,mobile:1,photo:1,address:1}}])
        if(data.length>0){
            let token = await CreateToken(data[0])
            return {status:"success",token:token,data:data[0]}
        }
        else {
            return {status:"unauthorized"}
        }
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=UserLoginService