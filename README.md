# 이슬톡
친구들과 대화를 할 수 있는 메신저입니다.

# 프로젝트 설명
카카오톡을 참고하여 만든 메신저입니다.

친구를 추가하여 간단한 대화를 할 수 있는 웹소켓 기능과

자유롭게 교류할 수 있는 게시판 기능을 제공합니다.

# 개발기간 및 인원
- 2023-11-27 ~ 2024-01-04
- 백엔드 2명

# 팀원
- **팀장 김상철** - 메인 페이지 구성, DB 설계, 정보 변경, 웹소켓 기능 [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/sc0315)
- **팀원 백상현** - 회원가입, 로그인, 아이디/비밀번호 찾기, 게시판 기능 [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/bsh073737)

# 담당 역할
- **회원가입**
    - 정규표현식을 사용한 유효성 검사, AJAX로 화면에 결과 송출
    - 보안을 위해 DB에 저장되는 비밀번호를 Spring Security를 이용하여 암호화
    - 이메일, SMS로 랜덤 인증번호 전송
    - Daum 주소검색 API를 이용한 주소 입력
 
- **로그인**
    - Cookie를 활용한 아이디 저장 체크박스
    
- **아이디/ 비밀번호 찾기**
    - 휴대폰 번호로 ID 찾기
    - 이메일로 임시 비밀번호 전송, DB 비밀번호 자동 변경
    
- **비동기식 게시판 구현**
    - AJAX 활용한 페이징, 실시간 댓글
    - 대댓글 기능
    - Cookie를 활용한 중복 조회수 제한
    - 검색 기능
      
# 기술 스택
- **Java 11**
- **Spring boot 2.7.17**
- **Oracle 19**
- **Mybatis**
- **Thymeleaf**

# ERD
![image](https://github.com/bsh073737/IsulTalk/assets/149881569/145b39d2-335f-43d6-8b30-2c850708b9a2)


# 주요 기능
<img src="https://github.com/bsh073737/IsulTalk/assets/149881569/5144d5ec-7451-437f-90fc-fd2244811d3b" width="400" height="500">
<br>

- 회원가입 시 입력한 아이디, 비밀번호로 로그인 할 수 있습니다.
- 아이디 저장 체크박스를 누르면 아이디가 저장됩니다.
---
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/95165204-8320-498c-82e4-146d9ebc2b3c" width="30%" height="500">
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/61c16506-fd72-4a0c-9224-9726c3d35ceb" width="30%" height="500">
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/b43cbad7-c9d3-4cd3-8dbe-62f5fb540da3" width="30%" height="500">

- 아이디, 비밀번호, 이름, 전화번호, 주소를 입력하여 회원가입할 수 있습니다.
- 메일, SNS API를 통해 본인 인증을 합니다.
- 주소 API를 통해 주소를 입력 합니다.
- 회원가입을 클릭 시 유효성 검사를 합니다.
---
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/c3d70069-8eb6-427d-b2d4-da91dbfe24b3" width="30%" height="500">
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/38d5e8b4-6673-4523-b1cd-6b35e58b1c9d" width="30%" height="500">
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/ddaf8e74-354f-4187-8392-6b64cec57508" width="30%" height="500">
 
- 아이디, 전화번호, 이메일로 친구 추가를 신청하면 상대방 친구 목록에 수락, 거절 메시지가 뜹니다.
- 수락 버을 누르면 친구 목록에 추가됩니다.
- 친구와 대화를 할 수 있습니다.
---
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/a847e2bd-3f05-4226-8b64-9fd02fee6fc2" width="45%" height="500">
  <img src="https://github.com/bsh073737/IsulTalk/assets/149881569/12257918-1efb-4ece-b76e-293235868eab" width="45%" height="500">

- 게시판에 글을 등록할 수 있고 수정, 삭제가 가능합니다.
- 작성자와 로그인한 사람이 다르면 수정,삭제 버튼이 숨겨집니다.
- 게시글 삭제 시 댓글도 같이 삭제됩니다.

# 문제 해결
- 문제

  AJAX를 처음 사용 해봐서 상세 글보기를 구현하던 중 AJAX로 받아온 게시글 리스트들 중에서 하나의 게시글을 가져오는 것에서 어려움을 느꼈습니다.
- 해결

클릭 이벤트를 활용해서 선택한 게시글의 board_number를 가져오게 했고 이 때 배운 것을 댓글 구현에서도 활용 했습니다.

	
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

