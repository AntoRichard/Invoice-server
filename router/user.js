const { Router } = require("express");
const { userGet, usersGet, userDelete } = require("../controller/user");
const { Auth } = require("../middleware/Auth");
const router = Router();

router.get("/user", Auth, userGet); 

router.get("/users", Auth, usersGet);
 
router.delete("/user", Auth, userDelete);

module.exports = router;