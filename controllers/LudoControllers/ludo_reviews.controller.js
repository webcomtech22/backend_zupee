const LudoReviews = require("../../app/models/Ludo/ludo_reviews.model")

const findAll = (req,res)=>{
    LudoReviews.getAllReviews((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id
    LudoReviews.findById(id,(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            if(rows){
                const jsonObject={
                    id:rows.id,
                    image:rows.image,
                    name:rows.name,
                    description: rows.description
                }
                res.send(jsonObject)
            }else{
                res.send({mesaage:"ludo reviews data not found"})
            }
        }

    })
}

const ludo_updateReviews = async(req,res)=>{
    try{
        id= req.body.id
        let ludoReviewsData;
        if(req.file){
            ludoReviewsData={
                image: req.file.filename,
                name: req.body.name,
                description: req.body.description
            }
        }else{
            ludoReviewsData={
                image: req.body.image,
                name: req.body.name,
                description: req.body.description
            }           
        }
        const editData = await LudoReviews.editLudoReviewsData(ludoReviewsData,id)
    
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid ludo reviews Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const ludo_saveReviews = async(req,res)=>{
    try{
        let ludoReviewsData
        if(req.file){
             ludoReviewsData ={
                image: req.file.filename,
                name: req.body.name,
                description: req.body.description
            }
        }else{
             ludoReviewsData =  {
                image: '',
                name: req.body.name,
                description: req.body.description
            }
        }
        const saveData = await LudoReviews.saveLudoReviewsData(ludoReviewsData)
        if(saveData){
            res.status(200).json({message:'ludo reviews data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const ludo_deleteReviews = (req,res) =>{
    id = req.params.id
    LudoReviews.removeLudoReviews(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "ludo reviews is deleted"})
        }
    })
}


module.exports = {
    findAll,
    findOne,
    ludo_updateReviews,
    ludo_saveReviews,
    ludo_deleteReviews
}