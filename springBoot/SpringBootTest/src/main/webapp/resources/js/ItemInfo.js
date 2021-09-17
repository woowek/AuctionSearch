var ItemInfo = function(itemType)
{
    //itemType(200010 : 목걸이, 200020 : 귀걸이, 200030 : 반지, 30000 : 돌, 00000 : 각인)
    this.itemType = itemType;//아이템 타입
    this.equipName = "";//아이템 항목
    this.itemObject = "";//태그
    this.engv = "";//각인
    this.option = "";//특성
    this.activated = true;//활성화 유무
    this.classType = "";//직업
    this.engvSelectTag = "";//각인 태그
    this.statSelectTag = "";//특성 태그
    
    this.makeItemTag = function(marketJSON, insertDiv)
    {
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
        tableObject.style.margin = "5px";
        tableObject.style.tableLayout = "fixed";
        //colgroup
        var colgroupObj = document.createElement("colgroup");
        var colObj = document.createElement("col");
        colObj.style.width = "7px";
        colgroupObj.appendChild(colObj);
        var colObj = document.createElement("col");
        colObj.style.width = "30px";
        colgroupObj.appendChild(colObj);
        var colObj = document.createElement("col");
        colgroupObj.appendChild(colObj);

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
                $(itemInfo.itemObject).find("input[type=text]").attr("disabled", false);
            }
            else{
                itemInfo.activated = false;
                $(itemInfo.itemObject).find("select").attr("disabled", true);
                $(itemInfo.itemObject).find("input[type=text]").attr("disabled", true);
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
        //장비명 -> 목걸이, 귀걸이, 반지
        if(this.itemType == "200010" || this.itemType == "200020" || this.itemType == "200030")
        {
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "장비명";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            tdObject.appendChild(selectObj);
            trObject.appendChild(tdObject);
        }
        //각인1 -> 목걸이, 귀걸이, 반지, 돌, 각인
        if(this.itemType == "200010" || this.itemType == "200020" || this.itemType == "200030" || this.itemType == "30000" || this.itemType == "00000")
        {
            var tdObject = document.createElement("td");
            tdObject.innerHTML = "각인";
            trObject.appendChild(tdObject);
            var tdObject = document.createElement("td");
            var selectObj = document.createElement("select");
            tdObject.appendChild(selectObj);
            var selectObj = document.createElement("select");
            for(var i = 0 ; i < 6; i++)
            {
                var optionObj = document.createElement("option");
                optionObj.value = i;
                optionObj.innerHTML = i;
                selectObj.appendChild(optionObj);
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
            tdObject.appendChild(selectObj);
            var selectObj = document.createElement("select");
            for(var i = 0 ; i < 6; i++)
            {
                var optionObj = document.createElement("option");
                optionObj.value = i;
                optionObj.innerHTML = i;
                selectObj.appendChild(optionObj);
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
            var selectObj = document.createElement("select");
            tdObject.appendChild(selectObj);
            var inputObj = document.createElement("input");
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
            var selectObj = document.createElement("select");
            tdObject.appendChild(selectObj);
            var inputObj = document.createElement("input");
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
            for(var i = 0 ; i < 6; i++)
            {
                var optionObj = document.createElement("option");
                optionObj.value = i;
                optionObj.innerHTML = i;
                selectObj.appendChild(optionObj);
            }
            tdObject.appendChild(selectObj);
            trObject.appendChild(tdObject);
            tableObject.appendChild(trObject);
        }

        this.itemObject = tableObject;
        if(insertDiv)
        {
            insertDiv.appendChild(this.itemObject);
        }
    }

    this.changeClass = function(classType){
        this.classType = classType;

    }
}