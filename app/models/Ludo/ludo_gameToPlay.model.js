const sql = require("../db")

var GameToPlay = function(ludo_gametoplay){
   this.heading =  ludo_gametoplay.heading
   this.description = ludo_gametoplay.description
   this.image = ludo_gametoplay.image
}

GameToPlay.findById = (id,result)=>{
    q= "select * from ludo_gametoplay where id =?"
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


GameToPlay.editGameToPlayData = (gameToPlayData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ludo_gametoplay SET ? WHERE id='${id}'`,gameToPlayData, (err,res) => {
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

module.exports = GameToPlay