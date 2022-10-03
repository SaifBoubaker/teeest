const mongoose=require('mongoose')

const productSchema= mongoose.Schema({
    title:String,
    description:String,
    imgSrc:String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
    }
)

export default mongoose.model("Product",productSchema)