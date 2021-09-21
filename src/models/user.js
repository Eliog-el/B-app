const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,   // An email can't signUp twice
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{      // for tracking of user
        token: {
            type: String,
            required: true
        }
    }]
})

// a virtual property a relation between two entity(user and task)
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})  

// Hiding private data(passwords, token)
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

        delete userObject.password
        delete userObject.tokens

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    
    user.tokens = user.tokens.concat({ token })  // to add to the useer array
    await user.save()                             // saving to database
    
    return token
}

// Password storing
// userSchema.findByCredentials = async (email, password) => {
//     // console.log(password);
//     const user = await User.findOne({ email })
    

//     if (!user) {
//         throw new Error('Unable to login')
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
    
//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return user
// }

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;