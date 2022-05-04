const mongoose = require("mongoose") 
const docteurSchema = mongoose.Schema ({  //how that post look ,describe data //
    nom : { 
        type:String,
        required:[true, "veillez entrer un nom"],
    },
    prenom : { 
        type:String,
        required:[true, "veillez entrer un prenom"],
    },
    email : { 
        type:String,
        required:[true, "veillez entrer un email"],
        unique:true // un email unique
    },
    specialite : { 
        type:String,
        required:[true, "veillez entrer une specialite"],
    },
    adresse : { 
        type:String,
        required:[true, "veillez entrer une adresse"],
    },
    phone : { 
        type:String,
        required:[true, "veillez entrer un phone numbre"],
    },
    createdAt : 
    { 
        type:Date,
        default : Date.now
    },
    
})
    module.exports = mongoose.model("Docteur",docteurSchema)