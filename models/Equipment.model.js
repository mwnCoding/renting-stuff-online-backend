const { Schema, model } = require("mongoose");

const equipmentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

const Equipment = model("Equipment", equipmentSchema);

module.exports = Equipment;
