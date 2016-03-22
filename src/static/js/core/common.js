require(['lib/vue/vue', 'cookie'], function(Vue){
	var $slidebarControlBtn = $('#J_slidebar-control'),
		$slidebar = $('.J_slidebar'),
		$win = $(window),
		$nav = $('#J_nav'),
		navVue,		
		defaults = {};

	/**
	*@param 0 闭合
	*@param 1 展开
	*/	
	defaults.nav_status = 1;

	Vue.config.debug = true;

	function initNavVue(){
		var deferred = $.Deferred();
		navVue = new Vue({
			el: '#J_nav',
			data: {
				nav_status: defaults.nav_status,
				menus: ''
			},
			ready: function(){
				var self = this;
				KSC.common.getMenus()
					.done(function(data){
						self.$set('menus', data);
						deferred.resolve();
					})
			}
		});
		return deferred.promise();
	}

	function initSlidebar(){
		var winWidth = $win.width();

		if(winWidth < 1366){
			setSlidebarSmall();
		}else{
			setSlidebarLarge();
		}
	}


	function setNavStatus(status){
		navVue.nav_status = status || 0;
	}

	function setNavLarge(){
		var menuId = $.cookie('c_menuId'),
			$activedMenu,
			parentMunuId;

		setNavStatus(1);
		navVue.$nextTick(function(){
			$activedMenu = $('[data-menuId=' + menuId + ']');
			parentMunuId = $activedMenu.data('parentmenuid');

			//添加激活状态
			$activedMenu.addClass('n--active');
			
			if($activedMenu.hasClass('n-level-two')){
				$('[data-menuId=' + parentMunuId + ']').addClass('n-level-one--open');
				$('[data-parentMenuId=' + parentMunuId + ']').show();
			}
		});
	}

	function setNavSmall(){
		var menuId = $.cookie('c_menuId'),
			$activedMenu = $('[data-menuId=' + menuId + ']'),
			parentMunuId = $activedMenu.data('parentmenuid');
		
		setNavStatus(0);
		navVue.$nextTick(function(){
			if(parentMunuId){
				//添加激活状态
				$('[data-menuId=' + parentMunuId + ']').addClass('n--active').siblings().removeClass('n--active');
			}else{
				$('[data-menuId=' + menuId + ']').addClass('n--active').siblings().removeClass('n--active');
			}
		});
	}

	function bindEvent(){
		$slidebarControlBtn.on('click', handleSlidebar);
		$nav.on('click', 'a', handleNavClick);
	}

	function handleSlidebar(e){
		if($slidebarControlBtn.hasClass('slidebar-control--off')){
			setSlidebarSmall();
		}else{
			setSlidebarLarge();
		}		
	}

	function setSlidebarLarge(){
		$slidebar.addClass('slidebar--on').removeClass('slidebar--off');
		$slidebarControlBtn.addClass('slidebar-control--off').removeClass('slidebar-control--on');
		setNavLarge();
	}

	function setSlidebarSmall(){
		$slidebar.addClass('slidebar--off').removeClass('slidebar--on');
		$slidebarControlBtn.addClass('slidebar-control--on').removeClass('slidebar-control--off');
		setNavSmall();
	}

	function handleNavClick(e){
		var $this = $(this),
			menuId = $this.parent().data('menuid'),
			parentMenuId = $this.parent().data('parentmenuid'),
			$parent = $this.parent('li');

		//激活状态
		if($this.hasClass('n-name')){
			$parent.addClass('n--active').siblings().removeClass('n--active');
			$.cookie('c_menuId', menuId, {path: '/'});
		}

		//显示下级菜单
		if($this.hasClass('n-trigger')){			
			if($parent.hasClass('n-level-one--open')){
				$parent.removeClass('n-level-one--open');
				$('[data-parentMenuId=' + menuId + ']').hide();
			}else{
				$parent.addClass('n-level-one--open').siblings().removeClass('n-level-one--open').siblings('.n-level-two').hide();
				$('[data-parentMenuId=' + menuId + ']').show();
			}			
		}
	}

	function init(){
		initNavVue()
			.then(function(){
				initSlidebar();
			});		
		bindEvent();		
	}
	
	init();
});