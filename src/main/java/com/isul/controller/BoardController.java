package com.isul.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.isul.board.BoardService;
import com.isul.board.ReplyService;
import com.isul.dto.BoardDTO;
import com.isul.dto.ReplyDTO;

import utils.Criteria;
import utils.PageMaker;

@Controller
@RequestMapping("/main/")
@SessionAttributes("board")
public class BoardController {

	@Autowired
	public BoardService boardService;
	@Autowired
	public ReplyService replyService;

	@RequestMapping("/csboard")
	public String csBoardView(BoardDTO boardDTO, Model model, Criteria cri, HttpSession session,
			@RequestParam(value="condition", defaultValue="board_title") String condition,
			@RequestParam(value="keyword", defaultValue="") String keyword) {
		
		
		System.out.println("boardList controller");

		System.out.println("con= "+condition +", key= "+keyword);
		
		List<BoardDTO> boardList = boardService.getBoardList(cri, condition, keyword);
		session.setAttribute("keyword", keyword);
		session.setAttribute("condition", condition);

		int total = boardService.totalCnt(condition, keyword);

		PageMaker pageMaker = new PageMaker(cri, total);
		System.out.println(boardList);
		model.addAttribute("boardList", boardList);
		model.addAttribute("paging", pageMaker);
		System.out.println(cri);
		return "board/csboard";

	}

	@GetMapping("/getBoardForm")
	public String getBoard(BoardDTO boardDTO, Model model, @RequestParam("board_number") String board_number,

			HttpSession session, ReplyDTO replyDTO, HttpServletRequest request, HttpServletResponse response) {
		

		System.out.println("getBoard controller");
		BoardDTO board = boardService.getBoard(board_number);
		List<ReplyDTO> replyList = replyService.getReplyList(board_number);
		String countReply = replyService.countReply(board_number);
		
		Cookie oldCookie = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
		    for (Cookie cookie : cookies) {
		        if (cookie.getName().equals("postView")) {
		            oldCookie = cookie;
		        }
		    }
		}

		if (oldCookie != null) {
		    if (!oldCookie.getValue().contains("[" + board_number.toString() + "]")) {
		        boardService.boardViewCount(board_number);
		        oldCookie.setValue(oldCookie.getValue() + "_[" + board_number + "]");
		        oldCookie.setPath("/");
		        oldCookie.setMaxAge(60 * 60 * 24);
		        response.addCookie(oldCookie);
		    }
		} else {
		    boardService.boardViewCount(board_number);
		    Cookie newCookie = new Cookie("postView", "[" + board_number + "]");
		    newCookie.setPath("/");
		    newCookie.setMaxAge(60 * 60 * 24);
		    response.addCookie(newCookie);
		}

	        
		// 댓글 수 업데이트
		boardService.updateReplyCount(board_number);

		session.setAttribute("board_number", board_number);

		session.getAttribute(countReply);
		

		// 글 상세정보 저장
		model.addAttribute("board", board);
		model.addAttribute("replyList", replyList);
		model.addAttribute("countReply", countReply);

		// 로그인 아이디랑 일치 시 수정/삭제 버튼 보이게
		model.addAttribute("loginId", session.getAttribute("loginId"));

		System.out.println(replyList);

		return "board/getBoard";
	}

	@GetMapping("/insertBoardForm")
	public String insertBoardView(BoardDTO boardDTO, HttpSession session, Model model) {
		model.addAttribute("loginId", session.getAttribute("loginId"));

		return "board/insertBoard";
	}

	@PostMapping("/insertBoard")
	public String insertBoard(BoardDTO boardDTO, HttpSession session, Model model, Criteria cri) {
		String id = (String) session.getAttribute("loginId");
		boardDTO.setBoard_writer(id);

		boardService.insertBoard(boardDTO);
		String condition = (String)session.getAttribute("condition");
		String keyword = (String)session.getAttribute("keyword");
		
		List<BoardDTO> boardList = boardService.getBoardList(cri, condition, keyword);
		int total = boardService.totalCnt(condition, keyword);
		PageMaker pageMaker = new PageMaker(cri, total);

		model.addAttribute("boardList", boardList);
		model.addAttribute("paging", pageMaker);

		return "board/csboard";
	}

	@GetMapping("/updateBoardForm")
	public String updateBoardView(BoardDTO boardDTO, HttpSession session, Model model) {
		model.addAttribute("loginId", session.getAttribute("loginId"));
		boardDTO = (BoardDTO) session.getAttribute("board");

		return "board/updateBoard";
	}

	@GetMapping("/updateBoard")
	public String updateBoard(BoardDTO boardDTO, HttpSession session, Model model, Criteria cri) {
		boardDTO.setBoard_number((String) session.getAttribute("board_number"));
		boardService.updateBoard(boardDTO);

		String board_number = (String)session.getAttribute("board_number");
		String condition = (String)session.getAttribute("condition");
		String keyword = (String)session.getAttribute("keyword");
		
		List<BoardDTO> boardList = boardService.getBoardList(cri, condition, keyword);
		int total = boardService.totalCnt(condition, keyword);

		PageMaker pageMaker = new PageMaker(cri, total);

		model.addAttribute("boardList", boardList);
		model.addAttribute("paging", pageMaker);

		return "redirect:/main/getBoardForm?" + "board_number=" + board_number;
	}

	@GetMapping("/deleteBoard")
	public String deleteBoard(BoardDTO boardDTO, HttpSession session, Model model, Criteria cri) {
		boardDTO.setBoard_number((String) session.getAttribute("board_number"));
		boardService.deleteBoard(boardDTO);
		String condition = (String)session.getAttribute("condition");
		String keyword = (String)session.getAttribute("keyword");
		
		List<BoardDTO> boardList = boardService.getBoardList(cri, condition, keyword);
		int total = boardService.totalCnt(condition, keyword);
		PageMaker pageMaker = new PageMaker(cri, total);

		model.addAttribute("boardList", boardList);
		model.addAttribute("paging", pageMaker);

		return "board/csBoard";
	}
}
