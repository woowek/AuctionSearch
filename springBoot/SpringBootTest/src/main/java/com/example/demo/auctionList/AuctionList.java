package com.example.demo.auctionList;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class AuctionList {
	public JSONArray itemListArr = new JSONArray();
	public String itemTypeStr = "";
	
	public AuctionList()
	{
		itemListArr = new JSONArray();
	}
	
	public AuctionList(String reqUrl, String suatCookie, String itemType, JSONArray engData, JSONArray optData) throws Exception
	{
        switch(itemType)
        {
            case "200010":
            	itemTypeStr = "목걸이";
                break;
            case "200020":
            	itemTypeStr = "귀걸이";
                break;
            case "200030":
            	itemTypeStr = "반지";
                break;
            default:
                break;
        }

        for(Object engItem : engData)
        {
            for(Object optItem : optData)
            {
            	//reqData Setting
        		HashMap<String, String> reqData = new HashMap<String, String>();
        		reqData.put("request[firstCategory]", "200000");
        		reqData.put("request[secondCategory]", itemType);
        		reqData.put("request[itemTier]", "3");
        		reqData.put("request[itemGrade]", "5");
        		reqData.put("request[sortOption][Sort]", "BUY_PRICE");//즉구가 정렬 기준
        		reqData.put("request[sortOption][IsDesc]", "false");//즉구가 정렬 기준
    			Integer etcIdx = 0;
        		for(Object eng : (JSONArray)engItem)
        		{
    				reqData.put("request[etcOptionList][" + etcIdx.toString() + "][firstOption]", "3");
    				reqData.put("request[etcOptionList][" + etcIdx.toString() + "][secondOption]", eng.toString());    
    				etcIdx++;
        		}
				if (itemType.equals("200010")) 
				{
					for (Object opt : (JSONArray) optItem) 
					{
						reqData.put("request[etcOptionList][" + etcIdx.toString() + "][firstOption]", "2");
						reqData.put("request[etcOptionList][" + etcIdx.toString() + "][secondOption]", opt.toString());
						etcIdx++;
					}
	        		getAuctionItemList(reqUrl, reqData, suatCookie, null);
				} 
				else 
				{
					System.out.println("optItem : " + optItem.toString());	
					for (Object opt : (JSONArray) optItem) 
					{
						System.out.println("opt : " + opt.toString());	
						reqData.put("request[etcOptionList][" + etcIdx.toString() + "][firstOption]", "2");
						reqData.put("request[etcOptionList][" + etcIdx.toString() + "][secondOption]", opt.toString());
		        		getAuctionItemList(reqUrl, reqData, suatCookie, null);
					}
				}
            }
        }
    }
        
	protected void getAuctionItemList(String reqUrl, HashMap<String, String> reqData, String suatCookie, Integer page) throws Exception
	{
		if(page == null)
		{
			page = 1;
		}	
		reqData.put("request[pageNo]", page.toString());
		System.out.println("reqData : " + reqData.toString());	
		//페이지 넘어가며 반환 데이터 크롤링
		//stove 로그인(suat) 쿠키값 필요하여 추가 파라미터 적용
		Document doc = Jsoup.connect(reqUrl)
	            .cookie("SUAT", suatCookie)
				.data(reqData).post();

		//System.out.println("doc : " + doc.toString());
		Elements trs = doc.select("tr");
		Integer itemCnt = 0;
		for (Element tr : trs) {
			Elements grades = tr.select("div.grade");
			if(grades.size() > 0)
			{
				itemCnt ++;
				Element item = grades.get(0).select("span.slot").get(0);
				Element row_price = tr.select("div.price-row em").get(0);
				Element buy_price = tr.select("div.price-buy em").get(0);
				
				//즉구가가 없는 항목은 활용하기 어려운 데이터라 제외
				String rowPrice = row_price.html().replaceAll("[^0-9]", "");
				String buyPrice = buy_price.html().replaceAll("[^0-9]", "");
				if(buyPrice.equals(""))
				{
					continue;
				}
				
				//항목별 정보
				//Element_000 : 아이템명
				//Element_001 : 아이템정보
				//Element_002 : ?
				//Element_003 : 거래회수
				//Element_004 : 거래가능유무
				//Element_005 : 착용정보
				//Element_006 : 기본효과
				//Element_007 : 특성
				//Element_008 : 각인
				//Element_009 : 품질업그레이드
				JSONParser parser = new JSONParser();
				Object obj = parser.parse(item.attr("data-item").replace("&quot;", "\""));
				JSONObject jsonObj = (JSONObject) obj;
				//필요정보
				//이름
				//품질
				//각인
				//특성
				//최저가
				//즉구가
				JSONObject rtnObj = new JSONObject();
				rtnObj.put("name", removeTag((String)((JSONObject)jsonObj.get("Element_000")).get("value")));
				rtnObj.put("quality", ((JSONObject)((JSONObject)jsonObj.get("Element_001")).get("value")).get("qualityValue"));

				List<String> rtnObjArr = new ArrayList<String>();
				for(String val : ((String)((JSONObject)((JSONObject)jsonObj.get("Element_007")).get("value")).get("Element_001")).split("<BR>"))
				{
					rtnObjArr.add(removeTag(val));
				}
				rtnObj.put("option", rtnObjArr);
				
				if(((JSONObject)jsonObj.get("Element_008")).get("type").equals("SingleTextBox"))
				{
					rtnObjArr = new ArrayList<String>();
					for(String val : ((String)((JSONObject)((JSONObject)jsonObj.get("Element_010")).get("value")).get("Element_001")).split("<BR>"))
					{
						rtnObjArr.add(removeTag(val));
					}					
				}
				else
				{
					rtnObjArr = new ArrayList<String>();
					for(String val : ((String)((JSONObject)((JSONObject)jsonObj.get("Element_008")).get("value")).get("Element_001")).split("<BR>"))
					{
						rtnObjArr.add(removeTag(val));
					}
				}
				rtnObj.put("engraving", rtnObjArr);				
				rtnObj.put("rowprice", rowPrice);
				rtnObj.put("buyprice", buyPrice);
								
				//buyPrice(즉구가 기준으로 오름차순 정렬)
				boolean isInserted = false;
				for(int i = 0 ; i < itemListArr.size(); i++)
				{
					String listItemPrice = (String)((JSONObject)itemListArr.get(i)).get("buyprice");
					if(Integer.parseInt(listItemPrice) > Integer.parseInt(buyPrice))
					{
						itemListArr.add(i, rtnObj);
						isInserted = true;
						break;
					}
				}
				if(!isInserted)
				{
					itemListArr.add(rtnObj);
					isInserted = true;
				}
			}
			System.out.println("itemCnt : " + itemCnt.toString());
		}
		if(itemCnt > 0) {
			//지연시간 0.2초 적용 문제가 있으려나..
			Thread.sleep(200);
			
			page++;
			getAuctionItemList(reqUrl, reqData, suatCookie, page);			
		}
		else {
			return;
		}
	}


	private static String removeTag(String html) throws Exception {
		return html.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}	
}
