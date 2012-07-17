/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

var __config = {
	/**
	 * debug mode
	 * 0: disable all debug messages
	 * 1: just display Debug.echo messages
	 * 2: display all debug messages, include dump object
	 */
	mode : 1,
	/**
	 * debug type, support Titanium debug type:
	 * info: display message with [INFO] style in console
	 * warn: display message with [WARN] style in console (default)
	 * error: display message with [ERROR] style in console
	 */
	msgType : 'info'
}

function init(config) {
	if (config != undefined) {
		if (config.mode == undefined)
			config.mode = 1;
		if (config.msgType == undefined)
			config.msgType = 'info';
	}
	__config = config;
}

/**
 * General echo the debug message
 * @param {String} s, echo which debug message
 * @param {int} line, the line of echo message
 * @param {String} page, the page  which debug message show
 * @param {String} type, debug type, support Titanium debug type:
 *		 info: display message with [INFO] style in console
 * 		 warn: display message with [WARN] style in console (default)
 *		 error: display message with [ERROR] style in console
 */
function echo(s, line, page, type) {
	if (__config.mode === 1 || __config.mode === 2) {
		var debugType = __config.msgType;
		var msgTitle = '[CoderBlog MVC Debug Message]';

		if (page != null && page != undefined) {
			msgTitle = '[CoderBlog MVC Debug Message in ' + page + ' ]';
		}

		if (line != null && line != undefined) {
			msgTitle += ' Line ' + line + ' : ';
		}

		if (type != null && type != undefined) {
			debugType = type;
		}
		Titanium.API.warn(msgTitle);
		Titanium.API[debugType](s);
	}
}

/**
 * General dump the object
 * @param {Object} o, dump object
 * @param {int} line, the line of debug object
 * @param {String} page, the page  which debug message show
 * @param {String} type, debug type, support Titanium debug type:
 *		 info: display message with [INFO] style in console
 * 		 warn: display message with [WARN] style in console (default)
 *		 error: display message with [ERROR] style in console
 */
function dump(o, line, page, type) {
	if (__config.mode === 2) {
		var debugType = __config.msgType;
		var msgTitle = '[CoderBlog MVC Debug Dump Object]';

		if (page != null && page != undefined) {
			msgTitle = '[CoderBlog MVC Debug Dump Object in ' + page + ' ]';
		}

		if (line !== false) {
			msgTitle += ' Line ' + line;
		}
		if (type != null && type != undefined) {
			debugType = type;
		}
		Titanium.API.warn(msgTitle);
		Titanium.API[debugType](JSON.stringify(o));
	}
}

/**
 * Add a refresh function to top bar, then you can click the top bar to refresh the page
 * just for review the layout changed and testing.
 * @param {Object} coreObj
 * @param {Object} view
 */
function addRefreshBtn(coreObj, view) {
	if (view != undefined && __config.mode > 0) {

		if (view.topBar != undefined) {
			view.topBar.addEventListener('click', function() {
				coreObj.Launch([view.name], true, 'up');
			});
		} else {
			view.refreshBtn = Ti.UI.createButton({
				title : 'Refresh',
				color : '#000'
			});
			view.refreshBtn.addEventListener('click', function() {
				coreObj.Launch([view.name], true, 'up');
			});
			view.add(view.refreshBtn);
		}
	}
}

exports.init = init;
exports.echo = echo;
exports.dump = dump;
exports.addRefreshBtn = addRefreshBtn;

