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
    var _return_tmpValue = 0;
    var _return_humValue = 0;
    var _set_temValue = 0;
    var _set_humValue = 0;
    var showIndicator = null;

    exports.init = function() {

       
        var tabid = $("#_sino_air_tabid").val();
        if (tabid == null || tabid == "") {
            tabid = $("#_sino_air_tab a:first").attr("id");
            $("#_sino_air_tabid").attr("value", tabid);
        }
        eventLatestData(tabid);
        loadIndicators();
        getShowIndicator(tabid);
        $("#_sino_air_tab a").click(function(e) {
            $("#_sino_air_tabid").val($(this).attr("id"));
            getShowIndicator($(this).attr("id"));
            startRequest();
            e.preventDefault();
            $(this).tab('show');
            eventLatestData($(this).attr("id"));
            loadIndicators();
        });
        $(".small-m").click(function(e) {
            loadIndicators();
        });

        $(".middle-m").bind("mouseover",
        function() {
            $(".p-alert-count", this).css('color', '#ffffff');

        });
        $(".middle-m").bind("mouseout",
        function() {
            $(".p-alert-count", this).css('color', '#c81623');

        });
        $(".middle-m").click(function(e) {
            var tabid = $("#_sino_air_tabid").val();
            $('.big').empty();
            var buffer = new StringBuffer();
            buffer.append('<div class="flexslider">');
            buffer.append('<ul class="slides">');
            buffer.append('</ul');
            buffer.append('</div');
            $('.big').append(buffer.toString());
            $.ajax({
                url: ctx + '/show/airCondition/getEventLatestDataInfos?deviceId=' + tabid + '&tmp=' + Math.random(),
                async: false,
                dataType: 'json',
                type: 'post',
                success: function(data) {
                    var result = data;
                    var li = "<li>";
                    var mtype, mstatus;
                    $.each(result,
                    function(i, n) {

                        li += "<div class='row-fluid portfolio-block'>" + "<div class='span2 event-state-btn' style='overflow:hidden;width:15%;' ><a  href='#'><span>warning</span></a></div>" + "<div class='span5 portfolio-text' style='overflow:hidden;width:35%'>" + "<div class='portfolio-text-info' style='float:left;overflow:hidden;width:100%' >" +

                        "<p>" + n.eventContent + "</p>" + "</div>" + "</div>" + "<div style='overflow:hidden;width:25%' class='span5'>" + "<div class='portfolio-info'>" + "<span style='font-size:15px'>" + timestampformat(n.produceTime / 1000) + "</span>" + "</div>" + "</div>" + "<div class='span2 portfolio-btn' style='float:right;width:15%'>" + "<a id='" + n.id + "' class='bigicn-only' style='background-color:#1DCA70' href='#'><span>待确认</span></a>" + "</div>" + "</div>";
                        if ((i + 1) % 4 == 0 && i != 0 && data.length != (i + 1)) {
                            li += "</li ><li>\n";
                        }
                    });
                    // 追加如tbody中
                    li += "</li>\n";
                    $(".slides").append(li);
                }
            });

            $('.row-fluid.portfolio-block').bind("mouseover",
            function() {
                $(".bigicn-only", this).css('background-color', '#70f1aa');

            });
            $('.row-fluid.portfolio-block').bind("mouseout",
            function() {

                $(".bigicn-only", this).css('background-color', '#ddd');
            });
            $('.flexslider').flexslider();
            $('.bigicn-only').on("click",
            function() {
                var mid = this.id;
                var url = ctx + '/show/airCondition/delEventLatestDataInfo?id=' + mid;
                $.ajax({
                    url: url,
                    // 提交的页面
                    data: "",
                    // 从表单中获取数据
                    type: "POST",
                    // 设置请求类型为"POST"，默认为"GET"
                    success: function(data) {

                        $("a[id='" + data + "'] span").text("已确认");
                        $("a[id='" + data + "']").parent().removeClass("portfolio-btn");
                        $("a[id='" + data + "']").parent().addClass("disportfolio-btn");

                    }
                });
            });
            $('.flexslider').flexslider();

        });
       


/*        inter = setInterval(function() {

            startRequest();
        },
        30000);*/

    };

    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    // HighCharts JS end
    function showDashBoard() {
        for (var i = 1; i <= 3; i++) {
            $('.col' + i).each(function() {
                $(this).addClass('fadeInForward-' + i).removeClass('fadeOutback');
            });
        }
    }

    function fadeDashBoard() {
        for (var i = 1; i <= 3; i++) {
            $('.col' + i).addClass('fadeOutback').removeClass('fadeInForward-' + i);
        }
    }

    function getShowIndicator(deviceId) {
        if (deviceId == "" || deviceId == null) {
            deviceId = $("#_sino_air_tab a:first").attr("id");
        }
        var roomId = $("#_sino_roomId").val()
        var url = ctx + '/show/airCondition/getShowImpIndicator?deviceId=' + deviceId + '&roomId='+roomId;
        $.ajax({
            url: url,
            // 提交的页面
            data: "",
            // 从表单中获取数据
            type: "POST",
            // 设置请求类型为"POST"，默认为"GET"
            success: function(data) {
                showIndicator = data;
                var tabid = $("#_sino_air_tabid").val();
                if (tabid == undefined) {
                    clearInterval(inter);
                    clearInterval(interHighChar);
                }
                if (tabid == null || tabid == "") {
                    tabid = $("#_sino_air_tab a:first").attr("id");
                }

              $.each(showIndicator,function(i,n){
            	  
                  $('#' + tabid +'_return_'+ i).text(n.indicatorValue+" "+n.indicatorUnit);
                  $('#' + tabid + "_" + i).html(n.indicatorName);
            	  
              });
              //  startRequest(indicatorId0, indicatorId1, indicatorId2, indicatorId3);
            }
        });
    }

    function loadIndicators() {
        var roomId = $('#_sino_roomId').val();
        var tabid = $("#_sino_air_tabid").val();
        $('.big').empty();
        var buffer = new StringBuffer();
        buffer.append('<div class="flexslider">');
        buffer.append('<ul class="slides">');
        buffer.append('</ul');
        buffer.append('</div');
        $('.big').append(buffer.toString());
        $.ajax({
            url: ctx + '/show/airCondition/getIndicatorMotorDatas?roomId=' + roomId + '&deviceId=' + tabid + '&tmp=' + Math.random(),
            async: false,
            dataType: 'json',
            type: 'post',
            success: function(data) {
                var result = data;

                var divStart = "";

                var divEnd = "</tbody></table></div></div></li>";
                divStart += "<li><div class='portlet box green'>" + "<div class='portlet-title'>" + "<div class='caption' >其他指标</div>" + "<div class='tools'>" + "<span  style='font-size:25px;color: white'>＞</span>" + "<span  style='font-size:25px;color: white;margin-left:-10%'>＞</span>" + "<span  style='font-size:25px;color: white;margin-left:-10%''>＞</span>" + "</div>" + "</div>" + "<div class='portlet-body'>" + "<table class='table table-condensed'>" + "<thead>" + "<tr>" + "<th>指标名称</th>" + "<th>指标值</th>" + "<th>采集时间</th>" + "<th class='table-td-center'>指标状态</th>" + "</tr>" + "</thead><tbody style='font-size:14px'>";
                var divContent = divStart;
                if (result != null) {
                    $.each(result,
                    function(i, n) {
                        divContent += "<tr>" + "<td>" + n.indicatorName + "</td>" + "<td>" + n.indicatorValue + n.indicatorUnit + "</td>" + "<td>" +n.createTimeString + "</td>" + "<td class='table-td-center perfect-state'><span  class='table-td-state'>" + n.indicatorState + "</span></td>";
                        if (data != null) {
                            if ((i + 1) % 6 == 0 && i != 0 && data.length != (i + 1)) {
                                divContent += divEnd + divStart;
                            }
                        }
                    });
                }
                // 追加如tbody中
                divContent += divEnd + "\n";
                $(".slides").append(divContent);
            }
        });
        $('.flexslider').flexslider({
            animation: "slide"
        });

    }

    $(".lock-thumb").click(function() {
        fadeDashBoard();
        $('.login-screen').addClass('slidePageInFromLeft').removeClass('slidePageBackLeft');
    });

    $('#unlock-button').click(function() {
        $('.login-screen').removeClass('slidePageInFromLeft').addClass('slidePageBackLeft');
        showDashBoard();
    });
    $('.big').each(function() {
        var $this = $(this),
        page = $this.data('page');
        $this.on('click',
        function() {
            $('.page.' + page).addClass('openpage');
            fadeDashBoard();
        });
    });
    $('.close-button').click(function() {
        $(this).parent().addClass('slidePageLeft').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
            $(this).removeClass('slidePageLeft').removeClass('openpage');
        });
        showDashBoard();
    });
    $('.view-demo-button').click(function() {
        $(this).parent().addClass('slideDemoOverlayUp');
        showDashBoard();
    });

    function startRequest(indicatorId0, indicatorId1, indicatorId2, indicatorId3) {
        var roomId = $('#_sino_roomId').val();
        var tabid = $("#_sino_air_tabid").val();
        if (tabid == undefined) {
            clearInterval(inter);
            clearInterval(interHighChar);
        }
        if (tabid == null || tabid == "") {
            tabid = $("#_sino_air_tab a:first").attr("id");
        }
        var _return_tmp = tabid + "_return_tmp";
        var _return_hum = tabid + "_return_hum";
        var _set_tem = tabid + "_set_tem";
        var _set_hum = tabid + "_set_hum";

        var colorGray = "undefined-state";

        if (showIndicator != null) {
            if (showIndicator.length > 0) {
                indicatorId0 = showIndicator[0].indicatorProduct.indicatorId;
            }
            if (showIndicator.length > 1) {
                indicatorId1 = showIndicator[1].indicatorProduct.indicatorId;
            }
            if (showIndicator.length > 2) {
                indicatorId2 = showIndicator[2].indicatorProduct.indicatorId;
            }
            if (showIndicator.length > 3) {
                indicatorId3 = showIndicator[3].indicatorProduct.indicatorId;
            }
        }

        // $('#'+_return_tmp).text(_return_tmpValue);
        // $('#'+_return_hum).text(_return_humValue);
        // $('#'+_set_tem).text(_set_temValue);
        // $('#'+_set_hum).text(_set_humValue);
        // 额定温度
        $.ajax({
            type: "GET",
            url: ctx + "/show/airCondition/getIndicatorMotorData?roomId=" + roomId + "&deviceId=" + tabid + "&indicatorId=" + indicatorId0 + "&tmp=" + Math.random(),
            success: function(msg) {
                var indicatorUnit = msg.indicatorUnit;
                var indicatorValue = msg.indicatorValue + indicatorUnit;
                var indicatorState = msg.indicatorState;
                if (indicatorValue == null) {
                    indicatorValue = 0;
                }
                _return_tmpValue = indicatorValue;
                $('#' + _return_tmp).text(indicatorValue);
                if (indicatorState) {
                    $('#' + _battery).parent().removeClass(colorGray);
                    if (indicatorState == 1) {
                        $('#' + _return_tmp).parent().addClass("perfect-state");
                    } else if (indicatorState == 2) {
                        $('#' + _return_tmp).parent().addClass("warning-state");
                    } else if (indicatorState == 3) {
                        $('#' + _return_tmp).parent().addClass("bad-state");
                    }

                }
            }
        });
        // 实际温度
        $.ajax({
            type: "GET",
            url: ctx + "/show/airCondition/getIndicatorMotorData?roomId=" + roomId + "&deviceId=" + tabid + "&indicatorId=" + indicatorId1 + "&tmp=" + Math.random(),
            success: function(msg) {
                var indicatorUnit = msg.indicatorUnit;
                var indicatorValue = msg.indicatorValue + indicatorUnit;
                var indicatorState = msg.indicatorState;
                if (indicatorValue == null) {
                    indicatorValue = 0;
                }
                _return_humValue = indicatorValue;
                $('#' + _return_hum).text(indicatorValue);
                if (indicatorState) {
                    $('#' + _cool).parent().removeClass(colorGray);
                    if (indicatorState == 1) {
                        $('#' + _return_hum).parent().addClass("perfect-state");
                    } else if (indicatorState == 2) {
                        $('#' + _return_hum).parent().addClass("warning-state");
                    } else if (indicatorState == 3) {
                        $('#' + _return_hum).parent().addClass("bad-state");
                    }
                }
            }
        });
        // 制冷量
        $.ajax({
            type: "GET",
            url: ctx + "/show/airCondition/getIndicatorMotorData?roomId=" + roomId + "&deviceId=" + tabid + "&indicatorId=" + indicatorId2 + "&tmp=" + Math.random(),
            success: function(msg) {
                var indicatorUnit = msg.indicatorUnit;
                var indicatorValue = msg.indicatorValue;
                var indicatorState = msg.indicatorState;
                if (indicatorValue == null) {
                    indicatorValue = 0;
                }
                _set_temValue = indicatorValue;
                $('#' + _set_tem).text(indicatorValue);
                if (indicatorState) {
                    $('#' + _set_tem).parent().removeClass(colorGray);
                    if (indicatorState == 1) {
                        $('#' + _set_tem).parent().addClass("perfect-state");
                    } else if (indicatorState == 2) {
                        $('#' + _set_tem).parent().addClass("warning-state");
                    } else if (indicatorState == 3) {
                        $('#' + _set_tem).parent().addClass("bad-state");
                    }
                }
            }
        });

        $.ajax({
            type: "GET",
            url: ctx + "/show/airCondition/getIndicatorMotorData?roomId=" + roomId + "&deviceId=" + tabid + "&indicatorId=" + indicatorId3 + "&tmp=" + Math.random(),
            success: function(msg) {
                var indicatorUnit = msg.indicatorUnit;
                var indicatorValue = msg.indicatorValue + indicatorUnit;
                var indicatorState = msg.indicatorState;
                if (indicatorValue == null) {
                    indicatorValue = 0;
                }
                _set_humValue = indicatorValue;
                $('#' + _set_hum).text(indicatorValue);
                if (indicatorState) {
                    $('#' + _set_hum).parent().removeClass(colorGray);
                    if (indicatorState == 1) {
                        $('#' + _set_hum).parent().addClass("perfect-state");
                    } else if (indicatorState == 2) {
                        $('#' + _set_hum).parent().addClass("warning-state");
                    } else if (indicatorState == 3) {
                        $('#' + _set_hum).parent().addClass("bad-state");
                    }
                }
            }
        });

    }

   //空调产生的事件
    function eventLatestData(tabid) {
        // 警报信息
        $.ajax({
            type: "GET",
            url: ctx + "/show/airCondition/getEventLatestDataInfos?deviceId=" + tabid + "&tmp=" + Math.random(),
            success: function(msg) {
                if (msg.length > 0) {
                    var eventName = msg[0].eventName;
                    var eventContent = msg[0].eventContent;
                    var eventCount = msg.length;
                    $('#' + tabid + "_airName").text(eventName);
                    $('#' + tabid + "_airContent").text(eventContent);
                    $('#' + tabid + "_airCount").text(eventCount);

                } else {
                    var noEvent = "<span class='icon-font' data-icon='&#xe619;'></span>";
                    $('#' + tabid + "_airContent").html(noEvent);
                    $('#' + tabid + "_airContent").parent().removeClass("bad-state");
                    $('#' + tabid + "_airContent").parent().addClass("undefined-state");
                }
            }
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
        if (/(y+)/.test(format) || /(Y+)/.test(format)) {
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

});