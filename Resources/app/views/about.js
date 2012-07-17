/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */


__exports = (function() {

	var view = Ti.UI.createView(CB.Styles.common.baseView);	
	view.name = __exports.viewName;
	
	CB.Common.viewHeader(view,CB.Util.L('aboutTitle'));
	
	view.detailView = Ti.UI.createWebView(CB.Styles.common.detaiView);	
	view.add(view.detailView);
	
	CB.Common.viewFooter(view);
	
	return view;
})();
