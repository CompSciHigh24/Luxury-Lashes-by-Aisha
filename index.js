const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@humu.bqredi3.mongodb.net/lashesDatabase2?retryWrites=true&w=majority&appName=Humu";

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema and model for Lashes
const serviceSchema = new mongoose.Schema({
  style: { type: String, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
});

const Service = mongoose.model("Service", serviceSchema);

app.post("/service", (req, res) => {
  const newService = new Service({
    style: req.body.style,
    price: req.body.price,
    image: req.body.image,
  });
  newService.save().then((service) => res.json(service));
});

// Schema and model for bookings
const bookingSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  month: { type: String, require: true },
  date: { type: Number, require: true },
  day: { type: Number, require: true },
  time: { type: String, require: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "service" },
});

const Booking = mongoose.model("Booking", bookingSchema);

// app.get("/booking", (req, res) => {
//   Booking.find({})
//     .populate()
//     .then((data) => {
//       res.json(data);
//     });
// });

app.post("/booking", (req, res) => {
  const newBooking = new Booking({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    month:req.body.month,
    date:req.body.date,
    day:req.body.day,
    phone: req.body.phone,
    email: req.body.email,
    service_id: req.body.service_id,
  });
  newBooking.save().then((booking) => res.json(booking));
});

app.get("/", (req, res) => {
  Booking.find({})
  .then((Booking)=>{ 
    res.status(200).render("booking.ejs", {
      Booking:Booking});
  })
  .catch((error)=>{
    console.error("Error fetching items:", error)
    res.status(500).send("error")
  })

  // res.sendFile(__dirname + "/public/contact.html");
});

app.get("/service", (req, res) => {
  Service.find({}).then((service) => {
    // res.json(service)
    res.render("service.ejs", { service: service });
  });
});

app.get("/booking", (req, res) => {
  console.log("inside booking");
  Service.find({}).then((booking) => {
    res.render("booking.ejs", { booking: booking });
  });
});

app.get("/thankYou", (req, res) => {
  res.status(200).send(__dirname + "correct");
});

// app.get("/admin/booking", (req, res) => {
//   res.sendFile(__dirname + "/views/admin.ejs");
// });
app.get("/admin/service", (req, res) => {
  Service.find({}).then((service) => {
    // res.json(service)
    res.render("adminService.ejs", { service: service });
  });
});


app.use((req,res,next)=>{
  res.status(404).send("not found")
    // sendFile(__dirname +"/public/404.html")
})

app.listen(3001, () => {
  console.log("Server running on port 3000");
});
