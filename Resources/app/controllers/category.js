/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

__exports.viewLoaded = function(e) {

	//set current bottom menu to be selected
	this.view.bottomBar.categoryBtn.backgroundImage = CB.Styles.imagePath + 'btn-selected-bg.png';
	this.view.bottomBar.categoryBtn.icon.backgroundImage = CB.Styles.imagePath + 'btn-02-selected.png';
	this.view.bottomBar.categoryBtn.text.color = '#fff';

	if (!CB.Platform.isAndroid()) {
		this.view.tableList.rowHeight = '40dp';
	}

	this.view.searchView.cancelBtn.addEventListener('click', function(ev) {
		e.view.searchView.searchInput.value = '';
		var result = CB.Util.loadObject('categories');
		//生成数据列表
		e.generateTableList(e.view, result);
	});

	this.view.tableList.addEventListener('click', function(ev) {
		//CB.Debug.dump(ev,18);
		CB.controllers.discussions.categoryId = ev.row.categoryId;
		CB.pushController(CB.controllers.discussions);
	});
	
	this.view.searchView.searchInput.addEventListener('change', function(ev) {
		var result = CB.Util.loadObject('categories');
		CB.Debug.dump(result, 41, 'category.js');
		if (result != null && result.Categories != null) {
			CB.Platform.actInd.show(e.view);

			var filterData = CB.Plugins._.filter(result.Categories, function(item) {
				return (item.Name.toLowerCase().indexOf(ev.source.value.toLowerCase()) > -1);
			});

			e.filterTableList(e.view, filterData);

			CB.Platform.actInd.hide(e.view);
		}
	});

};

__exports.viewWillAppear = function(e) {
	if (e != undefined) {
		//add a refresh button for testing layout
		CB.Debug.addRefreshBtn(CB, e.view);

		if (!CB.Platform.isAndroid()) {
			CB.Platform.actInd.show(this.view);
		}
		var ajaxObj = {
			timeout : CB.API.timeout,
			type : 'GET',
			url : CB.API.category,
			onerror : function(result) {
				CB.Platform.actInd.hide(e.view);
				CB.Debug.dump(result, 71, 'category.js');
				CB.Util.alert(CB.Util.L('unknowError'), CB.Util.L('error'));
			},
			callback : function(result) {
				CB.Debug.dump(result, 75, 'category.js');

				if (result != null) {
					//成功获取数据并做相应的处理，设置到tableview
					//保存结果以备搜索使用
					CB.Util.saveObject('categories', result);
					//生成数据列表
					e.generateTableList(e.view, result);
					CB.Platform.actInd.hide(e.view);

				} else {
					CB.Util.alert(CB.Util.L('norecord'), CB.Util.L('error'));
				}

			}
		}
		CB.Ajax.request(ajaxObj);
	}
};

__exports.generateTableList = function(view, result) {
	var tabledata = [], row = undefined;

	//显示分类
	var categories = result.Categories;

	for (var dIndex in categories) {
		
		if (categories[dIndex].CategoryID != '-1') {
			CB.Debug.dump(categories[dIndex], 98,'category.js');
			var row = Ti.UI.createTableViewRow(CB.Styles.common.rowView);
			//CB.Debug.dump(categories[dIndex],62);
			CB.Styles.common.rowText.text = categories[dIndex].Name;
			row.add(Ti.UI.createLabel(CB.Styles.common.rowText));
			
			var lastCommentDate = categories[dIndex].DateLastComment;
			if(lastCommentDate != null){
				lastCommentDate = lastCommentDate.split(' ')[0];
			}else{
				lastCommentDate = '';
			}
			CB.Styles.common.rowSubText.left = '5%';
			CB.Styles.common.rowSubText.text = 
				categories[dIndex].CountComments + '评论  ' + '最近更新 ' + 
				categories[dIndex].LastDiscussionName + ' by ' + 
				categories[dIndex].LastCommentName + ' 日期 ' + 
				lastCommentDate;
			row.add(Ti.UI.createLabel(CB.Styles.common.rowSubText));

			row.categoryId = categories[dIndex].CategoryID;
			tabledata.push(row);
		}
	}

	view.tableList.setData(tabledata);
}

__exports.filterTableList = function(view, categories) {
	var filterTabledata = [];
	for (var dIndex in categories) {
		var row = Ti.UI.createTableViewRow();
		//CB.Debug.dump(categories[dIndex],62);
		CB.Styles.common.rowText.text = categories[dIndex].Name;
		row.add(Ti.UI.createLabel(CB.Styles.common.rowText));

		var lastCommentDate = categories[dIndex].DateLastComment;
			if(lastCommentDate != null){
				lastCommentDate = lastCommentDate.split(' ')[0];
			}else{
				lastCommentDate = '';
			}
			CB.Styles.common.rowSubText.left = '5%';
			CB.Styles.common.rowSubText.text = '\n\n\n' + 
				categories[dIndex].CountComments + '评论  ' + '最近更新 ' + 
				categories[dIndex].LastDiscussionName + ' by ' + 
				categories[dIndex].LastCommentName + ' 日期 ' + 
				lastCommentDate;
			row.add(Ti.UI.createLabel(CB.Styles.common.rowSubText));

		row.categoryId = categories[dIndex].CategoryID;
		filterTabledata.push(row);
	}

	view.tableList.setData(filterTabledata);
}
