// routes/appointments.js
const express = require("express");
const router  = express.Router();
const Appointment = require("../models/Appointment");   // ← just import the model

// ───────────────────────────────────────────
// GET /appointments?user=&userEmail=
// ───────────────────────────────────────────
router.get("/", async (req, res) => {
  const { user, userEmail } = req.query;
  try {
    const filter = {};
    if (user)      filter.user      = user;
    if (userEmail) filter.userEmail = userEmail;

    const appointments = await Appointment.find(filter);
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ───────────────────────────────────────────
// POST /appointments  (create)
// ───────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    // guard against double-booking
    const exists = await Appointment.findOne({
      doctorId:        req.body.doctorId,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
    });

    if (exists) {
      return res.status(409).json({
        message: "That slot is already booked. Please pick another time.",
      });
    }

    const created = await Appointment.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ───────────────────────────────────────────
// PUT /appointments/:id  (update)
// ───────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const clash = await Appointment.findOne({
      doctorId:        req.body.doctorId,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      _id:             { $ne: req.params.id },   // exclude the doc being edited
    });

    if (clash) {
      return res.status(409).json({
        message: "That slot is already booked. Please pick another time.",
      });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Appointment not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
