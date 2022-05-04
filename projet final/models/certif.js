const mongoose = require("mongoose") 
const certifSchema = mongoose.Schema (
 {
   dateconsultation : { 
        type:String,
        required:true
    },
    listemedicaments:[
        { 
            nom : { 
                type:String,
                required:true,
            },
        }
    ] 
    ,
    docteur: {
        type:String,
        required:true,
    },
    
}, {timestamps:true})
module.exports = mongoose.model("Certif",certifSchema)