/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

__exports.viewLoaded = function(e) {

	if (!CB.Platform.isAndroid()) {
		this.view.tableList.rowHeight = '40dp';
	}
	
	this.view.topBar.addEventListener('click', function(ev) {
		//change language
		var currLang = CB.Util.getCurrLang();
		if(currLang == 'cn'){
			CB.Util.switchLang('en');
		}else{
			CB.Util.switchLang('cn');
		}
		
		CB.Launch(null, false, 'none');
	});

	this.view.searchView.cancelBtn.addEventListener('click', function(ev) {
		e.view.searchView.searchInput.value = '';
		var result = CB.Util.loadObject('discussions');
		var isLoadCategory  = (e.categoryId != undefined);
		//生成数据列表
		e.generateTableList(e.view, result, isLoadCategory);
	});

	this.view.tableList.addEventListener('click', function(ev) {
		//CB.Debug.dump(ev,37);
		CB.controllers.disDetail.discussionId = ev.row.discussionId;
		CB.pushController(CB.controllers.disDetail);
	});

	//搜索讨论列表内容
	this.view.searchView.searchInput.addEventListener('change', function(ev) {
		var result = CB.Util.loadObject('discussions');
		CB.Debug.dump(result, 38, 'discussions.js');
		if (result != null && result.Discussions != null) {
			CB.Platform.actInd.show(e.view);

			var filterData = CB.Plugins._.filter(result.Discussions, function(item) {
				return (item.Name.toLowerCase().indexOf(ev.source.value.toLowerCase()) > -1);
			});

			e.filterTableList(e.view, filterData);

			CB.Platform.actInd.hide(e.view);
		}
	});
};

__exports.viewWillAppear = function(e) {
	if (e != undefined) {
		//check whether load the category page
		var isLoadCategory = (e.categoryId != undefined);
		if (!isLoadCategory) {
			e.view.bottomBar.discuBtn.backgroundImage = CB.Styles.imagePath + 'btn-selected-bg.png';
			e.view.bottomBar.discuBtn.icon.backgroundImage = CB.Styles.imagePath + 'btn-01-selected.png';
			e.view.bottomBar.discuBtn.text.color = '#fff';
		} else {
			
			CB.Common.addBackButton(e.view);
			
			e.view.bottomBar.discuBtn.backgroundImage = CB.Styles.imagePath + 'btn-bg.png';
			e.view.bottomBar.discuBtn.icon.backgroundImage = CB.Styles.imagePath + 'btn-01.png';
			e.view.bottomBar.discuBtn.text.color = '#817f7f';

			e.view.bottomBar.categoryBtn.backgroundImage = CB.Styles.imagePath + 'btn-selected-bg.png';
			e.view.bottomBar.categoryBtn.icon.backgroundImage = CB.Styles.imagePath + 'btn-02-selected.png';
			e.view.bottomBar.categoryBtn.text.color = '#fff';
		}

		//add a refresh button for testing layout
		//CB.Debug.addRefreshBtn(CB, e.view);
		var apiParameter = '?page=1-10';
		//default get the discussions
		if (e.categoryId != undefined) {
			//get discussions with category id
			apiParameter = '?CategoryID=' + e.categoryId;
		}
		CB.Debug.echo(apiParameter,82,'dis');
		
		var ajaxObj = {
			timeout : CB.API.timeout,
			type : 'GET',
			url : CB.API.discussions + apiParameter,
			onerror : function(result) {
				CB.Platform.actInd.hide(e.view);
				CB.Debug.dump(result, 92, 'discussions.js');
				CB.Util.alert(CB.Util.L('unknowError'), CB.Util.L('error'));
			},
			callback : function(result) {
				CB.Debug.dump(result, 96, 'discussions.js');

				if (result != null) {
					//成功获取数据并做相应的处理，设置到tableview
					//保存结果以备搜索使用
					CB.Util.saveObject('discussions', result);
					//生成数据列表
					e.generateTableList(e.view, result, isLoadCategory);
					CB.Platform.actInd.hide(e.view);

				} else {
					CB.Util.alert(CB.Util.L('norecord'), CB.Util.L('error'));
				}

			}
		}
		
		var result = CB.Util.loadObject('discussions');
		if(result == null){
			if (!CB.Platform.isAndroid()) {
				CB.Platform.actInd.show(this.view);
			}
			CB.Ajax.request(ajaxObj);
		}else{
			//生成数据列表
			e.generateTableList(e.view, result, isLoadCategory);
		}
	}

};

