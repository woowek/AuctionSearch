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
		

/*

    this.searchMaecketItem = function(itemType, engv, opt)
    {
        switch(itemType)
        {
            case "200010":
                this.typeText = "목걸이";
                break;
            case "200020":
                this.typeText = "귀걸이";
                break;
            case "200030":
                this.typeText = "반지";
                break;
            default:
                break;
        }

        for(engvArr of engv)
        {
            for(optItem of opt)
            {
                var resDataArr = new Array();
                var searchData = {
                    "request[firstCategory]":"200000",
                    "request[secondCategory]":String(itemType),
                    "request[itemTier]":"3",
                    "request[itemGrade]":"5",
                    "request[sortOption][Sort]":"BUY_PRICE",//즉구가 정렬 기준
                    "request[sortOption][IsDesc]":"false"//즉구가 정렬 기준
                };
                var etcIdx = 0;
                for(item of engvArr)
                {
                    searchData["request[etcOptionList][" + etcIdx + "][firstOption]"] = "3";
                    searchData["request[etcOptionList][" + etcIdx + "][secondOption]"] = String(item);
                    etcIdx++;
                }
                searchData["request[etcOptionList][" + etcIdx + "][firstOption]"] = "2";
                searchData["request[etcOptionList][" + etcIdx + "][secondOption]"] = String(optItem);
                searchData["suatCookie"] = $("#suatCookie").val();
                this.getAuctionData(resDataArr, itemType, searchData);
            }
        }
    };


*/
	    JSONParser jsonParse = new JSONParser();
		JSONObject reqObj = (JSONObject)jsonParse.parse(body);
		System.out.println("reqObj : " + reqObj.toString());
/*
		//reqData Setting
		HashMap<String, String> reqData = new HashMap<String, String>();
		reqData.put("request[firstCategory]", (String)param.get("request[firstCategory]"));
		reqData.put("request[secondCategory]", (String)param.get("request[secondCategory]"));
		reqData.put("request[itemTier]", (String)param.get("request[itemTier]"));
		reqData.put("request[itemGrade]", (String)param.get("request[itemGrade]"));
		reqData.put("request[sortOption][Sort]", (String)param.get("request[sortOption][Sort]"));
		reqData.put("request[sortOption][IsDesc]", (String)param.get("request[sortOption][IsDesc]"));
		for(Integer i = 0; i < 4; i++)
		{
			if((String)param.get("request[etcOptionList][" + i.toString() + "][firstOption]")!=null)
			{
				reqData.put("request[etcOptionList][" + i.toString() + "][firstOption]", (String)param.get("request[etcOptionList][" + i.toString() + "][firstOption]"));
				reqData.put("request[etcOptionList][" + i.toString() + "][secondOption]", (String)param.get("request[etcOptionList][" + i.toString() + "][secondOption]"));				
			}
		}	
    	*/
		//경매장 호출 페이지
		String reqUrl = "https://lostark.game.onstove.com/Auction/GetAuctionListV2";
		//AuctionList itemSearchList = new AuctionList(reqUrl, reqData, (String)param.get("suatCookie"));
		
		response.setContentType("text/html; charset=UTF-8");
    	PrintWriter out = response.getWriter();
    	//out.print(itemSearchList.itemListArr.toString());
    	out.print("");
	}
}
