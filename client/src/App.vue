<template>
  <div class="main">
  <h3>WALLET APP</h3>

    <form class="form" v-if="!wallet.length && !isInitialized">
      <input class="input" v-model="username" type="text" name="name" placeholder="Enter Username" required/>
      <br />
      <input class="input" v-model="initialBalance" type="number" name="initialBalance"  placeholder="Initial Balance" />
      <br />
      <button class="submit-button" @click="initializeWallet">Create Wallet</button>
    </form>

    <div v-if="wallet && !toggle">
      <div v-if="isInitialized" class="add-transaction">
        <h2>Username: {{ wallet.username }}</h2>
        <h2>Wallet Balance: {{ wallet.balance }}</h2>
        <h2>Add transaction</h2>
    
        <input type="number" v-model="amount" placeholder="Amount" class="amount" required> &nbsp;
        <select v-model="type" required>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select> &nbsp;
        <br/>
        <br/>
    
        <input type="text" v-model="description" placeholder="Description" class="description" required> &nbsp;
        <button @click="addTransaction">Submit Transaction</button>
      </div>
    </div>
    <div v-if="isInitialized">
      <router-link to="/" @click="toggle = false">Home</router-link> | 
      <router-link to="/transactions" @click="getAllTransactions()">Show Transactions</router-link>
      <transaction-view v-if="toggle" :transactions="transactions" />
    </div>
  </div>
</template>

<script>

import axios from "axios";
import TransactionView from './views/TransactionView.vue';

export default {
  name: "App",

  components: {
    TransactionView
  },

  data() {
    return {
      username: '',
      initialBalance: 0,
      amount: 0,
      wallet: {},
      transactions: {},
      description: '',
      toggle: false,
      isInitialized: false
    };
  },

  async mounted() {
    this.wallet.id = localStorage.getItem('walletId')

    // if walletId is present the fetch data from db
    if(this.wallet.id) {
      this.isInitialized = true;
      await this.getWalletData(this.wallet.id);
    }
  },
  
  methods: {
    async initializeWallet () {
      // Initialize the wallet with the provided data
      this.wallet = {
        username: this.username,
        balance: this.initialBalance
      }
      
      await this.createWallet();
    },

    async createWallet() {
      // create the wallet with provided data
      const response = await axios.post("api/setup/", {
        name: this.wallet.username,
        balance: this.wallet.balance
      });
      
      this.wallet.id = response.data._id;
      
      localStorage.setItem('walletId', this.wallet.id)
      
      this.isInitialized = true;
    },

    async addTransaction() {
      // transaction added to database
      const datapoint = {
        walletId: this.wallet.id || localStorage.getItem('walletId'),
        amount: this.amount,
        description: this.description,
        type: this.type
      };
      
      const response = await axios.post(`/api/transact/${datapoint.walletId}`, {
        amount: datapoint.amount,
        description: datapoint.description,
        type: datapoint.type,
      });
      
       this.wallet.balance = response.data.balance;      

       // clear the amount and description field, transaction type will be as it is
       this.amount = null;
       this.description = "";
    },
    
    async getAllTransactions() {

      // get all transaction details
      const response = await axios.get(`/api/transactions/${this.wallet.id}`);
      this.transactions = response.data;
      this.toggle = true;

    },

    async getWalletData(id) {
      const response = await axios.get(`/api/wallet/${id}`);

      this.wallet.username = response.data.name;
      this.wallet.balance = response.data.balance;

    }
  }
};
</script>

<style>
.main {
  margin: auto;
  max-width: 1100px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

 h3{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
}

.submit-button {
  width: 400px;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}

</style>