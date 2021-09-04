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
	
	public AuctionList()
	{
		itemListArr = new JSONArray();
	}
	
	public AuctionList(String reqUrl, HashMap<String, String> reqData, String suatCookie) throws Exception
	{
		itemListArr = new JSONArray();
		getAuctionItemList(reqUrl, reqData, suatCookie, null);
	}
		

	protected void getAuctionItemList(String reqUrl, HashMap<String, String> reqData, String suatCookie, Integer page) throws Exception
	{
		if(page == null)
		{
			page = 1;
		}
		System.out.println("page : " + page.toString());
		
		reqData.put("request[pageNo]", page.toString());
		//페이지 넘어가며 반환 데이터 크롤링
		//stove 로그인(suat) 쿠키값 필요하여 추가 파라미터 적용
		Document doc = Jsoup.connect(reqUrl)
	            .cookie("SUAT", suatCookie)
				.data(reqData).post();

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
				rtnObj.put("engraving", rtnObjArr);
				
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
				rtnObj.put("option", rtnObjArr);				
				rtnObj.put("rowprice", row_price.html());
				rtnObj.put("buyprice", buy_price.html());
				itemListArr.add(rtnObj);
			}
			System.out.println("itemCnt : " + itemCnt.toString());
		}
		if(itemCnt > 0) {
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
