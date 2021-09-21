const mongoose = require("mongoose");
const validator = require("validator");

const Account = mongoose.model("Account", {
    accountNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    craeteOn: { type: Date, default: Date.now },

},
);



module.exports = Account;

