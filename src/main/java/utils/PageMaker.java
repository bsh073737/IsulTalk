package utils;

import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

public class PageMaker {
	private Criteria criteria; 				// 현재 페이지 정보
	private int totalCount;				// 테이블에 저장된 총 게시글의 수
	private int startPage;					// 화면에 표시할 시작 페이지 번호
	private int endPage;					// 화면에 표시할 끝 페이지 번호
	private boolean prev;					// 이전 페이지 버튼 유무
	private boolean next;					// 다음 페이지 버튼 유무
	private int cntPageNum = 10;		// 한 화면에 표시할 페이지 버튼의 수
	private int realEndPage;			// 실제 끝 페이지 번호
	
	public Criteria getCriteria() {
		return criteria;
	}
	public void setCriteria(Criteria criteria) {
		this.criteria = criteria;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;	
		// 나머지 멤버변수 초기화
		fieldInit(); 
	}
	
	private void fieldInit() {
		// 1. 표시할 끝 페이지 번호 계산
		endPage = (int)(Math.ceil(criteria.getPageNum() / (double)cntPageNum) * cntPageNum);
		
		// 2. 시작 페이지 번호 계산
		startPage = endPage - cntPageNum + 1;
		
		// 3. 실제 끝 페이지 계산
			//올림(총 게시글의 수 / 페이지당 게시글의 수)
		realEndPage = (int)Math.ceil(totalCount / (double)criteria.getRowsPerPage());
		
		// 4. 실제 끝 페이지 번호 값 수정
		if (endPage > realEndPage) {
			endPage = realEndPage;
		}
		
		// 5. 이전, 다음 페이지 버튼 표시 유무
			//시작 페이지 번호가 1일 경우 '이전' 버튼이 필요 없음
			//끝 페이지 번호 * 페이지 당 게시글의 수 < 총 게시글의 수(totalCount) => 다음 버튼 필요
		prev = (startPage == 1) ? false : true;
		next = endPage * criteria.getRowsPerPage()	< totalCount ? true : false;
		//내 생각은 이건데
		//next = (endPage < realEndPage) ? true : false;	
	}
	
	/*
	 * 페이지 번호를 클릭했을때 전송할 Query String을 생성해 주는 메소드
	 * 입력 파라미터 : 클릭한 페이지 번호
	 *  (예:클릭한 페이지 번호 = 3 ? pageNum = 3 & rowsPerPage = 10)
	 */
	public String makeQuery(int page) {
		UriComponents uri = UriComponentsBuilder.newInstance()
				.queryParam("pageNum", page)        // pageNum = 3
				.queryParam("rowsPerPage", criteria.getRowsPerPage()) // rowsPerPage = 10
				.build();
		return uri.toString();
	}
	
	
	public int getStartPage() {
		return startPage;
	}
	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}
	public int getEndPage() {
		return endPage;
	}
	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}
	public boolean isPrev() {
		return prev;
	}
	public void setPrev(boolean prev) {
		this.prev = prev;
	}
	public boolean isNext() {
		return next;
	}
	public void setNext(boolean next) {
		this.next = next;
	}
	public int getCntPageNum() {
		return cntPageNum;
	}
	public void setCntPageNum(int cntPageNum) {
		this.cntPageNum = cntPageNum;
	}
	public int getRealEndPage() {
		return realEndPage;
	}
	public void setRealEndPage(int realEndPage) {
		this.realEndPage = realEndPage;
	}
	
	@Override
	public String toString() {
		return "PageMaker [criteria=" + criteria + ", totalCount=" + totalCount + ", startPage=" + startPage
				+ ", endPage=" + endPage + ", prev=" + prev + ", next=" + next + ", cntPageNum=" + cntPageNum
				+ ", realEndPage=" + realEndPage + "]";
	}
	
	
	
}
