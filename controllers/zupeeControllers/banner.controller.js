const Banner = require("../../app/models/ZupeeHome/banner.model.js")

const findOne = (req,res) =>{
    id = req.params.id
    Banner.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{it 
                if(row){
                const jsonObject = {
                    id: row.id,
                    bannerImage: row.bannerImage,
                    heading: row.heading,
                    description: row.description
                }
                res.json(jsonObject)
            }else{
                res.send({message:"banner Data not found"})
            }
        }
    })
}

const updateBanner = async(req,res)=>{
    try{
        id = req.body.id
        let bannerData;
        if(req.file){
            bannerData = {
                id: req.body.id,
                bannerImage: req.file.filename,
                heading: req.body.heading,
                description: req.body.description
            }
        }else{
            bannerData={
                id: req.body.id,
                bannerImage: req.body.image,
                heading: req.body.heading,
                description: req.body.description   
            }
        }
       const editData = await Banner.editBannerData(bannerData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}

module.exports= {
    findOne,
    updateBanner
}