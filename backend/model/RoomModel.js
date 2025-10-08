const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    detail: { type: String }, 
    quantity: { type: Number, required: true },
    prImage: { type: String, required: true },
    status: {
        type: String,
        enum: ["Available", "Unavailable"], 
        default: "Available"
    }
}, { timestamps: true });

RoomSchema.plugin(AutoIncrement, { inc_field: 'prId' });

RoomSchema.pre("save", function(next){
    this.status = this.quantity > 0 ? "Available"  : "Unavailable";
    next();
});

RoomSchema.pre("updateOne", function(next) {
    const update = this.getUpdate();
    const quantity = update.$set?.quantity;
    if(quantity !== undefined){
        update.$set.status = quantity > 0 ? "Available" : "Unavailable";
    }
    next();
});

module.exports = mongoose.model("Room", RoomSchema);
