const { Router } = require("express");
const { userGet, usersGet, userDelete } = require("../controller/user");
const { Auth } = require("../middleware/Auth");
const router = Router();

router.get("/api/v1/user", Auth, userGet); 

router.get("/api/v1/users", Auth, usersGet);
 
router.delete("/api/v1/user", Auth, userDelete);

module.exports = router;