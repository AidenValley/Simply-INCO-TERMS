require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log('THIS IS A SECRET', SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);


app.use(session({
  secret: SECRET_SESSION,   // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(flash());            // flash middleware

app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
}) // next 

app.get('/', (req, res) => {
  res.render('index');
})

// access to all of our auth routes GET /auth/login, GET 
app.use('/auth', require('./controllers/auth'));


// Add this above / auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

// USE
app.use('/inco-terms', require('./controllers/inco-terms'));
app.use('/exw', require('./controllers/exw'));
app.use('/fob', require('./controllers/fob'));
app.use('/cif', require('./controllers/cif'));
app.use('/dap', require('./controllers/dap'));
app.use('/ddp', require('./controllers/ddp'));
app.use('/news',require('./controllers/news'));

const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});


module.exports = server;
