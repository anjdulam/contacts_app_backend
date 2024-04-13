const express = require('express');
const router = express.Router();
const {getContacts,getContact, createContact, updateContact, deleteContact} = require ("../controllers/contactController")


//instead of app.get('/',(req,res)=>{} )

//get 
router.route("/").get(getContacts);

//get for indv contact by id
router.route("/:id").get(getContact);

//post
router.route("/").post(createContact);

//put
router.route("/:id").put(updateContact);

//delete
router.route("/:id").delete(deleteContact);


module.exports = router; 