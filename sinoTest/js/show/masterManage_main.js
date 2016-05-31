		
	function loadAll() {
			 var imgDevice=$("div[name='imgDevice']");

			 $.each(imgDevice,function(i,n){
				var productTypeId=$(this).attr("productTypeId");
				var deviceName=$(this).attr("title");
				var deviceId=$(this).attr("id");
			});
			 
			 
			$.each(imgDevice,function(i,n){
				$(this).draggable();
			});
			
			$("#editButton").unbind("click").click(function() {
				
				add();
				
			});
			
			
			//ajax提交form，上传文件
			$("#upButton").unbind("click").click(function(){
			    $("#submit_form").ajaxSubmit({
		    	  	type: "POST",  
		    	  	url: ctx+"/room/uploadIndexPage",   
		           	async : false,
		           	dataType : "text",//数据类型  
		           	success:function (msg) { 
		           		 if(msg!=null){
		               		alert("图片上传成功！");
							$(".edit_list").load(ctx + "/room/manageIndexPage");
		           		}else{
		           			alert("图片上传失败！");
		           			$(".edit_list").load(ctx + "/room/manageIndexPage");
		                  }
		           	 }
		         });  
			});
		
			
			 
			
			//取消
			$("#cancelButton").unbind("click").click(function(){ 
			
			});
			
			function add(){
				
				$("#dailogs").on("show", function (){
					
					$("#dtitle").html($('#roomforName').val());
					
					$("#dsave").unbind("click");
					$("#dsave").click(function (){
						$("#dailogs").modal("hide");
					});
				});
				$("#dailogs").on("hidden", function (){$("#dailogs").unbind("show");});
				$("#dailogs").modal({show:true});
				$("#dailogs").off("show");
			}
			
			
			
			
			//保存
			$("#saveButton").unbind("click").click(function(){ 
				var x="";
				var y="";
				var deviceId="";
				imgDevice.each(function(){
					x=x+$(this).css("left").split("px")[0]+",";
					y=y+$(this).css("top").split("px")[0]+",";
					deviceId=deviceId+$(this).attr("id")+",";
				});
				x=x.substring(0, x.length-1);
				y=y.substring(0, y.length-1);
				deviceId=deviceId.substring(0, deviceId.length-1);
				var objs={deviceId:deviceId,pointX:x,pointY:y};
				$.ajax({
					url: ctx+"/room/saveDevicePoint",   
					data: objs, 
					type: "POST",                   
					error: function(request) {       
					},
					success: function(data) {
						// 设置表单提交完成使用方法
						if(data=="success"){
							alert("保存成功！");
							var options = {};
							options.keyName = "roomId";
							options.keyValue = $("#_sino_roomId").val();
							options.murl = "show/master/master_main";;
							//$.openurl(options);
						}else{
							alert("保存失败！");
							var options = {};
							options.keyName = "roomId";
							options.keyValue = $("#_sino_roomId").val();
							options.murl = "show/master/master_main";;
							//$.openurl(options);
						}
					}	
				});
			});
		}

