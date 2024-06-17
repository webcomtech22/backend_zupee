const sql = require("../db")

var BlogRecentPost = function(blog_recentpost){
    this.post = blog_recentpost.post
}

BlogRecentPost.getAllBlogPosts = (result)=>{
    q = "select * from blog_recentposts"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

BlogRecentPost.findById = (id,result)=>{
    q= "select * from blog_recentposts where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
           result(err,null)
           return;
        }
        result(null,rows[0])
        return;
    })
}

BlogRecentPost.editBlogRecentPost = (recentPostData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE blog_recentposts SET ? WHERE id='${id}'`,recentPostData,(err,res)=>{
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

BlogRecentPost.saveBlogRecentPost = async function(recentPostData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO blog_recentposts SET ?',recentPostData,(err,res)=>{
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

BlogRecentPost.removeBlogRecentPost = (id, result) => {
    q = "delete from blog_recentposts where id = ?"
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

module.exports = BlogRecentPost