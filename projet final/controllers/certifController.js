const { useColors } = require("debug/src/browser")
const Certif = require ("../models/Certif")
const Docteur = require ("../models/Docteur")
const Medicament = require ("../models/Medicament")
const Apifeatures = require ("../utils/apifeatures")


//créer un nouveauc certif dans la db
exports.createCertif = async(req,res) => { 
    const medicaments = [] //un tableau medicaments //
    try {
        const allMedicaments = await Medicament.find()  //va contenir tous les médicaments de db//
        const docteur = await Docteur.findOne({nom:req.body.docteur}) //rech doc par nom
        for(let i = 0; i<req.body.listemedicaments.length;i++)
        {
            for (let j =0;j<allMedicaments.length;j++)
            {
                if(req.body.listemedicaments[i].nom === allMedicaments[j].nom)
                {
                    medicaments.push(allMedicaments[j]) //ajouter un element à un tableau
                }
            }

        }
        if(medicaments.length !== req.body.listemedicaments.length)
        {
            return res.status(400).json( {msg:"vous avez entré certains médicament qui ne sont pas enregistrés dans la base de données"})
        }
        if(!docteur) 
        { 
            return res.status(400).json({msg:req.body.docteur+ " ne figure pas parmis les docteurs enregistrés dans la base de données"})
        }
        const certif = await Certif.create(req.body)
        res.status(200).json(
            { 
                certif,
                medicaments
            }
        )
    }
    catch(err)
    { 
        res.status(500).json(err)
    }
}
//récupérer tous les certifs dans la db puis aff nbr
exports.getALLCertifs= async (req,res) => {
    try{
        const apiFeatured = new Apifeatures(Certif.find(),req.query).search()
        const certifs = await apiFeatured.query
        const nombrecertifs = await Certif.countDocuments()
        res.status(200).json({
            certifs,
            nombrecertifs:nombrecertifs
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}
//modifier un certif par ID//
exports.updateCertif = async (req,res) =>{
    try{
        if(req.body.docteur)
        {
        const docteur = await Docteur.findOne({nom:req.body.docteur}) //rech doc par nom
        if(!docteur)
        {
            return res.status(400).json({msg:req.body.docteur+ "ne figure pas dans la liste des docteurs "})
        }
        }
    if(req.body.listemedicaments)
     {
            allMedicaments = await Medicament.find()
            for(let i = 0; i<certif.listemedicaments.length;i++)
            {
               for (let j =0;j<allMedicaments.length;j++)
               {
                if(certif.listemedicaments[i].nom === allMedicaments[j].nom)
                {
                    medicaments.push(allMedicaments[j]) //ajouter un element à un tableau
                }
            }

        }
        if(medicaments.length !== req.body.listemedicaments.length)
        {
            return res.status(400).json( {msg:"vous avez entré certains médicament qui ne sont pas enregistrés dans la base de données"})
        }
    }
        const certifs = await Certif.findByIdAndUpdate(req.params.id,req.body,
            {
              new: true,
              runValidators:true,
              useFindAndModify:false
            })
            res.status(200).json({
                certifs
            })
        }
    catch(err)
    {
        res.status(500).json(err)
    }
}

//supp un certif ID//
exports.deleteCertif = async (req,res) => {
    try{
        const certif = await Certif.findById(req.params.id)
        await certif.remove()
        res.status(200).json({
            message:"opération réussie"
        })
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
 //Get certif de db id
 exports.getCertif = async (req,res) => {
     const medicaments = []
     try {
         const allMedicaments = await Medicament.find()
         const certif = await Certif.findById(req.params.id)
         for(let i =0; i<certif.listemedicaments.length;i++)
            {
                for (let j =0;j<allMedicaments.length;j++)
                {
                    if(certif.listemedicaments[i].nom === allMedicaments[j].nom)
                    {
                        medicaments.push(allMedicaments[j]) //ajouter un element à un tableau
                    }
                }
            }
            res.status(200).json({
                certif,
                medicaments
            })
        }
        catch(err)
    {
        res.status(500).json(err)
    }
}
 //Get certif stat monthly
 exports.getStats = async (req,res) => {
     try
     {
         const data = await Certif.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            }, 
         ]);
    res.status(200).json(data)
} 
       catch(err)
   {
     json(err)
   }
}



