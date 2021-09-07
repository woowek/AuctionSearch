//각인정보와 특성정보로 검색 데이터를 구성
//firstCategory : 200000 고정
//secondCategory 검색은 목걸이(200010), 귀걸이(200020), 반지(200030)
//itemTier : 3티어 고정(3)
//itemGrade : 유물 고정(5)
//gradeQuality : 품질(설정 안함)
//sortOption[Sort] : 정렬기준
//-> BUY_PRICE : 즉구가
//sortOption[IsDesc] : 역순 여부
//-> true/false
//etcOptionList : 각인, 특성(request[etcOptionList][0][firstOption] 의 형태)
//-> firstOption : 각인(3)
//-> secondOption: 각인 옵션값
//-> minValue : 최소
//-> maxValue : 최대
//-------------------------------
//-> firstOption : 특성(2)
//-> secondOption : 특성 옵션값
//-> minValue: 최소
//-> maxValue : 최대
var AuctionList = function()
{
    var listJson = "";
    var listObject = "";

    this.searchMaecketItem = function(itemType, engv, opt)
    {
        for(engvArr of engv)
        {
            for(optItem of opt)
            {
                var resDataArr = new Array();
                var searchData = {
                    "request[firstCategory]":"200000",
                    "request[secondCategory]":String(itemType),
                    "request[itemTier]":"3",
                    "request[itemGrade]":"5",
                    "request[sortOption][Sort]":"BUY_PRICE",//즉구가 정렬 기준
                    "request[sortOption][IsDesc]":"false"//즉구가 정렬 기준
                };
                var etcIdx = 0;
                for(item of engvArr)
                {
                    searchData["request[etcOptionList][" + etcIdx + "][firstOption]"] = "3";
                    searchData["request[etcOptionList][" + etcIdx + "][secondOption]"] = String(item);
                    etcIdx++;
                }
                searchData["request[etcOptionList][" + etcIdx + "][firstOption]"] = "2";
                searchData["request[etcOptionList][" + etcIdx + "][secondOption]"] = String(optItem);
                searchData["suatCookie"] = $("#suatCookie").val();
                this.getAuctionData(resDataArr, itemType, searchData);
            }
        }
    }
    /*
    function searchMaecketItem_necklace(engv, opt)
    {
        $("#necklaceAuction").html("");
        for(engvArr of engv)
        {
            for(optArr of opt)
            {
                var resDataArr = new Array();
                var searchData = {
                    "request[firstCategory]":"200000",
                    "request[secondCategory]":"200010",
                    "request[itemTier]":"3",
                    "request[itemGrade]":"5",
                    "request[sortOption][Sort]":"BUY_PRICE",//즉구가 정렬 기준
                    "request[sortOption][IsDesc]":"false"//즉구가 정렬 기준
                };
                var etcIdx = 0;
                for(item of engvArr)
                {
                    searchData["request[etcOptionList][" + etcIdx + "][firstOption]"] = "3";
                    searchData["request[etcOptionList][" + etcIdx + "][secondOption]"] = String(item);
                    etcIdx++;
                }
                for(item of optArr)
                {
                    searchData["request[etcOptionList][" + etcIdx + "][firstOption]"] = "2";
                    searchData["request[etcOptionList][" + etcIdx + "][secondOption]"] = String(item);
                    etcIdx++;
                }
                searchData["suatCookie"] = $("#suatCookie").val();
                getAuctionData(resDataArr, "200010", searchData);
            }
        }
    }
    */

    this.getAuctionData = function(resArr, dataType, searchObj) {
        $.ajax({
            url: "/SearchAuctionItems",
            type: "POST",
            datatype: "json",
            data: searchObj,
            success: function (data) {
                try{
                    listJson = JSON.parse(data);
                    debugger
                }
                catch(ex)
                {
                    return;
                }
            }
        });
    }

    /*
        {
            "engraving": {
                "0": "치명 +426",
                "1": "신속 +422"
            },
            "rowprice": "2,500",
            "buyprice": "2,500",
            "name": "찬란한 구도자의 목걸이",
            "quality": 24,
            "option": {
                "0": "[슈퍼 차지] 활성도 +3",
                "1": "[원한] 활성도 +3",
                "2": "[이동속도 감소] 활성도 +1"
            }
        }
    */
   /*
<div style="display: inline-block;width:calc(100% / 3 - 10px);height:600px;">
                반지 : <span id="ringAuctionCnt"></span>
                <div style="overflow-y: scroll;height:100%;">
                    <table style="border-collapse: collapse; font-size: 8pt;table-layout: fixed;">
                        <colgroup>
                            <col style="width: 130px;"/>
                            <col style="width: 40px;"/>
                            <col style="width: 200px;"/>
                            <col style="width: 300px;"/>
                            <col style="width: 200px;"/>
                            <col style="width: 200px;"/>
                        </colgroup>
                        <tbody id="ringAuction">
                        </tbody>
                    </table>
                </div>
            </div>

   */
    this.makeAuctionResult = function(type, resArr)
    {
        var listID = "";
        var listName = "";
        switch(type)
        {
            case "200010":
                listID = "necklaceAuction";
                auctionResultNecklace = null;
                break;
            case "200020":
                listID = "earringAuction";
                auctionResultEarring = null;
                break;
            case "200030":
                listID = "ringAuction";
                auctionResultRing = null;
                break;
            default:
                return;
                break;
        }
        for(item of resArr)
        {
            var trObj = document.createElement("tr");
            trObj.style.borderTop = "1px solid black";
            trObj.style.borderBottom = "1px solid black";
            var thObj = document.createElement("th");
            thObj.setAttribute("rowspan", "2");
            thObj.innerHTML = item.name;
            trObj.appendChild(thObj);
            var thObj = document.createElement("th");
            thObj.innerHTML = "품질";
            trObj.appendChild(thObj);
            var thObj = document.createElement("th");
            thObj.innerHTML = "특성";
            trObj.appendChild(thObj);
            var thObj = document.createElement("th");
            thObj.innerHTML = "각인";
            trObj.appendChild(thObj);
            var thObj = document.createElement("th");
            thObj.innerHTML = "최소가";
            trObj.appendChild(thObj);
            var thObj = document.createElement("th");
            thObj.innerHTML = "즉구가";
            trObj.appendChild(thObj);
            $("#" + listID ).append(trObj);
            
            var trObj = document.createElement("tr");
            var tdObj = document.createElement("td");
            tdObj.innerHTML = item.quality;
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            for(el of item.engraving)
            {
                if(tdObj.innerHTML != "")
                {
                    tdObj.innerHTML += "<br>";
                }
                tdObj.innerHTML += el;
            }
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            for(el of item.option)
            {
                if(tdObj.innerHTML != "")
                {
                    tdObj.innerHTML += "<br>";
                }
                tdObj.innerHTML += el;
            }
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            tdObj.innerHTML =item.rowprice;
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            tdObj.innerHTML =item.buyprice;
            trObj.appendChild(tdObj);
            $("#" + listID ).append(trObj);
            $("#" + listID + "Cnt").html($("#" + listID ).find("tr").length/2);
        }
    }
}




