const UpdateService= async (Request,DataModel) => {
    try{
        //let email=Request.headers['email'];
        let id=Request.params.id;
        let PostBody=Request.body;
        //PostBody.email=email;
        let data = await DataModel.updateOne({_id:id},PostBody);
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UpdateService

