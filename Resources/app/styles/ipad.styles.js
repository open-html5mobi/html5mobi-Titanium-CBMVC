/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

/**
 * The styles of the apps, just for iPad!
 */
CB.Styles = {

	//image's path with this style
	imagePath : CB.ApplicationDirectory + 'images/',

	/**
	 * just for debug model, add the border to the view or button
	 */
	debugLayout : {
		borderWidth : 1,
		borderColor : 'blue'
	}
	,
	debugLayoutRed : {
		borderWidth : 1,
		borderColor : 'red'
	}
};

(function() {
	/**
	 * common styles
	 */
	CB.Styles.common = {
		baseView : {
			width : CB.screenWidth,
			//if show the statusbar, then need to minus the statusbar height
			height : CB.screenHeight,
			backgroundColor : '#fff'
		},
		topBar : {
			top : 0,
			width : '100%',
			height : '5%',
			backgroundImage : CB.Styles.imagePath + 'bar-top.png'
		},
		backBtn : {
			left : '1%',
			top : '10%',
			width : '10%',
			height : '80%',
			title : CB.Util.L('back'),
			color: '#fff',
			font : {
				fontSize : '17dp',
				fontWeight : 'bold'
			},
			backgroundImage : CB.Styles.imagePath + 'btn-back.png'
		},
		homeBtn : {
			right : '2%',
			top : '10%',
			width : '10%',
			height : '80%',
			title : CB.Util.L('home'),
			color: '#fff',
			font : {
				fontSize : '17dp',
				fontWeight : 'bold'
			},
			backgroundImage : CB.Styles.imagePath + 'btn-home.png'
		},
		barTitle : {
			width : 'auto',
			textAlign : 'center',
			color : '#9E0402',
			font : {
				fontSize : '25dp',
				fontWeight : 'bold'
			}
		},
		
		arrowIcon : {
			width : '2%',
			right : '10%',
			image : CB.Styles.imagePath+ 'arrow-btn.png'
		},
		rowText : {
			left : '5%',
			top: '10%',
			width : 'auto',
			color : '#000',
			font : {
				fontSize : '22dp',
				fontWeight : 'bold'
			}
		},
		rowAnnText : {
			left : '5%',
			width : 'auto',
			color : '#9E0402',
			bottom: '2%',
			font : {
				fontSize : '20dp'
			}
		},
		rowSubText : {
			left : '15%',
			bottom: '2%',
			width : 'auto',
			color : '#817f7f',
			font : {
				fontSize : '20dp'
			}
		},
		tableList : {
			top : '11%',
			height : '75%'
		},
		rowView : {
			hasDetail : true,
			hasChild: true,
			height : '80dp',
			backgroundImage : CB.Styles.imagePath + 'row-bg.png'
		},
		detaiView : {
			top : '11%',
			width: '100%',
			height : '75%'
		}
	}
	
	/**
	 * search bar style
	 */
	CB.Styles.searchBar = {
		mainBar : {
			top: '5%',
			height:'5%',
			backgroundImage: CB.Styles.imagePath + 'bar-top.png'
		},
		searchInput : {
			top : '10%',
			right : '20%',
			width : '60%',
			height : '99%',
			font: {
				fontSize:'20dp'
			},
			hintText:  CB.Util.L('search'),
			backgroundImage: CB.Styles.imagePath + 'search_bg.png'
		},
		searchView:{
			top : '10%',
			right : '1%',
			width : '30%',
			height : '90%',
			backgroundImage: CB.Styles.imagePath + 'search_view.png'
		},
		cancelBtn:{
			top : '19%',
			right : '5%',
			width : '11%',
			height : '60%',
			backgroundImage: CB.Styles.imagePath + 'cancel.png'
		}
	}
	
	/**
	 * bottom tab bar style
	 */
	CB.Styles.bottomBar = {
		base :{
			bottom : '1%',
			left : 0,
			width : '100%',
			height : '10%',
			backgroundImage : CB.Styles.imagePath + 'bottom-bar.png'
		},
		discuBtn :{
			top : 0,
			left : '5%',
			width : '25%',
			height : '100%',
			backgroundImage : CB.Styles.imagePath + 'btn-bg.png'
		},
		discuBtnIcon :{
			top : '5%',
			left : '13%',
			width : '8%',
			height : '55%',
			backgroundImage : CB.Styles.imagePath + 'btn-01.png'
		},
		discuBtnText : {
			top : '65%',
			left: '13%',
			width : 'auto',
			height : 'auto',
			textAlign : 'right',
			color : '#817f7f',
			text : CB.Util.L('discussions'),
			font : {
				fontSize : '20dp',
				fontWeight : 'bold'
			}
		},
		categoryBtn :{
			top : 0,
			left : '40%',
			width : '25%',
			height : '100%',
			backgroundImage : CB.Styles.imagePath + 'btn-bg.png'
		},
		categoryBtnIcon :{
			top : '5%',
			left : '48%',
			width : '8%',
			height : '55%',
			backgroundImage : CB.Styles.imagePath + 'btn-02.png'
		},
		categoryBtnText : {
			top : '65%',
			left: '48%',
			width : 'auto',
			height : 'auto',
			textAlign : 'right',
			color : '#817f7f',
			text : CB.Util.L('category'),
			font : {
				fontSize : '20dp',
				fontWeight : 'bold'
			}
		},
		aboutBtn :{
			top : 0,
			right : '5%',
			width : '25%',
			height : '100%',
			backgroundImage : CB.Styles.imagePath + 'btn-bg.png'
		},
		aboutBtnIcon :{
			top : '5%',
			right : '14%',
			width : '7%',
			height : '55%',
			backgroundImage : CB.Styles.imagePath + 'btn-03.png'
		},
		aboutBtnText : {
			top : '65%',
			right: '14%',
			width : 'auto',
			height : 'auto',
			textAlign : 'right',
			color : '#817f7f',
			text : CB.Util.L('about'),
			font : {
				fontSize : '20dp',
				fontWeight : 'bold'
			}
		},
	}
	/**
	 * discussions view's styles
	 */
	CB.Styles.discussions = {
		title : {
			top : '10%',
			left : 0,
			width : '100%',
			height : '8%',
			backgroundColor : '#E86400'
		}
	}

	/**
	 * category view's styles
	 */
	CB.Styles.category = {
		
	}

	
	/**
	 * ============================================================================================
	 *
	 * There are some logics for handle the different styles in mutlple platform or debug mode
	 *
	 * ============================================================================================
	 */

	/**
	 * Add the border layout within the elements in debug mode
	 */
	if (CB.DebugMode.style) {
		//home's debug layout:
		CB.Platform.extend(CB.Styles.menu.mainMenu, CB.Styles.debugLayout);
		CB.Platform.extend(CB.Styles.menu.mainFrame, CB.Styles.debugLayoutRed);
	}
})();
