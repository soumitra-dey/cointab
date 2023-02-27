const { Schema, model } = require("mongoose");


const userSchema = new Schema(
    {
        name: {
            type:Object
        },
        gender:{
            type:String
        },
        location: {
            street: {
                type:Object
            },
            city: {
                type:String
            },
            state: {
                type:String
            },
            country: {
                type:String
            },
            postcode: {
                type:String
            },
            coordinates: {
                type:Object
            },
            timezone: {
                type:Object
            }
        },
        email: {
            type:String
        },
        login: {
            type:Object
        },
        dob: {
            type:Object
        },
        registered: {
            type:Object
        },
        phone: {
            type:String
        },
        cell: {
            type:String
        },
        picture: {
            type:Object
        },
        nat: String

    }
)


const userModel = model('loginuser', userSchema);

module.exports = userModel;