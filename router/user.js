const { Router } = require("express");
const { userGet, usersGet } = require("../controller/user");
const { Auth } = require("../middleware/Auth");
const router = Router();

router.get("/user", Auth, userGet);
router.get("/users", Auth, usersGet);

module.exports = router;