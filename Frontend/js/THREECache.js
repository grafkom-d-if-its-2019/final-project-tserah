export default class THREECache {
	static storage;

	static init() {
		this.storage = new Array();
	}

	/**
	 * 
	 * @param {String} key 
	 * @param {*} value 
	 */
	static set(key, value) {
		this.storage[key] = value;
		return value;
	}

	/**
	 * 
	 * @param {String} key 
	 */
	static get(key) {
		return this.storage[key];
	}
}