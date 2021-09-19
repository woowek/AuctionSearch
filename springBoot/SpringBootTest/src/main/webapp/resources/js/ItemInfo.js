var ItemInfo = function(itemType)
{
    //itemType(200010 : 목걸이, 200020 : 귀걸이, 200030 : 반지, 30000 : 돌, 00000 : 각인)
    this.itemType = itemType;//아이템 타입
    this.equipName = "";//아이템 항목
    this.itemObject = "";//태그
    this.activated = true;//활성화 유무
    this.classType = "";//직업
    
    this.marketJson = "";//경매장 기본 데이터
    this.engv = new Map();//각인
    this.engvVal = new Map();//각인값
    this.stat =  new Map();//특성
    this.statVal = new Map();//특성값

    //함수 구성
    //1. 전체태그 생성
    //2. 각인 태그 생성
    //3. 특성 태그 생성
    //4. 클래스 변경
    //5. 각인 변경
    //6. 각인 값 변경
    //7. 특성 변경
    //8. 특성 값 변경

    this.makeItemTag = function(marketJSON, classType, insertDiv)
    {
        this.marketJson = marketJSON;

        var rowSpanLen = 0;
        switch (this.itemType) {
            case "200010":
                rowSpanLen = 6;
                this.equipName = "목걸이";
                break;
            case "200020":
                rowSpanLen = 5;
                this.equipName = "귀걸이";
                break;
            case "200030":
                rowSpanLen = 5;
                this.equipName = "반지";
                break;
            case "30000":
                rowSpanLen = 3;
                this.equipName = "돌";
                break;
            case "00000":
                rowSpanLen = 2;
                this.equipName = "각인";
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
        var itemInfo = this;
        chkBoxObj.onclick = function(){
            debugger
            if(chkBoxObj.checked)
            {
                itemInfo.activated = true;
                $(itemInfo.itemObject).find("select").attr("disabled", false);
                $(itemInfo.itemObject).find("input").attr("disabled", false);
            }
            else{
                itemInfo.activated = false;
                $(itemInfo.itemObject).find("select").attr("disabled", true);
                $(itemInfo.itemObject).find("input").attr("disabled", true);
            }
        }
        chkBoxObj.checked = true;
        tdObject.appendChild(chkBoxObj);
        trObject.appendChild(tdObject);
        //장비종류
        var thObject = document.createElement("th");
        thObject.rowSpan = rowSpanLen;
        thObject.innerHTML = this.equipName;
        trObject.appendChild(thObject);
        //각인1 -> 목걸이, 귀걸이, 반지, 돌, 각인
        if(this.itemType == "200010" || this.itemType == "200020" || this.itemType == "200030" || this.itemType == "30000" || this.itemType == "00000")
        {
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "각인";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "engraving");
            tdObject.appendChild(selectObj);
            var selectObj = document.createElement("select");
            switch (this.itemType) {
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
            selectObj.onchange = function(event)
            {
                debugger
                this.engv["0"] = "";
            }
            tdObject.appendChild(selectObj);
            trObject.appendChild(tdObject);
        }
        tableObject.appendChild(trObject);
        //각인2 -> 목걸이, 귀걸이, 반지, 돌, 각인
        if(this.itemType == "200010" || this.itemType == "200020" || this.itemType == "200030" || this.itemType == "30000" || this.itemType == "00000")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "각인";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            selectObj.setAttribute("class", "engraving");
            tdObject.appendChild(selectObj);
            var selectObj = document.createElement("select");
            switch (this.itemType) {
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
        if(this.itemType == "200010" || this.itemType == "200020" || this.itemType == "200030")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "특성";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var statSelTag = document.createElement("select");
            for(var i = 0 ; i < this.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList.length; i++)
            {
                var statusOptionData = this.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList[i];
                var optionObj = document.createElement("option");
                optionObj.innerHTML = statusOptionData.text;
                optionObj.value = statusOptionData.value;
                statSelTag.append(optionObj);
            }
            tdObject.appendChild(statSelTag);
            var inputObj = document.createElement("input");
            inputObj.onkeydown = function(event)
            {
                if (event.key >= 0 && event.key <= 9) {
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
        if(this.itemType == "200010")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "특성";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var statSelTag = document.createElement("select");
            for(var i = 0 ; i < this.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList.length; i++)
            {
                var statusOptionData = this.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList[i];
                var optionObj = document.createElement("option");
                optionObj.innerHTML = statusOptionData.text;
                optionObj.value = statusOptionData.value;
                statSelTag.append(optionObj);
            }
            tdObject.appendChild(statSelTag);
            var inputObj = document.createElement("input");
            inputObj.onkeydown = function(event)
            {
                if (event.key >= 0 && event.key <= 9) {
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
        if(this.itemType == "200010" || this.itemType == "200020" || this.itemType == "200030" || this.itemType == "30000")
        {
            var trObject = document.createElement("tr");
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "디버프";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
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
            switch (this.itemType) {
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
        if(this.itemType == "200010" || this.itemType == "200020" || this.itemType == "200030")
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

        this.itemObject = tableObject;
        if(insertDiv)
        {
            insertDiv.appendChild(this.itemObject);
        }

        this.classType = classType;
        this.makeEngvSelTag();
    }

    this.makeEngvSelTag = function()
    {
        debugger        
        $(this.itemObject).find(".engraving").html("");
        for(var i = 0 ; i < this.marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList.length; i++)
        {
            var engravingData = this.marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList[i];
            if(engravingData.class == 0 || engravingData.class == this.classType)
            {
                var optionObj = document.createElement("option");
                optionObj.innerHTML = engravingData.text;
                optionObj.value = engravingData.value;
                $(this.itemObject).find(".engraving").append(optionObj);
            }
        }

        for (var i = 0; i < $(this.itemObject).find(".engraving").length; i++) 
        {
            //여러개의 셀렉트 박스가 존재하기 때문에 $('.select').eq(i) 로 하나씩 가져온다.
            var oOptionList = $(this.itemObject).find(".engraving").eq(i).find('option');
            oOptionList.sort(function (a, b) {
                if (a.text > b.text) return 1;
                else if (a.text < b.text) return -1;
                else {
                    if (a.value > b.value) return 1;
                    else if (a.value < b.value) return -1;
                    else return 0;
                }
            });
            $(this.itemObject).find(".engraving").eq(i).html(oOptionList);
            $(this.itemObject).find(".engraving").eq(i).val(0);
        }
    }

    this.changeClass = function(classType){
        this.classType = classType;
        this.makeEngvSelTag();
    }
}