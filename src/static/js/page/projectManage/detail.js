require(['jqwidgets', 'api/projectManage'], function(){

	var $grid = $('#J_grid'),
		defaults = {};

	defaults.projectId = KSC.getUrlParams('pId');	

	function initTab(){
		$("#J_tabstrip").jqxTabs({ width: '1000px', height: 500, position: 'top'});
	}

	function initButton(){
		$("#J_delProject").jqxButton({ template: "primary" });
		$(".J-btn").jqxButton();
	}

	function initWindow(){		
		$('#J_addGroupWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
        $('#J_addServerWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
        $('#J_addAppWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });        
        $('#J_versionManageWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
        $('#J_versionUploadWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
        $('#J_checkAppWindow').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });       
	}

	function initUpload(){
		$('#J_app-uploadPackage').jqxFileUpload({ 
			width: 300, 
			accept: 'zip/*',
			uploadUrl: KSC.projectManage.uploadPackage,
			fileInputName: 'file'
		});
		$('#J_app-uploadPackage').on('uploadEnd', function(event){
			defaults.appFileId = '9069740c-2c3d-41b1-a0d6-067dfee5279c';
		});
		$('#J_version-uploadPackage').jqxFileUpload({ 
			width: 300, 
			accept: 'zip/*',
			uploadUrl: KSC.projectManage.uploadPackage,
			fileInputName: 'file'
		});
		$('#J_version-uploadPackage').on('uploadEnd', function(event){
			defaults.versionFileId = '9069740c-2c3d-41b1-a0d6-067dfee5279c';
		});
	}

	function initGrid(){
		var operationRender = function(row, column, value, rowData){
			var html = '';
			if(rowData.level === 0){
				html = '<a class="J_delete-group J_btn" data-gId="'+ rowData.id +'" href="javascript:;">删除</a>';
				html += '<a class="ml10 J_add-server" data-gId="'+ rowData.id +'" href="javascript:;">添加主机</a>';
			}else if(rowData.level === 1){
				html = '<a class="J_delete-groupServer J_btn" data-parentGroupId="'+ rowData.parent.id +'" data-sId="'+ rowData.id +'" href="javascript:;">删除</a>';
			}			
			return html;
		};

		KSC.projectManage.getGroups({pId: defaults.projectId})
			.done(function(data){
				var source = {
					datatype: 'json',
					localdata: data || {},
					hierarchy: {
						root: 'servers_serializer'
					}
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_grid').jqxTreeGrid({
					width: '800px',					
					sortable: true,
					checkboxes: true,
					hierarchicalCheckboxes: true,						
					source: dataAdapter,
					columns: [						
						{text: '分组名称', datafield: 'name'},
						{text: '创建时间', datafield: 'create_time'},						
						{text: '操作', cellsrenderer: operationRender}
					]
				});
			})
	}

	function initServerGrid(){
		var checkboxRender = function(row, column, value){
			var rowData = $('#J_serverGrid').jqxGrid('getrowdata', row);
			var html = '<input class="J_s-checkbox" type="checkbox" data-sId="'+ rowData.id +'" />';
			return html;
		};

		KSC.projectManage.getServers()
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_serverGrid').jqxGrid({
					width: '400px',
					height: '200px',
					source: dataAdapter,
					columns: [
						{text: '勾选', cellsrenderer: checkboxRender},
						{text: '主机名称', datafield: 'name'},
						{text: '地区', datafield: 'region'}
					]
				});
				
			})
	}

	function initAddServerGrid(){
		var params = {};

		var checkboxRender = function(row, column, value){
			var rowData = $('#J_addServerGrid').jqxGrid('getrowdata', row);
			var html = '<input class="J_as-checkbox" type="checkbox" data-sId="'+ rowData.id +'" />';
			return html;
		};

		params.groupId = defaults.addServerGroupId;

		KSC.projectManage.getGroupOutServers(params)
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_addServerGrid').jqxGrid({
					width: '400px',
					height: '200px',
					source: dataAdapter,
					columns: [
						{text: '勾选', cellsrenderer: checkboxRender},
						{text: '主机名称', datafield: 'name'},
						{text: '地区', datafield: 'region'}
					]
				});
			})
	}

	function bindEvent(){
		$grid.on('click', '.J_delete-group', deleteGroup);
		$grid.on('click', '.J_delete-groupServer', deleteGroupServer);
		$grid.on('click', '.J_add-server', showServerWindow);
		$('#J_add-group').on('click', showAddGroupWindow);
		$('#J_submit-addGroup').on('click', saveAddGroup);
		$('#J_delete-groups').on('click', deleteGroups);
		$('#J_submit-addServer').on('click', handleAddServer)
		$('#J_delete-servers').on('click', deleteGroupServers);
		$('#J_delProject').on('click', deleteProject);
		$('#J_addApp').on('click', showAddAppWindow);
		$('#J_submit-addApp').on('click', saveApp);
		$('#J_appGrid').on('click', '.J_version-manage', showVersionManageWindow);
		$('#J_appGrid').on('click', '.J_version-upload', showVersionUploadWindow);
		$('#J_versionManageGrid').on('click', '.J_version-delete', deleteVersion);
		$('#J_deleteApp').on('click', deleteApp);
		$('#J_submmit-version').on('click',saveVersion);
		$('#J_deploy').on('click',showCheckAppWindow);
	}

	function showCheckAppWindow(){
		 $('#J_checkAppWindow').jqxWindow('open');
	}

	function deleteGroup(e){
		var params = {},
			$this = $(this);

		if(window.confirm('确定删除吗？')){
			params.groupId = $this.data('gid');
		
			KSC.projectManage.deleteGroup(params)
				.done(function(data){
					window.location.reload();
				})
		}
	};

	function deleteGroups(){
		var params = {},
			checkedRows;

		if(!window.confirm('确定删除吗？')) return;	

		params.id = [];

		checkedRows = $('#J_grid').jqxTreeGrid('getCheckedRows');

		_.each(checkedRows, function(ele, index, list){
			if(ele.level === 0) return params.id.push(ele.id);
		});

		KSC.projectManage.deleteGroups(params)
			.done(function(data){
				window.location.reload();
			})
	}

	function deleteGroupServer(e){
		var params = {},
			$this = $(this);

		if(!window.confirm('确定删除吗？')) return;
		params.groupId = $this.data('parentgroupid');
		params.id = $this.data('sid');
	
		KSC.projectManage.deleteGroupServer(params)
			.done(function(data){
				window.location.reload();
			})		
	}

	function deleteGroupServers(){
		
	}

	function deleteProject(){
		var params = {};

		if(!window.confirm('确定删除吗？')) return;

		params.pId = defaults.projectId;

		KSC.projectManage.deleteProject(params)
			.done(function(data){
				window.location.href = '/view/page/projectManage/list.html';
			});		
	}

	function showAddGroupWindow(e){
		$('#J_addGroupWindow').jqxWindow('open');
		initServerGrid();
	}

	function showServerWindow(e){
		defaults.addServerGroupId = $(this).data('gid');		
		$('#J_addServerWindow').jqxWindow('open');
		initAddServerGrid();
	}

	function handleAddServer(e){
		var params = {};

		params.id = [];
		params.groupId = defaults.addServerGroupId;		
		
		$('.J_as-checkbox:checked').each(function(index, ele){
			params.id.push($(this).data('sid'));
		});

		KSC.projectManage.createGroupServer(params)
			.done(function(data){
				window.location.reload();
			})

	}

	function saveAddGroup(){
		var params = {};			

		params.name = $('#J_group-name').val();
		params.project = defaults.projectId;
		params.servers = [];

		$('.J_s-checkbox:checked').each(function(index, ele){
			params.servers.push($(this).data('sid'));
		});

		KSC.projectManage.createGroup(params)
			.done(function(data){
				window.location.reload();
			})
	}

	function initAppGrid(){		
		var params = {};

		var checkboxRender = function(row, column, value){
			var rowData = $('#J_appGrid').jqxGrid('getrowdata', row);			
			var html = '\
				<input class="J_app-checkbox" data-appId="'+ rowData.id +'" type="checkbox" />\
			';								
			return html;
		};

		var operationRender = function(row, column, value){
			var rowData = $('#J_appGrid').jqxGrid('getrowdata', row);			
			var html = '\
				<a class="J_version-manage J_btn" data-appId="'+ rowData.id +'" href="javascript:;">版本管理</a>\
				<a class="J_version-upload J_btn" data-appId="'+ rowData.id +'" href="javascript:;">上传</a>\
			';								
			return html;
		};

		params.pId = defaults.projectId;

		KSC.projectManage.getProjectApps(params)
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_appGrid').jqxGrid({
					width: '800px',
					height: '400px',					
					source: dataAdapter,
					columns: [
						{text: '勾选', cellsrenderer: checkboxRender},
						{text: '程序名', datafield: 'name'},
						{text: '运行版本', datafield: 'current_version'},						
						{text: '部署时间', datafield: 'create_time'},
						{text: '操作', cellsrenderer: operationRender}
					]
				});
			})
	}

	function initCheckAppGrid(){		
		var params = {};
		var checkboxRender = function(row, column, value){

		};
		
		var operationRender = function(row, column, value){
			var rowData = $('#J_checkAppGrid').jqxGrid('getrowdata', row);			
			var html = '\
				<a class="J_btn-deploy J_btn" data-appId="'+ rowData.id +'" href="javascript:;">选择</a>\
			';								
			return html;
		};

		params.pId = defaults.projectId;

		KSC.projectManage.getProjectApps(params)
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_appGrid').jqxGrid({
					width: '800px',
					height: '400px',					
					source: dataAdapter,
					columns: [
						{text: '勾选', cellsrenderer: checkboxRender},
						{text: '程序名', datafield: 'name'},
						{text: '运行版本', datafield: 'current_version'},						
						{text: '部署时间', datafield: 'create_time'},
						{text: '操作', cellsrenderer: operationRender}
					]
				});
			})
	}

	function showAddAppWindow(){
		$('#J_addAppWindow').jqxWindow('open');
	}

	function saveApp(){
		var params = {};

		params.name = $('#J_app-name').val();
		params.project = defaults.projectId;		

		KSC.projectManage.createApplication(params)
			.done(function(data){
				var params = {};

				params.appId = data.id;
				params.package = defaults.appFileId;
				params.comment = $('#J_app-comment').val();
				KSC.projectManage.createVersion(params)
					.done(function(data){
						window.location.reload();
					})
			})
	}

	function deleteApp(){
		var params = {};

		if(!window.confirm('确定删除吗？')) return;			

		params.id = [];

		$('.J_app-checkbox:checked').each(function(index, ele){
			params.id.push($(this).data('appid'));
		});

		KSC.projectManage.deleteApplications(params)
			.done(function(data){
				window.location.reload();
			})
	}

	function showVersionManageWindow(e){
		defaults.appId = $(this).data('appid');
		$('#J_versionManageWindow').jqxWindow('open');
		initVersionManageGrid();
	}

	function initVersionManageGrid(){
		var params = {};

		var operationRender = function(row, column, value){
			var rowData = $('#J_versionManageGrid').jqxGrid('getrowdata', row);
			var html = '\
				<a class="J_version-delete J_btn" data-versionId="'+ rowData.id +'" href="javascript:;">删除</a>\
			';								
			return html;
		};

		params.appId = defaults.appId;

		KSC.projectManage.getVersions(params)
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);

				$('#J_versionManageGrid').jqxGrid({
					width: '500px',
					height: '200px',
					source: dataAdapter,
					columns: [
						{text: '版本', datafield: 'id'},
						{text: '版本描述', datafield: 'comment'},						
						{text: '部署时间', datafield: 'create_time'},
						{text: '操作', cellsrenderer: operationRender}
					]
				});
			})
	}

	function deleteVersion(e){
		var params = {};

		if(!window.confirm('确定删除吗？')) return;

		params.versionId = $(this).data('versionid');

		KSC.projectManage.deleteVersion(params)
			.done(function(data){
				window.location.reload();
			});
	}

	function showVersionUploadWindow(){
		defaults.appId = $(this).data('appid');
		$('#J_versionUploadWindow').jqxWindow('open');
	}

	function saveVersion(){
		var params = {};

		params.appId = defaults.appId;
		params.package = defaults.versionFileId;
		params.comment = $('#J_version-comment').val();
		KSC.projectManage.createVersion(params)
			.done(function(data){
				window.location.reload();
			});
	}

	function init(){		
		initTab();		
		initGrid();
		initButton();
		initUpload();				
		initWindow();
		initAppGrid();
		initCheckAppGrid();
		bindEvent();
	}

	init();   	
});