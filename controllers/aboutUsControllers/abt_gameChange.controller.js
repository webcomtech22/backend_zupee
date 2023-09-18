const GameChange = require("../../app/models/aboutUs/abt_gameChange.model")

const findOne = (req,res)=>{
    id = req.params.id;
    GameChange.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id:row.id,
                    heading: row.heading,
                    image1: row.image1,
                    image2: row.image2,
                    image3: row.image3,
                    image4: row.image4,
                    image5: row.image5
                }
                res.json(jsonObject)
            }else{
                res.send({message:"gamechange data not found"})
            }
        }
    })
}

const abt_updateGameChange = async(req,res)=>{
    try{
        id= req.body.id;
        heading=req.body.heading,
        image1= req.body.image1
        image2= req.body.image2
        image3= req.body.image3
        image4= req.body.image4
        image5= req.body.image5
        let gameChangeData;

        if(req.files){
            if(req.files['image1'] && req.files['image1'].length > 0){
                image1 = req.files['image1'][0].filename
            }
            if(req.files['image2'] && req.files['image2'].length > 0){
                image2 = req.files['image2'][0].filename
            }
            if(req.files['image3'] && req.files['image3'].length > 0){
                image3 = req.files['image3'][0].filename
            }
            if(req.files['image4'] && req.files['image4'].length > 0){
                image4 = req.files['image4'][0].filename
            }
            if(req.files['image5'] && req.files['image5'].length > 0){
                image5 = req.files['image5'][0].filename
            }

            gameChangeData ={
                id:req.body.id,
                heading:heading,
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,
                image5: image5,
            }
        }else{
            gameChangeData ={
                id:req.body.id,
                heading:heading,
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,
                image5: image5,
            }
        }
        const editData = await GameChange.editGameChangeData(gameChangeData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid gamechange Data"})

        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}


module.exports = {
    findOne,
    abt_updateGameChange
}