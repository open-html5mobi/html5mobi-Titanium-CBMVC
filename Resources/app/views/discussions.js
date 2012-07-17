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
	
	CB.Common.viewHeader(view,CB.Util.L('discussionTitle'));
	
	view.searchBar = Ti.UI.createView(CB.Styles.searchBar.mainBar);
	view.add(view.searchBar);
	
	view.searchView = Ti.UI.createView(CB.Styles.searchBar.searchView);
	view.searchBar.add(view.searchView);

	view.searchView.cancelBtn = Ti.UI.createButton(CB.Styles.searchBar.cancelBtn);
	view.searchView.add(view.searchView.cancelBtn);
	
	view.searchView.searchInput = Ti.UI.createTextField(CB.Styles.searchBar.searchInput);
	view.searchView.add(view.searchView.searchInput);
	
	
	
	view.tableList = Ti.UI.createTableView(CB.Styles.common.tableList);	
	view.add(view.tableList);
	
	
	CB.Common.viewFooter(view);
	
	return view;
})();
