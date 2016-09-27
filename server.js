'use strict';
var os = require('os');
var ifaces = os.networkInterfaces();
var IP_ADDRESS;

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
	
	
	Object.keys(ifaces).forEach(function (ifname) {
	  var alias = 0;

	  ifaces[ifname].forEach(function (iface) {
	    if ('IPv4' !== iface.family || iface.internal !== false) {
	      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	      return;
	    }

	    if (alias >= 1) {
	      // this single interface has multiple ipv4 addresses
	      IP_ADDRESS = (ifname + ':' + alias, iface.address);
	    } else {
	      // this interface has only one ipv4 adress
	      IP_ADDRESS = (ifname, iface.address);
	    }
	    ++alias;
	  });
	});
	
  res.send(IP_ADDRESS + '\r\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
