package com.example.demo.characterInfo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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
	public CharacterInfo(String reqUrl) throws IOException
	{
		Document doc = Jsoup.connect(reqUrl).get();
		Elements scripts = doc.select("script");
		for(Element script : scripts)
		{
			if(script.html().indexOf("$.Profile") >= 0)
			{
				itemJSONData = script.html();
		        Pattern pattern = Pattern.compile("(\\{)[^]+(\\})");
		        Matcher matcher = pattern.matcher(itemJSONData);
		        itemJSONData = matcher.group();



				
				System.out.println("itemJSONData : " + itemJSONData);
			}
		}
		
	}
}
