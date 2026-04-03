const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./init/db');
const passport = require('./init/passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const userRoutes = require('./routes/userroute');
const transactionRoutes = require('./routes/transaction');
const roleRoutes = require('./routes/roles');
const { isAuthenticated, authorizeRoles } = require('./middleware/authenticated.js');
const wrapAsync = require('./util/wrapAsync');
const summaryRoutes = require('./routes/summaryAPI');

connectDB();

app.use(express.json()); 

const sessionOptions = {
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie : {
        expires : Date.now() +7 * 24 * 60 * 60 * 1000, 
        maxAge : 7 * 24 * 60 * 60 * 1000, 
        httpOnly : true, 
    },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/summary', summaryRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Finance Dashboard API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

