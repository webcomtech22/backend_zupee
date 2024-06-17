const sql = require("../db")

var BlogInfo = function(blog_info){
    this.image = blog_info.image,
    this.heading = blog_info.heading,
    this.dateName = blog_info.dateName,
    this.description = blog_info.description
}

BlogInfo.getAllBlogInfo = (result)=>{
    q = "select * from blog_info"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

BlogInfo.findById = (id,result)=>{
    q= "select * from blog_info where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
           result(err,null)
           return;
        }
        result(null,rows[0])
        return;
    })
}

BlogInfo.editBlogInfoData = (blogInfoData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE blog_info SET ? WHERE id='${id}'`,blogInfoData,(err,res)=>{
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

BlogInfo.saveBlogInfoData = async function(blogInfoData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO blog_info SET ?',blogInfoData,(err,res)=>{
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

BlogInfo.removeBlogInfo = (id, result) => {
    q = "delete from blog_info where id = ?"
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
module.exports = BlogInfo