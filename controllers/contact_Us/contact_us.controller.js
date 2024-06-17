const ContactUs = require("../../app/models/contact_Us/contact_us.model")

const findAll = (req,res)=>{
    ContactUs.getAllContacts((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const saveContacts = async(req,res)=>{
    try{
        let contactData

             contactData =  {
                name: req.body.name,
                phoneNo: req.body.phoneNo,
                email: req.body.email,
                subject: req.body.subject,
                query: req.body.query                
            }
        
        const saveData = await ContactUs.saveContactData(contactData)
        if(saveData){
            res.status(200).json({message:'contact data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}


const deleteContact = (req,res) =>{
    id = req.params.id
    ContactUs.removeContact(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "contact is deleted"})
        }
    })
}

module.exports = {
    findAll,
    saveContacts,
    deleteContact
}