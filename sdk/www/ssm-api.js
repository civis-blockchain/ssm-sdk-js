// Copyright Luc Yriarte <luc.yriarte@thingagora.org> 2018 
// License: Apache-2.0

if (typeof exports != "undefined") {
	var CryptoJS = require("./crypto-js/crypto-js.js");
	var JSEmod = require("./jsencrypt/jsencrypt.js");
	var JSE = new JSEmod.JSEncrypt({default_key_size: 2048});
}
else
	var JSE = new JSEncrypt({default_key_size: 2048});

function ssmRegister(user, admin, adminKey) {
	JSE.setPrivateKey(adminKey);
	var userStr = JSON.stringify(user);
	var signStr = JSE.sign(userStr, CryptoJS.SHA256, "sha256");
	var hostCmd = {
		cmd: "invoke",
		fcn: "register",
		args: [userStr, admin, signStr]
	};

	return hostCmd;
}

function ssmCreate(ssm, admin, adminKey) {
	JSE.setPrivateKey(adminKey);
	var ssmStr = JSON.stringify(ssm);
	var signStr = JSE.sign(ssmStr, CryptoJS.SHA256, "sha256");
	var hostCmd = {
		cmd: "invoke",
		fcn: "create",
		args: [ssmStr, admin, signStr]
	};

	return hostCmd;
}

function ssmStart(session, admin, adminKey) {
	JSE.setPrivateKey(adminKey);
	var sessionStr = JSON.stringify(session);
	var signStr = JSE.sign(sessionStr, CryptoJS.SHA256, "sha256");
	var hostCmd = {
		cmd: "invoke",
		fcn: "start",
		args: [sessionStr, admin, signStr]
	};

	return hostCmd;
}

function ssmGrant(rights, admin, adminKey) {
	JSE.setPrivateKey(adminKey);
	var rightsStr = JSON.stringify(rights);
	var signStr = JSE.sign(rightsStr, CryptoJS.SHA256, "sha256");
	var hostCmd = {
		cmd: "invoke",
		fcn: "grant",
		args: [rightsStr, admin, signStr]
	};

	return hostCmd;
}

function ssmLimit(session, admin, adminKey) {
	JSE.setPrivateKey(adminKey);
	var sessionStr = JSON.stringify(session);
	var signStr = JSE.sign(sessionStr, CryptoJS.SHA256, "sha256");
	var hostCmd = {
		cmd: "invoke",
		fcn: "limit",
		args: [sessionStr, admin, signStr]
	};

	return hostCmd;
}

function ssmPerform(action, context, user, userKey) {
	JSE.setPrivateKey(userKey);
	var contextStr = JSON.stringify(context);
	var signStr = JSE.sign(action + contextStr, CryptoJS.SHA256, "sha256");
	var hostCmd = {
		cmd: "invoke",
		fcn: "perform",
		args: [action, contextStr, user, signStr]
	};

	return hostCmd;
}

function ssmQuery(fcn, id) {
	var hostCmd = {
		cmd: "query",
		fcn: fcn,
		args: [id]
	};

	return hostCmd;
}

function flattenPublicKey(pub) {
	var pubLst = pub.split("\n");
	var res = "";
	pubLst.map(function(str) {
		if (str != "" && str.indexOf("PUBLIC KEY") == -1)
			res += str;
	});
	return res;
}


if (typeof exports != "undefined") {
	exports.ssmRegister = ssmRegister;
	exports.ssmCreate = ssmCreate;
	exports.ssmStart = ssmStart;
	exports.ssmGrant = ssmGrant;
	exports.ssmLimit = ssmLimit;
	exports.ssmPerform = ssmPerform;
	exports.ssmQuery = ssmQuery;
	exports.flattenPublicKey = flattenPublicKey;
}

