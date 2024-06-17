const sql = require("../db")

var LudoQueAns = function(ludo_queans){
    this.question = ludo_queans.question
    this.answer = ludo_queans.answer
}

LudoQueAns.getAllQueAns = (result)=>{
    q = "select * from ludo_queans"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

LudoQueAns.findById = (id,result)=>{
    q= "select * from ludo_queans where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
           result(err,null)
           return;
        }
        result(null,rows[0])
        return;
    })
}

LudoQueAns.editQueAnsData = (queAnsData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ludo_queans SET ? WHERE id='${id}'`,queAnsData,(err,res)=>{
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

LudoQueAns.saveQueAnsData = async function(queAnsData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO ludo_queans SET ?',queAnsData,(err,res)=>{
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

LudoQueAns.removeQueAns = (id, result) => {
    q = "delete from ludo_queans where id = ?"
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


module.exports = LudoQueAns;