const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const teacherRoutes = require('./routes/teacherRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const notifyRoutes = require('./routes/notifyRoutes');
const logoutRoutes = require('./routes/logoutRoutes');

const app = express();
app.use(cors({
  origin: "http://127.0.0.1:5501",   // Use your frontend Live Server port
  credentials: true
}));

app.use(express.json());


app.use(session({
    secret: 'slss_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set true if using HTTPS
}));


//  connection with momgodb
const connectDB = require('./config/db');
connectDB();

// routes requiree kry gy
app.use('/api/user', require('./routes/userRoutes'));
// routes for logout
app.use('/api/logout', logoutRoutes);
//  Teacher routes for ading
app.use('/api/teachers', teacherRoutes);

// timetable routes
app.use('/api/timetables', timetableRoutes);


//...........................................next add,view mange timetable..........................//

app.use('/api/teachers', teacherRoutes);
app.use('/api/timetable', timetableRoutes);

//...........................................annoucement........................
app.use('/api/announcements', announcementRoutes);

//......................................... notify email bhejna...............................
app.use('/api/notify', notifyRoutes);

// Server listen kry gy
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
