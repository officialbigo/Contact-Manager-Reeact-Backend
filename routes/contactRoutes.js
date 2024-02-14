const express = require("express");

const router = express.Router();
const {
  postContact,
  getAllContacts,
  // getContactById,
  updateContactById,
  deleteContactById,
  // deleteAllContacts,
} = require(`../controllers/contactController`);
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router
  .route(`/`)
  .get(getAllContacts)
  // .delete(deleteAllContacts) // not needed
  .post(postContact);

router
  .route(`/:id`)
  // .get(getContactById) // not needed
  .put(updateContactById)
  .delete(deleteContactById);

module.exports = router;
