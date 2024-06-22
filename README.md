Please see https://www.coinspot.com.au/api for documentation on the CoinSpot API.


Example usage

```javascript
var coinspot = require('coinspot-api');

//var secret = 'SECRET_KEY';
//var key = 'API_KEY';

var client = new coinspot(key, secret);

// Test orders endpoint
client.orders('LTC', function(e, data) {
    console.log('Orders:', data);
});

// Test myorders endpoint
client.myorders(function(e, data) {
    console.log('My Orders:', data);
});

// Test spot endpoint
client.spot(function(e, data) {
    console.log('Spot:', data);
});

// Test quotebuy endpoint
client.quotebuy('BTC', 0.1, function(e, data) {
    console.log('Quote Buy:', data);
});

// Test quotesell endpoint
client.quotesell('BTC', 0.1, function(e, data) {
    console.log('Quote Sell:', data);
});

// Test balances endpoint
client.balances(function(e, data) {
    console.log('Balances:', data);
});

// Test coindeposit endpoint
client.coindeposit('BTC', function(e, data) {
    console.log('Coin Deposit:', data);
});

// Test sendcoin endpoint
client.sendcoin('BTC', 0.01, 'your_wallet_address', function(e, data) {
    console.log('Send Coin:', data);
});

// Test buy endpoint
client.buy('BTC', 0.1, 50000, function(e, data) {
    console.log('Buy:', data);
});

// Test sell endpoint
client.sell('BTC', 0.1, 60000, function(e, data) {
    console.log('Sell:', data);
});

// Test cancelBuy endpoint
client.cancelBuy('order_id', function(e, data) {
    console.log('Cancel Buy:', data);
});

// Test cancelSell endpoint
client.cancelSell('order_id', function(e, data) {
    console.log('Cancel Sell:', data);
});

// Test orderHistory endpoint
client.orderHistory('BTC', function(e, data) {
    console.log('Order History:', data);
});

// Test status endpoint
client.status(function(e, data) {
    console.log('Status:', data);
});

// Test completedOrders endpoint
client.completedOrders('BTC', 'AUD', function(e, data) {
    console.log('Completed Orders:', data);
});

// Test latestBuyPrice endpoint
client.latestBuyPrice('BTC', 'AUD', function(e, data) {
    console.log('Latest Buy Price:', data);
});

// Test latestSellPrice endpoint
client.latestSellPrice('BTC', 'AUD', function(e, data) {
    console.log('Latest Sell Price:', data);
});

// Test openOrdersByCoin endpoint
client.openOrdersByCoin('BTC', function(e, data) {
    console.log('Open Orders By Coin:', data);
});

// Test openOrdersByCoinMarket endpoint
client.openOrdersByCoinMarket('BTC', 'AUD', function(e, data) {
    console.log('Open Orders By Coin Market:', data);
});

// Test listAffiliatePayments endpoint
client.listAffiliatePayments(function(e, data) {
    console.log('List Affiliate Payments:', data);
});

// Test listReferralPayments endpoint
client.listReferralPayments(function(e, data) {
    console.log('List Referral Payments:', data);
});
```
