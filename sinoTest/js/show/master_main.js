	var intnumbs = null;
	var bm;
	function loadAll() {
			//返回机房地图页面
			/*$('#deviceList div[class="panel-hd"]').each(function(){
				$(this).unbind("click").click(function(){
					$(this).next().toggle();
				})
			})*/
			$("#leftRoomName li a").unbind("click").click(function(){
				window.open(ctx+"/room/cityRoomInfo?city="+$("#orgName").val(),"_self");
			})
			 var imgDevice=$("div[name='imgDevice']");
			 var roomId=$("#roomId").val();
			 var finalOut="";
			 $.each(imgDevice,function(i,n){
				var productTypeId=$(this).attr("productTypeId");
				var deviceName=$(this).attr("title");
				var deviceId=$(this).attr("id");
				if(productTypeId!=undefined){
					if(productTypeId==15){ //配电
						$(this).unbind("click").click(function(){ 
							
							$("#divv").empty();
							window.open(ctx+"/indicatorsStatistics/totalDisEvent?deviceId="+deviceId,"_self");
						/*	var options = {};
							options.keyName = "deviceId";
							options.keyValue = deviceId;
							options.murl = "indicatorsStatistics/tempShowPage";
							$.openurl(options);*/
						
						});
					}else if(productTypeId==1428974762010){//粉尘
						$(this).unbind("click").click(function(){ 
							$("#divv").empty();
							window.open(ctx+"/indicatorsStatistics/totalDisEvent?deviceId="+deviceId,"_self");
						/*	var options = {};
							options.keyName = "deviceId";
							options.keyValue = deviceId;
							options.murl = "indicatorsStatistics/tempShowPage";
							$.openurl(options);*/
						});
					}else if(productTypeId==20150414){//氢气
						$(this).unbind("click").click(function(){
							window.open(ctx+"/indicatorsStatistics/totalDisEvent?deviceId="+deviceId,"_self");
						/*	var options = {};
							options.keyName = "deviceId";
							options.keyValue = deviceId;
							options.murl = "indicatorsStatistics/tempShowPage";
							$.openurl(options);*/
						});
					}
					else if(productTypeId==6){//空调
						$(this).unbind("click").click(function(){ 
							window.open(ctx+"/indicatorsStatistics/totalDisEvent?deviceId="+deviceId,"_self");
				/*			var options = {};
							options.keyName = "deviceId";
							options.keyValue = deviceId;
							options.murl = "indicatorsStatistics/tempShowPage";
							$.openurl(options);
						*/
						});
					}else if(productTypeId==3){//UPS
						$(this).unbind("click").click(function(){ 
							window.open(ctx+"/indicatorsStatistics/totalDisEvent?deviceId="+deviceId,"_self");
						});
					} else if(productTypeId = 1387432711692){ //温湿度
						$(this).unbind("click").click(function(){ 
							window.open(ctx+"/indicatorsStatistics/totalDisEvent?deviceId="+deviceId,"_self");
						});
					}
					creatPop(deviceId);
				}
			});
		 
			$.ajax({
					type : 'POST',
					dataType: "json",//返回json格式的数据
					url : ctx+"/room/getAllDeviceState?roomId="+roomId,
					data : {},
					success : function(result) {
						$.each(result,function(i,n){
							var divId='#'+n.deviceId;
							var obj=$(divId);//获得每个图标div
							var bimg=$(obj).find('img').attr('src');
							if(bimg!=undefined)
							{
								bimg = bimg.substring(bimg.lastIndexOf("/")+1,bimg.lastIndexOf("."))
							}
							var imgUrl=ctx+"/images/roommonitor/tip/"+getImgByState(n,bimg)+"?tmp="+ Math.random();
							$(obj).find('img').attr('src',imgUrl);
						});
					 }
				});
			 
			 

			
			 //根据设备ID创建pop提示框
			 function creatPop(deviceId){
				 var roomId=$("#roomId").val();
				 var url = ctx+'/show/master/getShowTipIndicator?deviceId='+deviceId+"&roomId="+roomId
				 var indicatorStr = "";
				 var indicatorValue = "";
				 var indicatorUnit=""
				    $.ajax({
			            url: url,  // 提交的页面
			            data: "",  // 从表单中获取数据
			            type: "POST", // 设置请求类型为"POST"，默认为"GET"
			            success: function(data) {
			                showIndicator = data;
			              $.each(showIndicator,function(i,n){
			            	  if(n==null){
			            		  return;
			            	  }else{

				            		indicatorValue = n.indicatorValue;
									indicatorUnit=n.indicatorUnit;
									if(indicatorValue!=null){
										indicatorStr+='<div style="float:left;width:75px;"><div style="width:75px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;font-size:11px;">'+n.indicatorName+'</div><div  style="width:70px;margin-top:10px;margin-left:5px;color:#93aa16;font-weight:bold;">'+indicatorValue+indicatorUnit+'</div></div>';
									}
				              
			            	  }
			              });
			            }
			        });;
				var idd="#"+deviceId;
				$(idd).filter("[name='imgDevice']").popover('destroy');//先销毁pop
				$(idd).filter("[name='imgDevice']").popover({ 
					trigger:'hover',
					html:'true',
					placement:"right",
					content:function(){
						finalOut ='<div style="width:250px;height:80px;padding-top:10px;text-align: center;">'+indicatorStr+'</div>';
						return finalOut;
					}
				}); 
			 }
			 

			 
			 
			
	
			
			function getImgByState(obj,imgName){
				var h=obj.indicatorMotorDatas;
				if(obj.deviceIndicatorState==null)
				{
					for(var s in h)
					{
						obj.deviceIndicatorState=h[s].indicatorState;
					}
				}
				
				 if(obj.deviceType=='1407394761407'){//漏水
					 if(obj.deviceState=='3'){     //自监控失败,目前先默认为正常,后续变为灰色图标,不在监控状态
						 return imgName+".png";
					 }else{
						 //(obj.trapState);
						 if(obj.trapState==true){  //正常
							 return imgName+".png";
						 }else{  //异常
							 if(imgName=='loushui-icon'){ //默认漏水告警图片
								 return "loushui-alarm.gif";
							 }
							 return imgName+"3.png";
						 }
					 }
				 }
				 
				 if(obj.deviceType=='1407394778831'){//断电
					 if(obj.deviceState=='3'){     //自监控失败,目前先默认为正常,后续变为灰色图标,不在监控状态
						 return imgName+".png";
					 }else{
						 //(obj.trapState);
						 if(obj.trapState==true){  //正常
							 return imgName+".png";
						 }else{  //异常
							 if(imgName=='loushui-icon'){ //默认漏水告警图片
								 return "loushui-alarm.gif";
							 }
							 return imgName+"3.png";
						 }
					 }
				 }
				 if(obj.deviceType=='1407394735480'){//烟感
					 if(obj.deviceState=='3'){     //自监控失败,目前先默认为正常,后续变为灰色图标,不在监控状态
						 return imgName+".png";
					 }else{
						 //(obj.trapState);
						 if(obj.trapState==true){  //正常
							 return imgName+".png";
						 }else{  //异常
							 if(imgName=='loushui-icon'){ //默认漏水告警图片
								 return "loushui-alarm.gif";
							 }
							 return imgName+"3.png";
						 }
					 }
				 }
				 
				if(obj.deviceState=='3'||obj.deviceIndicatorState=='3'){  //deviceState=3设备自身不通
					return imgName+"3.png";
				}else if(obj.deviceState=='2'||obj.deviceIndicatorState=='2'){
					return imgName+"2.png";
				}else {
					return imgName+".png";
				}
			}
			
		
	}
	
	//定时取最新数据
	 clearInterval(intnumbs);
	 intnumbs = setInterval(function(){
       	if($("#_device_id").val()== undefined){
       		clearInterval(intnumbs);
               return;
       	}
//       	getDeviceNewData();
		}, 60000); 
    
    
	//ajax对设备的状态图标、温湿度数据做实时更新。
	function getDeviceNewData() {
		
		//定时获取设备最新数据
		 $.each(imgDevice,function(i,n){
				if($(this).attr("productTypeId")!=undefined){
					var productTypeId=$(this).attr("productTypeId");
					if(productTypeId=="15"||productTypeId=="6"||productTypeId=="3"||productTypeId=="1387432711692"||productTypeId=="1428974762010"||productTypeId=="20150414"){
						creatPop($(this).attr("id"));
					}
				}
		 });
		
		
			
			//获取该机房信息，更新断电、漏水
			$.ajax({
				type : 'POST',
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getRoomStateByRoomId?roomId="+roomId,
				data : {},
				success : function(result) {
					if(result.elecAlarm==1){
						$('#foo22').html("否");
						var imgUrl=ctx+"/images/roommonitor/tip/shide1.png?tmp="+ Math.random();
						$('#foo2').find('img').attr('src',imgUrl);
					}else if(result.elecAlarm==2){
						$('#foo22').html("是");
						var imgUrl=ctx+"/images/roommonitor/tip/shide2.png?tmp="+ Math.random();
						$('#foo2').find('img').attr('src',imgUrl);
					}
					
					if(result.leakAlarm==1){
						$('#foo11').html("否");
						var imgUrl=ctx+"/images/roommonitor/tip/lse1.png?tmp="+ Math.random();
						$('#foo1').find('img').attr('src',imgUrl);
					}else if(result.leakAlarm==2){
						$('#foo11').html("是");
						var imgUrl=ctx+"/images/roommonitor/tip/lse2.png?tmp="+ Math.random();
						$('#foo1').find('img').attr('src',imgUrl);
					}
				 }
			});
	}
	
	

	
