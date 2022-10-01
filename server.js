require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const methodOverride = require('method-override');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log('THIS IS A SECRET', SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

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

// GET router for Profile
app.get('/profile/edit', isLoggedIn, (req, res) => {
  res.render('edit');
});

// PUT Route for Profile editing
app.put('/profile/:id', async (req, res) => {
  try {
      const foundUser = await db.user.findOne({ where: { email: req.body.email }});
      console.log(foundUser);
      if (!foundUser) {
        const usersUpdated = await db.user.update({
          email: req.body.email,
          name: req.body.name
        }, {
          where: {
            id: req.params.id
          }
        });

        res.redirect('/profile'); // route
      } else if (foundUser.email && foundUser.id !== req.user.id) {
        req.flash('error', 'Email already exists. Please try again.');
        res.redirect('/profile');
      } else {
        const usersUpdated = await db.user.update({
          email: req.body.email,
          name: req.body.name
        }, {
          where: {
            id: req.params.id
          }
        });

        console.log('********** PUT ROUTE *************');
        console.log('Users updated', usersUpdated);
        console.log('**************************************************');
  
        // redirect back to the profile page
        res.redirect('/profile'); // route
      }
  } catch (error) {
    console.log('*********************ERROR***********************');
    console.log(error);
    console.log('**************************************************');
    res.render('edit');
  }
});


// USE
app.use('/inco-terms', require('./controllers/inco-terms'));
app.use('/exw', require('./controllers/exw'));
app.use('/fob', require('./controllers/fob'));
app.use('/cif', require('./controllers/cif'));
app.use('/dap', require('./controllers/dap'));
app.use('/ddp', require('./controllers/ddp'));
app.use('/news',isLoggedIn, require('./controllers/news'));
app.use('/favorites',isLoggedIn, require('./controllers/favorites'));

app.get('/*', (req, res) => {
  res.render('main/404');
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});


module.exports = server;
