define(function(require, exports, module) {
	var $ = require("jquery");
	require("bootstrap");
	require("highcharts-for-seajs");	
	var inter = null;
	exports.init = function(){
		reloadFirst();
		$("#_sino_ups_tab a").click(function (e) {
			$("#_sino_ups_tabid").val($(this).attr("id"));
            $(this).tab('show');
            e.preventDefault();
            loadCon($(this).attr("href"));
        });
		loadCon('#tabs-10');
		  //HighCharts JS start
		function loadCon(tabName){
		tabName=tabName.replace('#','_');
        $('#con'+tabName).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: '气体分布'
            },
            tooltip: {
        	    pointFormat: '{series.name}:{point.percentage:.1f}%'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: false
                }
            },
            series: [{
                type: 'pie',
                name: '含量',
                data: [
                    {
                        name: '氧气',
                        y: 22.6,
                        sliced: true,
                        selected: true
                    },
                    ['氮气',    67],
                    ['二氧化碳',   10.4]
                ]
            }]
        });
		}
//		  inter = setInterval(function() {
//				startRequest();
//			}, 30000);
	 };

     
     
	 //HighCharts JS end
	 function reloadFirst(){
		 var roomId = $('#_sino_roomId').val();
			var tabid ="d5abebbf00cb10440d0b94a0642b7dd46174";
			//湿度
			var _humidity = "_humidity";
			//温度
			var _temperature ="_temperature";
			var colorGray = "undefined-state";
			//湿度
			$.ajax({
			   type: "GET",
			   url: ctx+"/show/environment/getIndicatorMotorDataFirst?roomId="+roomId+"&deviceId="+tabid+"&indicatorId=c6af29640fcd0040590b8610a0ba5847fdd0&tmp="+Math.random(),
			   success: function(msg){
				   var indicatorValue = msg.indicatorValue;
				   var indicatorState = msg.indicatorState;
				   $('#'+_humidity).text(indicatorValue);
				   if(indicatorState){
					   $('#'+_humidity).parent().removeClass(colorGray);
					   if(indicatorState == 1){
						   $('#'+_humidity).parent().addClass("normal-state");
					   } else if(indicatorState == 2){
						   $('#'+_humidity).parent().addClass("warning-state");
					   } else if(indicatorState == 3){
						   $('#'+_humidity).parent().addClass("bad-state");
					   }
						
				   }
			   }
			});
			//温度
			$.ajax({
			   type: "GET",
			   url: ctx+"/show/environment/getIndicatorMotorDataFirst?roomId="+roomId+"&deviceId="+tabid+"&indicatorId=1027498c09f34045390b7a00c72779dcf354&tmp="+Math.random(),
			   success: function(msg){
				   var indicatorValue = msg.indicatorValue;
				   var indicatorState = msg.indicatorState;				  				   
				   $('#'+_temperature).text(indicatorValue);
				   if(indicatorValue == null || indicatorValue == ""  || indicatorValue == "null")
					   $('#'+_temperature).text(0);
				  			   
				   if(indicatorState){
					   $('#'+_temperature).parent().removeClass(colorGray);
					   if(indicatorState == 1){
						   $('#'+_temperature).parent().addClass("normal-state");
					   } else if(indicatorState == 2){
						   $('#'+_temperature).parent().addClass("warning-state");
					   } else if(indicatorState == 3){
						   $('#'+_temperature).parent().addClass("bad-state");
					   }
				   }
			   }
			});
	 }
	 var i = 0;
		function startRequest(){
			var roomId = $('#_sino_roomId').val();
			var tabid ="d5abebbf00cb10440d0b94a0642b7dd46174";
			//var tabid = $("#_sino_ups_tabid").val();
			//if(tabid == undefined){
				//clearInterval(inter);
				//return;
			//}
			//if(tabid == null||tabid == ""){
				//tabid = $("#_sino_ups_tab a:first").attr("id");
			//}
			//湿度
			var _humidity = "_humidity";
			//温度
			var _temperature ="_temperature";
			//var _battery = tabid+"_battery";
			//var _exvoltage = tabid+"_exvoltage";
			//var _imvoltage = tabid+"_imvoltage";
			var colorGray = "undefined-state";
			$('#'+_humidity).parent().addClass("normal-state");
			$('#'+_humidity).text(i);
			
			//湿度
			$.ajax({
			   type: "GET",
			   url: ctx+"/show/environment/getIndicatorMotorData?roomId="+roomId+"&deviceId="+tabid+"&indicatorId=c6af29640fcd0040590b8610a0ba5847fdd0&tmp="+Math.random(),
			   success: function(msg){
				   var indicatorValue = msg.indicatorValue;
				   var indicatorState = msg.indicatorState;
				   $('#'+_humidity).text(indicatorValue);
				 
				   if(indicatorState){
					   $('#'+_humidity).parent().removeClass(colorGray);
					   if(indicatorState == 1){
						   $('#'+_humidity).parent().addClass("normal-state");
					   } else if(indicatorState == 2){
						   $('#'+_humidity).parent().addClass("warning-state");
					   } else if(indicatorState == 3){
						   $('#'+_humidity).parent().addClass("bad-state");
					   }
						
				   }
			   }
			});
			//温度
			$.ajax({
			   type: "GET",
			   url: ctx+"/show/environment/getIndicatorMotorData?roomId="+roomId+"&deviceId="+tabid+"&indicatorId=1027498c09f34045390b7a00c72779dcf354&tmp="+Math.random(),
			   success: function(msg){
				   var indicatorValue = msg.indicatorValue;
				   var indicatorState = msg.indicatorState;
				   $('#'+_temperature).text(indicatorValue);
				   if(indicatorState){
					   $('#'+_temperature).parent().removeClass(colorGray);
					   if(indicatorState == 1){
						   $('#'+_temperature).parent().addClass("normal-state");
					   } else if(indicatorState == 2){
						   $('#'+_temperature).parent().addClass("warning-state");
					   } else if(indicatorState == 3){
						   $('#'+_temperature).parent().addClass("bad-state");
					   }
				   }
			   }
			});
		}
	  $('.big').each(function(){
	   var $this= $(this),
	        page = $this.data('page');
	    $this.on('click',function(){
	      $('.page.'+page).addClass('openpage');
	      fadeDashBoard();
	    });
	  });
					          
});		