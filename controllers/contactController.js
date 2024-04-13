const asyncHandler = require("express-async-handler");  //no need to write try catch blocks  in every route



//@desc Get all contacts
//@route GET /api/contacts
//@access public 
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({"message": "get all contacts"});   //->just to display a lot msg to check if server is working
    
}); 

//@desc Get contact
//@route GET /api/contacts/:id
//@access public 
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({"message": "get contact"});

});

//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log("request body:", req.body);
    // Destructuring it 
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400).json({error: 'Please provide name, email, and phone!'});
    }
    res.status(201);
    res.json({"message": "create contact"});
});

//@desc Update contact
//@route PUT /api/contacts/:id 
//@access public
const updateContact = asyncHandler(async (req, res) => {
   
    res.status(200).json({"message": `update contact for ${req.params.id}`});
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({"message": `delete contact for ${req.params.id}`});
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
