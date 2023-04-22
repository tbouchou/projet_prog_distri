const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Use Helmet
//app.use(helmet());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Public folder
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem')),
  }, app
)

sslServer.listen(PORT, console.log(`Server running on  ${PORT}`));

/*const io = require('socket.io')(serverApp);

io.on('connection', function(socket) {
  console.log('A user connected');
  socket.on('chat message', function(msg) {
    console.log('message :'+msg);
  });
  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});*/