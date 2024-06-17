const sql = require("../db")

var ContactUs = function(contact_us){
  this.name = contact_us.name
  this.phoneNo = contact_us.phoneNo
  this.email = contact_us.email
  this.subject = contact_us.subject
  this.query = contact_us.query
}

ContactUs.getAllContacts = (result)=>{
    q = "select * from contact_us"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

ContactUs.saveContactData = async function(contactData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO contact_us SET ?',contactData,(err,res)=>{
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

ContactUs.removeContact = (id, result) => {
    q = "delete from contact_us where id = ?"
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

module.exports = ContactUs

