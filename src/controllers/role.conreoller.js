const roleModule = require("../models/role.model");

async function getAllRole(req,res) {
    
   try{
        const result = await roleModule.getAllRole()
        return res.status(200).json(result)
   }catch(err){
    return res.status(500).json({err})
   }

}

async function getRolesById(req,res) {
    const {id} = req.params
    try{

        if(!id){
            return res.status(404).json("mess:id requnred ")
        }
         const result = await getRolesById({id})

         if(!result.rowsAffected[0]){
            return res.status(404).json({mess:"id invalida "})
         }

         return res.status(200).json(result)
    }catch(err){
     return res.status(500).json({err})
    }
 
 }

 async function addNewRoles(req,res) {
    const body = req.params
    try{
         const result = await roleModule.addNewRoles(body);

         if(!result.rowsAffected[0]){
            return res.status(404).json({mess:"id invalida "})
         }

         return res.status(200).json(result)
    }catch(err){
     return res.status(500).json({err})
    }
 }

 async function deleteRoles(req,res) {
    const {id} = req.params
   
    try{
        if(!id){
            return res.status(404).json("mess:id requnred ")
        }

         const result = await roleModule.deleteRoles({id});

         if(!result.rowsAffected[0]){
            return res.status(404).json({mess:"id invalida "})
         }

         return res.status(200).json(result)
    }catch(err){
     return res.status(500).json({err})
    }
 }

 async function updateRoles(req,res) {
    const body = req.body
   
    try{
       
        
         const result = await roleModule.updateRoles(body);

         if(!result.rowsAffected[0]){
            return res.status(404).json("mess:id invalida ")
         }

         return res.status(200).json(result)
    }catch(err){
     return res.status(500).json({err})
    }
 }

 module.exports ={
    getAllRole,
getRolesById,
addNewRoles,
deleteRoles,
updateRoles,
 }