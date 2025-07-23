// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userEmail:       String,
    doctorId:        { type: String, required: true },
    patientName:     { type: String, required: true },
    address:         { type: String, required: true },
    dob:             { type: String, required: true },
    age:             { type: Number, required: true },
    phoneNumber:     { type: String, required: true },
    appointmentDate: { type: String, required: true },  // "YYYY-MM-DD"
    appointmentTime: { type: String, required: true },  // "HH:mm"
    issueType:       { type: String, required: true },
  },
  { timestamps: true }
);

/*  ❗️IMPORTANT
    Use an existing compiled model if it already exists.
    This line prevents “OverwriteModelError: Cannot overwrite ‘Appointment’ model once compiled”.
*/
const Appointment =
  mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
