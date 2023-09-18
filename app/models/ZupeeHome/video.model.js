const sql = require('../db')

var Video = function(video){
   this.heading = video.heading
   this.video = video.video
}

Video.findById = (id, result) => {
q = "select * from video where id = ?"
sql.query(q,id,(err,rows)=>{
    if(err){
        result(err,null)
        return;
    }
     if(rows.length > 0){
        result(null,rows[0])
        return;
    }
    result({message:"not found"},null)
})
}

Video.editVideoData = (videoData,id) => {
try{
    let result = new Promise((resolve,reject)=>{
        sql.query(`UPDATE video SET ? WHERE id='${id}'`,videoData, (err,res) => {
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


module.exports = Video
