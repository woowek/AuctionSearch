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
var AuctionList = function(){
    this.typeText = "";
    this.listJson = "";
    this.listObject = "";
    this.searchEndFunc = "";

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
    this.searchMaecketItem = function(itemType, engv, opt)
    {
        switch(itemType)
        {
            case "200010":
                this.typeText = "목걸이";
                break;
            case "200020":
                this.typeText = "귀걸이";
                break;
            case "200030":
                this.typeText = "반지";
                break;
            default:
                break;
        }

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
    };

    this.getAuctionData = function(resArr, dataType, searchObj) {
        var parentFunc = this;
        $.ajax({
            url: "/SearchAuctionItems",
            type: "POST",
            datatype: "json",
            data: searchObj,
            success: function (data) {
                try{
                    parentFunc.listJson = JSON.parse(data);
                    parentFunc.makeAuctionResult(parentFunc.listJson);
                    debugger
                }
                catch(ex)
                {
                    return;
                }
            }
        });
    };

    this.makeAuctionResult = function (jsonData) {
        var divObj = document.createElement("div");
        divObj.style.display = "inline-block";
        divObj.style.width = "calc(100% / 3 - 10px)";
        divObj.style.height = "600px";
        debugger
        divObj.innerHTML = this.typeText + " : " + jsonData.length;

        var tableObj = document.createElement("table");
        for (item of jsonData) {
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
            tableObj.append(trObj);

            var trObj = document.createElement("tr");
            var tdObj = document.createElement("td");
            tdObj.innerHTML = item.quality;
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            for (el of item.option) {
                if (tdObj.innerHTML != "") {
                    tdObj.innerHTML += "<br>";
                }
                tdObj.innerHTML += el;
            }
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            for (el of item.engraving) {
                if (tdObj.innerHTML != "") {
                    tdObj.innerHTML += "<br>";
                }
                tdObj.innerHTML += el;
            }
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            tdObj.innerHTML = item.rowprice;
            trObj.appendChild(tdObj);
            var tdObj = document.createElement("td");
            tdObj.innerHTML = item.buyprice;
            trObj.appendChild(tdObj);
            tableObj.append(trObj);
        }
        divObj.append(tableObj);
        this.listObject = divObj;
    };
    
}