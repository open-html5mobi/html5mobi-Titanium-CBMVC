/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */


/**
 * set the remote API
 */
CB.API = {
	server : 'http://html5mobi.com/',
	//default ajax call timeout
	timeout: 10000
};

(function(){
	
	CB.Platform.extend(CB.API, {
		//set each api function's url
		category : CB.API.server + 'categories.json',
		discussions : CB.API.server + 'discussions.json',
		discussionsDetail : CB.API.server + 'discussion.json'
	});
	
})();
