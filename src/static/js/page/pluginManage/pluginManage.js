require(['kendo.all'], function(){

	function initTab(){
		$("#tabstrip").kendoTabStrip({
	    	animation: {
	        	open: {
	            	effects: "fadeIn"
	        	}
	    	}
		});
	}

	function init(){
		initTab();
	}

	init();   	
});