var ItemInfo = function(itemType)
{
    //this 선언
    var itemInfo = this;
    //itemType(200010 : 목걸이, 200020 : 귀걸이, 200030 : 반지, 30000 : 돌, 00000 : 각인)
    itemInfo.itemType = itemType;//아이템 타입
    itemInfo.equipName = "";//아이템 항목
    itemInfo.itemObject = "";//태그
    itemInfo.activated = true;//활성화 유무
    itemInfo.classType = "";//직업
    
    itemInfo.marketJson = "";//경매장 기본 데이터
    itemInfo.engType = new Array();//각인
    itemInfo.engVal = new Array();//각인값
    itemInfo.statType =  new Array();//특성
    itemInfo.statVal = new Array();//특성값
    itemInfo.debuffType =  new Array();//디버프
    itemInfo.debuffVal = new Array();//디버프값

    //함수 구성
    //1. 전체태그 생성
    //2. 각인 태그 생성
    //3. 클래스 변경

    itemInfo.makeItemTag = function(marketJSON, classType, insertDiv)
    {
        itemInfo.marketJson = marketJSON;

        var rowSpanLen = 0;
        switch (itemInfo.itemType) {
            case "200010":
                rowSpanLen = 6;
                itemInfo.equipName = "목걸이";
                break;
            case "200020":
                rowSpanLen = 5;
                itemInfo.equipName = "귀걸이";
                break;
            case "200030":
                rowSpanLen = 5;
                itemInfo.equipName = "반지";
                break;
            case "30000":
                rowSpanLen = 3;
                itemInfo.equipName = "돌";
                break;
            case "00000":
                rowSpanLen = 2;
                itemInfo.equipName = "각인";
                break;
            default:
                return;
                break;
        }
        var tableObject = document.createElement("table");
        tableObject.style.fontSize = "9pt";
        tableObject.style.marginTop = "20px";
        tableObject.style.tableLayout = "fixed";
        tableObject.style.width = "100%";
        //colgroup
        var colgroupObj = document.createElement("colgroup");
        var colObj = document.createElement("col");
        colObj.style.width = "7px";
        colgroupObj.appendChild(colObj);
        var colObj = document.createElement("col");
        colObj.style.width = "70px";
        colgroupObj.appendChild(colObj);
        var colObj = document.createElement("col");
        colObj.style.width = "70px";
        colgroupObj.appendChild(colObj);
        var colObj = document.createElement("col");
        colgroupObj.appendChild(colObj);
        tableObject.appendChild(colgroupObj);
        var trObject = document.createElement("tr");
        var tdObject = document.createElement("td");
        tdObject.rowSpan = rowSpanLen;
        //체크박스
        var chkBoxObj = document.createElement("input");
        chkBoxObj.type = "checkbox";
        chkBoxObj.onclick = function(){
            if(chkBoxObj.checked)
            {
                itemInfo.activated = true;
                $(itemInfo.itemObject).find("select").attr("disabled", false);
                $(itemInfo.itemObject).find("input").not("input[type=checkbox]").attr("disabled", false);
            }
            else{
                itemInfo.activated = false;
                $(itemInfo.itemObject).find("select").attr("disabled", true);
                $(itemInfo.itemObject).find("input").not("input[type=checkbox]").attr("disabled", true);
            }
        }
        chkBoxObj.checked = true;
        tdObject.appendChild(chkBoxObj);
        trObject.appendChild(tdObject);
        //장비종류
        var thObject = document.createElement("th");
        thObject.rowSpan = rowSpanLen;
        thObject.innerHTML = itemInfo.equipName;
        trObject.appendChild(thObject);
        //각인1 -> 목걸이, 귀걸이, 반지, 돌, 각인
        if(itemInfo.itemType == "200010" || itemInfo.itemType == "200020" || itemInfo.itemType == "200030" || itemInfo.itemType == "30000" || itemInfo.itemType == "00000")
        {
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "각인";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "engType");
            selectObj.onchange = function(event)
            {
                itemInfo.engType[0] = event.target.value;
            }
            tdObject.appendChild(selectObj);
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "engVal");
            selectObj.onchange = function(event)
            {
                itemInfo.engVal[0] = event.target.value;
            }
            switch (itemInfo.itemType) {
                case "200010":
                case "200020":
                case "200030":
                    for (var i = 0; i < 6; i++) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
                case "30000":
                    for (var i = 0; i < 11; i++) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
                case "00000":
                    for (var i = 0; i < 13; i=i+3) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
            }
            tdObject.appendChild(selectObj);
            trObject.appendChild(tdObject);
        }
        tableObject.appendChild(trObject);
        //각인2 -> 목걸이, 귀걸이, 반지, 돌, 각인
        if(itemInfo.itemType == "200010" || itemInfo.itemType == "200020" || itemInfo.itemType == "200030" || itemInfo.itemType == "30000" || itemInfo.itemType == "00000")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "각인";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "engType");
            selectObj.onchange = function(event)
            {
                itemInfo.engType[1] = event.target.value;
            }
            tdObject.appendChild(selectObj);
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "engVal");
            selectObj.onchange = function(event)
            {
                itemInfo.engVal[1] = event.target.value;
            }
            switch (itemInfo.itemType) {
                case "200010":
                case "200020":
                case "200030":
                    for (var i = 0; i < 6; i++) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
                case "30000":
                    for (var i = 0; i < 11; i++) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
                case "00000":
                    for (var i = 0; i < 13; i=i+3) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
            }
            tdObject.appendChild(selectObj);
            trObject.appendChild(tdObject);
            tableObject.appendChild(trObject);
        }
        //특성1 -> 목걸이, 귀걸이, 반지
        if(itemInfo.itemType == "200010" || itemInfo.itemType == "200020" || itemInfo.itemType == "200030")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "특성";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "statType");
            selectObj.onchange = function(event)
            {
                itemInfo.statType[0] = event.target.value;
            }
            for(var i = 0 ; i < itemInfo.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList.length; i++)
            {
                var statusOptionData = itemInfo.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList[i];
                var optionObj = document.createElement("option");
                optionObj.innerHTML = statusOptionData.text;
                optionObj.value = statusOptionData.value;
                selectObj.append(optionObj);
            }
            tdObject.appendChild(selectObj);
            var inputObj = document.createElement("input");
            inputObj.setAttribute("class", "statVal");
            inputObj.onkeydown = function(event)
            {
                if (event.key >= 0 && event.key <= 9) {
                    itemInfo.statVal[0] = event.target.value + event.key;
                    return true;
                }
                else{
                    return false;
                }
            }
            tdObject.appendChild(inputObj);
            trObject.appendChild(tdObject);
            tableObject.appendChild(trObject);
        }
        //특성2 -> 목걸이
        if(itemInfo.itemType == "200010")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "특성";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var statSelTag = document.createElement("select");
            selectObj.setAttribute("class", "statType");
            selectObj.onchange = function(event)
            {
                itemInfo.statType[1] = event.target.value;
            }
            for(var i = 0 ; i < itemInfo.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList.length; i++)
            {
                var statusOptionData = itemInfo.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList[i];
                var optionObj = document.createElement("option");
                optionObj.innerHTML = statusOptionData.text;
                optionObj.value = statusOptionData.value;
                statSelTag.append(optionObj);
            }
            tdObject.appendChild(statSelTag);
            var inputObj = document.createElement("input");
            inputObj.setAttribute("class", "statVal");
            inputObj.onkeydown = function(event)
            {
                if (event.key >= 0 && event.key <= 9) {
                    itemInfo.statVal[1] = event.target.value + event.key;
                    return true;
                }
                else{
                    return false;
                }
            }
            tdObject.appendChild(inputObj);
            trObject.appendChild(tdObject);
            tableObject.appendChild(trObject);
        }
        //디버프 -> 목걸이, 귀걸이, 반지, 돌
        if(itemInfo.itemType == "200010" || itemInfo.itemType == "200020" || itemInfo.itemType == "200030" || itemInfo.itemType == "30000")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "디버프";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "debuffType");
            selectObj.onchange = function(event)
            {
                itemInfo.debuffType[0] = event.target.value;
            }
            var optionObj = document.createElement("option");
            optionObj.value = "0";
            optionObj.innerHTML = "공격력 감소";
            selectObj.appendChild(optionObj);
            var optionObj = document.createElement("option");
            optionObj.value = "1";
            optionObj.innerHTML = "방어력 감소";
            selectObj.appendChild(optionObj);
            var optionObj = document.createElement("option");
            optionObj.value = "2";
            optionObj.innerHTML = "공격속도 감소";
            selectObj.appendChild(optionObj);
            var optionObj = document.createElement("option");
            optionObj.value = "3";
            optionObj.innerHTML = "이동속도 감소";
            selectObj.appendChild(optionObj);
            tdObject.appendChild(selectObj);
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "debuffVal");
            selectObj.onchange = function(event)
            {
                itemInfo.debuffVal[0] = event.target.value;
            }
            switch (itemInfo.itemType) {
                case "200010":
                case "200020":
                case "200030":
                    for (var i = 0; i < 4; i++) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
                case "30000":
                    for (var i = 0; i < 11; i++) {
                        var optionObj = document.createElement("option");
                        optionObj.value = i;
                        optionObj.innerHTML = i;
                        selectObj.appendChild(optionObj);
                    }
                    break;
            }
            tdObject.appendChild(selectObj);
            trObject.appendChild(tdObject);
            tableObject.appendChild(trObject);
        }
        //장비명 -> 목걸이, 귀걸이, 반지
        if(itemInfo.itemType == "200010" || itemInfo.itemType == "200020" || itemInfo.itemType == "200030")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "장비명";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            tdObject.appendChild(selectObj);
            trObject.appendChild(tdObject);
            tableObject.appendChild(trObject);
        }

        itemInfo.itemObject = tableObject;
        itemInfo.classType = classType;
        itemInfo.makeEngSelTag();
        if(insertDiv)
        {
            insertDiv.appendChild(itemInfo.itemObject);
        }

        
        for(var i = 0; i < $(itemInfo.itemObject).find(".engType").length; i++)
        {
            itemInfo.engType[i] = $(itemInfo.itemObject).find(".engType")[i].value;
            itemInfo.engVal[i] = $(itemInfo.itemObject).find(".engVal")[i].value;
        }
        for(var i = 0; i < $(itemInfo.itemObject).find(".statType").length; i++)
        {
            itemInfo.statType[i] = $(itemInfo.itemObject).find(".statType")[i].value;
            itemInfo.statVal[i] = $(itemInfo.itemObject).find(".statVal")[i].value == "" ? "0" : $(itemInfo.itemObject).find(".statVal")[i].value;
        }
        for(var i = 0; i < $(itemInfo.itemObject).find(".debuffType").length; i++)
        {
            itemInfo.debuffType[i] = $(itemInfo.itemObject).find(".debuffType")[i].value;
            itemInfo.debuffVal[i] = $(itemInfo.itemObject).find(".debuffVal")[i].value;
        }
    }

    itemInfo.makeEngSelTag = function()
    {     
        $(itemInfo.itemObject).find(".engType").html("");
        for(var i = 0 ; i < itemInfo.marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList.length; i++)
        {
            var engravingData = itemInfo.marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList[i];
            if(engravingData.class == 0 || engravingData.class == itemInfo.classType)
            {
                var optionObj = document.createElement("option");
                optionObj.innerHTML = engravingData.text;
                optionObj.value = engravingData.value;
                $(itemInfo.itemObject).find(".engType").append(optionObj);
            }
        }

        for (var i = 0; i < $(itemInfo.itemObject).find(".engType").length; i++) 
        {
            //여러개의 셀렉트 박스가 존재하기 때문에 $('.select').eq(i) 로 하나씩 가져온다.
            var oOptionList = $(itemInfo.itemObject).find(".engType").eq(i).find('option');
            oOptionList.sort(function (a, b) {
                if (a.text > b.text) return 1;
                else if (a.text < b.text) return -1;
                else {
                    if (a.value > b.value) return 1;
                    else if (a.value < b.value) return -1;
                    else return 0;
                }
            });
            $(itemInfo.itemObject).find(".engType").eq(i).html(oOptionList);
            $(itemInfo.itemObject).find(".engType").eq(i).val(0);
        }
    }

    itemInfo.changeClass = function(classType){
        itemInfo.classType = classType;
        itemInfo.makeEngSelTag();
        
        for(var i = 0; i < $(itemInfo.itemObject).find(".engType").length; i++)
        {
            itemInfo.engType[i] = $(itemInfo.itemObject).find(".engType")[i].value;
            itemInfo.engVal[i] = $(itemInfo.itemObject).find(".engVal")[i].value;
        }
        for(var i = 0; i < $(itemInfo.itemObject).find(".statType").length; i++)
        {
            itemInfo.statType[i] = $(itemInfo.itemObject).find(".statType")[i].value;
            itemInfo.statVal[i] = $(itemInfo.itemObject).find(".statVal")[i].value == "" ? "0" : $(itemInfo.itemObject).find(".statVal")[i].value;
        }
        for(var i = 0; i < $(itemInfo.itemObject).find(".debuffType").length; i++)
        {
            itemInfo.debuffType[i] = $(itemInfo.itemObject).find(".debuffType")[i].value;
            itemInfo.debuffVal[i] = $(itemInfo.itemObject).find(".debuffVal")[i].value;
        }
    }
}