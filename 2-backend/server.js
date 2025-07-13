const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const teacherRoutes = require('./routes/teacherRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const notifyRoutes = require('./routes/notifyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//  connection with momgodb
const connectDB = require('./config/db');
connectDB();

// routes requiree kry gy
app.use('/api/user', require('./routes/userRoutes'));

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
