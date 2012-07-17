/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

__exports.viewLoaded = function(e) {

	//set current bottom menu to be selected
	this.view.bottomBar.discuBtn.backgroundImage = CB.Styles.imagePath + 'btn-selected-bg.png';
	this.view.bottomBar.discuBtn.icon.backgroundImage = CB.Styles.imagePath + 'btn-01-selected.png';
	this.view.bottomBar.discuBtn.text.color = '#fff';
	
	

};

__exports.viewWillAppear = function(e) {
	if (e != undefined) {
		//add a refresh button for testing layout
		//CB.Debug.addRefreshBtn(CB, e.view);

		CB.Debug.dump(e.discussionId, 25);

		CB.Platform.actInd.show(this.view);
		var ajaxObj = {
			timeout : CB.API.timeout,
			type : 'GET',
			url : CB.API.discussionsDetail + '?DiscussionID=' + e.discussionId,
			onerror : function(result) {
				CB.Platform.actInd.hide(e.view);
				CB.Debug.dump(result, 43, 'disDetail.js');
				CB.Util.alert(CB.Util.L('unknowError'), CB.Util.L('error'));
			},
			callback : function(result) {
				CB.Debug.dump(result.Discussion.Body, 47, 'disDetail.js');
				
				//成功获取数据并做相应的处理，设置到tableview
				if (result != null) {
					//添加此 header 是为了在 android 里的 webview不会被双击就放大缩小影响内容布局
					var htmlHeader = '<head><meta name="viewport" content="user-scalable=0"></head>';
					e.view.detailView.html = htmlHeader + result.Discussion.Body;
					CB.Platform.actInd.hide(e.view);

				} else {
					CB.Util.alert(CB.Util.L('norecord'), CB.Util.L('error'));
				}

			}
		}
		CB.Ajax.request(ajaxObj);

	}

};

