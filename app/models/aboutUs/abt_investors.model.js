const sql = require("../db")

var Investors = function(abt_investors){
    this.image = abt_investors.image
}

Investors.findById = (id,result)=>{
    q= "select * from abt_investors where id =?"
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

Investors.editInvestorsData = (investorsData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_investors SET ? WHERE id='${id}'`,investorsData, (err,res) => {
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


module.exports = Investors