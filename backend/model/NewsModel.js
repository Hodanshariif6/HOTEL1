const mongoose = require("mongoose")

const newsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  
    desc: {
        type:String,
        required:true
    },
   
    prImage: {
        type:String,
        required:true

    }

},
{timestamps: true}
)







module.exports = mongoose.model("news", newsSchema)