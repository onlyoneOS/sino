define(function(require, exports, module) {
	var $ = require("jquery");
	require("bootstrap");
	require("highcharts-for-seajs");
	require('modernizr');
	var StringBuffer = require("stringBuffer");
	require('prefixfree');
	require("metrojs-for-seajs");	
	require('flexslider');
	var inter = null;
	var interHighChar = null;
	var _batteryValue = 0;
	var _exvoltageValue = 0;
	var _imvoltageValue = 0;

	var showIndicator = null;
	function load(){
		

		var tabid = $("#_sino_voltagebox_tabid").val();
		if (tabid == null || tabid == "") {
			tabid = $("#_sino_voltagebox_tab a:first").attr("id");
			$("#_sino_voltagebox_tabid").attr("value", tabid);
		}
		eventLatestData(tabid);
		loadIndicators();
		getShowIndicator(tabid);
		$("#_sino_voltagebox_tab a").click(function (e) {
			$("#_sino_voltagebox_tabid").val($(this).attr("id"));
			tabid = $("#_sino_voltagebox_tabid").val();
			$("#"+tabid+"_b").addClass("normal-state");
            $("#"+tabid+"_e").addClass("normal-state");
            $("#"+tabid+"_s").addClass("normal-state");
			getShowIndicator(tabid);
			e.preventDefault();
            $(this).tab('show');
            eventLatestData($(this).attr("id"));
			loadIndicators();
        });
		
		$(".small-m").click(function (e) {
			  loadIndicators();
		  });
		  $(".middle-m").bind(
					"mouseover",
					function() {
						$(".p-alert-count", this).css('color',
								'#ffffff');
						
					});
		  $(".middle-m").bind(
			"mouseout",
			function() {
				$(".p-alert-count", this).css('color',
						'#c81623');
				
			});
		$(".middle-m").click(function (e) {
			 var tabid = $("#_sino_voltagebox_tabid").val();
			  $('.big').empty(); 
			   var buffer = new StringBuffer();
		       buffer.append('<div class="flexslider">');
		       buffer.append('<ul class="slides">');
			   buffer.append('</ul');
			   buffer.append('</div');
			   $('.big').append(buffer.toString()); 
	    	   $.ajax({
	    			url:ctx+'/show/voltagebox/getEventLatestDataInfos?deviceId='+tabid+'&tmp='+Math.random(),
	    			async:false,
	    			dataType:'json', 
	    			type:'post',         
	    			success:function(data){
	    			var result = data;
	    			var li = "<li>";
	    			var mtype,mstatus;
	    			$.each(result, function(i, n){
	    				
	    				li+="<div class='row-fluid portfolio-block'>" +
	    				"<div class='span2 event-state-btn' style='overflow:hidden;width:15%;' ><a  href='#'><span>warning</span></a></div>"+
    					"<div class='span5 portfolio-text' style='overflow:hidden;width:35%'>" +
    					"<div class='portfolio-text-info' style='float:left;overflow:hidden;width:100%' >" +
    				
    					"<p>"+n.eventContent+"</p>" +
    					"</div>" +
    					"</div>" +
    					"<div style='overflow:hidden;width:25%' class='span5'>" +
    					"<div class='portfolio-info'>" +
    					"<span style='font-size:15px'>"+timestampformat(n.produceTime/1000)+"</span>" +
    					"</div>" +
    					"</div>" +
    					"<div class='span2 portfolio-btn' style='float:right;width:15%'>" +
    					"<a id='"+n.id +"' class='bigicn-only' style='background-color:#1DCA70' href='#'><span>待确认</span></a>" +
    					"</div>" +
    					"</div>";
    				if((i+1)%4==0&&i!=0&&data.length!=(i+1))
    					{li+="</li ><li>\n";}
    			});
	    			//追加如tbody中 
	    			li+="</li>\n";
	    			  $(".slides").append(li);
	    			}});
	    			
	    		$('.row-fluid.portfolio-block').bind(
						"mouseover",
						function() {
							$(".bigicn-only", this).css('background-color',
									'#70f1aa');
							
						});
	    		$('.row-fluid.portfolio-block').bind(
						"mouseout",
						function() {

							$(".bigicn-only", this).css('background-color',
									'#ddd');
						});
	    		 $('.flexslider').flexslider();
		    	 $('.bigicn-only').on("click", function(){
						var mid = this.id;
						var url = ctx+'/show/voltagebox/delEventLatestDataInfo?id='+mid;
						$.ajax({
									url : url, // 提交的页面
									data : "", // 从表单中获取数据
									type : "POST", // 设置请求类型为"POST"，默认为"GET"
								
									success : function(data) {
										
										$("a[id='"+data+"'] span").text("已确认");
										$("a[id='"+data+"']").parent().removeClass("portfolio-btn");
										$("a[id='"+data+"']").parent().addClass("disportfolio-btn");

									}
								});
  });

		  });
		$('.flexslider').flexslider();
		
	
/*		
		inter = setInterval(function() {

			reloadFirst();
		}, 30000);*/
		
		
	}
	
	function GetRandomNum(Min,Max){   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}   

	
	function getShowIndicator(deviceId){
		var ids=$('div[class="tab-pane active"]').attr("id");
		var deviceId=ids.substring(0,ids.indexOf("_"));
		 var roomId = $("#_sino_roomId").val()
		 var url = ctx+'/show/voltagebox/getShowImpIndicator?deviceId='+ deviceId + '&roomId='+roomId;
		 $.ajax({
	            url: url,
	            // 提交的页面
	            data: "",
	            // 从表单中获取数据
	            type: "POST",
	            // 设置请求类型为"POST"，默认为"GET"
	            success: function(data) {
	                showIndicator = data;
	                var tabid = $("#_sino_voltagebox_tabid").val();
	                if (tabid == undefined) {
	                    clearInterval(inter);
	                    clearInterval(interHighChar);
	                }
	                if (tabid == null || tabid == "") {
	                    tabid = $("#_sino_voltagebox_tab a:first").attr("id");
	                }

	              $.each(showIndicator,function(i,n){
	            	  $("#"+tabid+"_b").addClass("normal-state");
	                  $("#"+tabid+"_s").addClass("normal-state");
	                  $("#"+tabid+"_e").addClass("normal-state");
	                  $('#' + tabid +'_voltagebox_'+ i).text(n.indicatorValue+" "+n.indicatorUnit);
	                  $('#' + tabid + "_" + i).html(n.indicatorName);
	            	  
	              });
	              //  startRequest(indicatorId0, indicatorId1, indicatorId2, indicatorId3);
	            }
	        });
	 }
	
	function eventLatestData(tabid){
		//警报信息
		$.ajax({
		   type: "GET",
		   url: ctx+"/show/voltagebox/getEventLatestDataInfos?deviceId="+tabid+"&tmp="+Math.random(),
		   success: function(msg){
			   if(msg.length>0){
				   var eventName = msg[0].eventName;
				   var eventContent = msg[0].eventContent;
				   //var eventLevel = msg.eventLatestDataInfos[0].eventLevel;
				   var eventCount = msg.length;
				   $('#'+tabid+"_voltageName").text(eventName);
				   $('#'+tabid+"_voltageContent").text(eventContent);
				   $('#'+tabid+"_voltageCount").text(eventCount);
				   
			   }else{
				   var noEvent ="<span class='icon-font' data-icon='&#xe619;'></span>";
				   $('#'+tabid+"_voltageContent").html(noEvent);
				   $('#'+tabid+"_voltageContent").parent().removeClass("bad-state");
				   $('#'+tabid+"_voltageContent").parent().addClass("undefined-state");
			   }
		   }
		});
	}
	function startRequest(){
		var roomId = $('#_sino_roomId').val();
		var tabid = $("#_sino_voltagebox_tabid").val();
		if(tabid == undefined){
			clearInterval(inter);
			clearInterval(interHighChar);
			return;
		}
		if(tabid == null||tabid == ""){
			tabid = $("#_sino_voltagebox_tab a:first").attr("id");
			$("#_sino_voltagebox_tab").attr("value",tabid);
		}
		var _battery = tabid+"_battery";
		var _exvoltage = tabid+"_exvoltage";
		var _imvoltage = tabid+"_imvoltage";
		
		var colorGray = "undefined-state";
//		$('#'+_battery).parent().addClass("normal-state");
		var indicatorId0 = "";
		var indicatorId1 = "";
		var indicatorId2 = "";
		if(showIndicator != null){
			if(showIndicator.length > 0){
				indicatorId0 = showIndicator[0].indicatorProduct.indicatorId;
			}
			if(showIndicator.length > 1){
				indicatorId1 = showIndicator[1].indicatorProduct.indicatorId;
			}
			if(showIndicator.length > 2){
				indicatorId2 = showIndicator[2].indicatorProduct.indicatorId;
			}
		}
		//电池电压
		$.ajax({
		   type: "GET",
		   url: ctx+"/show/voltagebox/getIndicatorMotorData?roomId="+roomId+"&deviceId="+tabid+"&indicatorId="+indicatorId0+"&tmp="+Math.random(),
		   success: function(msg){
			   var indicatorUnit = msg.indicatorUnit;
			   var indicatorValue = msg.indicatorValue+indicatorUnit;
			   var indicatorState = msg.indicatorState;
			   indicatorValue = _batteryValue;
			   $('#'+_battery).text(indicatorValue);
			   if(indicatorState){
				   $('#'+_battery).parent().removeClass(colorGray);
				   if(indicatorState == 1){
					   $('#'+_battery).parent().addClass("normal-state");
				   } else if(indicatorState == 2){
					   $('#'+_battery).parent().addClass("warning-state");
				   } else if(indicatorState == 3){
					   $('#'+_battery).parent().addClass("bad-state");
				   }
					
			   }
		   }
		});
		//输出电压
		$.ajax({
		   type: "GET",
		   url: ctx+"/show/voltagebox/getIndicatorMotorData?roomId="+roomId+"&deviceId="+tabid+"&indicatorId="+indicatorId1+"&tmp="+Math.random(),
		   success: function(msg){
			   var indicatorUnit = msg.indicatorUnit;
			   var indicatorValue = msg.indicatorValue+indicatorUnit;
			   var indicatorState = msg.indicatorState;
			   indicatorValue = _exvoltageValue;
			   $('#'+_exvoltage).text(indicatorValue);
			   if(indicatorState){
				   $('#'+_exvoltage).parent().removeClass(colorGray);
				   if(indicatorState == 1){
					   $('#'+_exvoltage).parent().addClass("normal-state");
				   } else if(indicatorState == 2){
					   $('#'+_exvoltage).parent().addClass("warning-state");
				   } else if(indicatorState == 3){
					   $('#'+_exvoltage).parent().addClass("bad-state");
				   }
			   }
		   }
		});
		//输入电压
		$.ajax({
		   type: "GET",
		   url: ctx+"/show/voltagebox/getIndicatorMotorData?roomId="+roomId+"&deviceId="+tabid+"&indicatorId="+indicatorId2+"&tmp="+Math.random(),
		   success: function(msg){
			   var indicatorUnit = msg.indicatorUnit;
			   var indicatorValue = msg.indicatorValue+indicatorUnit;
			   var indicatorState = msg.indicatorState;
			   indicatorValue = _imvoltageValue;
			   $('#'+_imvoltage).text(indicatorValue);
			   if(indicatorState){
				   $('#'+_imvoltage).parent().removeClass(colorGray);
				   if(indicatorState == 1){
					   $('#'+_imvoltage).parent().addClass("normal-state");
				   } else if(indicatorState == 2){
					   $('#'+_imvoltage).parent().addClass("warning-state");
				   } else if(indicatorState == 3){
					   $('#'+_imvoltage).parent().addClass("bad-state");
				   }
			   }
		   }
		});
		
	}
	
	  function loadIndicators(){
		  var roomId = $('#_sino_roomId').val();
		  var tabid = $("#_sino_voltagebox_tabid").val();
		  $('.big').empty(); 
		  var buffer = new StringBuffer();
	       buffer.append('<div class="flexslider">');
	       buffer.append('<ul class="slides">');
		   buffer.append('</ul');
		   buffer.append('</div');
		   $('.big').append(buffer.toString()); 
		   $.ajax({
   			url:ctx+'/show/voltagebox/getIndicatorMotorDatas?roomId='+roomId+'&deviceId='+tabid+'&tmp='+Math.random(),
			async:false,
			dataType:'json', 
			type:'post',         
			success:function(data){
			var result = data;
			
			var divStart ="";
			
			var divEnd = "</tbody></table></div></div></li>";
			divStart+="<li><div class='portlet box green'>"+
			"<div class='portlet-title'>"+
			"<div class='caption' >其他指标</div>"+
			"<div class='tools'>"+
				"<span  style='font-size:25px;color: white'>＞</span>"+
				"<span  style='font-size:25px;color: white;margin-left:-10%'>＞</span>"+
				"<span  style='font-size:25px;color: white;margin-left:-10%''>＞</span>"+
				"</div>"+
			"</div>"+
			"<div class='portlet-body'>"+
			"<table class='table table-condensed'>"+
				"<thead>"+
					"<tr>"+
						"<th>指标名称</th>"+
						"<th>指标值</th>"+
						"<th>采集时间</th>"+
						"<th class='table-td-center'>指标状态</th>"+
					"</tr>"+
				"</thead><tbody style='font-size:14px'>";
			var divContent=divStart;
			if(result!=null){
			$.each(result, function(i, n){	
				
				var indicatorstatus = n.indicatorState;
            	if(indicatorstatus=='1'){
            		indicatorstatus="正常"
            	}else if(indicatorstatus=='2'){
            		indicatorstatus="警告"
            	}else if(indicatorstatus=='3'){
            		indicatorstatus="异常"
            	}
				divContent+="<tr>"+
				"<td>"+n.indicatorName+"</td>"+
				"<td>"+n.indicatorValue+n.indicatorUnit+"</td>"+
				"<td>"+timestampformat(n.createTime/1000)+"</td>"+
				"<td class='table-td-center perfect-state'><span  class='table-td-state'>"+indicatorstatus+"</span></td>";
				if(data!=null){
    				if((i+1)%6==0&&i!=0&&data.length!=(i+1))
					{
    					divContent+=divEnd+divStart;
    					}
				}
				
			
		});}
		//追加如tbody中 
		divContent+=divEnd+"\n";
		  $(".slides").append(divContent);
		}});
		   $('.flexslider').flexslider({
		        animation: "slide",
		        pauseOnHover:"true"
		        	
		   });
	  
    }
	  Date.prototype.format = function(format) {
		  var o = {       
				  "M+": this.getMonth() + 1,      
				  // month       
				  "d+": this.getDate(),   
				  // day       
				  "h+": this.getHours(),    
				  // hour       
				  "m+": this.getMinutes(),  
				  // minute      
				  "s+": this.getSeconds(),   
				  // second     
				  "q+": Math.floor((this.getMonth() + 3) / 3), 
				  // quarter     
				  "S": this.getMilliseconds()    
				  // millisecond    
				  };  
				  if (/(y+)/.test(format) || /(Y+)/.test(format))
				  {      
					  format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
				  }  
				  for (var k in o) {   
					  if (new RegExp("(" + k + ")").test(format)) {   
						  format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
						  }   
					  }   
				  return format;
				  };
				  
				  function timestampformat(timestamp) {  
					  return (new Date(timestamp * 1000)).format("yyyy-MM-dd hh:mm:ss");
				} 
	exports.init = function(){
		load();  
	};
});
