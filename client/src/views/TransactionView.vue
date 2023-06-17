<template>
  <div>
    <h1>Transactions</h1>
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Wallet ID</th>
          <th @click="sortBy('amount')">Amount</th>
          <th>Balance</th>
          <th>Description</th> 
          <th @click="sortBy('date')">Date</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="transaction in transactions.slice((this.currentPage -1 )* this.perPage, this.currentPage * this.perPage)" :key="transaction._id">
          <td>{{ transaction._id }}</td>
          <td>{{ transaction.walletId }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.balance }}</td>
          <td>{{ transaction.description }}</td>
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.type }}</td> 
        </tr>
      </tbody>
    </table>
    <button @click="exportCSV">Export Transactions</button>
    <div class="pagination">
      <button @click="previousPage">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transaction-view',
  
  props: {
    transactions: {
      type: Object,
      default: () => {}
    }
  },
  
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      totalTransactions: 0
    };
  },
  
  methods: {
    exportCSV() {
      const csv = [
        'Transaction ID,Wallet ID,Amount,Balance,Description,Date,Type',
        ...this.transactions.slice((this.currentPage -1 )* this.perPage, this.currentPage * this.perPage).map(transaction => {
          return `${transaction._id},${transaction.walletId},${transaction.amount},${transaction.balance},${transaction.description},${transaction.date},${transaction.type}`;
        })
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'transactions.csv';
      link.click();
    },
    
    
    sortBy(column) {
      /* eslint-disable */
      column === 'date' ?  
        this.transactions.sort((a, b) => new Date(a[column]).getTime() > new Date(b[column]).getTime() ? -1 : new Date(a[column]).getTime() < new Date(b[column]).getTime() ? 1 : 0)
      : this.transactions.sort((a, b) => a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0);
    },
    
    
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.transactions.length / this.perPage)) {
        this.currentPage++;
      }
    }
  }
  
};
</script>
<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  text-align: left;
}

.pagination {
  margin-top: 20px;
}
</style>