__exports.generateTableList = function(view, result, isLoadCategory) {
	var tabledata = [], row = undefined;

	if (!isLoadCategory) {
		//显示公告
		var announcements = result.Announcements;
		for (var dIndex in announcements) {
			var row = Ti.UI.createTableViewRow(CB.Styles.common.rowView);
			//CB.Debug.dump(announcements[dIndex],62);
			CB.Styles.common.rowText.text = announcements[dIndex].Name;
			row.add(Ti.UI.createLabel(CB.Styles.common.rowText));

			CB.Styles.common.rowAnnText.text = '\n\n\公告';
			row.add(Ti.UI.createLabel(CB.Styles.common.rowAnnText));

			CB.Styles.common.rowSubText.left = '15%';
			CB.Styles.common.rowSubText.text = announcements[dIndex].CountComments + '评论  ' 
			+ announcements[dIndex].CountViews + '浏览  ' + '发起人 ' 
			+ announcements[dIndex].FirstName + ' 日期 ' 
			+ announcements[dIndex].FirstDate.split(' ')[0];
			row.add(Ti.UI.createLabel(CB.Styles.common.rowSubText));

			//row.height = '60dp';
			row.discussionId = announcements[dIndex].DiscussionID;
			tabledata.push(row);
		}
	}

	//显示讨论帖
	var discussions = result.Discussions;

	for (var dIndex in discussions) {
		var row = Ti.UI.createTableViewRow(CB.Styles.common.rowView);
		//CB.Debug.dump(discussions[dIndex],62);
		CB.Styles.common.rowText.text = discussions[dIndex].Name;
		row.add(Ti.UI.createLabel(CB.Styles.common.rowText));

		CB.Styles.common.rowSubText.left = '5%';
		CB.Styles.common.rowSubText.text = '\n\n' + discussions[dIndex].CountComments + '评论  ' + discussions[dIndex].CountViews + '浏览  ' + '发起人 ' + discussions[dIndex].FirstName + ' 日期 ' + discussions[dIndex].FirstDate.split(' ')[0];
		row.add(Ti.UI.createLabel(CB.Styles.common.rowSubText));

		row.discussionId = discussions[dIndex].DiscussionID;
		tabledata.push(row);
	}

	view.tableList.setData(tabledata);
}

__exports.filterTableList = function(view, discussions) {
	var filterTabledata = [];
	for (var dIndex in discussions) {
		var row = Ti.UI.createTableViewRow(CB.Styles.common.rowView);
		//CB.Debug.dump(discussions[dIndex],62);
		CB.Styles.common.rowText.text = discussions[dIndex].Name;
		row.add(Ti.UI.createLabel(CB.Styles.common.rowText));

		CB.Styles.common.rowSubText.left = '5%';
		CB.Styles.common.rowSubText.text = '\n\n' + discussions[dIndex].CountComments + '评论  ' + discussions[dIndex].CountViews + '浏览  ' + '发起人 ' + discussions[dIndex].FirstName + ' 日期 ' + discussions[dIndex].FirstDate.split(' ')[0];
		row.add(Ti.UI.createLabel(CB.Styles.common.rowSubText));

		row.discussionId = discussions[dIndex].DiscussionID;
		filterTabledata.push(row);
	}

	view.tableList.setData(filterTabledata);
}