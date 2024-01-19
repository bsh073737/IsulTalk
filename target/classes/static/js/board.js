/**------------------------------------------------------------------------------------------------------------------------------------
 *	 게시판 (고객센터)
 */
 	
// 게시판 검색
	function searchBoardButton(pageNum) {
		
	    var condition = document.getElementById("searchBoardcondition").value;
	    var keyword = document.getElementById("keyword").value;
   		csboardView(condition, keyword, pageNum);
	}
// 게시판 화면
	function csboardView(condition, keyword, pageNum) {
	    $.ajax({
	        url: "csboard",
	        dataType: "html",
	        type: "post",
	        data:{condition:condition, keyword:keyword, pageNum:pageNum},
	        success: function (result) {
	            $("#chat").html(result);
	        }
	        
	    });
	}

// 글 상세정보
	function getBoardForm(event){
	var clickedRow = event.currentTarget;
	
	var board_number = clickedRow.querySelector(".board_number").value;
	
		$.ajax({
		    url : "getBoardForm",
		    dataType : "text",
		    type : "get",  
		    data : {board_number:board_number},   // 호출할 url 에 있는 페이지로 넘길 파라메터
		    success : function(result){
				
		        $("#chat").html(result);
		    }
			});
	}
// 글 등록창
	function insertBoardForm(){
		$.ajax({
		    url : "insertBoardForm",
		    dataType : "html",
		    type : "get",  
		    success : function(result){
		        $("#chat").html(result);
		    }
			});

	}

// 글 등록
	function boardInsert(){
	
        $.ajax({
            url: "insertBoard",
             dataType : "html",
            type: "post",
            data: $('#insertform').serialize(),
            
            success: function(){
				
               alert("글이 등록되었습니다.");
             	
            $.ajax({
			    url : "csboard",
			    dataType : "html",
			    type : "get", 
			    success : function(result){
			        $("#chat").html(result);
			    }
			});
	    }
	    });
	}

// 글 수정창
	function updateBoardForm(){
		$.ajax({
		    url : "updateBoardForm",
		    dataType : "html",
		    type : "get",  
		    data : { },   // 호출할 url 에 있는 페이지로 넘길 파라메터
		    success : function(result){
		        $("#chat").html(result);
		    }
			});
	}
	
// 글 수정
	function boardUpdate(){
		$.ajax({
			url : "updateBoard",
			dataType:"html",
			type : "get",
			data: $('#updateform').serialize(),
			success : function(result){
				alert("글이 수정되었습니다.");
				$("#chat").html(result); 
			
			}
			
		});
	}

// 글 삭제
	function boardDelete(){
		$.ajax({
			url : "deleteBoard",
			dataType:"html",
			type:"get",
			data:$("updateform").serialize(),
			success : function(){
				alert("글이 삭제되었습니다.");
				
		$.ajax({
		    url : "csboard",
		    dataType : "html",
		    type : "get",  
		    data : { },   // 호출할 url 에 있는 페이지로 넘길 파라메터
		    success : function(result){
		        $("#chat").html(result);
		    }
			});
			}
		});
	}
	
// 페이지 넘버 검색해서 띄우기
function loadPage(pageNum, condition, keyword) {
	 var condition = document.getElementById("searchBoardcondition").value;
	    var keyword = document.getElementById("keyword").value;
        $.ajax({
            url: "csboard",
            type: 'GET',
            data: {pageNum:pageNum, condition:condition, keyword:keyword
            },
            success: function (result) {
                $('#chat').html(result);
              
            }
        });
    }

/**------------------------------------------------------------------------------------------------------------------------------------
 *	 댓글 
 */

// 댓글 등록
	function replyInsert(){
		var board_number = document.getElementById('board_number').value;
		var board_content = document.getElementById('reply_content').value;
		
		if (board_content.trim() === "") {
        alert("댓글 내용을 입력하세요.");
        reply_content.focus();
        return;
        }

        $.ajax({
            url: "insertReply",
            dataType : "html",
            type: "post",
            data: {	board_number: board_number,
            		reply_content: board_content,
				
			},
			
            success: function(result){
				
				
				alert("댓글이 등록되었습니다.");
				 $("#chat").html(result);         	
	    }
	    
	    });
	}

// 댓글 삭제
 function reply_delete(event) {
	
	var clickedRow = event.currentTarget;
	var loginId = document.getElementById("loginId").value;
	var reply_writer =clickedRow.querySelector(".reply_writer").value;
	var reply_number = clickedRow.querySelector(".reply_number").value;
    	
		
		if(loginId == reply_writer){
		$.ajax({
		    url : "deleteReply",
		    dataType : "text",
		    type : "get",  
		    data : {reply_number:reply_number },   // 호출할 url 에 있는 페이지로 넘길 파라메터
		    success : function(result){
				alert("댓글이 삭제되었습니다.");
		        $("#chat").html(result);
		    }
			});
		}else{
			alert("댓글 작성자만 삭제할 수 있습니다.");
			return false;	
		}
	}
	

// 대댓글 입력창

function re_replyInsertForm(event) {
    var clickedRow = event.currentTarget;
    var replyInfo = clickedRow.closest('.reply_info');
    var reply2 = replyInfo.querySelector('.re_reply');
    
    if (reply2) {
        if (window.getComputedStyle(reply2).display === 'none') {
            reply2.style.display = 'block';
        } else {
            reply2.style.display = 'none';
        }
    }
    
}
// 대댓글 등록
function re_replyInsert(event){
	
	var clickedRow = event.currentTarget;   
    var re_replyBox = clickedRow.closest('.re_reply');
    var re_reply_number = re_replyBox.querySelector('.re_reply_number');
    var reply_number = re_reply_number.value;
	var re_reply_content = re_replyBox.querySelector('.re_reply_content');
	var reply_content = re_reply_content.value;
	var re_reply_ref = re_replyBox.querySelector('.reply_ref');
	var reply_ref = re_reply_ref.value;
	var re_reply_deep = re_replyBox.querySelector('.reply_deep');
	var reply_deep = re_reply_deep.value;
	var re_reply_level = re_replyBox.querySelector('.reply_level');
	var reply_level = re_reply_level.value;
	
	
	var board_number = document.getElementById('board_number').value;
	var reply_writer = document.getElementById('reply_writer').value;

	if (reply_content.trim() === "") {
        alert("댓글 내용을 입력하세요.");
        re_reply_content.focus();
        return;
        }
	
    $.ajax({
        url: "reinsertReply",
        dataType : "html",
        type: "post",
        data: {reply_content: reply_content,
        		board_number: board_number,
        		reply_number : reply_number,
        		reply_ref : reply_ref,
        		reply_deep : reply_deep	,
        		reply_level : reply_level,
        		reply_writer : reply_writer
        	},
        
        success: function(result){
			alert("댓글이 등록되었습니다.");
			 $("#chat").html(result);         	
    }
    
    });
}
