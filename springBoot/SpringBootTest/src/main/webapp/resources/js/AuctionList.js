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

    this.getAuctionData = function(suatCookie, itemType, engvData, optData, insertTargetDiv) {
        switch (itemType) {
            case "200010":
                this.typeText = "목걸이";
                break;
            case "200020":
                this.typeText = "귀걸이";
                break;
            case "200030":
                this.typeText = "반지";
                break;
        }

        var engvCombData = new Array();
        var optCombData = new Array();
        if(engvData.length < 2)
        {
            engvCombData.push(engvData);
        }
        else{
            engvCombData = this.getCombinations(engvData, 2);
        }
        if(optData.length < 2)
        {
            optCombData.push(optData);
        }
        else{
            optCombData = this.getCombinations(optData, 2);
        }

        var parentFunc = this;
        var searchData = {suatCookie : suatCookie, itemType : itemType, engData : engvCombData, optData : optCombData};
        $.ajax({
            url: "/SearchAuctionItems",
            type: "POST",
            datatype: "json",
            data: JSON.stringify(searchData),            
            contentType: "application/json; charset=utf-8;",
            success: function (data) {
                try{
                    parentFunc.listJson = JSON.parse(data);
                    parentFunc.makeAuctionResult(parentFunc.listJson);
                    if(insertTargetDiv)
                    {
                        insertTargetDiv.appendChild(parentFunc.listObject);
                    }
                }
                catch(ex)
                {
                    return;
                }
            }
        });
    };

    this.getCombinations = function (arr, selectNumber) {
        const results = [];
        if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return
        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
            const combinations = this.getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
            const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
            results.push(...attached); // 배열 spread syntax 로 모두다 push
        });
        return results;
    }


    this.makeAuctionResult = function (jsonData) {
        var divObj = document.createElement("div");
        divObj.style.display = "inline-block";
        divObj.style.width = "calc(100% / 3 - 10px)";
        divObj.style.height = "300px";
        divObj.style.overflowY = "scroll";
        divObj.innerHTML = this.typeText + " : " + jsonData.length;

        var tableObj = document.createElement("table");
        tableObj.style.fontSize = "8pt";
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