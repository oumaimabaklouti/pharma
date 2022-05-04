const router = require("express").Router() //call it as a function //
const { createCertif } = require("../controllers/certifController")
const { getALLCertifs } = require("../controllers/certifController")
const { updateCertif } = require("../controllers/certifController")
const { deleteCertif } = require("../controllers/certifController")
const { getCertif } = require("../controllers/certifController")
const { getStats } = require("../controllers/certifController")



router.route("/certif/nouveau").post(createCertif)
router.route("/certif/all").get(getALLCertifs)
router.route("/certif/stats").get(getStats)
router.route("/certif/modifier/:id").put(updateCertif)
router.route("/certif/:id").delete(deleteCertif)
router.route("/certif/:id").get(getCertif)


module.exports = router