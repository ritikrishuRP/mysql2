const Expense = require('../models/expense')

const addExpense = async (req, res, next) => {

    try {
    const sellingPrice = req.body.sellingPrice;
    const product = req.body.product;

    const data = await Expense.create( {sellingPrice: sellingPrice, product: product});
    console.log(data);
    res.status(201).json({newUserDetail: data});
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

const getExpense =  async (req, res, next) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({allExpenses: expenses})    
    } catch (error) {
        console.log("Get user is failing", JSON.stringify(error));
        res.status(500).json({ error: error})
    }
}

const deleteExpense =  async (req, res) => {
    try {
       console.log('ID passed:', req.params.id); // Add this line for debugging
       const uId = parseInt(req.params.id, 10);
       
       if (isNaN(uId)) {
          console.log('Invalid ID');
          return res.status(400).json({ error: 'Invalid ID format' });
       }
       
       const result = await Expense.destroy({
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
    addExpense,
    getExpense,
    deleteExpense
 }