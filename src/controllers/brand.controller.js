const brandModel = require("../models/brand.model.js");

async function getAllBrand(req,res) {
    
    try{
         const result = await brandModel.getAllBrand()
         return res.status(200).json(result)
    }catch(err){
     return res.status(500).json({err})
    }
 
 }
 
 async function getBrandById(req,res) {
     const {id} = res.params
     try{
 
         if(!id){
             return res.status(404).json("mess:id requnred ")
         }
          const result = await brandModel.deleteBrandById({id})
 
          if(!result.rowsAffected[0]){
             return res.status(404).json("mess:id invalida ")
          }
 
          return res.status(200).json(result)
     }catch(err){
      return res.status(500).json({err})
     }
  
  }
 
  async function addNewBrands(req,res) {
     const body = req.params
     try{
          const result = await brandModel.addNewBrand(body)
 
          if(!result.rowsAffected[0]){
             return res.status(404).json("mess:id invalida ")
          }
 
          return res.status(200).json(result)
     }catch(err){
      return res.status(500).json({err})
     }
  }
 
  async function deleteBrand(req,res) {
     const {id} = req.params
    
     try{
         if(!id){
             return res.status(404).json("mess:id requnred ")
         }
 
          const result = await brandModel.deleteBrandById(id);
 
          if(!result.rowsAffected[0]){
             return res.status(404).json("mess:id invalida ")
          }
 
          return res.status(200).json(result)
     }catch(err){
      return res.status(500).json({err})
     }
  }
 
  async function updateBrand(req,res) {
     const body = req.body
    
     try{
          const result = await brandModel.updateBrand(body);
 
          if(!result.rowsAffected[0]){
             return res.status(404).json("mess:id invalida ")
          }
 
          return res.status(200).json(result)
     }catch(err){
      return res.status(500).json({err})
     }
  }

module.exports = {
    getAllBrand,
getBrandById,
addNewBrands,
deleteBrand,
updateBrand,
}