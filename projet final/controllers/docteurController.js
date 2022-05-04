const Docteur = require ("../models/Docteur")
const Apifeatures = require ("../utils/apifeatures")

//créer un nouveau docteur dans la db
exports.createDocteur = async(req,res) => { 
    try {
        const newdocteur = await Docteur.create(req.body)
        res.status(200).json(
            {newdocteur}
        )
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
//récupérer tous les docteurs dans la db puis aff nbr
exports.getALLDocteurs= async (req,res) => {
    try{
        const apiFeatured = new Apifeatures(Docteur.find(),req.query).search().filtrer()
        const docteurs = await apiFeatured.query
        const nombredocteurs = await Docteur.countDocuments()
        res.status(200).json({
            docteurs,
            nombredocteurs:nombredocteurs
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}
//récupérer les données (ID)//
exports.getDocteur = async (req,res) => {
    try{
        const docteur = await Docteur.findById(req.params.id) //params :récupérer des données sur les liens//
        res.status(200).json({
            docteur
        })
    }
    catch(err)
    {
        res.status(200).json(err)

    }
}
//modifier un docteur ID//
exports.updateDocteur = async (req,res) =>{
    try{
          const docteurs = await Docteur.findByIdAndUpdate(req.params.id,req.body,
            {
              new: true,
              runValidators:true,
              useFindAndModify:false
            })
            res.status(200).json({
                docteurs
            })
        }
    catch(err)
    {
        res.status(500).json(err)
    }
}
//supp un doc ID//
exports.deleteDocteur = async (req,res) => {
    try{
        const docteur = await Docteur.findById(req.params.id)
        await docteur.remove()
        res.status(200).json({
            message:"opération réussie"
        })
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

