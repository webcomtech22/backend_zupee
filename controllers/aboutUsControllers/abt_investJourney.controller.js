const InvestJourney = require("../../app/models/aboutUs/abt_investJourney.model")

const findOne = (req,res)=>{
    id = req.params.id;
    InvestJourney.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id:row.id,
                    heading: row.heading,
                    image: row.image
                }
                res.json(jsonObject)
            }else{
                res.send({message:"BannerData not found"})
            }
        }
    })
}

const abt_updateInvestJourney = async(req,res)=>{
    try{
        id= req.body.id
        let investJourneyData
        if(req.file){
            investJourneyData = {
                image: req.file.filename,
                heading: req.body.heading
            }
        }else
        {
            investJourneyData={
                image: req.body.image,
                heading: req.body.heading
            }
        }
        const editData = await InvestJourney.editInvestJourneyData(investJourneyData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid invest Journey Data"})

        }

    }catch(err){
        res.status(500).send("error getting update")
    }

}
module.exports = {
    findOne,
    abt_updateInvestJourney
}