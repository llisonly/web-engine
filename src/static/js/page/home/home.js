require(['lib/vue/vue'], function(Vue){
	var projectVue;

	function initProjectsVue(){
		projectVue = new Vue({
			el: '#J_projects',
			data: {
				projects: ''
			},
			ready: function(){
				var self = this;
				KSC.common.getProjects()
					.done(function(data){
						self.projects = data;
					})
			}
		});
	}

	function init(){		
		initProjectsVue();
	}
	
	init();
});