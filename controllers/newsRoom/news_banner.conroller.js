const Banner = require("../../app/models/newsRoom/news_banner.model")

const findOne = (req,res)=>{
    id = req.params.id;
    Banner.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id: row.id,
                    image: row.image
                }
                res.json(jsonObject)
            }else{
                res.send({message:"news BannerData not found"})
            }
        }
    })
}

const news_updateBanner = async(req,res)=>{
    try{
        id= req.body.id
        let bannerData

        if(req.file){
            bannerData = {
                image: req.file.filename
            }
        }else
        {
            bannerData={
                image: req.body.image
            }
        }
        const editData = await Banner.editNewsBannerData(bannerData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid news banner Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

module.exports = {
    findOne,
    news_updateBanner
}
