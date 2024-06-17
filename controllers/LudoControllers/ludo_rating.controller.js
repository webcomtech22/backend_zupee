const LudoRating = require("../../app/models/Ludo/ludo_rating.model")

const findOne = (req,res)=>{
    id = req.params.id;
    LudoRating.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id: row.id,
                    heading: row.heading,
                    description:row.description,
                    image: row.image                    
                }
                res.json(jsonObject)
            }else{
                res.send({message:"ludo RatingData not found"})
            }
        }
    })
}

const ludo_updateRating = async(req,res)=>{
    try{
        id= req.body.id
        let ratingData

        if(req.file){
            ratingData = {
                image: req.file.filename,
                heading: req.body.heading,
                description:req.body.description
            }
        }else
        {
            ratingData={
                image: req.body.image,
                heading: req.body.heading,
                description:req.body.description
            }
        }
        const editData = await LudoRating.editLudoRatingData(ratingData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid ludo rating Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

module.exports = {
    findOne,
    ludo_updateRating
}
