const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database.js');


var cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

// db.execute('SELECT * FROM products')
// .then(result => console.log(result))
// .catch(err => console.log(err));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);


 

app.use(errorController.get404);

sequelize.sync().then(result => {
    //console.log(result);
    app.listen(3000);
}).catch(err => console.log(err))


