const Ourgames = require("../../app/models/ZupeeHome/ourGames.model")
const saveOurGames = async(req,res)=>{
    try{
        name = req.body.name
        let games
        if(req.file){
             games ={
                gameImage :req.file.filename,
                name : req.body.name
            }
        }else{
             games =  {
                gameImage:'',
                name:req.body.name
            }
        }
        const saveData = await Ourgames.saveOurGames(games)
        if(saveData){
            res.status(200).json({message:'ourgames data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const getOurGamesList = (req,res)=>{
    Ourgames.getAllOurGames((err,result)=>{
        if(err) res.send(err);
        res.send(result)
    })
}


const findOneOurGames = (req,res) =>{
    id = req.params.id
    Ourgames.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    gameImage: row.gameImage,
                    name: row.name,
                }
                res.json(jsonObject)
            }else{
                res.send({message:"ourgames Data not found"})
            }
        }
    })
}

const updateOurGames = async(req,res)=>{
    try{
        id = req.body.id
        let ourGamesData;
        if(req.file){
            ourGamesData = {
                id: req.body.id,
                gameImage: req.file.filename,
                name: req.body.name,
            }
        }else{
            ourGamesData={
                id: req.body.id,
                gameImage: req.body.image,
                name: req.body.name,  
            }
        }
       const editData = await Ourgames.editOurGamesData(ourGamesData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}


const deleteOurGames = (req,res) =>{
    id = req.params.id
    Ourgames.removeOurGames(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message: "our games is deleted"})
        }
    })
}


module.exports = {
    saveOurGames,
    getOurGamesList,
    findOneOurGames,
    updateOurGames,
    deleteOurGames
}