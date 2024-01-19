
	
//채팅목록	페이지
	function chatView() {
		$.ajax({
		    url : "chatList",
		    dataType : "html",
		    type : "get",  
		    success : function(result){
		        $("#friendList").html(result);
		    }
		});
	}
	
	
//친구목록 페이지
	function friendView() {
		
			$.ajax({
			    url : "friendList",
			    dataType : "html",
			    type : "get",  
			    success : function(result){
			        $("#friendList").html(result);
			    }
			});
	}


// 친구목록 클릭시 프로필 불러오기
	function goFriendProfile(event) {
	var clickedProfile = event.currentTarget;
	var pfId = clickedProfile.querySelector(".profileId").value;
	$.ajax({	
			    url : "friendProfile",
			    dataType : "html",
			    type : "get", 
			     data: { profileId : pfId },
			    success : function(result){
			        $("#chat").html(result);
			    }
				});		
	}
	
	
// 내프로필 불러오기
function goMyFriendProfile() {
	var pfId = document.getElementById("myProfileId").value;
	$.ajax({	
			    url : "friendProfile",
			    dataType : "html",
			    type : "get", 
			    data: { profileId : pfId },
			    success : function(result){
			        $("#chat").html(result);
			    }
				});		
	}					


//친구찾기 페이지
	function searchMemberView() {
			$.ajax({
		    url : "searchMember",
		    dataType : "html",
		    type : "get",  
		    success : function(result){
		        $("#chat").html(result);
		    }
			});
		
	}	
	
	
//정보변경 페이지
	function modifyMyInfo() {
			$.ajax({
		    url : " modifyMyInfo",
		    dataType : "html",
		    type : "get",  
		    success : function(result){
		        $("#chat").html(result);
		    }
			});
		
	}	
		
/* 새로운 친구 검색 */
function searchAddMember() {
		var condition = document.getElementById("searchCondition").value;
		var keyword = document.getElementById("searchKeyword").value;
	$.ajax({	
		    url : "/main/searchMember",
		    dataType : "html",
		    type : "post",
		    data : {condition:condition, keyword:keyword },
		    success : function(result){
		        $("#chat").html(result);
		   		 }
		});
}


/* 새로 검색된 친구 추가 */
function addFriend() {
		var memberId = document.getElementById("searchMemeberId").value;
	$.ajax({	
		    url : "/main/searchMemberAdd",
		    dataType : "html",
		    type : "post",
		    data : {memberId, memberId},
		    success : function(result){
		        $("#chat").html(result);
		   		 }
		});
		alert("친구 신청을 보냈습니다.");
		 $.ajax({
		    url : "searchMember",
		    dataType : "html",
		    type : "get",  
		    success : function(result){
		        $("#chat").html(result);
		    }
			});
}


/* 새로 추가된 친구 삭제 */
function addCancle() {
		var memberId = document.getElementById("addMemeberId").value;
	$.ajax({	
		    url : "/main/addMemberCancle",
		    dataType : "html",
		    type : "post",
		    data : {memberId, memberId},
		    success : function(result){
		        $("#chat").html(result);
		   		 }
		});
		alert("친구 신청을 취소했습니다.");
		 $.ajax({
		    url : "searchMember",
		    dataType : "html",
		    type : "get",  
		    success : function(result){
		        $("#chat").html(result);
		    }
			});
}

/*친구 신청 수락*/
function friendAccept() {
	var memberId = document.getElementById("friendListId").value;
	$.ajax({	
		    url : "/main/friendAccept",
		    dataType : "html",
		    type : "post",
		    data : {memberId, memberId},
		    success : function(result){
		        $("#chat").html(result);
		   		 }
		});
	alert("친구 신청을 수락했습니다.");
	 location.reload();
}

/*친구 신청 거절*/
function friendReject() {
	var memberId = document.getElementById("friendListId").value;
	$.ajax({	
		    url : "/main/friendReject",
		    dataType : "html",
		    type : "post",
		    data : {memberId, memberId},
		    success : function(result){
		        $("#chat").html(result);
		   		 }
		});
		alert("친구 신청을 거절했습니다.");
		 location.reload();
}


/*정보변경 시작*/
/*비밀번호 변경*/
function changePassword() {
	var password = document.getElementById("password").value;
	var checkPassword = document.getElementById("pwdCheck").value;
	var pwdregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,14}$/;
	
	console.log(password);
	console.log(checkPassword);
	
	if (password != checkPassword) {
	alert("비밀번호 불일치");
	} else if (!pwdregex.test(password)) {
        alert("비밀번호는 8~14자 영문 대문자, 소문자, 숫자를 각 1개 이상 포함해야 합니다.");
        document.getElementById("password").focus();
        return false;
    } else {
		$.ajax({	
			    url : "/main/changeInfoPassword",
			    dataType : "html",
			    type : "post",
			    data : {password, password},
			    success : function(result){
			        $("#chat").html(result);
			   		 }
			});
			alert("비밀번호를 변경했습니다.");
			$.ajax({
		    url : "modifyMyInfo",
		    dataType : "html",
		    type : "get",  
		    success : function(result){
		        $("#chat").html(result);
		    }
			});
	}
}





/* 꾸미기 */
//친구목록 화살표 회전
var rotationDegree = 0;
		var rotationDegree2 = 0;
		function rotateImage() {
			// 이미지 요소를 가져와서 적절한 각도로 회전
			var imgElement = document.getElementById('rotatingImage');
			rotationDegree -= 180;
			imgElement.style.transform = 'rotate(' + rotationDegree + 'deg)';
		}
		function rotateImage2() {
			// 이미지 요소를 가져와서 적절한 각도로 회전
			var imgElement = document.getElementById('rotatingImage2');
			rotationDegree2 -= 180;
			imgElement.style.transform = 'rotate(' + rotationDegree2 + 'deg)';
		}
		function toggleAccordion(titleElement) {
			// Find the parent section
			var section = titleElement.parentElement;

			// Toggle the content's display property
			var content = section.querySelector('.accordion-content');
			if (content.style.display === 'none') {
				content.style.display = 'block';
			} else {
				content.style.display = 'none';
			}
		}
		
		
//대화방 참가자 드롭 다운
		function toggleDropdown() {
			  var dropdownContent = document.getElementById("dropdownContent");
			  if (dropdownContent.style.display === "block") {
			    dropdownContent.style.display = "none";
			  } else {
			    dropdownContent.style.display = "block";
			  }
			}

			// Close the dropdown if the user clicks outside of it
			window.onclick = function(event) {
			  if (!event.target.matches('.dropdown button')) {
			    var dropdowns = document.getElementsByClassName("dropdown-content");
			    var i;
			    for (i = 0; i < dropdowns.length; i++) {
			      var openDropdown = dropdowns[i];
			      if (openDropdown.style.display === "block") {
			        openDropdown.style.display = "none";
			      }
			    }
			  }
			}
			

