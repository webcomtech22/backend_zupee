const LudoSteps = require("../../app/models/Ludo/ludo_steps.model")

const findAll = (req,res)=>{
    LudoSteps.getAllSteps((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id
    LudoSteps.findById(id,(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            if(rows){
                const jsonObject={
                    id:rows.id,
                    steps: rows.steps,
                    heading:rows.heading,
                    image:rows.image
               }
                res.send(jsonObject)
            }else{
                res.send({mesaage:"ludo steps data not found"})
            }
        }

    })
}

const ludo_updateSteps = async(req,res)=>{
    try{
        id= req.body.id
        let ludoStepsData;
        if(req.file){
            ludoStepsData={
                steps: req.body.steps,
                heading: req.body.heading,
                image: req.file.filename
            }
        }else{
            ludoStepsData={
                steps: req.body.steps,
                heading: req.body.heading,
                image: req.body.image
            }           
        }
        const editData = await LudoSteps.editLudoStepsData(ludoStepsData,id)
    
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid ludo steps Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const ludo_saveSteps = async(req,res)=>{
    try{
        
        let ludoStepsData
        if(req.file){
             ludoStepsData ={
                steps: req.body.steps,
                heading: req.body.heading,
                image: req.file.filename
            }
        }else{
             ludoStepsData =  {
                steps: req.body.steps,
                heading: req.body.heading,
                image: ''
            }
        }
        const saveData = await LudoSteps.saveLudoStepsData(ludoStepsData)
        if(saveData){
            res.status(200).json({message:'ludo steps data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const ludo_deleteSteps = (req,res) =>{
    id = req.params.id
    LudoSteps.removeLudoSteps(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "ludo steps is deleted"})
        }
    })
}


module.exports = {
    findAll,
    findOne,
    ludo_updateSteps,
    ludo_saveSteps,
    ludo_deleteSteps
}