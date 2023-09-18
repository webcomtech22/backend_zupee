const sql = require("../db")

var InvestJourney = function(abt_investjourney){
    this.heading = abt_investjourney.heading
    this.image = abt_investjourney.image
}

InvestJourney.findById = (id,result)=>{
    q= "select * from abt_investjourney where id =?"
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

InvestJourney.editInvestJourneyData = (investJourneyData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_investjourney SET ? WHERE id='${id}'`,investJourneyData, (err,res) => {
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

module.exports = InvestJourney