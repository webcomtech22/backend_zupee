const MoneyGames = require("../../app/models/ZupeeHome/moneyImage.model")


const saveMoneyGames = async(req,res)=>{
    try{
        let moneyData
        if(req.file){
             moneyData ={
                moneyImage :req.file.filename,
            }
        }else{
             moneyData =  {
                moneyImage:'',
            }
        }
        const saveData = await MoneyGames.saveMoneyGames(moneyData)
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

const getMoneyGamesList = (req,res)=>{
    MoneyGames.getAllMoneyGames((err,result)=>{
        if(err) res.send(err)
        res.send(result)
    })
}

const findOneMoneyGame = (req,res) =>{
    id = req.params.id
    MoneyGames.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    moneyImage: row.moneyImage,
                }
                res.json(jsonObject)
            }else{
                res.send({message:"moneyGames Data not found"})
            }
        }
    })
}

const updateMoneyGames = async(req,res)=>{
    try{
        id = req.body.id
        let moneyGamesData;
        if(req.file){
            moneyGamesData = {
                id: req.body.id,
                moneyImage: req.file.filename,
            }
        }else{
            moneyGamesData={
                id: req.body.id,
                moneyImage: req.body.image,
            }
        }
       const editData = await MoneyGames.editMoneyGamesData(moneyGamesData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}

const deleteMoneyGames = (req,res) =>{
    id = req.params.id
    MoneyGames.removeMoneyGames(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message: "money games is deleted"})
        }
    })
}

module.exports= {
    saveMoneyGames,
    getMoneyGamesList,
    findOneMoneyGame,
    updateMoneyGames,
    deleteMoneyGames
}