const sql = require('../db')

var ZupeeMember = function(zupeemember){
   this.image = zupeemember.image
}

ZupeeMember.saveMemberData = async function(memberData){
        try{    
            let result =await new Promise((resolve,reject)=>{
            sql.query('INSERT INTO zupeemember SET ?',memberData,(err,res)=>{
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

ZupeeMember.getAllMemberData = (result)=>{
    sql.query("SELECT * FROM zupeemember",(err,res)=>{
        if(!err){
            result(null,res);
        }else{
            console.log('Error in Fetching  Data', err);
        }
    })
}


ZupeeMember.findById = (id, result) => {
    q = "select * from zupeemember where id = ?"
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

ZupeeMember.editMemberData = (memberData,id) => {
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE zupeemember SET ? WHERE id='${id}'`,memberData, (err,res) => {
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

ZupeeMember.removeMember = (id, result) => {
    q = "delete from zupeemember where id = ?"
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


module.exports = ZupeeMember
