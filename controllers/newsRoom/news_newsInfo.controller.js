const NewsInfo = require("../../app/models/newsRoom/news_newsInfo.model")

const findAll = (req,res)=>{
    NewsInfo.getAllNewsInfo((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id
    NewsInfo.findById(id,(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            if(rows){
                const jsonObject={
                    id:rows.id,
                    image:rows.image,
                    heading:rows.heading,
                    date:rows.date,
                    news:rows.news,
                    post:rows.post
                }
                res.send(jsonObject)
            }else{
                res.send({mesaage:"news Info data not found"})
            }
        }

    })
}

const news_updateNewsInfo = async(req,res)=>{
    try{
        id= req.body.id
        let newsInfoData;
        if(req.file){
            newsInfoData={
                image: req.file.filename,
                heading: req.body.heading,
                date: req.body.date,
                news: req.body.news,
                post: req.body.post
            }
        }else{
            newsInfoData={
                image: req.body.image,
                heading: req.body.heading,
                date: req.body.date,
                news: req.body.news,
                post: req.body.post
            }           
        }
        const editData = await NewsInfo.editNewsInfoData(newsInfoData,id)
    
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid newsInfo Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const news_saveNewsInfo = async(req,res)=>{
    try{
        // name = req.body.filename
        // description = req.body.description
        let newsInfoData
        if(req.file){
             newsInfoData ={
                image: req.file.filename,
                heading: req.body.heading,
                date: req.body.date,
                news: req.body.news,
                post: req.body.post
            }
        }else{
             newsInfoData =  {
                image: '',
                heading: req.body.heading,
                date: req.body.date,
                news: req.body.news,
                post: req.body.post
            }
        }
        const saveData = await NewsInfo.saveNewsInfoData(newsInfoData)
        if(saveData){
            res.status(200).json({message:'newsinfo data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const news_deleteNewsInfo = (req,res) =>{
    id = req.params.id
    NewsInfo.removeNewsInfo(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "newsInfo is deleted"})
        }
    })
}

module.exports = {
    findAll,
    findOne,
    news_updateNewsInfo,
    news_saveNewsInfo,
    news_deleteNewsInfo
}