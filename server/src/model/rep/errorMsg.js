
class MsgHolder {
	constructor(errorCode, key, message){
		this.errorCode = errorCode;
		this.message = message;
		this.key = key;
	}

	getKey() {
		return this.key;
	}

	getMessage() {
		return this.message;
	}

	getErrorCode() {
		return this.errorCode;
	}
}

function loadMsgJson() {
	let errorMsgJson = JSON.parse($fs.readFileSync(`${__home}/resources/i18n/message.json`));
	let msgMap = new Map();

	for (let field in errorMsgJson) {
		let key = errorMsgJson[field][0], message = errorMsgJson[field][1];
		let msgHolder = new MsgHolder(field, key, message);
		msgMap.set(key, msgHolder);
	}

	return msgMap;
}

const messageHolderMap = loadMsgJson();

module.exports = messageHolderMap;