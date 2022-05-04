const mongoose = require("mongoose") 
const medicamentSchema = mongoose.Schema ({
    nom : { 
        type:String,
        required:[true, "veillez entrer un nom de médicament"],
    },
    description : { 
        type:String,
        required:[true, "veillez entrer une description"],
    },
    quantite : { 
        type:Number,
        required:[true, "veillez entrer un nombre de comprimé"],
    },
    heuresdeprise :[
        {
         heure:{ 
        type:String,
        }
    }
    
    ] //un tableau de une ou plusieurs heures

})
module.exports = mongoose.model("Medicaments",medicamentSchema)