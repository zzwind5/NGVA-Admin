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

class ErrorRep extends Response {
	constructor(errorCode, message) {
		super(errorCode, message);
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