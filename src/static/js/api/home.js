window.KSC = window.KSC || {};

(function(){
	KSC.home = {		
		getProjects: _.partial(KSC.api, '/deploy/api/projects/', 'get', null)		
	};
})();