const sql = require("../db")

var Video = function(abt_video){
    this.video = abt_video.video
}

Video.getAllVideo = (result)=>{
    q= "select * from abt_video"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

Video.findById = (id,result)=>{
    q= "select * from abt_video where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null);
            return;
        }
        if(rows.length > 0){
            result(null,rows[0])
            return;
        }
        result({message:"not found"},null)
    })
}


Video.editVideoData = (videoData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_video SET ? WHERE id='${id}'`,videoData, (err,res) => {
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

Video.saveVideoData = async function(videoData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO abt_video SET ?',videoData,(err,res)=>{
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

Video.removeVideo = (id, result) => {
    q = "delete from abt_video where id = ?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null)
            return;
        }
         if(rows.length){
            result(null,rows)
            return;
        }
    })
}

module.exports = Video;