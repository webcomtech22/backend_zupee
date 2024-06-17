const Banner = require("../../app/models/Ludo/ludo_banner.model")

const findOne = (req,res)=>{
    id = req.params.id;
    Banner.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id: row.id,
                    bigImage: row.bigImage,
                    heading: row.heading,
                    description: row.description,
                    smallImage: row.smallImage
                }
                res.json(jsonObject)
            }else{
                res.send({message:"ludo BannerData not found"})
            }
        }
    })
}

const ludo_updateBanner = async(req,res)=>{
    try{
        id= req.body.id
        bigImage = req.body.image
        heading = req.body.heading
        description = req.body.description
        smallImage = req.body.smallImage

        let bannerData
        if(req.files){
            if(req.files['bigImage'] && req.files['bigImage'].length>0){
                bigImage = req.files['bigImage'][0].filename
            }
            if(req.files['smallImage'] && req.files['smallImage'].length>0){
                smallImage = req.files['smallImage'][0].filename
            }
               
            bannerData = {
                bigImage: bigImage,
                heading:heading,
                description: description,
                smallImage: smallImage
            }
        }else
        {
            bannerData={
                bigImage: bigImage,
                heading:heading,
                description: description,
                smallImage: smallImage
            }
        }
        const editData = await Banner.editLudoBannerData(bannerData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid ludo banner Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}


module.exports = {
    findOne,
    ludo_updateBanner
}
