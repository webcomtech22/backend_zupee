const sql = require("../db")

var GameChange = function(abt_gamechanger){
    this.heading = abt_gamechanger.heading
    this.image1 = abt_gamechanger.image1
    this.image2 = abt_gamechanger.image2
    this.image3 = abt_gamechanger.image3
    this.image4 = abt_gamechanger.image4
    this.image5 = abt_gamechanger.image5
}

GameChange.findById = (id,result)=>{
    q= "select * from abt_gamechanger where id =?"
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

GameChange.editGameChangeData = (gameChangeData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_gamechanger SET ? WHERE id='${id}'`,gameChangeData, (err,res) => {
                if(!err){
                    resolve(res)
                }else{
                    reject(err)
                }
            })
        });
        return result
    }catch(err){
        console.log("error while updating",err)
    }
}


module.exports = GameChange;