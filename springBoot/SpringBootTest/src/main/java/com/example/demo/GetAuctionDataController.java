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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.auctionList.AuctionList;
import com.example.demo.characterInfo.CharacterInfo;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.FileReader;
import java.io.IOException;

@Controller
public class GetAuctionDataController {  	
	
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
	public void searchAuctionItems(@RequestBody String body, HttpServletResponse response) throws Exception {
	    JSONParser jsonParse = new JSONParser();
		JSONObject reqObj = (JSONObject)jsonParse.parse(body);

		//경매장 호출 페이지
		String reqUrl = "https://lostark.game.onstove.com/Auction/GetAuctionListV2";
		AuctionList itemSearchList = new AuctionList(reqUrl, (String)reqObj.get("suatCookie"), (String)reqObj.get("itemType"), (JSONArray)reqObj.get("engData"), (JSONArray)reqObj.get("optData"));
		
		response.setContentType("text/html; charset=UTF-8");
    	PrintWriter out = response.getWriter();
    	out.print(itemSearchList.itemListArr.toString());
	}

	//사용자 정보 검색
	@RequestMapping(value="/SearchCharacterInfo", method = RequestMethod.POST)
	public void searchCharacterInfo(@RequestBody String body, HttpServletResponse response) throws Exception {
		JSONParser jsonParse = new JSONParser();
		JSONObject reqObj = (JSONObject)jsonParse.parse(body);
		//사용자 정보 검색  페이지
		String reqUrl = "https://lostark.game.onstove.com/Profile/Character/" + (String)reqObj.get("characterName");
		CharacterInfo characterInfo = new CharacterInfo(reqUrl);
		response.setContentType("text/html; charset=UTF-8");
    	PrintWriter out = response.getWriter();
    	out.print("");
	}
}
