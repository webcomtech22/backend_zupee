const RatingImage = require("../../app/models/ZupeeHome/rating.model")

const findOneRating = (req,res) =>{
    id = req.params.id
    RatingImage.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    heading: row.heading,
                    description: row.description,
                    image: row.image
                }
                res.json(jsonObject)
            }else{
                res.send({message:"rating Data not found"})
            }
        }
    })
}

const updateRating = async(req,res)=>{
    try{
        id = req.body.id
        let ratingData;
        if(req.file){
            ratingData = {
                id: req.body.id,
                heading: req.body.heading,
                description: req.body.description,
                image: req.file.filename
            }
        }else{
            ratingData={
                id: req.body.id,
                heading: req.body.heading,
                description: req.body.description,
                image: req.body.image 
            }
        }
       const editData = await RatingImage.editratingData(ratingData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}

const deleteRating = (req,res) =>{
    id = req.params.id
    RatingImage.removeRating(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message: "rating is deleted"})
        }
    })
}

module.exports = {
    findOneRating,
    updateRating,
    deleteRating
}