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

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start:server
```

Index.js is entry point for bff layer and Routes/api is used for managing endpoints
For UI layer /api is prefix used 
