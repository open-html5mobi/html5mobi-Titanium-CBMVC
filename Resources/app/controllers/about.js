/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

__exports.viewLoaded = function(e) {

	//set current bottom menu to be selected
	this.view.bottomBar.aboutBtn.backgroundImage = CB.Styles.imagePath + 'btn-selected-bg.png';
	this.view.bottomBar.aboutBtn.icon.backgroundImage = CB.Styles.imagePath + 'btn-03-selected.png';
	this.view.bottomBar.aboutBtn.text.color = '#fff';
};

__exports.viewWillAppear = function(e) {
	if (e != undefined) {
		//add a refresh button for testing layout
		CB.Debug.addRefreshBtn(CB, e.view);

		e.view.detailView.url = '/app/html/about.html';

	}

};

