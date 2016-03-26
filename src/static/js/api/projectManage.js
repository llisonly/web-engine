window.KSC = window.KSC || {};

(function(){
	KSC.projectManage = {
		//创建项目
		createProject: _.partial(KSC.api, '/deploy/api/projects/', 'post', null),
		//删除项目
		deleteProject: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/projects/' + data.pId + '/', 'delete', null)();
		},
		//批量删除
		deleteProjects: _.partial(KSC.api, '/deploy/api/projects/remove/', 'post', null),
		//修改项目
		updateProject: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/projects/' + data.pId + '/', 'put', null, data)();
		},
		//获取项目列表
		getProjects: _.partial(KSC.api, '/deploy/api/projects/', 'get', null),
		//获取项目详情
		getProjectDetail: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/projects/' + data.pId + '/', 'get', null)();
		},
		//获取项目应用列表
		getProjectApps: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/projects/'+ data.pId +'/applications/', 'get', null)();
		},
		//创建应用
		createApplication: _.partial(KSC.api, '/deploy/api/applications/', 'post', null),
		//删除应用
		deleteApplication: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/applications/' + data.appId + '/', 'delete', null)();
		},
		//批量删除应用
		deleteApplications: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/applications/remove/', 'post', null, data)();
		},
		//创建应用版本
		createVersion: function(data){
			data = data || data;	
			return	_.partial(KSC.api, '/deploy/api/applications/'+ data.appId +'/versions/', 'post', null, data)();
		},
		//获取应用版本列表
		getVersions: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/applications/'+ data.appId +'/versions/', 'get', null)();
		},
		//删除应用版本
		deleteVersion: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/versions/'+ data.versionId +'/', 'delete', null)();
		},
		//分发应用包
		//创建分组
		createGroup: _.partial(KSC.api, ' /deploy/api/groups/', 'post', null),
		//获取项目下分组列表
		getGroups: function(data){
			data = data || {};
			return _.partial(KSC.api, ' /deploy/api/projects/'+ data.pId +'/groups/', 'get', null)();
		},		
		//删除分组
		deleteGroup: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/groups/' + data.groupId + '/', 'delete', null)();
		},		
		//批量删除分组
		deleteGroups: _.partial(KSC.api, '/deploy/api/groups/remove/', 'post', null),
		//上传文件
		uploadPackage: '/cmdb/api/packages/',
		//分组下添加主机		
		createGroupServer: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/groups/'+ data.groupId +'/add_servers/', 'post', null, data)();
		},			
		//删除分组下的主机
		deleteGroupServer: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/groups/'+ data.groupId +'/del_servers/', 'post', null, data)();
		},
		//获取用户全部主机列表
		getServers: _.partial(KSC.api, '/automate/api/servers/', 'get', null),
		//获取分组未使用的主机列表
		getGroupOutServers: function(data){
			data = data || {};
			return  _.partial(KSC.api, '/deploy/api/groups/'+ data.groupId +'/out_servers/', 'get', null)();
		},
		//删除主机
		deleteServer: function(data){
			data = data || {};
			return _.partial(KSC.api, '/automate/api/servers/' + data.serverId + '/', 'delete', null)();
		},
		//批量删除主机
		deleteServers: _.partial(KSC.api, '/automate/api/servers/remove/', 'post', null),
		//部署
		deployApp: function(data){
			data = data || {};
			return _.partial(KSC.api, '/deploy/api/applications/'+ data.appId +'/distribute/', 'get', data)();
		}
	};
})();