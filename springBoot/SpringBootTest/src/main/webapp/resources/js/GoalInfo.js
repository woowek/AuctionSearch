var GoalInfo = function(type)
{
    //this 선언
    var goalInfo = this;
    //
    goalInfo.activated = true;//활성화 유무
    goalInfo.goalObject = "";//태그
    goalInfo.type = type;
    goalInfo.goalType = "";
    goalInfo.goalVal = "";
    goalInfo.marketJson = "";//경매장 기본 데이터
    goalInfo.classType = "";

    goalInfo.makeGoalTag = function(marketJSON, classType, insertDiv)
    {
        goalInfo.marketJson = marketJSON;
        var divObj = document.createElement("div");
        var chkBoxObj = document.createElement("input");
        chkBoxObj.type = "checkbox";
        chkBoxObj.onclick = function(){
            if(chkBoxObj.checked)
            {
                goalInfo.activated = true;
                $(goalInfo.goalObject).find("select").attr("disabled", false);
                $(goalInfo.goalObject).find("input").not("input[type=checkbox]").attr("disabled", false);
            }
            else{
                goalInfo.activated = false;
                $(goalInfo.goalObject).find("select").attr("disabled", true);
                $(goalInfo.goalObject).find("input").not("input[type=checkbox]").attr("disabled", true);
            }
        }
        divObj.appendChild(chkBoxObj);
        switch(goalInfo.type)
        {
            case "ENG":
                var spanObj = document.createElement("span");
                spanObj.innerHTML = "각인";
                divObj.appendChild(spanObj);
                var selectObj = document.createElement("select");
                selectObj.setAttribute("class", "engType");
                selectObj.onchange = function(event)
                {
                    goalInfo.goalType = event.target.value;
                }
                divObj.appendChild(selectObj);
                var selectObj = document.createElement("select");
                selectObj.setAttribute("class", "engVal");
                selectObj.onchange = function(event)
                {
                    goalInfo.goalVal = event.target.value;
                }
                divObj.appendChild(selectObj);
                break;
            case "STAT":
                var spanObj = document.createElement("span");
                spanObj.innerHTML = "특성";
                divObj.appendChild(spanObj);
                var selectObj = document.createElement("select");
                selectObj.setAttribute("class", "statType");
                selectObj.onchange = function(event)
                {
                    goalInfo.goalType = event.target.value;
                }
                for(var i = 0 ; i < goalInfo.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList.length; i++)
                {
                    var statusOptionData = goalInfo.marketJson.marketAuction.marketMenuAuctionEtcList[1].marketMenuEtcOptionSubList[i];
                    var optionObj = document.createElement("option");
                    optionObj.innerHTML = statusOptionData.text;
                    optionObj.value = statusOptionData.value;
                    selectObj.append(optionObj);
                }
                divObj.appendChild(selectObj);
                var inputObj = document.createElement("input");
                inputObj.setAttribute("class", "statVal");
                inputObj.onkeydown = function(event)
                {
                    if (event.key >= 0 && event.key <= 9) {
                        goalInfo.goalVal = event.target.value + event.key;
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                divObj.appendChild(inputObj);
                break;
            default:
                return;
                break;
        }

        goalInfo.goalObject = divObj;
        goalInfo.classType = classType;
        goalInfo.makeEngSelTag();
        if(insertDiv)
        {
            insertDiv.appendChild(goalInfo.goalObject);
        }
    }

    
    goalInfo.makeEngSelTag = function()
    {     
        $(goalInfo.goalObject).find(".engType").html("");
        for(var i = 0 ; i < goalInfo.marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList.length; i++)
        {
            var engravingData = goalInfo.marketJson.marketAuction.marketMenuAuctionEtcList[2].marketMenuEtcOptionSubList[i];
            if(engravingData.class == 0 || engravingData.class == goalInfo.classType)
            {
                var optionObj = document.createElement("option");
                optionObj.innerHTML = engravingData.text;
                optionObj.value = engravingData.value;
                $(goalInfo.goalObject).find(".engType").append(optionObj);
            }
        }

        for (var i = 0; i < $(goalInfo.goalObject).find(".engType").length; i++) 
        {
            //여러개의 셀렉트 박스가 존재하기 때문에 $('.select').eq(i) 로 하나씩 가져온다.
            var oOptionList = $(goalInfo.goalObject).find(".engType").eq(i).find('option');
            oOptionList.sort(function (a, b) {
                if (a.text > b.text) return 1;
                else if (a.text < b.text) return -1;
                else {
                    if (a.value > b.value) return 1;
                    else if (a.value < b.value) return -1;
                    else return 0;
                }
            });
            $(goalInfo.goalObject).find(".engType").eq(i).html(oOptionList);
            $(goalInfo.goalObject).find(".engType").eq(i).val(0);
        }
    }

    goalInfo.changeClass = function(classType){
        goalInfo.classType = classType;
        goalInfo.makeEngSelTag();
        goalInfo.goalType = "";
        goalInfo.goalVal = "";
    }
}