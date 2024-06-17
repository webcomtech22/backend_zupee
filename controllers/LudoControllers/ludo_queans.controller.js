const LudoQueAns = require("../../app/models/Ludo/ludo_queAns.model")

const findAll = (req,res)=>{
    LudoQueAns.getAllQueAns((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id
    LudoQueAns.findById(id,(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            if(rows){
                const jsonObject={
                    id:rows.id,
                    question:rows.question,
                    answer:rows.answer
                }
                res.send(jsonObject)
            }else{
                res.send({mesaage:"que ans data not found"})
            }
        }

    })
}

const ludo_updateQueAns = async(req,res)=>{
    try{
        id= req.body.id
        let queAnsData;
        queAnsData={
                question: req.body.question,
                answer: req.body.answer
            }
        
        const editData = await LudoQueAns.editQueAnsData(queAnsData,id)
    
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid que ans Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const ludo_saveQueAns = async(req,res)=>{
    try{
        let queAnsData
        queAnsData =  {
                question: req.body.question,
                answer: req.body.answer
            }
       
        const saveData = await LudoQueAns.saveQueAnsData(queAnsData)
        if(saveData){
            res.status(200).json({message:'queAns data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const ludo_deleteQueAns = (req,res) =>{
    id = req.params.id
    LudoQueAns.removeQueAns(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "que ans is deleted"})
        }
    })
}

module.exports = {
    findAll,
    findOne,
    ludo_updateQueAns,
    ludo_saveQueAns,
    ludo_deleteQueAns
}