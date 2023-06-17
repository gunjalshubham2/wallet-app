const { Router } = require('express')

const router = Router()
const mongoose = require('mongoose')

// added schema
const walletSchema = new mongoose.Schema({
    name: { type: String },
    walletId: { type: String },
    balance: { type: Number },
    transactionId: { type: String },
    date: { type: Date }
  });

const transactionSchema = new mongoose.Schema({
    amount: { type: Number },
    description: { type: String },
    walletId: { type: String },
    type: { type: String },
    balance: { type: Number },
    date: { type: Date },
});

// connect to table 
const Wallet = mongoose.model('Wallet', walletSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Define the routes
// 1. Setup wallet
router.post('/setup', (req, res) => {
  const wallet = new Wallet({
    balance: req.body.balance,
    name: req.body.name,
    transactionId: Date.now(),
    date: new Date()
  });
  
  // save initial balance to wallet
  wallet.save().then(function(wallet) {
      res.status(200).send(wallet);
    });
});
  
// 2. Credit / Debit transactions
router.post('/transact/:walletId', async (req, res) => {
  const walletId = req.params.walletId;
  const amount = req.body.amount;
  const description = req.body.description;
  const type = req.body.type;
  try {
    
    // Check if the wallet exists
    const wallet = await Wallet.findById(new mongoose.Types.ObjectId(walletId));

    // if wallet is not exists
    if (!wallet) {
      res.sendStatus(404);
      console.log('wallet not found')
      return;
    }

    // Credit or debit the amount from wallet
    if (type === 'credit') {
      wallet.balance = wallet.balance + amount;
    } else {
      wallet.balance = wallet.balance >= amount ? wallet.balance - amount : wallet.balance;
    }

    // save the changes to wallet
    wallet.save();

    // update list of transactions  
    const transaction = new Transaction({
      amount,
      description,
      walletId,
      type,
      balance: wallet.balance,
      date: new Date()
    });


    transaction.save();

    // Send the response
    res.send(transaction);
    
  } catch (err) {
    // log the error msg
    console.log('Error finding wallet:', err);
    res.sendStatus(500);
  }

});

// 3. Fetching transactions on wallet
router.get('/transactions/:walletId', async (req, res) => {
  const walletId = req.params.walletId;

  // Get the transactions for the wallet
  const transactions = await Transaction.find({ walletId });

  // Send the response
  res.send(transactions);
});

// 4. Get wallet details
router.get('/wallet/:id', async (req, res) => {
  const id = req.params.id;

  // Get the wallet by id
  const wallet = await Wallet.findById(id);

  // Send the response
  res.send(wallet);
});
  
module.exports = router