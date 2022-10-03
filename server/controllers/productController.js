const Product = require ('../models/product')

//CRUD 
//Add New PRODUCT

const AddProducts = async(req,res)=>{
    try {
    const NEwpROD = new Product(req.body)
    const addedProd = await NEwpROD.save()
    res.json(addedProd)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

//Get Products 

const GetProducts = async(req,res)=>{
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

//update products

const UpdatedProducts= async(req,res)=>{
    try {
        const UpdatProducts = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(UpdatProducts)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

//Delete Product

const DeleteProducts = async(req,res)=>{
    try {
        const DeletProd = await Product.findByIdAndDelete(req.params.id)
        res.json({msg:'The product is deleted',DeletProd})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}







module.exports={AddProducts,GetProducts,UpdatedProducts,DeleteProducts}