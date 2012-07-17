/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */


//init the commonJS modules
(function(){
	CB.Plugins._ = require('/app/plugins/underscore');
	
	CB.Debug = require('/app/modules/debug');
	
	CB.Util = require('/app/modules/util');
	
	CB.Ajax = require('/app/modules/ajax');
	
	CB.DB = require('/app/plugins/joli').connect(CB.Models.dbName);
})();


Ti.include(
	'/app/base/platform.js',
	'/app/base/mixin.js',
	'/app/base/api.js',
	'/app/base/models.js',
	'/app/base/common.js'
);

