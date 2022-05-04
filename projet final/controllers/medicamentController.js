const Medicament = require ("../models/Medicament")
const Apifeatures = require ("../utils/apifeatures")

//créer un nouveauc medicament dans la db
exports.createMedicament = async(req,res) => { 
    try {
        const newmedicament = await Medicament.create(req.body)
        res.status(200).json(
            {newmedicament}
        )
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
//récupérer tous les medicament dans la db puis aff nbr
exports.getALLMedicaments= async (req,res) => {
    try{
        const apiFeatured = new Apifeatures(Medicament.find(),req.query).search()
        const medicaments = await apiFeatured.query
        const nombremedicaments = await Medicament.countDocuments()
        res.status(200).json({
            medicaments,
            nombremedicaments:nombremedicaments
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}
//récupérer les données (ID)//
exports.getMedicament = async (req,res) => {
    try{
        const medicament = await Medicament.findById(req.params.id) //params :récupérer des données sur les liens//
        res.status(200).json({
            medicament
        })
    }
    catch(err)
    {
        res.status(200).json(err)

    }
}
//modifier un medicament ID//
exports.updateMedicament = async (req,res) =>{
    try{
          const medicaments = await Medicament.findByIdAndUpdate(req.params.id,req.body,
            {
              new: true,
              runValidators:true,
              useFindAndModify:false
            })
            res.status(200).json({
                medicaments
            })
        }
    catch(err)
    {
        res.status(500).json(err)
    }
}
//supp un med ID//
exports.deleteMedicament = async (req,res) => {
    try{
        const medicament = await Medicament.findById(req.params.id)
        await medicament.remove()
        res.status(200).json({
            message:"opération réussie"
        })
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}