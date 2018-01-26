const msgMap = require('./errorMsg');

let response = {};

class Response {
	constructor(errorCode, message, result){
		this.errorCode = errorCode;
		this.message = message;
		this.result = result;
	}

	isSuccessful() {
		return this.errorCode === 0;
	}

	isFailed() {
		return this.errorCode !== 0;
	}

	getErrorCode() {
		return this.errorCode;
	}

	getMessage() {
		return this.message;
	}

	getResult() {
		return this.result;
	}
}

function transformMsg(msgTemp, ...args) {
	if (!msgTemp ){
		return msgTemp;
	}
	for(let index in args) {
		msgTemp = msgTemp.replaceAll('\\{'+index+'\\}', args[index]);
	}
	return msgTemp;
}

class ErrorRep extends Response {
	constructor(msgKey, ...args) {
		let msgHolder = msgMap.get(msgKey);
		let errorMsg = transformMsg(msgHolder.getMessage(), args);
		super(msgHolder.getErrorCode(), errorMsg);
	}
}

class SuccessRep extends Response {
	constructor(result, message='') {
		super(0, message, result);
	}
}

response.ErrorRep = ErrorRep;
response.SuccessRep = SuccessRep;
module.exports = response;