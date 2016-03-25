require(['jqwidgets', 'api/projectManage'], function(){
	var $grid = $('#J_grid'),
		$addProjectBtn = $('#J_addProject'),
		defaults = {};



	function bindEvent(){
		$grid.on('click', '.J-delete', handleDelProject);
		$grid.on('click', '.J-edit', showEditProjectWindow);
		$addProjectBtn.on('click', handleAddProject);
		$('#J_cancel').on('click', closeAddProject);
		$('#J_submit').on('click', saveProject);
		$('#J_edit-project').on('click', editProject);
	}

	function initButton(){
		$('#J_addProject').jqxButton();
		$('.J-btn').jqxButton();
	}

	function initInput(){
		$('.J-text-input').jqxInput();
	}

	function initGrid(){
		var projectNameRender = function(row, column, value){
			var rowData = $grid.jqxGrid('getrowdata', row);
			var html = '<a href="/view/page/projectManage/detail.html?pId='+ rowData.id +'">' + value + '</a>';
			return html;
		};

		var operationRender = function(row, column, value){
			var rowData = $grid.jqxGrid('getrowdata', row);
			var html = '\
				<a class="J-btn J-edit" data-pId="'+ rowData.id +'" href="javascript:;">编辑</a>\
				<a class="J-btn J-delete" data-pId="'+ rowData.id +'" href="javascript:;">删除</a>\
			';			
			return html;
		};

		KSC.projectManage.getProjects()
			.done(function(data){
				var source = {
					datatype: 'array',
					localdata: data || []
				};

				var dataAdapter = new $.jqx.dataAdapter(source);	

				$grid.jqxGrid({
					width: '800px',
					sortable: true,
					source: dataAdapter,
					columns: [
						{text: '项目名', datafield: 'name', cellsrenderer: projectNameRender},
						{text: '备注', datafield: 'comment'},
						{text: '创建时间', datafield: 'create_time'},
						{text: '操作', cellsrenderer: operationRender}
					]
				});
			})
	}

	function handleDelProject(e){
		var $this = $(this),
			pId = $this.data('pid');

		if(window.confirm('确定删除吗？')){
			KSC.projectManage.deleteProject({pId: pId})
				.done(function(data){
					window.location.reload();
				});
		}
	}

	function initUpload(){
		$('#J_upload').jqxFileUpload({ 
			width: 300, 
			accept: 'zip/*',
			uploadUrl: KSC.projectManage.uploadPackage, 
			fileInputName: 'file'
		});
		$('#J_upload').on('uploadEnd', function(event){
			defaults.fileId = '9069740c-2c3d-41b1-a0d6-067dfee5279c';
		});
	}

	function handleAddProject(){
		$('#J_project-window').jqxWindow('open');
	}

	function closeAddProject(){
		$('#J_project-window').jqxWindow('close');
	}

	function saveProject(e){
		var params = {};

		params.name = $('#J_project-name').val();
		params.comment = $('#J_project-comment').val();	
		KSC.projectManage.createProject(params)
			.done(function(data){
				var params = {};

				params.name = $('#J_application-name').val();
				params.project = data.id;
				KSC.projectManage.createApplication(params)
					.done(function(data){
						var params = {};

						params.appId = data.id;
						params.package = defaults.fileId;
						params.comment = $('#J_version-comment').val();
						KSC.projectManage.createVersion(params)
							.done(function(data){
								window.location.reload();
							})
					})
			});
	}

	function createWindow(){
		$('#J_project-window').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
        $('#J_project-edit-window').jqxWindow({            
            width: 500,           
            height: 300, 
            autoOpen: false, 
            initContent: function(){
                
            }
        });
	}

	function showEditProjectWindow(){
		defaults.pId = $(this).data('pid');
		$('#J_project-edit-window').jqxWindow('open');
		getProjectDetail();
	}

	function getProjectDetail(){
		var params = {};

		params.pId = defaults.pId;
		KSC.projectManage.getProjectDetail(params)
			.done(function(data){
				displayProjectDetail(data);
			})
	}

	function displayProjectDetail(data){
		data = data || {};
		$('#J_project-edit-name').val(data.name);
		$('#J_project-edit-comment').val(data.comment);
	}

	function editProject(){
		var params = {};

		params.pId = defaults.pId;
		params.name = $('#J_project-edit-name').val();
		params.comment = $('#J_project-edit-comment').val();

		KSC.projectManage.updateProject(params)
			.done(function(data){
				window.location.reload();
			});
	}

	function init(){
		initButton();
		initGrid();
		createWindow();
		initUpload();
		initInput();
		bindEvent();
	}

	init();
});