/**
 * WC
 * Toilets ? Nooo ! WaitCallbacks !
 * @author Martin DEQUATREMARE
 * @link https://github.com/MD4
 */
(function (global) {

	/**
	 * Constructor
	 * @param {int} triggerCount Amount of callbacks we are waiting for.
	 * @param {Function} (Optional) completeCallback Callback triggered when all the stuff is done !
	 * @param {Function} (Optional) progressCallback Callback triggered every time a task is done !
	 * @returns {undefined}
	 */
	var Wc = function (triggerCount, completeCallback, progressCallback) {
		this.completeCallback = completeCallback;
		this.progressCallback = progressCallback;
		this.triggerCount = triggerCount;
		this.triggerCountToReach = triggerCount;
		this.triggerCount || this.completeCallback();
	};

	/**
	 * Put that thing as callback argument on each function you are waiting for !
	 * @param {Function} stuffToDo (Optional) Function to execute when the trigger is triggered (You don't say ?!).
	 * @returns {Function} The trigger (famous one).
	 */
	Wc.prototype.trigger = function (stuffToDo) {
		var self = this;
		// Shitty or elegant syntax ? 
		return function () {
			(stuffToDo || function () {}).apply(this, Array.prototype.slice.call(arguments));
			(self.progressCallback || function () {})(self.triggerCountToReach - --self.triggerCount, self.triggerCountToReach);
			(self.triggerCount !== 0) || self.completeCallback();
		};
	};

	global.Wc = Wc;

}(window));