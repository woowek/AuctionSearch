package com.example.demo;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.FileReader;

@Controller
public class GetAuctionDataController {
    
	//페이지 크롤링 테스트
	@RequestMapping("/AuctionSearhView")
	public void AuctionSearchViewCrawing(HttpServletResponse response) throws Exception {
		String reqUrl = "https://lostark.game.onstove.com/Auction/GetAuctionSearchDetail";
		Document doc = Jsoup.connect(reqUrl).get();
		System.out.println(doc.toString());
	}
    
    //경매장 호출 테스트
	@RequestMapping("/TestAuction")
	public void testRestAPI(HttpServletResponse response) throws Exception {
		//경매장 호출 페이지
		String reqUrl = "https://lostark.game.onstove.com/Auction/GetAuctionListV2";
		
		//reqData Setting
		HashMap<String, String> reqData = new HashMap<String, String>();
		reqData.put("request[firstCategory]", "30000");
		
		//호출
		Document doc = Jsoup.connect(reqUrl).data(reqData).post();
		//System.out.println(doc.toString());
		
		//rtnData crawing
		Elements element = doc.select("div.grade");
		Elements items = element.select("span.slot");
		for (Element el : items) {
			System.out.println(el.attr("data-item"));
		}
	}
	
	
	//market 데이터
	@RequestMapping(value = "/GetMarketJson", method = RequestMethod.GET)
	public void getMarketJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONParser parser = new JSONParser();
		String jsonFilePath =  request.getSession().getServletContext().getRealPath("/resources/json/menuJson.json");		             
		Object obj = parser.parse(new FileReader(jsonFilePath));
		JSONObject jsonObject =(JSONObject) obj;
		response.setContentType("text/html; charset=UTF-8");
    	PrintWriter out = response.getWriter();
    	out.print(jsonObject.toString());
	}

	//경매장 호출
	@RequestMapping(value="/SearchAuctionItems", method = RequestMethod.POST)
	public void searchAuctionItems(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {		
		//경매장 호출 페이지
		String reqUrl = "https://lostark.game.onstove.com/Auction/GetAuctionListV2";
		
		//reqData Setting
		HashMap<String, String> reqData = new HashMap<String, String>();
		reqData.put("request[firstCategory]", (String)param.get("request[firstCategory]"));
		reqData.put("request[secondCategory]", (String)param.get("request[secondCategory]"));
		reqData.put("request[itemTier]", (String)param.get("request[itemTier]"));
		reqData.put("request[itemGrade]", (String)param.get("request[itemGrade]"));
		reqData.put("request[pageNo]", (String)param.get("request[pageNo]"));		
		for(Integer i = 0; i < 4; i++)
		{
			if((String)param.get("request[etcOptionList][" + i.toString() + "][firstOption]")!=null)
			{
				reqData.put("request[etcOptionList][" + i.toString() + "][firstOption]", (String)param.get("request[etcOptionList][" + i.toString() + "][firstOption]"));
				reqData.put("request[etcOptionList][" + i.toString() + "][secondOption]", (String)param.get("request[etcOptionList][" + i.toString() + "][secondOption]"));				
			}
		}
		
		//페이지 넘어가며 반환 데이터 크롤링
		JSONArray jArr = new JSONArray();
		//SUAT = HD.PLD.SIGN(이걸 어떻게 뽑아....)
		//OTP 인증 후 날라오는 SUAT 쿠키값이 필요합니다...
		Document doc = Jsoup.connect(reqUrl)
	            .cookie("SUAT", (String)param.get("suatCookie"))
				.data(reqData).post();		
		
		Elements trs = doc.select("tr");
		for (Element tr : trs) {
			Elements grades = tr.select("div.grade");
			if(grades.size() > 0)
			{
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
				jArr.add(rtnObj);
			}
		}


		response.setContentType("text/html; charset=UTF-8");
    	PrintWriter out = response.getWriter();
    	out.print(jArr.toString());
	}

	public static String removeTag(String html) throws Exception {
		return html.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}
}
