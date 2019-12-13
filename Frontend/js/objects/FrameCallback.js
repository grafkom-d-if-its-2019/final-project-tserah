export default class FrameCallback {
	/**
	 * 
	 * @param {Function} callback 
	 * @param {Object} context 
	 */
	constructor(callback, context) {
		this.callback = callback.bind(context);
	}
}