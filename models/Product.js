const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:["veg", "non-veg"]
            }
        ]
    },
    image:{
        type:String
    },
    bestSeller:{
        type:String
    },
    description:{
        type:String
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product