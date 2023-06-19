# Wallet App

### Client APP
This is a simple web app that allows users to create and manage their wallets.

# Requirements
The app should have two pages:
A page for creating a new wallet
A page for viewing all of the user's transactions
The app should store the user's wallet id in local storage.
The app should allow users to add transactions to their wallets.
The app should allow users to view all of their transactions, sorted by amount and date.
The app should allow users to export their transactions to a CSV file.

### All above requirements are incorporated in Wallet app

# Code
The code for the app is written in Vue.js. The app uses Axios to make HTTP requests to a REST API.

# Usage
To use the app, first create a new wallet with username and balance. Then, you can add transactions to your wallet. You can view all of your transactions by clicking on the "Show Transactions" link. You can also export your transactions to a CSV file by clicking on the "Export Transactions" link.

# Dependencies
The app depends on the following libraries:

Vue.js
Axios

# Installation
To install the app, first clone the repository. Then, install the dependencies by running the following command under /client folder:

npm install

# Code snippet

Once the dependencies are installed, you can start the app by running the following command:

Use code with caution. Learn more
npm run serve


The app will be available at http://localhost:8080.

# Additional Details
# client

## Project setup under /client folder. (Go to /client folder and then run the following command)
```
npm install
```

### Compiles and hot-reloads for development. (Go to /client folder and then run the following command)
```
npm run serve
```

### Compiles and minifies for production. (Go to /client folder and then run the following command)
```
npm run build
```

### Lints and fixes files. (Go to /client folder and then run the following command)
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### Server App

# This bff layer introduce operations over wallet app and wallet database


# Wallet API
This API provides endpoints for managing wallets and transactions.

# Endpoints
1. /setup - Create a new wallet.
2. /transact/:walletId - Credit or debit a wallet.
3. /transactions/:walletId - Get all transactions for a wallet by walletId.
4. /wallet/:id - Get a wallet by ID.

Request Body
The request body for the /setup endpoint is a JSON object with the following properties:

balance - The initial balance of the wallet.
name - The name of the wallet.

The request body for the /transact/:walletId endpoint is a JSON object with the following properties:

amount - The amount to credit or debit the wallet.
description - A description of the transaction.
type - The type of transaction, either "credit" or "debit".

Response
The response for all endpoints is a JSON object with the following properties:

data - The data returned by the endpoint.
status - The status code of the response.

Examples
### Create a new wallet
POST /setup
{
"balance": 100,
"name": "My Wallet"
}



### Credit a wallet
POST /transact/12345
{
"amount": 100,
"description": "Salary deposit",
"type": "credit"
}


### Get all transactions for a wallet
GET /transactions/12345


### Get a wallet by ID
GET /wallet/12345 

# server

## Project setup. Go to /server folder and then run the following command
```
npm install
```

### Compiles and hot-reloads. (Go to /server folder and then run the following command)
```
npm run start:server
```

Index.js is entry point for bff layer and Routes/api is used for managing endpoints
For UI layer /api is prefix used 
