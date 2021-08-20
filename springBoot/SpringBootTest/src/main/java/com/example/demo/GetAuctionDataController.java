package com.example.demo;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.FileReader;
import com.sun.org.slf4j.internal.Logger;
import com.sun.org.slf4j.internal.LoggerFactory;

@Controller
public class GetAuctionDataController {
    private static final Logger logger = LoggerFactory.getLogger(GetAuctionDataController.class);
    
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
		for(Integer i = 0; i < 4; i++)
		{
			if((String)param.get("request[etcOptionList][" + i.toString() + "][firstOption]")!=null)
			{
				reqData.put("request[etcOptionList][" + i.toString() + "][firstOption]", (String)param.get("request[etcOptionList][" + i.toString() + "][firstOption]"));
				reqData.put("request[etcOptionList][" + i.toString() + "][secondOption]", (String)param.get("request[etcOptionList][" + i.toString() + "][secondOption]"));				
			}
		}

		System.out.println(reqData.toString());
		
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
	
}
