package com.example.demo.characterInfo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class CharacterInfo {
	class EquipInfo{
		String itemName = "";
		String statInfo = "";
		String engInfo = "";
		String debuffInfo = "";
	}
	EquipInfo necklace = new EquipInfo(); 
	EquipInfo earring1 = new EquipInfo();
	EquipInfo earring2 = new EquipInfo();
	EquipInfo ring1 = new EquipInfo();
	EquipInfo ring2 = new EquipInfo();
	
	String itemJSONData = "";
	public CharacterInfo(String reqUrl) throws Exception
	{
		Document doc = Jsoup.connect(reqUrl).get();
		Elements scripts = doc.select("script");
		for(Element script : scripts)
		{
			if(script.html().indexOf("$.Profile") >= 0)
			{
				itemJSONData = script.html();				
				String regexStr ="(\\{)[^^]+(\\})";
		        Pattern pattern = Pattern.compile(regexStr);
		        Matcher matcher = pattern.matcher(itemJSONData);
				if(matcher.find())
				{
					itemJSONData = matcher.group();
					JSONParser parser = new JSONParser();
					Object obj = parser.parse(itemJSONData);
					JSONObject userInfoJSON = (JSONObject) obj;
					//Engrave : 각인 정보
					if(userInfoJSON.get("Engrave") != null)
					{
						//각인 정보
						//Element_000 -> value: 각인명
						//Element_001 -> value -> leftText : 추출 데이터
						JSONObject engInfo = (JSONObject)userInfoJSON.get("Engrave");
						Set<String> keyList = engInfo.keySet();
						Iterator iter=keyList.iterator();
				    	String engName = "";
				    	String engData = "";
		    			JSONObject engSubInfo;
					    while(iter.hasNext()){
					    	String keyStr = iter.next().toString();
					    	engSubInfo = (JSONObject)engInfo.get(keyStr);
					    	engName = (String)((JSONObject)engSubInfo.get("Element_000")).get("value");
					    	engData = (String)((JSONObject)((JSONObject)engSubInfo.get("Element_001")).get("value")).get("leftText");
							System.out.println(engName);
							System.out.println(engData);
					    }
					}
					//Equip : 장비/보석(장신구만 추출 필요)
					if(userInfoJSON.get("Equip") != null)
					{
						//각인 정보
						//Gem_번호 : 보석(제외)
						//idx 006 ~ 010 : 악세사리(006 : 목걸이, 007,008 : 귀걸이, 009,010 : 반지)
						//idx 011 : 돌
						//장신구
						//Element_000 : 장신구명
						//Element_006 -> value -> Element_001 : 스탯 정보
						//Element_007 -> value -> Element_001 : 각인/디버프 정보
						//돌
						//Element_000 : 돌명
						//Element_005 -> value -> Element_001 : 각인/디버프 정보
						JSONObject equipInfo = (JSONObject)userInfoJSON.get("Equip");
						Set<String> keyList = equipInfo.keySet();
						Iterator iter=keyList.iterator();
					    while(iter.hasNext()){
					    	String keyStr = iter.next().toString();
					    	String itemName = "";
					    	String engInfo = "";
					    	String statInfo = "";
			    			JSONObject itemInfo;
					    	if(keyStr.indexOf("Gem") == -1)
					    	{
					    		switch(keyStr.substring(keyStr.indexOf("_") + 1))
					    		{
					    			//목걸이
						    		case "006":
						    			itemInfo = (JSONObject)equipInfo.get(keyStr);
						    			itemName = (String)((JSONObject)itemInfo.get("Element_000")).get("value");
						    			engInfo = (String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001");
						    			statInfo = (String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001");
										System.out.println(keyStr);
										System.out.println(itemName);
										System.out.println(engInfo);
										System.out.println(statInfo);
						    			break;
					    			//귀걸이
						    		case "007":
						    		case "008":
						    			itemInfo = (JSONObject)equipInfo.get(keyStr);
						    			itemName = (String)((JSONObject)itemInfo.get("Element_000")).get("value");
						    			engInfo = (String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001");
						    			statInfo = (String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001");
										System.out.println(keyStr);
										System.out.println(itemName);
										System.out.println(engInfo);
										System.out.println(statInfo);				    			
						    			break;
					    			//반지
						    		case "009":
						    		case "010":
						    			itemInfo = (JSONObject)equipInfo.get(keyStr);
						    			itemName = (String)((JSONObject)itemInfo.get("Element_000")).get("value");
						    			engInfo = (String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001");
						    			statInfo = (String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001");
										System.out.println(keyStr);
										System.out.println(itemName);
										System.out.println(engInfo);
										System.out.println(statInfo);					    			
						    			break;
						    		//돌
						    		case "011":
						    			itemInfo = (JSONObject)equipInfo.get(keyStr);
						    			itemName = (String)((JSONObject)itemInfo.get("Element_000")).get("value");
						    			engInfo = (String)((JSONObject)((JSONObject)itemInfo.get("Element_005")).get("value")).get("Element_001");
										System.out.println(keyStr);
										System.out.println(itemName);
										System.out.println(engInfo);
						    			break;
					    		}
					    	}
					    }
					}
					
				}
			}
		}
		
	}
}
