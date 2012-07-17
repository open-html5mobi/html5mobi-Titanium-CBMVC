/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

/**
 * Common functions for all controllers and views
 */
CB.Common = {
	UI : {
		/**
		 * Create a dropdown list within a web view
		 * @param {Object} view, which view need to add the dropdown list object
		 *
		 * view.ddlArgs = {
		 * 	id : ddl object id,
		 *  innerWidth: webview ddl width,
		 *  innerHeight: webview ddl height,
		 *  innerFontSize: webview ddl font size(default is 12),
		 *  top: ddl top,
		 *  left: ddl left,
		 *  width: ddl width,
		 *  height: ddl height,
		 *  items :[
		 * 		//'the ddl option items'
		 * 		{text:'test', value:1}
		 * 	],
		 *  callback : the call back function
		 * }
		 */
		createDropDownList : function(view) {
			var html = "<html><meta name='viewport' content='user-scalable=0'><body bgcolor='#5a5c64' style='margin:0;padding:0'>";
			html += "<select id='{0}' style='width: {1}px; height: {2}px; font-size: {3}px; '>";
			for (var itemIndex in view.ddlArgs.items) {
				html += "<option value=\"{0}\">{1}</option>".format(view.ddlArgs.items[itemIndex].value, view.ddlArgs.items[itemIndex].text);
			}
			html += "</select>";
			html += "<script type='text/javascript'>";
			html += "document.getElementById('{0}').onchange = function(){ Titanium.App.fireEvent('app:set{0}',{value:this.value}); };";
			html += "</script>";
			html += "</body></html>";

			html = html.format(view.ddlArgs.id, view.ddlArgs.innerWidth, view.ddlArgs.innerHeight, view.ddlArgs.innerFontSize == undefined ? '12' : view.ddlArgs.innerFontSize);

			view[view.ddlArgs.id + 'WebView'] = Ti.UI.createWebView({
				top : view.ddlArgs.top,
				left : view.ddlArgs.left,
				width : view.ddlArgs.width,
				height : view.ddlArgs.height,
				html : html
			});
			view.add(view[view.ddlArgs.id + 'WebView']);

			Ti.App.addEventListener("app:set" + view.ddlArgs.id, function(e) {
				view.ddlArgs.callback(e);
			});
		},
		/**
		 * Create base with a left menu.
		 * return the view and there are two sub view in it:
		 * view.mainFrame : this is the menu layout view
		 * view.contentView : this is a view of layout element, you must add all element within this view
		 *
		 * @param {String} viewName
		 */
		createBaseViewWithMenu : function(viewName) {
			var mainView = Ti.UI.createView();

			mainView.mainFrame = Ti.UI.createView(CB.Styles.menu.mainFrame);
			mainView.add(mainView.mainFrame);

			mainView.contentView = Ti.UI.createView(CB.Styles.common.baseView);
			mainView.name = viewName;
			mainView.mainFrame.add(mainView.contentView);

			//menu layout
			mainView.mainFrame.mainMenu = Titanium.UI.createView(CB.Styles.menu.mainMenu);
			mainView.mainFrame.add(mainView.mainFrame.mainMenu);

			mainView.mainFrame.mainMenu.mainMenuBar = Titanium.UI.createView(CB.Styles.menu.mainMenuBar);
			mainView.mainFrame.mainMenu.add(mainView.mainFrame.mainMenu.mainMenuBar);

			mainView.mainFrame.mainMenu.mainMenuBar.menuSelected = Ti.UI.createView(CB.Styles.menu.menuSelected);

			mainView.mainFrame.mainMenu.menuBtn = Ti.UI.createButton(CB.Styles.menu.menuBtn);
			mainView.mainFrame.mainMenu.add(mainView.mainFrame.mainMenu.menuBtn);

			//menu buttons
			mainView.mainFrame.mainMenu.mainMenuBar.homeBtn = Ti.UI.createButton(CB.Styles.menu.homeBtn);
			mainView.mainFrame.mainMenu.add(mainView.mainFrame.mainMenu.mainMenuBar.homeBtn);

			mainView.mainFrame.mainMenu.mainMenuBar.settingBtn = Ti.UI.createButton(CB.Styles.menu.settingBtn);
			mainView.mainFrame.mainMenu.add(mainView.mainFrame.mainMenu.mainMenuBar.settingBtn);

			//menu events
			mainView.mainFrame.addEventListener('click', function(e) {
				CB.Debug.dump(e.source, 110, 'common.js');
				//just click on the view
				if (e.source != undefined) {
					CB.Common.toggleMenu(mainView.mainFrame);
				}
			});

			mainView.mainFrame.mainMenu.menuBtn.addEventListener('click', function() {
				CB.Common.toggleMenu(mainView.mainFrame);
			});

			mainView.mainFrame.mainMenu.mainMenuBar.addEventListener('click', function() {
				CB.Common.toggleMenu(mainView.mainFrame);
			});

			mainView.mainFrame.mainMenu.mainMenuBar.homeBtn.addEventListener('click', function() {
				//CB.controllers.mainFrame.toggleMenu();
				CB.Launch(null, null, 'left');
			});

			mainView.mainFrame.mainMenu.mainMenuBar.settingBtn.addEventListener('click', function() {
				CB.pushController(CB.controllers.setting);
			});

			//this.setCurrMenu(mainView);
			return mainView;
		}
	},
	/**
	 * User login function
	 * @param {String} userId, login user id
	 * @param {String} userPassword, alert box title
	 * @param {Object} controller, the controller should be redirect after login success
	 */
	login : function(userId, userPassword, controller) {
		//call api for login checking
		var ajaxObj = {
			timeout : CB.API.timeout,
			type : 'GET',
			data : {
				debug : CB.DebugMode.api,
				user_id : userId,
				user_password : userPassword
			},
			url : CB.API.login,
			onerror : function(d) {
				CB.Debug.dump(d, 156, 'base/common.js');
				alert(CB.Util.L('unknowError'));
				CB.Platform.actInd.hide();
			},
			callback : function(d) {
				CB.Debug.dump(d.login.response_details, 161, 'base/common.js');
				CB.Platform.actInd.hide();

				if (d.login.response_details != undefined) {
					var status = d.login.response_details.status;
					switch(status) {
						case '1':
							CB.Util.alert(CB.Util.L('invalidUser'), CB.Util.L('error'));
							break;
						case '2':
							CB.Util.alert(CB.Util.L('wrongPassword'), CB.Util.L('error'));
							break;
						case '0':
							CB.Models.User.sessionId = d.login.response_details.session_id;
							CB.Models.User.user_key = d.login.response_details.user_key;
							CB.Util.saveObject('user', CB.Models.User);
							CB.Common.getRemoteData('info', controller, true);
							break;
						default:
							CB.Util.alert(CB.Util.L('unknowError'), CB.Util.L('error'));
							break;
					}

				} else {
					CB.Util.alert(CB.Util.L('unknowError'), CB.Util.L('error'));
				}
			}
		}
		CB.Platform.actInd.show();
		CB.Ajax.request(ajaxObj);
	},
	/**
	 * Get date with remote API function
	 * @param {String} api, the API's name
	 * @param {Object} controller, which controller need to show after got data
	 * @param {Boolean} saveData, save response data to local storage or just pass data to next view
	 * 					true, save in local storage
	 * 					false, just pass data to controller.model to next view
	 * @param {String} animate
	 * @param {Object} requestData, the data need to be pass to server (except user session_id and user_key)
	 */
	getRemoteData : function(api, controller, saveData, animate, requestData) {

		var ajaxObj = {
			timeout : CB.API.timeout,
			type : 'GET',
			data : {
				debug : CB.DebugMode.api,
				session_id : user.sessionId,
				user_key : user.user_key
			},
			url : CB.API[api],
			onerror : function(d) {
				CB.Debug.dump(d, 214, 'base/common.js');
				CB.Util.alert(CB.Util.L('unknowError'), CB.Util.L('error'));
			},
			callback : function(d) {
				CB.Debug.dump(d, 218, 'base/common.js');
				var result = d[api].response_details;
				if (result.status == '0') {
					if (saveData) {
						CB.Util.removeObject(api);
						CB.Util.saveObject(api, result);
					} else {
						controller.model = result;
					}
					CB.pushController(controller, animate);
				} else {
					CB.Util.removeObject('user');
					if (saveData) {
						CB.Util.removeObject(api);
					}
					CB.Util.alert(CB.Util.L('timeout'), CB.Util.L('error'));
					CB.Launch(null, null, 'right');
				}
			}
		}
		if (requestData != undefined) {
			CB.Platform.extend(ajaxObj.data, requestData);
		}
		CB.Ajax.request(ajaxObj);

	},
	/**
	 * Add a back button in the top bar, need to add the top bar at first
	 */
	addBackButton : function(view) {
		view.topBar.backBtn = Ti.UI.createButton(CB.Styles.common.backBtn);
		view.topBar.add(view.topBar.backBtn);
		view.topBar.backBtn.addEventListener('click', function() {
			if (view.previous == undefined) {
				CB.popController();
			} else {
				CB.pushController(CB.controllers[view.previous]);
			}
		});

	},
	/**
	 * Add a home button in the top bar, need to add the top bar at first
	 */
	addHomeButton : function(view) {
		view.topBar.homeBtn = Ti.UI.createButton(CB.Styles.common.homeBtn);
		view.topBar.add(view.topBar.homeBtn);

		view.topBar.homeBtn.addEventListener('click', function() {
			//return to home page
			//CB.Launch(null, null, 'right');
			CB.pushController(CB.controllers[CB.RootController]);
		});
	},

	/**
	 * Common view header
	 * @param {Object} view
	 * @param {String} barTitleText, the topbar's text
	 */
	viewHeader : function(view, barTitleText) {
		//common layout functions and elements within header
		view.topBar = Ti.UI.createView(CB.Styles.common.topBar);
		view.topBar.barTitle = Ti.UI.createLabel(CB.Styles.common.barTitle);
		view.topBar.add(view.topBar.barTitle);
		view.add(view.topBar);

		view.topBar.barTitle.text = barTitleText;

	},
	/**
	 * Common view foter
	 * @param {Object} view
	 */
	viewFooter : function(view) {
		var currLang = CB.Util.getCurrLang();
		if(currLang == 'en'){
			CB.Styles.bottomBar.discuBtnText.left = '8%';
			CB.Styles.bottomBar.categoryBtnText.left = '45%';
		}else{
			CB.Styles.bottomBar.discuBtnText.left = '13%';
			CB.Styles.bottomBar.categoryBtnText.left = '48%';
		}
		//common layout functions and elements within footer
		view.bottomBar = Ti.UI.createView(CB.Styles.bottomBar.base);
		view.add(view.bottomBar);

		//discussions button
		view.bottomBar.discuBtn = Ti.UI.createButton(CB.Styles.bottomBar.discuBtn);
		view.bottomBar.discuBtn.viewName = 'discussions';
		view.bottomBar.add(view.bottomBar.discuBtn);

		view.bottomBar.discuBtn.icon = Ti.UI.createLabel(CB.Styles.bottomBar.discuBtnIcon);
		view.bottomBar.add(view.bottomBar.discuBtn.icon);
	
		view.bottomBar.discuBtn.text = Ti.UI.createLabel(CB.Styles.bottomBar.discuBtnText);
		view.bottomBar.add(view.bottomBar.discuBtn.text);

		//category button
		view.bottomBar.categoryBtn = Ti.UI.createButton(CB.Styles.bottomBar.categoryBtn);
		view.bottomBar.categoryBtn.viewName = 'cagetory';
		view.bottomBar.add(view.bottomBar.categoryBtn);

		view.bottomBar.categoryBtn.icon = Ti.UI.createLabel(CB.Styles.bottomBar.categoryBtnIcon);
		view.bottomBar.add(view.bottomBar.categoryBtn.icon);

		view.bottomBar.categoryBtn.text = Ti.UI.createLabel(CB.Styles.bottomBar.categoryBtnText);
		view.bottomBar.add(view.bottomBar.categoryBtn.text);

		//about button
		view.bottomBar.aboutBtn = Ti.UI.createButton(CB.Styles.bottomBar.aboutBtn);
		view.bottomBar.aboutBtn.viewName = 'about';
		view.bottomBar.add(view.bottomBar.aboutBtn);

		view.bottomBar.aboutBtn.icon = Ti.UI.createLabel(CB.Styles.bottomBar.aboutBtnIcon);
		view.bottomBar.add(view.bottomBar.aboutBtn.icon);

		view.bottomBar.aboutBtn.text = Ti.UI.createLabel(CB.Styles.bottomBar.aboutBtnText);
		view.bottomBar.add(view.bottomBar.aboutBtn.text);

		if (view.bottomBar.discuBtn.viewName != view.name) {
			view.bottomBar.discuBtn.addEventListener('click', function(row) {
				CB.pushController(CB.controllers.discussions, 'none');
			});
			
			if(CB.Platform.isAndroid()){
				view.bottomBar.discuBtn.icon.addEventListener('click', function(row) {
					CB.pushController(CB.controllers.discussions, 'none');
				});
			}
		}

		if (view.bottomBar.categoryBtn.viewName != view.name) {
			view.bottomBar.categoryBtn.addEventListener('click', function(row) {
				CB.pushController(CB.controllers.category, 'none');
			});
			
			if(CB.Platform.isAndroid()){
				view.bottomBar.categoryBtn.icon.addEventListener('click', function(row) {
					CB.pushController(CB.controllers.category, 'none');
				});
			}
		}

		if (view.bottomBar.aboutBtn.viewName != view.name) {
			view.bottomBar.aboutBtn.addEventListener('click', function(row) {
				CB.pushController(CB.controllers.about, 'none');
			});
			
			if(CB.Platform.isAndroid()){
				view.bottomBar.aboutBtn.icon.addEventListener('click', function(row) {
					CB.pushController(CB.controllers.about, 'none');
				});
			}
		}

	},

	setCurrMenu : function(mainView, currMenu) {
		mainView.mainMenu.mainMenuBar.menuSelected.top = currMenu;
		CB.Util.saveObject('currMenu', currMenu);
	},
	showCurrMenu : function(mainView) {
		var currMenu = CB.Util.loadObject('currMenu');
		if (currMenu == undefined) {
			currMenu = CB.Styles.menuSelectedTop.home;
		}
		mainView.mainMenu.mainMenuBar.menuSelected.top = currMenu;
	},
	isMenuOpen : function(mainView) {
		return (mainView.left == -CB.screenWidth);
	},
	toggleMenu : function(mainView, block) {
		if (this.isMenuOpen(mainView)) {
			this.openMenu(mainView, block);
		} else {
			this.closeMenu(mainView, block);
		}
	},
	closeMenu : function(mainView, block) {
		mainView.mainMenu.remove(mainView.mainMenu.mainMenuBar.menuSelected);
		mainView.mainMenu.menuBtn.backgroundImage = CB.Styles.imagePath + 'menu-btn-right.png';

		mainView.animate({
			duration : CB.__changeControllerDuration,
			left : -CB.screenWidth,
			top : 0
		}, function() {
			mainView.left = -CB.screenWidth;

			if (block !== undefined)
				block();
		});
	},
	openMenu : function(mainView, block) {
		mainView.mainMenu.add(mainView.mainMenu.mainMenuBar.menuSelected);
		mainView.mainMenu.menuBtn.backgroundImage = CB.Styles.imagePath + 'menu-btn-left.png';

		mainView.animate({
			duration : CB.__changeControllerDuration,
			left : -CB.screenWidth + (CB.screenWidth * 0.13),
			top : 0
		}, function() {
			mainView.left = -CB.screenWidth + (CB.screenWidth * 0.13);
			if (block !== undefined)
				block();
		});
	}
}
