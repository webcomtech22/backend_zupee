const sql = require('../db')

var QueAns = function(queAns){
   this.question = queAns.question
   this.answer = queAns.answer
}

QueAns.saveQueAnsData = async function(queAnsData){
        try{    
            let result =await new Promise((resolve,reject)=>{
            sql.query('INSERT INTO que_ans SET ?',queAnsData,(err,res)=>{
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

QueAns.getAllQueAnsData = (result)=>{
    sql.query("SELECT * FROM que_ans",(err,res)=>{
        if(!err){
            result(null,res);
        }else{
            console.log('Error in Fetching  Data', err);
        }
    })
}

QueAns.findById = (id, result) => {
    q = "select * from que_ans where id = ?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null)
            return;
        }
         if(rows.length){
            result(null,rows[0])
            return;
        }
        result({message:"not found"},null)
    })
}

QueAns.editQueAnsData = (queAnsData,id) => {
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE que_Ans SET ? WHERE id='${id}'`,queAnsData, (err,res) => {
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


QueAns.removeQueAns = (id, result) => {
    q = "delete from que_ans where id = ?"
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


module.exports = QueAns;
