var hmac = require("crypto").createHmac,
	https = require('https');

function coinspot(key, secret) {
  	var self = this;
  	self.key = key;
  	self.secret = secret;

	var request = function(path, postdata, callback) {
		var nonce = new Date().getTime();

		var postdata = postdata || {};
		postdata.nonce = nonce;

		var stringmessage = JSON.stringify(postdata);
		var signedMessage = new hmac("sha512", self.secret);

		signedMessage.update(stringmessage);

		var sign = signedMessage.digest('hex');

		var options = {
			rejectUnauthorized: false,
			method: 'POST',
			host: 'www.coinspot.com.au',
			port: 443,
			path: path,
			headers: {
				'Content-Type': 'application/json',
				'sign': sign,
				'key': self.key
			}
		};

		var req = https.request(options, function(resp){
			var data = '';
			resp.on('data', function(chunk){
				data += chunk;
			});
			resp.on('end', function(chunk){
				callback(null, data);
			});
		}).on("error", function(e){
			callback(e, data);
		});

		req.write(stringmessage);
		req.end();
	}

	self.sendcoin = function(cointype, amount, address, callback) {
		request('/api/my/coin/send', {cointype:cointype, amount:amount, address:address}, callback);
	}

	self.coindeposit = function(cointype, callback) {
		request('/api/my/coin/deposit', {cointype:cointype}, callback);
	}

	self.quotebuy = function(cointype, amount, callback) {
		request('/api/quote/buy', {cointype:cointype, amount:amount}, callback);
	}

	self.quotesell = function(cointype, amount, callback) {
		request('/api/quote/sell', {cointype:cointype, amount:amount}, callback);
	}

	self.balances = function(callback) {
		request('/api/my/balances', {}, callback);
	}

	self.orders = function(cointype, callback) {
		request('/api/orders', {cointype:cointype}, callback);
	}

	self.myorders = function(callback) {
		request('/api/my/orders', {}, callback);
	}

	self.spot = function(callback) {
		request('/api/spot', {}, callback);
	}

	self.buy = function(cointype, amount, rate, callback) {
		var data = {cointype:cointype, amount:amount, rate: rate}
		request('/api/my/buy', data, callback);
	}

	self.sell = function(cointype, amount, rate, callback) {
		var data = {cointype:cointype, amount:amount, rate: rate}
		request('/api/my/sell', data, callback);
	}

	    // New endpoints
        self.cancelBuy = function(id, callback) {
            request('/api/my/buy/cancel', { id: id }, callback);
        };

        self.cancelSell = function(id, callback) {
            request('/api/my/sell/cancel', { id: id }, callback);
        };

        self.orderHistory = function(cointype, callback) {
            request('/api/orders/history', { cointype: cointype }, callback);
        };

        self.status = function(callback) {
            request('/api/status', {}, callback);
        };

        self.completedOrders = function(cointype, markettype, callback) {
            var path = '/api/orders/completed/' + cointype;
            if (markettype) {
                path += '/' + markettype;
            }
            request(path, {}, callback);
        };

        self.latestBuyPrice = function(cointype, markettype, callback) {
            var path = '/pubapi/v2/buyprice/' + cointype + '/' + markettype;
            request(path, {}, callback);
        };

        self.latestSellPrice = function(cointype, markettype, callback) {
            var path = '/pubapi/v2/sellprice/' + cointype + '/' + markettype;
            request(path, {}, callback);
        };

        self.openOrdersByCoin = function(cointype, callback) {
            var path = '/pubapi/v2/orders/open/' + cointype;
            request(path, {}, callback);
        };

        self.openOrdersByCoinMarket = function(cointype, markettype, callback) {
            var path = '/pubapi/v2/orders/open/' + cointype + '/' + markettype;
            request(path, {}, callback);
        };

        self.listAffiliatePayments = function(callback) {
            request('/api/ro/my/affiliatepayments', {}, callback);
        };

        self.listReferralPayments = function(callback) {
            request('/api/ro/my/referralpayments', {}, callback);
        };

}

module.exports = coinspot;
