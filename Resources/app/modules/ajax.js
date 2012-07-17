/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

/**
 * HTTP Request Helper
 */

/**
 * Standard HTTP Request
 * @param {Object} opts
 * @example The following are valid options to pass through:
 * 	opts.timeout 	: int Timeout request
 * 	opts.type		: string GET/POST
 * 	opts.data		: mixed The data to pass
 * 	opts.url		: string The url source to call
 * 	opts.onerror	: funtion A function to execute when there is an XHR error
 *  opts.callback   : callback function
 */
 exports.request = function(opts) {
	// Setup the xhr object
	var xhr = Ti.Network.createHTTPClient();

	// Set the timeout or a default if one is not provided
	xhr.timeout = (opts.timeout) ? opts.timeout : 10000;	

	/**
	 * Error handling
	 * @param {Object} e The callback object
	 */
	xhr.onerror = function(e) {
		if(opts.onerror) {
			opts.onerror(e);				
		} else {
			Ti.API.error(e);
		}
	};


	/**
	 * When XHR request is loaded
	 * @returns {Mixed}
	 */
	xhr.onload = function() {
		// If successful
		try {			
            var data = this.responseText;
            if(data) {
                data = JSON.parse(data);
				if(opts.callback) {
					opts.callback(data);
				} else {
					return data;
				}
			}
		}
		// If not successful
		catch(e) {
        	xhr.onerror(e);
		};
	};

	// Open the remote connection
	if(opts.type) {
		xhr.open(opts.type, opts.url);	
	} else {
		xhr.open('GET', opts.url);
	}

	if(opts.data) {
		// send the data
		xhr.send(opts.data);	
	} else {
		xhr.send(null);
	}
};

/**
 * On error function, need to rewrite this after call ajax method 
 * @param {Object} e
 */
exports.onerror = function(e){}

/**
 * On callback function, need to rewrite this after call ajax method
 * @param {Object} e
 */
exports.callback = function(e){}
