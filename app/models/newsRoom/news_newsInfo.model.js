const sql = require("../db")

var NewsInfo = function(news_info){
    this.image = news_info.image
    this.heading = news_info.heading
    this.date = news_info.date
    this.news = news_info.news
    this.post = news_info.post    
}

NewsInfo.getAllNewsInfo = (result)=>{
    q= "select * from news_info"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

NewsInfo.findById = (id,result)=>{
    q= "select * from news_info where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
           result(err,null)
           return;
        }
        result(null,rows[0])
        return;
    })
}

NewsInfo.editNewsInfoData = (newsInfoData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE news_info SET ? WHERE id='${id}'`,newsInfoData,(err,res)=>{
                if(!err){
                    resolve(res)
                }else{
                    reject(err)
                }
            })
        });
        return result
    }catch(err){
        console.log("error while updating")
    }
}

NewsInfo.saveNewsInfoData = async function(newsInfoData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO news_info SET ?',newsInfoData,(err,res)=>{
            if(!err){
                resolve(res);
            }else{
                console.error('Error executing SQL query:', err.sql);
                console.error('Error message:', err.message);
                reject(err);
            }
        });
    })
    return result;

    }catch(err){
        console.log(err)
    }   
}

NewsInfo.removeNewsInfo = (id, result) => {
    q = "delete from news_info where id = ?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null)
            return;
        }
         if(rows.length){
            result(null,rows)
            return;
        }
        result({message:"not found"},null)
    })
}

module.exports = NewsInfo;