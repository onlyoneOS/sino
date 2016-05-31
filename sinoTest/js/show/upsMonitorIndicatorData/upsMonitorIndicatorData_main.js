define(function(require, exports, module) {
	
	var $ = require("jquery");
	var dataTable = require("dataTables");
	require("DT_bootstrap");
	require("bootstrap");

	 function  getDeviceIndicatorHistoryData(){
		 
		 var  deviceId  = $("#deviceId").val();
		 var  indicatorId = $("#indicatorId").val();
		 var url =  ctx+"/monitorIndicatorData/queryAllMonitorIndicatorData?deviceId="+deviceId+"&indicatorId="+indicatorId;		 
			$('#taskTable').dataTable().fnDestroy();
		    $('#taskTable').dataTable({
				"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
			//	"bStateSave":false,
				"bFilter":false,
				"sAjaxSource":url, 
				//"fnServerData": fnDataTablesPipeline,
				"bRetrieve": true,
				"aoColumns": [
				             /* { "mData": "alarmTitle","mRender": function (data){
				            	  
				            	  var  rstatus = "";
				            	  var  idAndName = data.split(",");
				            	  var  id = idAndName[0];
				            	  var  name = idAndName[1];
				            	  
				            	  rstatus="<div style='float:left;' >" +
		          		  				"<div style='display:block;float:left;color:blue;'>"+
		          		  				"<a  id ='"+id+"'  href='#'  name='roomInfo' >"+name+"&nbsp&nbsp&nbsp&nbsp&nbsp</a></div> " +
		          		  				"<div style='display:none;float:right;'>" +
		          		  					
		          		  					"<a  id ='"+id+"'  href='#myModal2'  data-toggle='modal'  name='modibutton'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
		          		  					"<a  id ='"+id+"' href='#' name='delbutton'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " +
		          		  				"</div>" +
		          		  		      "</div>" ; 
	          		              return rstatus;
				              }},	*/
				              { "mData": "indicatorName"},
				              { "mData": "deviceName"},
				             // { "mData": "ipaddress"},	 
				              { "mData": "dataValueAndIndicatorUnit"},
				              { "mData": "createTime"}				              
				          ],
				"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "页显示_MENU_ 个数",
					"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
					"sSearch":"检索:",
					"sEmptyTable":"没有数据",
					"sInfoEmpty": "显示0条数据",
					"oPaginate":{
						"sPrevious": "上一页",
						"sNext":'下一页'
					}
	
				}
			
			});
					
 }
	 

 function RefreshTable(){
	  			table.fnSort( [ [1,'asc'] ] );
				table.fnSort( [ [1,'desc'] ] );
		  } 
	 
	
 /**
  *  初始化页面接口
  */
  exports.init = function(){
	  
	  //返回
	  $("#cansle").unbind('click').click(function(){	
		        
		        var roomId = $("#roomId").val();
			    var pUrl = ctx+"/show/ups/ups_main?roomId="+roomId ;
				$('#edit_list').empty();
				$('#edit_list').load(pUrl);
		 });
     
	  getDeviceIndicatorHistoryData();

  };
  


 
});
