const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
        name: {type:String, required:[true, "Please add contact name"]},
        email: {type:String, required:[true, "Please add email address"]},
        phone: {type:Number, required:[true, "Please add phone number"]}

    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Contact', contactSchema);

//Contact is going to be my model name/collection name
//plural and small case letters of this will appear in collections (automaticallyyy)