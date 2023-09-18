const sql = require("../db")

var WhoWeAre = function(abt_whoweare){
    this.heading = abt_whoweare.heading
    this.description = abt_whoweare.description
    this.image = abt_whoweare.image
}

WhoWeAre.findById = (id,result)=>{
    q= "select * from abt_whoweare where id =?"
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

WhoWeAre.editWhoWeAreData = (whoWeAreData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_whoweare SET ? WHERE id='${id}'`,whoWeAreData, (err,res) => {
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

module.exports = WhoWeAre;