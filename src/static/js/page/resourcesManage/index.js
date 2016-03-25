require(['jqwidgets', 'api/resourcesManage'], function(){

	var defaults = {};

	function initTab(){
		$("#J_tabstrip").jqxTabs({ width: '1000px', height: 500, position: 'top'});
	}

	function initButton(){		
		$(".J-btn").jqxButton();
	}

	function initWindow(){		
		$('#J_serverDetailWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
        $('#J_appDetailWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
	}

	function initServerGrid(){
		var checkboxRender = function(row, column, value){
			var rowData = $('#J_serverGrid').jqxGrid('getrowdata', row);
			var html = '<input class="J_s-checkbox" type="checkbox" data-sId="'+ rowData.id +'" />';
			return html;
		};

		var operationRender = function(row, column, value){
			var rowData = $('#J_serverGrid').jqxGrid('getrowdata', row);
			var html = '<a class="J_view-detail" data-sId="'+ rowData.id +'"  href="javascript:;">详情</a>';
			return html;
		};

		KSC.resourcesManage.getServers()
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_serverGrid').jqxGrid({
					width: '800px',
					height: '300px',
					filterable: true,
					showfilterrow: true,
					source: dataAdapter,
					columns: [
						{text: '勾选', cellsrenderer: checkboxRender},
						{text: '主机名称', datafield: 'name'},
						{text: 'Ip'},
						{text: '配置'},
						{text: '状态', datafield: 'usage'},
						{text: '项目'},
						{text: '分组'},
						{text: '操作', cellsrenderer: operationRender}
					]
				});
				
			})
	}

	function initAppGrid(){
		var operationRender = function(row, column, value){
			var rowData = $('#J_appGrid').jqxGrid('getrowdata', row);
			var html = '\
				<a class="J_app-detail" data-appId="'+ rowData.id +'"  href="javascript:;">详情</a>\
				<a class="J_app-delete" data-appId="'+ rowData.id +'"  href="javascript:;">删除</a>\
			';
			return html;
		};

		KSC.resourcesManage.getApps()
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_appGrid').jqxGrid({
					width: '800px',
					height: '300px',
					source: dataAdapter,
					columns: [						
						{text: '程序名称', datafield: 'name'},
						{text: '包大小'},
						{text: '信息'},						
						{text: '操作', cellsrenderer: operationRender}
					]
				});
				
			})
	}

	function bindEvent(){
		$('#J_start-server').on('click', startServer);
		$('#J_close-server').on('click', closeServer);
		$('#J_restart-server').on('click', restartServer);
		$('#J_serverGrid').on('click', '.J_view-detail', showDetailWindow);
		$('#J_appGrid').on('click', '.J_app-detail', showAppDetailWindow);
		$('#J_appGrid').on('click', '.J_app-delete', deleteApp);
		$('#J_check-server').on('click', checkServer);
	}

	function startServer(){
		var params = {};
	}

	function closeServer(){

	}

	function restartServer(){

	}

	function showDetailWindow(){
		defaults.serverId = $(this).data('sid');
		$('#J_serverDetailWindow').jqxWindow('open');
		getServerDetail();
	}

	function getServerDetail(){
		var params = {};

		params.serverId = defaults.serverId;
		KSC.resourcesManage.getServerDetail(params)
			.done(function(data){
				displayServerDetail(data);
			})
	}

	function displayServerDetail(data){
		data = data || {};

		$('#J_server-name').text(data.name);
	}

	function showAppDetailWindow(){
		defaults.appId = $(this).data('appid');
		$('#J_appDetailWindow').jqxWindow('open');
		getAppDetail();
	}

	function getAppDetail(){
		var params = {};

		params.appId = defaults.appId;
		KSC.resourcesManage.getAppDetail(params)
			.done(function(data){
				displayAppDetail(data);
			})
	}

	function displayAppDetail(data){
		data = data || {};

		$('#J_app-name').text(data.name);
	}

	function deleteApp(){
		var params = {};

		if(!window.confirm('确定删除吗？')) return;

		params.appId = $(this).data('appid');

		KSC.resourcesManage.deleteApp(params)
			.done(function(data){
				window.location.reload();
			})
	}

	function checkServer(){
		var params = {};

		params.id = [];

		$('.J_s-checkbox:checked').each(function(ele,index,ele){
			params.id.push($(this).data('sid'));
		});

		if(!params.id.length) return;

		KSC.resourcesManage.checkServer(params)
			.done(function(data){

			});
	}

	function init(){		
		initTab();		
		initServerGrid();
		initAppGrid();
		initButton();						
		initWindow();		
		bindEvent();
	}

	init();   	
});