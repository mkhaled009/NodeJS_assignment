const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const homeRouter = require('./src/routers/homeRouter');
const productsRouter = require('./src/routers/productsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'itworx' }));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/home',homeRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);



app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
