const Reviews = require("../../app/models/ZupeeHome/reviews.model")


const saveReviews = async(req,res)=>{
    try{
        // name = req.body.filename
        // description = req.body.description
        let reviewData

        if(req.file){
             reviewData ={
                image: req.file.filename,
                name: req.body.name,
                description: req.body.description
            }
        }else{
             reviewData =  {
                image: '',
                name: req.body.name,
                description: req.body.description
            }
        }
        const saveData = await Reviews.saveReviewsData(reviewData)
        if(saveData){
            res.status(200).json({message:'moneyGames data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const getReviewsList = (req,res)=>{
    Reviews.getAllReviewsData((err,result)=>{
        if(err) res.send(err)
        res.send(result)
    })
}


const findOneReview = (req,res) =>{
    id = req.params.id
    Reviews.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    image: row.image,
                    name: row.name,
                    description: row.description
                }
                res.json(jsonObject)
            }else{
                res.send({message:"reviews Data not found"})
            }
        }
    })
}

const updateReviews = async(req,res)=>{
    try{
        id = req.body.id
        let reviewsData;
        if(req.file){
            reviewsData = {
                id: req.body.id,
                image: req.file.filename,
                name: req.body.name,
                description: req.body.description
            }
        }else{
            reviewsData={
                id: req.body.id,
                image: req.body.image,
                name: req.body.name,
                description: req.body.description
            }
        }
       const editData = await Reviews.editReviewsData(reviewsData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}

const deleteReview = (req,res) =>{
    id = req.params.id
    Reviews.removeReview(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message: "review is deleted"})
        }
    })
}

module.exports= {
    saveReviews,
    getReviewsList,
    findOneReview,
    updateReviews,
    deleteReview
}