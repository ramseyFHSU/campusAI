const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const c = require("../controllers/storyController");

router.get("/", c.list);
router.get("/mine/list", auth, c.myStories);

router.post("/:id/comments", auth, c.addComment);

router.get("/:id", c.getOne);
router.post("/", auth, upload.single("media"), c.create);
router.put("/:id", auth, upload.single("media"), c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;
