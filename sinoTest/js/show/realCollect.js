function loadAll() {
	var deviceId=$("#deviceIds").val();
	var url= ctx+"/collectTask/getAllIndictorsByDeviceId?deviceId="+deviceId;
	var times=$("#times").val();
	getIndicator(url);
	rUrl = ctx+"/monitorPolicy/getCollectInterval";
	getCollectInterval(rUrl);
	$("#start").unbind("click").click(function(){
		var deviceId=$("#deviceIds").val();
		var indicators=$("#collectIndicator").formSelect("getValue");
		var cronValue=$("#cronValue").val();
		$.ajax({
	    	type:'post',
	    	url: ctx + "/monitorPolicy/taskManage?deviceId="+deviceId+"&indicators="+indicators+"&cronValue="+cronValue+"&remark=0",
	    	success: function(data){
	    		  var pUrl=ctx+"/show/master/realCollect?deviceId="+deviceId;
	    		  $('.tab-content').empty();
				 $('.tab-content').load(pUrl);
			    }
	    });
	});
	$("#stop").unbind("click").click(function(){
		var deviceId=$("#deviceIds").val();
		var indicators=$("#hideIndicators").val();
		var cronValue="";
		$.ajax({
	    	type:'post',
	    	url: ctx + "/monitorPolicy/taskManage?deviceId="+deviceId+"&indicators="+indicators+"&cronValue="+cronValue+"&remark=1",
	    	dataType: "json",
	    	async : false,
	    	success: function(data){
	    		/*  var pUrl=ctx+"/show/master/realCollect?deviceId="+deviceId+"&indicators="+indicators+"&cronValue="+cronValue;
	    		  $('#edit_list').empty();
				 $('#edit_list').load(pUrl);*/
				
			    }
	    });
	});
	getDataInit();
}
function getIndicator(url){
	
	var $fieldRole = $("#collectIndicator");
	$fieldRole.addClass("li_form");
	var options = {
		inputName : "roles",
		url :url,
		inputValue : $("#hideIndicators").attr("value"),
		showLabel : false,
		inputChange : false,
		width : "250",
		checkbox : true
	};
	options.writeType = 'show';
	$fieldRole.formSelect(options);
}
function getCollectInterval(url){
		 $('#collectInterval').empty();
			var $fieldCompDevType = $("#collectInterval");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				inputValue:$("#cronType").val(),
				url : url,
				onSelect :function(id){
					  $("#cronValue").attr("value",id);
				}  
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
}


function loadData(time,data){
//	data=eval(data);
	 $("#datas").css("height",$(window).height()-200);
	  require.config({
	        paths: {
	            echarts: '../js/plugins/echarts'
	        }
	    });
	require(
            [
                'echarts',
                'echarts/chart/line',
            ],
            function (ec){
            	var myChart=ec.init(document.getElementById('datas'));
            	option = {
            		    title : {
            		        text: '实时数据',
            		    },
            		    tooltip : {
            		        trigger: 'axis'
            		    },
            		    legend:data.legend,
            		    toolbox: {
            		        show : true,
            		        feature : {
            		            mark : {show: true},
            		            dataView : {show: true, readOnly: false},
            		            magicType : {show: true, type: ['line']},
            		            restore : {show: true},
            		            saveAsImage : {show: true}
            		        }
            		    },
            		    dataZoom : {
            		        show : false,
            		        start : 0,
            		        end : 100
            		    },
            		    xAxis : [
            		        {
            		            type : 'category',
            		            boundaryGap : true,
            		            data : (function (){
            		                var now = new Date();
            		                var res = [];
            		                var len = 10;
            		                while (len--) {
            		                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            		                    now = new Date(now - 2000);
            		                }
            		                return res;
            		            })()
            		        },
            		        {
            		        	type : 'category',
            		            boundaryGap : true,
            		            data : (function (){
            		                var res = [];
            		                var len = 10;
            		                while (len--) {
            		                    res.push(len + 1);
            		                }
            		                return res;
            		            })()
            		        }
            		    ],
            		    yAxis : [
            		        {
            		            type : 'value',
            		            scale: true,
            		            name : '',
            		            boundaryGap: [0.2, 0.2]
            		        },
            		        {
            		            type : 'value',
            		            scale: true,
            		            name : '',
            		            boundaryGap: [0.2, 0.2]
            		        }
            		    ],
            		    series : data.series
            		};
            	 myChart.setOption(option);
            		clearInterval(timeTicket);
            	var timeTicket = setInterval(function (){
            		    // 动态数据接口 addData
            		// axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
            		 var deviceId=$("#deviceIds").val();
            		  		$.ajax({
            		  	    	type:'post',
            		  	    	url: ctx + "/show/master/getRealTimeData?deviceId="+deviceId,
            		  	    	dataType : "json",
            		  	    	 success: function(data){
            		  	    		 if(null!=data){
            		  	    			 myChart.addData(
            		             		        eval(data)
            		             		    );
            		  	    		  }else{
            		  	    			clearInterval(timeTicket);
            		  	    			stopCollect();
            		  	    		  }
            		  			    }
            		  	    });
            		   
            		}, time);
            }
	);
		                    
}

function getDataInit(){
	var deviceId=$("#deviceIds").val();
	var times=$("#times").val();
	$.ajax({
    	type:'post',
    	url: ctx + "/show/master/getShowImpIndicator",
    	dataType : "json",
    	 success: function(data){
    		 if(null!=data){
    			 loadData(times,data);
    		  }
		    }
    });
}

function stopCollect(){
		var deviceId=$("#deviceIds").val();
		var indicators=$("#hideIndicators").val();
		var cronValue="";
		$.ajax({
	    	type:'post',
	    	url: ctx + "/monitorPolicy/taskManage?deviceId="+deviceId+"&indicators="+indicators+"&cronValue="+cronValue+"&remark=1",
	    	success: function(data){
			    }
	    });
}

