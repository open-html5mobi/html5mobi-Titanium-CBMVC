/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Ti.include('/app/base/core.js');

CB.AppName = 'HTML 5 Mobil';

//set the default language with the app
CB.DefaultLang = 'cn';

//set the debug mode
CB.DebugMode = {
		/**
		 * system debug mode
		 */
		sys : {
			/**
			 * debug mode
			 * 0: disable all debug messages
			 * 1: just display Debug.echo messages
			 * 2: display all debug messages, include dump object
			 */
			mode : 2,
			/**
			 * debug type, support Titanium debug type:
		 	 * info: display message with [INFO] style in console (default)
		 	 * warn: display message with [WARN] style in console 
		 	 * error: display message with [ERROR] style in console
			 */
			msgType: 'info'
			
		},
		/**
		 * style debug mode
		 * true: enable debug mode, will add the border Width and color with the element of layout
		 * false: disable debug mode
		 */
		style: false,
		/**
		 * api debug mode, base on your api server
		 * 'Y': disable encrypt all value of request details and response details 
		 * 'N': encrypt all value of request details and response details 
		 */
		api : 'N'
}

//load the controllers, the main controller must be the last one
var controllers = ['discussions','disDetail','category','about'];

//set the root controller
CB.RootController = 'discussions';

//launch the app
CB.Launch(controllers);

