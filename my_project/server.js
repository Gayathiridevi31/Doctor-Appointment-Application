require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cors());
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/medicalApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
// Schemas & Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false },
});
const User = mongoose.model("User", UserSchema);
const doctorSchema = new mongoose.Schema({
  name:           String,
  specialization: String,
  city:           String,
  image:          String,
});
const Doctor = mongoose.model("Doctor", doctorSchema);
const appointmentSchema = new mongoose.Schema({
  userEmail:       String,
  doctorId:        String,
  patientName:     String,
  address:         String,
  dob:             String,
  age:             String,
  phoneNumber:     String,
  appointmentDate: String,
  appointmentTime: String,
  issueType:       String,
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

const ratingSchema = new mongoose.Schema(
  {
    stars:   { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
  },
  { timestamps: true }
);
const Rating = mongoose.model("Rating", ratingSchema);
// Seed Static Admin User
(async () => {
  try {
    const existingAdmin = await User.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({ username: "admin", password: hashedPassword, isAdmin: true });
      console.log("✅ Admin user created: admin / admin123");
    } else {
      console.log("✅ Admin user already exists");
    }
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
  }
})();
// Auth Helpers
const createToken = (user) =>
  jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || "jwtSecret",
    { expiresIn: "1h" }
  );
// Auth Routes
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ success: false, message: "Please fill in all fields" });

  try {
    if (await User.findOne({ username }))
      return res.status(400).json({ success: false, message: "User already exists! Please log in." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, isAdmin: false });
    res.status(201).json({ success: true, message: "Signup successful! You can now log in." });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const user = await User.findOne({ username });
    if (!user)           return res.status(400).json({ success: false, message: "User not found!" });
    if (user.isAdmin !== isAdmin)
                         return res.status(403).json({ success: false, message: "Invalid login type!" });
    if (!(await bcrypt.compare(password, user.password)))
                         return res.status(400).json({ success: false, message: "Invalid credentials!" });

    res.json({ success: true, token: createToken(user), isAdmin: user.isAdmin });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});
// Doctor Routes
app.get("/doctors", async (_req, res) => {
  res.json(await Doctor.find());
});

app.post("/doctors", async (req, res) => {
  res.json(await Doctor.create(req.body));
});

app.delete("/doctors/:id", async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor removed" });
});
// Appointment Routes
app.get("/appointments", async (req, res) => {
  const { user, userEmail } = req.query;
  try {
    const filter = {};
    if (user)      filter.user      = user;
    if (userEmail) filter.userEmail = userEmail;
    res.json(await Appointment.find(filter));
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/appointments", async (req, res) => {
  try {
    res.json(await Appointment.create(req.body));
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/appointments/:id", async (req, res) => {
  try {
    res.json(await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Rating Routes
app.post("/api/ratings", async (req, res) => {
  try {
    const { stars, comment } = req.body;
    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Invalid star rating" });
    }
    await Rating.create({ stars, comment });
    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (err) {
    console.error("❌ Rating Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// (optional) fetch ratings
app.get("/api/ratings", async (_req, res) => {
  try {
    res.json(await Rating.find().sort({ createdAt: -1 }).limit(50));
  } catch (err) {
    console.error("❌ Rating Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server running on port ${PORT}"));