const router = require("express").Router() //call it as a function //
const { createDocteur } = require("../controllers/docteurController")
const { getALLDocteurs } = require("../controllers/docteurController")
const { getDocteur } = require("../controllers/docteurController")
const { updateDocteur } = require("../controllers/docteurController")
const { deleteDocteur } = require("../controllers/docteurController")




router.route("/docteur/nouveau").post(createDocteur)
router.route("/docteur/all").get(getALLDocteurs)
router.route("/docteur/:id").get(getDocteur)
router.route("/docteur/modifier/:id").put(updateDocteur)
router.route("/docteur/:id").delete(deleteDocteur)




module.exports = router