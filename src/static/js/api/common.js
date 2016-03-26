window.KSC = window.KSC || {};

(function(){
	KSC.common = {
		getMenus: _.partial(KSC.api, '/api/ucenter/menus/', 'get', null)		
	};
})();