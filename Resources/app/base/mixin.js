/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

/**
 * mix the controller's functions
 */
CB.mixin = function(/*Object*/ target, /*Object...*/ props){
	var empty = {};
	
	for(var i=1, l=arguments.length; i<l; i++){
		var source = arguments[i];
		
		var s, i;
		for(var name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
	}
};
