const sql = require("../db")

var LudoSteps = function(ludo_steps){
    this.steps = ludo_steps.steps
    this.heading = ludo_steps.heading
    this.image = ludo_reviews.image
}

LudoSteps.getAllSteps = (result)=>{
    q = "select * from ludo_steps"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

LudoSteps.findById = (id,result)=>{
    q= "select * from ludo_steps where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
           result(err,null)
           return;
        }
        result(null,rows[0])
        return;
    })
}

LudoSteps.editLudoStepsData = (ludoStepsData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ludo_steps SET ? WHERE id='${id}'`,ludoStepsData,(err,res)=>{
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

LudoSteps.saveLudoStepsData = async function(ludoStepsData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO ludo_steps SET ?',ludoStepsData,(err,res)=>{
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

LudoSteps.removeLudoSteps = (id, result) => {
    q = "delete from ludo_steps where id = ?"
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



module.exports = LudoSteps;