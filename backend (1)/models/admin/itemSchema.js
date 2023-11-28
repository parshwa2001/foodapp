var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema(
  {
    name: { type: String,required: true  },
    price: { type: Number,required: true  },
    itemImg: { type: String },
    cuisine: { type: String },
    type: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);


var Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
