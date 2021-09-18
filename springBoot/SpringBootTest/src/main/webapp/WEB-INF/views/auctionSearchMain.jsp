<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>
<%
	SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddhhmmssSSS");
%>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="/resources/jQuery/jquery-1.9.1.min.js?ver=<%=fmt.format(new Date())%>"></script>
        <script type="text/javascript" src="/resources/jQuery/jquery-ui.min.js?ver=<%=fmt.format(new Date())%>"></script>
        <script type="text/javascript" src="/resources/js/AuctionList.js?ver=<%=fmt.format(new Date())%>"></script>
        <script type="text/javascript" src="/resources/js/ItemInfo.js?ver=<%=fmt.format(new Date())%>"></script>
        
        
        <script type="text/javascript">
            var marketJson = "";

            //장비중 데이터
            var statEngv = new Map();
            var statOpt = new Map();
            var statDebuff = new Map();


            //아이템/각인 데이터
            var necklaceItem = new ItemInfo("200010");
            var earringItem1 = new ItemInfo("200020");
            var earringItem2 = new ItemInfo("200020");
            var ringItem1 = new ItemInfo("200030");
            var ringItem2 = new ItemInfo("200030");
            var stoneItem = new ItemInfo("30000");
            var engOpt = new ItemInfo("00000");




            //목표치 데이터
            var goalEngv = new Map();
            var goalOpt = new Map();

            //필요치 데이터
            var needEngv = new Map();
            var needOpt = new Map();

            //검색 데이터            
            var searchEngvData = new Array();
            var searchOptData = new Array();

            //결과 데이터
            var necklaceAuctionList = new AuctionList();
            var earringAuctionList = new AuctionList();
            var ringAuctionList = new AuctionList();

            $( document ).ready(function() {
                var suatCookieVal = getCookie("suat");
                if(suatCookieVal!= null && suatCookieVal != "")
                {
                    $("#suatCookie").val(suatCookieVal);
                }
                getMarketData();
            });

            function getCookie(name) {
                var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                return value ? unescape(value[2]) : null;
            }
            function setCookie(name, value) {
                var cookieText = escape(name) + '=' + escape(value);
                document.cookie = cookieText;
            }


            //초기 경매장 데이터 init
            function getMarketData()
            {
                $.ajax({
                    url:"/GetMarketJson",
                    type:"get",
                    datatype:"json",
                    success:function(data){
                    	marketJson = JSON.parse(data);
                        initStatusData();
                    }
                });
            }

            //디버프는 json데이터에 없음
            //아이템명도 json데이터에 없음
            function initStatusData()
            {
                $(".selClass").html("");
                for(var i = 0 ; i < marketJson.marketClass.length; i++)
                {
                    var optionObj = document.createElement("option");
                    optionObj.innerHTML = marketJson.marketClass[i].text;
                    optionObj.value = marketJson.marketClass[i].value;
                    $(".selClass").append(optionObj);
                }
                
                $(".statusOption").html("");
                for(var i = 0 ; i < marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList.length; i++)
                {
                    var statusOptionData = marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList[i];
                    var optionObj = document.createElement("option");
                    optionObj.innerHTML = statusOptionData.text;
                    optionObj.value = statusOptionData.value;
                    $(".statusOption").append(optionObj);
                }
                initClassData();
            }
            function initClassData()
            {
                $(".engraving").html("");
                for(var i = 0 ; i < marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList.length; i++)
                {
                    var engravingData = marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList[i];
                    if(engravingData.class == 0 || engravingData.class == $(".selClass").val())
                    {
                        var optionObj = document.createElement("option");
                        optionObj.innerHTML = engravingData.text;
                        optionObj.value = engravingData.value;
                        $(".engraving").append(optionObj);
                    }
                }

                for (var i = 0; i < $(".engraving").length; i++) 
                {
                    //여러개의 셀렉트 박스가 존재하기 때문에 $('.select').eq(i) 로 하나씩 가져온다.
                    var oOptionList = $(".engraving").eq(i).find('option');
                    oOptionList.sort(function (a, b) {
                        if (a.text > b.text) return 1;
                        else if (a.text < b.text) return -1;
                        else {
                            if (a.value > b.value) return 1;
                            else if (a.value < b.value) return -1;
                            else return 0;
                        }
                    });
                    $(".engraving").eq(i).html(oOptionList);
                    $(".engraving").eq(i).val(0);
                }

                //아이템 목록 추가
                let equipDiv = document.getElementById("equipList");
                stoneItem.makeItemTag(marketJson, $(".selClass").val(), equipDiv);
                engOpt.makeItemTag(marketJson, $(".selClass").val(), equipDiv);
                necklaceItem.makeItemTag(marketJson, $(".selClass").val(), equipDiv);
                earringItem1.makeItemTag(marketJson, $(".selClass").val(), equipDiv);
                earringItem2.makeItemTag(marketJson, $(".selClass").val(), equipDiv);
                ringItem1.makeItemTag(marketJson, $(".selClass").val(), equipDiv);
                ringItem2.makeItemTag(marketJson, $(".selClass").val(), equipDiv);
            }
            
            function toggleStatus(obj)
            {
                var rowType = $(obj).closest("tr").attr("rowType");
                if($(obj).is(":checked"))
                {
                    $("tr[rowType=" + rowType + "]").find("select").attr("disabled", false);
                    $("tr[rowType=" + rowType + "]").find("input[type=text]").attr("disabled", false);
                }
                else{
                    $("tr[rowType=" + rowType + "]").find("select").attr("disabled", true);
                    $("tr[rowType=" + rowType + "]").find("input[type=text]").attr("disabled", true);
                }
            }

            function calcCurStatus()
            {
                //1. 각인 engv
                //2. 특성 statOpt
                //3. 디버프
                statEngv = new Map();
                addStatEngv("stone", statEngv);
                addStatEngv("ringEngv", statEngv);
                addStatEngv("necklace", statEngv);
                addStatEngv("earring1", statEngv);
                addStatEngv("earring2", statEngv);
                addStatEngv("ring1", statEngv);
                addStatEngv("ring2", statEngv);

                statOpt = new Map();
                addStatOpt("necklace", statOpt);
                addStatOpt("earring1", statOpt);
                addStatOpt("earring2", statOpt);
                addStatOpt("ring1", statOpt);
                addStatOpt("ring2", statOpt);

                statDebuff = new Map();
                addStatDebuff("stone", statDebuff);
                addStatDebuff("necklace", statDebuff);
                addStatDebuff("earring1", statDebuff);
                addStatDebuff("earring2", statDebuff);
                addStatDebuff("ring1", statDebuff);
                addStatDebuff("ring2", statDebuff);

                makeCurStatus(statEngv, statOpt, statDebuff)
                makeGoalStatus();
                makeGoalNeeds();
            }

            function addStatEngv(rowName, mapObj) {
                if ($("tr[rowType=" + rowName + "]").find("input[type=checkbox]").is(":checked")) {
                    $("tr[rowType=" + rowName + "]").each(function (idx, item) {
                        if ($(item).find(".engraving").length > 0) {
                            if (mapObj[$(item).find(".engraving").val()] == null) {
                                mapObj[$(item).find(".engraving").val()] = Number($(item).find(".engravingStatus").val());
                            }
                            else {
                                mapObj[$(item).find(".engraving").val()] = mapObj[$(item).find(".engraving").val()] + Number($(item).find(".engravingStatus").val());
                            }
                        }
                    });
                }
            }

            function addStatOpt(rowName, mapObj) {
                if ($("tr[rowType=" + rowName + "]").find("input[type=checkbox]").is(":checked")) {
                    $("tr[rowType=" + rowName + "]").each(function (idx, item) {
                        if ($(item).find(".statusOption").length > 0) {
                            if (mapObj[$(item).find(".statusOption").val()] == null) {
                                mapObj[$(item).find(".statusOption").val()] = Number($(item).find(".statusOptionDegree").val());
                            }
                            else {
                                mapObj[$(item).find(".statusOption").val()] = mapObj[$(item).find(".statusOption").val()] + Number($(item).find(".statusOptionDegree").val());
                            }
                        }
                    });
                }
            }

            function addStatDebuff(rowName, mapObj) {
                if ($("tr[rowType=" + rowName + "]").find("input[type=checkbox]").is(":checked")) {
                    $("tr[rowType=" + rowName + "]").each(function (idx, item) {
                        if ($(item).find(".debuff").length > 0) {
                            if (mapObj[$(item).find(".debuff").val()] == null) {
                                mapObj[$(item).find(".debuff").val()] = Number($(item).find(".debuffStatus").val());
                            }
                            else {
                                mapObj[$(item).find(".debuff").val()] = mapObj[$(item).find(".debuff").val()] + Number($(item).find(".debuffStatus").val());
                            }
                        }
                    });
                }
            }

            function makeCurStatus(engMap, optMap, debuffMap)
            {
                var tableObj = document.createElement("table");
                var engvJson = marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList;
                var num = 0;
                for(item of engvJson)
                {
                    if(engMap[item.value])
                    {
                        num++;
                        var trObj = document.createElement("tr");
                        var thObj = document.createElement("th");
                        thObj.innerHTML = "각인" + num;
                        trObj.appendChild(thObj);
                        var tdObj = document.createElement("td");
                        tdObj.innerHTML = item.text + " " + engMap[item.value];
                        trObj.appendChild(tdObj);
                        tableObj.appendChild(trObj);
                    }
                }

                var optJson = marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList;
                num = 0;
                for(item of optJson)
                {
                    if(optMap[item.value])
                    {
                        num++;
                        var trObj = document.createElement("tr");
                        var thObj = document.createElement("th");
                        thObj.innerHTML = "특성" + num;
                        trObj.appendChild(thObj);
                        var tdObj = document.createElement("td");
                        tdObj.innerHTML = item.text + " " + optMap[item.value];
                        trObj.appendChild(tdObj);
                        tableObj.appendChild(trObj);
                    }
                }


                var debuffJson = new Array();
                var debuffObj = {text:"공격력 감소", value:0};
                debuffJson.push(debuffObj);
                var debuffObj = {text:"방어력 감소", value:1};
                debuffJson.push(debuffObj);
                var debuffObj = {text:"공격속도 감소", value:2};
                debuffJson.push(debuffObj);
                var debuffObj = {text:"이동속도 감소", value:3};
                debuffJson.push(debuffObj);
                num = 0;
                for(item of debuffJson)
                {
                    if(debuffMap[item.value])
                    {
                        num++;
                        var trObj = document.createElement("tr");
                        var thObj = document.createElement("th");
                        thObj.innerHTML = "디버프" + num;
                        trObj.appendChild(thObj);
                        var tdObj = document.createElement("td");
                        tdObj.innerHTML = item.text + " " + debuffMap[item.value];
                        trObj.appendChild(tdObj);
                        tableObj.appendChild(trObj);
                    }
                }

                $("#curStatus").html("");
                $("#curStatus").append(tableObj);

            }

            function makeGoalStatus()
            {
                goalEngv = new Map();
                addStatEngv("goalEngv1", goalEngv);
                addStatEngv("goalEngv2", goalEngv);
                addStatEngv("goalEngv3", goalEngv);
                addStatEngv("goalEngv4", goalEngv);
                addStatEngv("goalEngv5", goalEngv);
                addStatEngv("goalEngv6", goalEngv);

                goalOpt = new Map();
                addStatOpt("goalStat1", goalOpt);
                addStatOpt("goalStat2", goalOpt);
                addStatOpt("goalStat3", goalOpt);
            }

            function makeGoalNeeds(){                
                var tableObj = document.createElement("table");
                var engvJson = marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList;
                var num = 0;
                needEngv = new Map();
                searchEngvData = new Array();
                for(item of engvJson)
                {
                    if(goalEngv[item.value])
                    {
                        var statVal = statEngv[item.value]!=null?Number(statEngv[item.value]):0;
                        if(statVal > Number(goalEngv[item.value]))
                        {
                            continue;
                        }
                        num++;
                        var trObj = document.createElement("tr");
                        var thObj = document.createElement("th");
                        thObj.innerHTML = "각인" + num;
                        trObj.appendChild(thObj);
                        var tdObj = document.createElement("td");
                        tdObj.innerHTML = item.text + " " + String(Number(goalEngv[item.value]) - statVal);
                        needEngv[item.value] = Number(goalEngv[item.value]) - statVal;
                        searchEngvData.push(item.value);
                        trObj.appendChild(tdObj);
                        tableObj.appendChild(trObj);
                    }
                }
                
                var optJson = marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList;
                num = 0;
                needOpt = new Map();
                searchOptData = new Array();
                for(item of optJson)
                {
                    if(goalOpt[item.value])
                    {
                        var statVal = statOpt[item.value]!=null?Number(statOpt[item.value]):0;
                        if(statVal > Number(goalOpt[item.value]))
                        {
                            continue;
                        }
                        num++;
                        var trObj = document.createElement("tr");
                        var thObj = document.createElement("th");
                        thObj.innerHTML = "특성" + num;
                        trObj.appendChild(thObj);
                        var tdObj = document.createElement("td");
                        tdObj.innerHTML = item.text + " " + String(Number(goalOpt[item.value]) - statVal);
                        needOpt[item.value] = Number(goalOpt[item.value]) - statVal;
                        searchOptData.push(item.value);
                        trObj.appendChild(tdObj);
                        tableObj.appendChild(trObj);
                    }
                }

                $("#goalNeeds").html("");
                $("#goalNeeds").append(tableObj);
            }

            function searchMarket()
            {
                setCookie("suat", $("#suatCookie").val());                
                //목걸이
                necklaceAuctionList.getAuctionData($("#suatCookie").val(), "200010", searchEngvData, searchOptData, document.getElementById("auctionList"));
                //귀걸이
                earringAuctionList.getAuctionData($("#suatCookie").val(), "200020", searchEngvData, searchOptData, document.getElementById("auctionList"));
                //반지
                ringAuctionList.getAuctionData($("#suatCookie").val(), "200030", searchEngvData, searchOptData, document.getElementById("auctionList"));
            }

        </script>
    </head>

    <body>
        <div>쿠키 : <input type="text" id="suatCookie" style="width:300px;"/></div>
        stove 로그인 후 디버깅 창에 아래 구문 실행 후 쿠키 확인
        <div style="font-size:8pt;border:1px solid black;width:450px;margin-bottom: 20px;padding:10px;">
            const t = document.createElement("textarea");<br/>
            document.body.appendChild(t);<br/>
            t.value = document.cookie.substr(document.cookie.indexOf("SUAT=") + 5).split(";")[0];<br/>
            t.select();<br/>
            document.execCommand("copy");<br/>
            document.body.removeChild(t);
        </div>        
        <div style="font-size:8pt;border:1px solid black;width:450px;margin-bottom: 20px;padding:10px;">
            검색조건<br>
            1. 즉구가 없는 물건 제외<br>
            2. 3티어<br>
            3. 유물장비
        </div>
        <div>장비 상태</div>
        <div>
            <span>클래스</span>
            <select class="selClass" onchange="initClassData();">
            </select>
            <input type="button" value="계산" onclick="calcCurStatus();"/>
            <input type="button" value="상점검색" onclick="searchMarket();"/>
        </div>
        <div>
            <div style="display:inline-block; vertical-align:top;">
                <div>현상태</div>
                <div id="equipList">
                    
                </div>
            </div>
            <div style="display:inline-block; vertical-align:top;">
                <div style="margin-top:10px;">현상태</div>
                <div id="curStatus"></div>
                <div style="margin-top:30px;">목표치</div>
                <table>
                    <tr rowType="goalEngv1">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            각인1
                        </th>
                        <td>
                            <select class="engraving">
                            </select>
                        </td>
                        <td>
                            <select class="engravingStatus">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="goalEngv2">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            각인2
                        </th>
                        <td>
                            <select class="engraving">
                            </select>
                        </td>
                        <td>
                            <select class="engravingStatus">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="goalEngv3">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            각인3
                        </th>
                        <td>
                            <select class="engraving">
                            </select>
                        </td>
                        <td>
                            <select class="engravingStatus">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="goalEngv4">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            각인4
                        </th>
                        <td>
                            <select class="engraving">
                            </select>
                        </td>
                        <td>
                            <select class="engravingStatus">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="goalEngv5">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            각인5
                        </th>
                        <td>
                            <select class="engraving">
                            </select>
                        </td>
                        <td>
                            <select class="engravingStatus">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="goalEngv6">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            각인6
                        </th>
                        <td>
                            <select class="engraving">
                            </select>
                        </td>
                        <td>
                            <select class="engravingStatus">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="goalStat1">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            특성1
                        </th>
                        <td>
                            <select class="statusOption">
                            </select>
                        </td>
                        <td>
                            <input type="text"  class="statusOptionDegree"/>
                        </td>
                    </tr>
                    <tr rowType="goalStat2">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            특성2
                        </th>
                        <td>
                            <select class="statusOption">
                            </select>
                        </td>
                        <td>
                            <input type="text"  class="statusOptionDegree"/>
                        </td>
                    </tr>
                    <tr rowType="goalStat3">                        
                        <td>
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </td>
                        <th>
                            특성3
                        </th>
                        <td>
                            <select class="statusOption">
                            </select>
                        </td>
                        <td>
                            <input type="text"  class="statusOptionDegree"/>
                        </td>
                    </tr>
                </table>
                <div style="margin-top:30px;">필요치</div>
                <div id="goalNeeds"></div>
            </div>
        </div>
        <div id="auctionList">
        </div>
    </body>

    </html>