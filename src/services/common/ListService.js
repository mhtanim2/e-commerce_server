const ListService= async (Request,DataModel,SearchArray) => {
    try{

        let pageNo = Number(Request.params.pageNo);
        let perPage = Number(Request.params.perPage);
        let searchValue = Request.params.searchKeyword;

        let skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchValue!=="0") {
            let SearchQuery = {$or:SearchArray}
            data = await DataModel.aggregate([
                    
                    {$match: SearchQuery},
                    {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])
        }
        else {
            data = await DataModel.aggregate([
                
                {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])

        }
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=ListService