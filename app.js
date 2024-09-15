const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database.js');
const Product = require('./models/product');
const User = require('./models/user')


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

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => consolr.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);


 

app.use(errorController.get404);

Product.belongsTo(User, {constratints: true, onDelete: 'CASCADE'});
//HERE WE CAN DEFINE HOW RELATIONSHIP MANAGED, if user deleted all it's product deleted refers by cascade
User.hasMany(Product);

sequelize.sync().then(result => {
     return User.findByPk(1);
    //console.log(result);
})
.then(user => {
    if(!user) {
        return User.create({name: 'ritik', email: 'rrishu212@gmail.com'})
    }
    return user;
})
.then(user => {
    console.log(user);
    app.listen(3000);
})
.catch(err => console.log(err))


