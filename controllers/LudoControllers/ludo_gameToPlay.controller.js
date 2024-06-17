const GameToPlay = require("../../app/models/Ludo/ludo_gameToPlay.model")

const findOne = (req,res)=>{
    id = req.params.id;
    GameToPlay.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id: row.id,
                    heading: row.heading,
                    description: row.description,
                    image: row.image
                }
                res.json(jsonObject)
            }else{
                res.send({message:"ludo gametoplay Data not found"})
            }
        }
    })
}

const ludo_updateGameToPlay = async(req,res)=>{
    try{
        id= req.body.id
        let gameData

        if(req.file){
            gameData = {
                image: req.file.filename,
                heading: req.body.heading,
                description:req.body.description
            }
        }else
        {
            gameData={
                image: req.body.image,
                heading: req.body.heading,
                description:req.body.description
            }
        }
        const editData = await GameToPlay.editGameToPlayData(gameData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid ludo game to play Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

module.exports = {
    findOne,
    ludo_updateGameToPlay
}
