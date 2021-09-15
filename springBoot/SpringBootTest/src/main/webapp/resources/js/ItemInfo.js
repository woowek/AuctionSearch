var ItemInfo = function(itemType, equipName)
{
    //itemType(200010 : 목걸이, 200020 : 귀걸이, 200030 : 반지, 돌이랑 각인은 그냥 )
    this.itemType = itemType;//아이템 타입
    this.equipName = equipName;//아이템 항목
    this.itemObject = "";//태그
    this.engv = "";//각인
    this.option = "";//특성
    this.activated = true;

    var rowSpanLen = 0;
    switch (itemType) {
        case "200010":
            rowSpanLen = 6;
            break;
        case "200020":
            rowSpanLen = 5;
            break;
        case "200030":
            rowSpanLen = 5;
            break;
        default:
            break;
    }
    var tableObject = document.createElement("table");
    tableObject.style.fontSize = "9pt";
    var trObject = document.createElement("tr");
    var tdObject = document.createElement("td");
    tdObject.rowSpan = rowSpanLen;
    var chkBoxObj = document.createElement("input");
    chkBoxObj.type = "checkbox";
    var itemInfo = this;
    chkBoxObj.onclick = function(this){
        if(this.checked)
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





    /*
                    <tr rowType="necklace">
                        <td rowspan="6">
                            <input type="checkbox" onclick="toggleStatus(this);" checked="checked">
                        </th>
                        <th rowspan="6">목걸이</th>
                        <td>장비명</td>
                        <td>
                            <select>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="necklace">
                        <td>각인1</td>
                        <td>
                            <select class="engraving">
                            </select>
                            <select class="engravingStatus">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="necklace">
                        <td>각인2</td>
                        <td>
                            <select class="engraving">
                            </select>
                            <select class="engravingStatus">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="necklace">
                        <td>디버프</td>
                        <td>
                            <select class="debuff">
                                <option value="0">공격력 감소</option>
                                <option value="1">방어력 감소</option>
                                <option value="2">공격속도 감소</option>
                                <option value="3">이동속도 감소</option>
                            </select>
                            <select class="debuffStatus">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                    </tr>
                    <tr rowType="necklace">
                        <td>특성1</td>
                        <td>
                            <select class="statusOption">
                            </select>
                            <input type="text" class="statusOptionDegree"/>
                        </td>
                    </tr>
                    <tr rowType="necklace">
                        <td>특성2</td>
                        <td>
                            <select class="statusOption">
                            </select>
                            <input type="text" class="statusOptionDegree"/>
                        </td>
                    </tr>
    */
    



}