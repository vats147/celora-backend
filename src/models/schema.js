    // schema.js
    const schemas = {
    
        "data" :{
            dataId : { type: String },
            title: { type: String },
            summray: { type: String },
            Participants : [{ type : String }],
            date : { type :String },
            tags : [ { type : String }],
            link : { type :String },
            createdOn: { type: String,default :Date.now() },
        
        },
        "blog" :{
            title  : { type :String },
            description : { type : String}
        },
        "signup": {
            name: { type: String },
            email: { type: String, unique: true, required: true },
            password: { type: String, required: true },
        },
        "login": {
            email: { type: String, required: true },
            password: { type: String, required: true },
        },
        "contactus" :{
            name: { type: String }, // Full Name
            email: { type: String }, // Email Address
            phone: { type: String }, // Phone Number
            subject: { type: String }, // Subject of the message
            message: { type: String }, // Message content
            createdOn: { type: Date, default: Date.now }, // Timestamp of submission
        }
        // Add more schemas as needed
    };

    module.exports = schemas;