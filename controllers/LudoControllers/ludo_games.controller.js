const LudoGames = require("../../app/models/Ludo/ludo_games_model")

const findAll = (req,res)=>{
    LudoGames.getAllGames((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id
    LudoGames.findById(id,(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            if(rows){
                const jsonObject={
                    id:rows.id,
                    image:rows.image,
                    name:rows.name
                }
                res.send(jsonObject)
            }else{
                res.send({mesaage:"ludo games data not found"})
            }
        }

    })
}

const ludo_updateLudoGames = async(req,res)=>{
    try{
        id= req.body.id
        let ludoGamesData;
        if(req.file){
            ludoGamesData={
                image: req.file.filename,
                name: req.body.name,           
            }
        }else{
            ludoGamesData={
                image: req.body.image,
                name: req.body.name,
            }           
        }
        const editData = await LudoGames.editLudoGamesData(ludoGamesData,id)
    
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid ludogames Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const ludo_saveLudoGames = async(req,res)=>{
    try{
        let ludoGamesData
        if(req.file){
             ludoGamesData ={
                image: req.file.filename,
                name: req.body.name,
            }
        }else{
             ludoGamesData =  {
                image: '',
                name: req.body.name,
            }
        }
        const saveData = await LudoGames.saveLudoGamesData(ludoGamesData)
        if(saveData){
            res.status(200).json({message:'ludo games data added'})
        }else{
            res.status(400).json({message:'something went wrong'})
        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const ludo_deleteLudoGames = (req,res) =>{
    id = req.params.id
    LudoGames.removeLudoGames(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "ludo games is deleted"})
        }
    })
}


module.exports = {
    findAll,
    findOne,
    ludo_updateLudoGames,
    ludo_saveLudoGames,
    ludo_deleteLudoGames
}