const User = require('../models/user')

const addUser = async (req, res, next) => {

    try {
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const data = await User.create( {name: name, email: email, phonennumber: phonenumber});
    console.log(data);
    res.status(201).json({newUserDetail: data});
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

const getUser =  async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({allUsers: users})    
    } catch (error) {
        console.log("Get user is failing", JSON.stringify(error));
        res.status(500).json({ error: error})
    }
}

const deleteUser =  async (req, res) => {
    try {
       console.log('ID passed:', req.params.id); // Add this line for debugging
       const uId = parseInt(req.params.id, 10);
       
       if (isNaN(uId)) {
          console.log('Invalid ID');
          return res.status(400).json({ error: 'Invalid ID format' });
       }
       
       const result = await User.destroy({
          where: {
            id: uId
          }
       });
 
       if (result === 0) {
          return res.status(404).json({ error: 'User not found' });
       }
       
       res.sendStatus(200);
    } catch (error) {
       console.log(error);
       if (!res.headersSent) {
          res.status(500).json({ error: 'Internal Server Error' });
       }
    }
 };

 module.exports = {
    addUser,
    getUser,
    deleteUser
 }