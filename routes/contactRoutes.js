const express = require('express');
const router = express.Router();
const {getContacts,getContact, createContact, updateContact, deleteContact} = require ("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');


// //instead of app.get('/',(req,res)=>{} )


// //get 
// router.route("/").get(getContacts);

// //get for indv contact by id
// router.route("/:id").get(getContact);

// //post
// router.route("/").post(createContact);

// //put
// router.route("/:id").put(updateContact);

// //delete
// router.route("/:id").delete(deleteContact);

// router.use(validateToken);
// module.exports = router; 


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;