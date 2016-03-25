window.KSC = window.KSC || {};

(function(){
	KSC.resourcesManage = {
		//获取用户全部主机列表
		getServers: _.partial(KSC.api, '/automate/api/servers/', 'get', null),
		//获取主机详情
		getServerDetail: function(data){
			data = data || {};
			return _.partial(KSC.api, '/automate/api/servers/' + data.serverId + '/', 'get', null)();
		},
		//获取应用列表
		getApps: _.partial(KSC.api, '/deploy/api/applications/', 'get', null),
		//获取应用详情
		getAppDetail: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/applications/' + data.appId + '/', 'get', null)();
		},
		//删除应用
		deleteApp: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/applications/' + data.appId + '/', 'delete', null)();
		},
		//检测
		checkServer: function(data){
			data = data || {};
			return _.partial(KSC.api, '/automate/api/servers/usage/', 'post', null)();
		} 
	};
})();