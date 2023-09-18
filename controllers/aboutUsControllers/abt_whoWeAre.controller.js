const WhoWeAre = require("../../app/models/aboutUs/abt_whoWeAre.model")

const findOne = (req,res)=>{
    id = req.params.id;
    WhoWeAre.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id:row.id,
                    heading: row.heading,
                    description: row.description,
                    image: row.image
                }
                res.json(jsonObject)
            }else{
                res.send({message:"whoweare data not found"})
            }
        }
    })
}

const abt_updateWhoWeAre = async(req,res)=>{
    try{
        id= req.body.id
        let whoWeAreData
        if(req.file){
            whoWeAreData = {
                image: req.file.filename,
                heading: req.body.heading,
                description: req.body.description
            }
        }else
        {
            whoWeAreData={
                image: req.body.image,
                heading: req.body.heading,
                description: req.body.description
            }
        }
        const editData = await WhoWeAre.editWhoWeAreData(whoWeAreData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid whoWeAre Data"})

        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

module.exports = {
    findOne,
    abt_updateWhoWeAre
}