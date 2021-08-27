package com.example.demo;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@RequestMapping("/")
	public String goHome(Locale locale, Model model) {
		return "auctionSearchMain";
	}
}
