const QueAns = require("../../app/models/ZupeeHome/queAns.model")

const saveQueAns = async(req,res)=>{
    try{
           const queAns ={
               question: req.body.question,
               answer: req.body.answer
            }
        const saveData = await QueAns.saveQueAnsData(queAns)
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

const getQueAnsList = (req,res)=>{
    QueAns.getAllQueAnsData((err,result)=>{
        if(err) res.send(err)
        res.send(result)
    })
}

const findOneQueAns = (req,res) =>{
    id = req.params.id
    QueAns.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    question: row.question,
                    answer: row.answer,
                }
                res.json(jsonObject)
            }else{
                res.send({message:"queAns Data not found"})
            }
        }
    })
}

const updateQueAns = async(req,res)=>{
    try{
        id = req.body.id
        const queAnsData ={
            id: req.body.id,
            gameImage: req.file.filename,
            name: req.body.name,
        }
        
       const editData = await QueAns.editQueAnsData(queAnsData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}

const deleteQueAns = (req,res) =>{
    id = req.params.id
    QueAns.removeQueAns(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message: "queAns is deleted"})
        }
    })
}


module.exports = { 
    saveQueAns,
    getQueAnsList,
    findOneQueAns,
    updateQueAns,
    deleteQueAns
}