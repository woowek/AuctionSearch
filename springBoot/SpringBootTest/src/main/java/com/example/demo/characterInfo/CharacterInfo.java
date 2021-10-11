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
	JSONObject engrave = new JSONObject(); 
	JSONObject necklace = new JSONObject(); 
	JSONObject earring1 = new JSONObject();
	JSONObject earring2 = new JSONObject();
	JSONObject ring1 = new JSONObject();
	JSONObject ring2 = new JSONObject();
	JSONObject stone = new JSONObject(); 
	
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
				String regexStr ="\\{[^^]+\\}";
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
		    			JSONArray engInsDataArr = new JSONArray();
					    while(iter.hasNext()){
					    	String keyStr = iter.next().toString();
					    	engSubInfo = (JSONObject)engInfo.get(keyStr);
					    	engName = removeTag((String)((JSONObject)engSubInfo.get("Element_000")).get("value"));
					    	engData = removeTag((String)((JSONObject)((JSONObject)engSubInfo.get("Element_001")).get("value")).get("leftText"));
							JSONObject engInsData = new JSONObject();
							engInsData.put("engName", engName);
							engInsData.put("engVal", engData.substring(engData.indexOf("+") + 1));
							engInsDataArr.add(engInsData);
					    }
					    engrave.put("type", "engrave");
					    engrave.put("engData", engInsDataArr);
						System.out.println(engrave.toString());
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
						    			itemName = removeTag((String)((JSONObject)itemInfo.get("Element_000")).get("value"));
						    			statInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001"));
						    			engInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001"));
									    necklace.put("type", "necklace");
									    necklace.put("itemName", itemName);
									    necklace.put("engData", getEngData(engInfo));
									    necklace.put("statData", getStatData(statInfo));
						    			break;
					    			//귀걸이
						    		case "007":
										itemInfo = (JSONObject)equipInfo.get(keyStr);
										itemName = removeTag((String)((JSONObject)itemInfo.get("Element_000")).get("value"));
										statInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001"));
										engInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001"));
										earring1.put("type", "earring");
										earring1.put("itemName", itemName);
										earring1.put("engData", getEngData(engInfo));
										earring1.put("statData", getStatData(statInfo));
										break;
						    		case "008":
						    			itemInfo = (JSONObject)equipInfo.get(keyStr);
						    			itemName = removeTag((String)((JSONObject)itemInfo.get("Element_000")).get("value"));
						    			statInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001"));
						    			engInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001"));
										earring2.put("type", "earring");
										earring2.put("itemName", itemName);
										earring2.put("engData", getEngData(engInfo));
										earring2.put("statData", getStatData(statInfo));
						    			break;
					    			//반지
						    		case "009":
										itemInfo = (JSONObject)equipInfo.get(keyStr);
										itemName = removeTag((String)((JSONObject)itemInfo.get("Element_000")).get("value"));
										statInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001"));
										engInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001"));
										ring1.put("type", "ring");
										ring1.put("itemName", itemName);
										ring1.put("engData", getEngData(engInfo));
										ring1.put("statData", getStatData(statInfo));
										break;
						    		case "010":
						    			itemInfo = (JSONObject)equipInfo.get(keyStr);
						    			itemName = removeTag((String)((JSONObject)itemInfo.get("Element_000")).get("value"));
						    			statInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_006")).get("value")).get("Element_001"));
						    			engInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_007")).get("value")).get("Element_001"));
										ring2.put("type", "ring");
										ring2.put("itemName", itemName);
										ring2.put("engData", getEngData(engInfo));
										ring2.put("statData", getStatData(statInfo));
						    			break;
						    		//돌
						    		case "011":
						    			itemInfo = (JSONObject)equipInfo.get(keyStr);
						    			itemName = removeTag((String)((JSONObject)itemInfo.get("Element_000")).get("value"));
						    			engInfo = removeTag((String)((JSONObject)((JSONObject)itemInfo.get("Element_005")).get("value")).get("Element_001"));
										stone.put("type", "stone");
										stone.put("itemName", itemName);
										stone.put("engData", getEngData(engInfo));
						    			break;
					    		}
					    	}
					    }
					}
					
				}
			}
		}
		
	}

	public JSONObject toJSON() throws Exception
	{
		JSONObject rtnData = new JSONObject();
		rtnData.put("engrave", engrave);
		rtnData.put("necklace", necklace);
		rtnData.put("earring1", earring1);
		rtnData.put("earring2", earring2);
		rtnData.put("ring1", ring1);
		rtnData.put("ring2", ring2);
		rtnData.put("stone", stone);
		return rtnData;
	}
	
	
	private JSONArray getEngData(String engInfo) {
		String regexStr = "\\[[^^\\]]+\\]";
		Pattern pattern = Pattern.compile(regexStr);
		Matcher matcher = pattern.matcher(engInfo);
		List<String> engNameArr = new ArrayList<String>();
		while (matcher.find()) {
			String engName = matcher.group();
			engName = engName.replace("[", "").replace("]", "");
			engNameArr.add(engName);
		}
		regexStr = "[0-9]+";
		pattern = Pattern.compile(regexStr);
		matcher = pattern.matcher(engInfo);
		List<String> engValArr = new ArrayList<String>();
		while (matcher.find()) {
			String engVal = matcher.group();
			engValArr.add(engVal);
		}
		JSONArray engInsDataArr = new JSONArray();
		for (int i = 0; i < engNameArr.size(); i++) {
			JSONObject engInsData = new JSONObject();
			engInsData.put("engName", engNameArr.get(i));
			engInsData.put("engVal", engValArr.get(i));
			engInsDataArr.add(engInsData);
		}
		return engInsDataArr;
	}

	private JSONArray getStatData(String statInfo) {
		String regexStr ="[가-힣]+";
		Pattern pattern = Pattern.compile(regexStr);
		Matcher matcher = pattern.matcher(statInfo);
        List<String> statNameArr = new ArrayList<String>();
		while(matcher.find()) {
			String statName = matcher.group();
			statNameArr.add(statName);
		}
		regexStr ="[0-9]+";
        pattern = Pattern.compile(regexStr);
        matcher = pattern.matcher(statInfo);
        List<String> statValArr = new ArrayList<String>();
		while(matcher.find()) {
			String statVal = matcher.group();
			statValArr.add(statVal);
		}										
		JSONArray statInsDataArr = new JSONArray();
		for(int i = 0 ; i < statNameArr.size(); i++)
		{
			JSONObject statInsData = new JSONObject();
			statInsData.put("statName", statNameArr.get(i));
			statInsData.put("statVal", statValArr.get(i));
			statInsDataArr.add(statInsData);
		}
		return statInsDataArr;
	}
	
	private static String removeTag(String html) throws Exception {
		return html.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}	
}
