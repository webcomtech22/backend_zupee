const Investors = require("../../app/models/aboutUs/abt_investors.model")

const findOne = (req,res)=>{
    id = req.params.id;
    Investors.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id:row.id,
                    image: row.image
                }
                res.json(jsonObject)
            }else{
                res.send({message:"BannerData not found"})
            }
        }
    })
}

const abt_updateInvestors = async(req,res)=>{
    try{
        id= req.body.id
        let investorsData
        if(req.file){
            investorsData = {
                image: req.file.filename
            }
        }else{
            investorsData={
                image: req.body.image
            }
        }
        const editData = await Investors.editInvestorsData(investorsData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid investors Data"})

        }
    }catch(err){
        res.status(500).send("error getting update")
    }
}

module.exports = {
    findOne,
    abt_updateInvestors
}