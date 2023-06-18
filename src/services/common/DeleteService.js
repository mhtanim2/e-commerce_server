const DeleteService= async (Request, Model) => {
    try{
        let id=Request.params.id;

        let QueryObject={_id:id};
        

        let Delete=  await Model.deleteMany(QueryObject)
        
        return {status: "success",Delete:Delete}

    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=DeleteService