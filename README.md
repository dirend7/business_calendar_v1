## business_calendar_v1(일정관리 프로그램)
### 개요 및 모듈

#### -개요-
<ol>
  <li>직원이 일정신청 (반차, 연차, 하계휴가, 출장, 외근)</li>
  <li>관리자가 일정 검토 후 승인</li>
</ol>

#### -모듈-
<ul>
  <li>스프링 부트(Spring Boot)
    <ul>
      <li>스프링 시큐리티(Spring Security) - 관리자(admin), 직원(user) 세션 구분</li>
      <li>MVC 패턴 Controller, Service, Repository 구분</li>
    </ul>
  </li>
  <li>마이바티스(mybatis)
    <ul>
      <li>페이징</li>
      <li>동적쿼리</li>
    </ul>
  </li>
  <li>그래들(Gradle)</li>
  <li>FullCalendar API(JavaScript) - 달력 API</li>
</ul>
