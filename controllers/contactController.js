const asyncHandler = require("express-async-handler");  //no need to write try catch blocks  in every route
const Contact = require('../models/contactModel')


//@desc Get all contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async (req, res) => {
    // res.status(200).json({"message": "get all contacts"});   //->just to display a lot msg to check if server is working

    //using mongo
    const contacts = await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts);

});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private 
const getContact = asyncHandler(async (req, res) => {
    //res.status(200).json({ "message": "get contact" });

    //uisng mongo 
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");   
    }
    res.status(200).json(contact);


});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("request body:", req.body);
    // Destructuring it 
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).json({ error: 'Please provide name, email, and phone!' });
    }

    //res.status(201).json({ "message": "create contact" });

    //using mongo 
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");   
    }
    res.status(201).json(contact);


});

//@desc Update contact
//@route PUT /api/contacts/:id 
//@access private
const updateContact = asyncHandler(async (req, res) => {

    //res.status(200).json({ "message": `update contact for ${req.params.id}` });

    //using mongo 
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");   
    }
    

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }


    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,  //new body 
        {new:true}  //query option
    );
    res.status(200).json(updatedContact);
    
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    //res.status(200).json({ "message": `delete contact for ${req.params.id}` });

    //using mongo 
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");   
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }

   await Contact.deleteOne({_id:req.params.id});
   res.status(200).json(contact);

});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
