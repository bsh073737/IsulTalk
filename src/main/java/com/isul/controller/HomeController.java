package com.isul.controller;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.SessionAttributes;

import com.isul.dto.BoardDTO;

@Controller
public class HomeController {
	
	@RequestMapping("/")
	public String check(BoardDTO boardDTO) {
		return "index";
	}
	
}

	
