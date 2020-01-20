document.addEventListener('DOMContentLoaded', init);
checkFlag = false;


function init() {
    let calendarE1 = document.querySelector('.calendar');
    let login = document.body.querySelector('div.nav-item.layout');
    let acceptCalendar = document.body.querySelector('div.accept_btn');
    let checkBox = document.body.querySelector('table.check-item.checkbox');
    let deletebtn = document.body.querySelector('.check-item.object.object-btn.delete');
    let updatebtn = document.body.querySelector('button.detail-item.updatebtn.object.object-btn');
    let checkTemplate = document.body.querySelector('.templates-item.check');


    window.addEventListener('keydown', keyHandler);
    login.addEventListener('click', clickHandler);
    if (deletebtn) {
        deletebtn.addEventListener('click', deleteHandler)
    }
    if (checkBox) {
        checkBox.addEventListener('click', checkBoxHandler);
    }
    if (acceptCalendar) {
        acceptCalendar.addEventListener('click', clickAcceptHandler);
    }
    if (updatebtn) {
        updatebtn.addEventListener('click', clickUpdateHandler);
    }
    if (checkTemplate) {
        checkTemplate.addEventListener('click', checkTemplateHandler);
    }


    if (calendarE1) {
        let calendar = new FullCalendar.Calendar(calendarE1, {
            plugins: ['dayGrid'],
            header: {
                left: 'prev ,next',
                center: 'title',
                right: 'today'
            },
            navLinks: false, // can click day/week names to navigate views
            selectable: false,
            selectMirror: false,
            events: {
                url: '/accept/xhr',
                method: 'post',
                extraParams: {
                    delete_flag: '0',
                },
                failure: function () {
                    alert('there was an error while fetching events!');
                },
            },
            editable: false,
            eventLimit: true, // allow "more" link when too many events
        });
        calendar.setOption('locale', 'ko');
        calendar.render();
    }
}


function clickHandler(event) {
    let login = document.body.querySelector('div.base-item.login');
    let elem = event.target;
    if (elem.classList.contains('btn-login')) {
        login.classList.add('active');
    }
}

function clickAcceptHandler(event) {
    let acceptCalendar = document.body.querySelector('div.templates-item.modal_box');
    let elem = event.target;
    if (elem.innerText == '일정 신청') {
        acceptCalendar.classList.add('active');
    }
}

function keyHandler(event) {
    console.log(event);
    let login = document.body.querySelector('div.base-item.login');
    let acceptCalendar = document.body.querySelector('div.templates-item.modal_box');
    if (event.key == 'Escape') {
        login.classList.remove('active');
        acceptCalendar.classList.remove('active');
    }
}


function checkBoxHandler(event) { //체크 박스 선택
    let elem = event.target;
    let allCheck = document.body.querySelectorAll('.object.object-checkbox');// all checkBox

    if (elem.classList.contains('i')) {
        location.href = '/detail?i=' + elem.innerHTML;
    }

    if (elem.classList.contains('allcheck')) { // 전체 선택
        if (checkFlag == false) {
            for (let i = 0; i < allCheck.length; i++) {
                allCheck[i].classList.add('active');
                checkFlag = true;
            }
        } else if (checkFlag == true) {
            for (let i = 0; i < allCheck.length; i++) {
                allCheck[i].classList.remove('active');
                checkFlag = false;
            }
        }
    }

    while (!elem.classList.contains('object-check')) { // 독립 선택
        elem = elem.parentNode;
        if (elem.nodeName == 'BODY') {
            elem = null;
            return;
        }
        elem.classList.toggle('active');
    }


}

function deleteHandler() {
    let allCheck = document.body.querySelectorAll('.object.object-checkbox');
    let sessionItem = document.body.querySelectorAll('.session-item.i');
    let queryString = '';
    let form = document.createElement('form');
    let index = document.body.querySelector('span.page-item.index').innerHTML;

    for (let i = 0; i < allCheck.length; i++) {
        if (allCheck[i].classList.contains('active')) {
            queryString += 'i=' + sessionItem[i].innerHTML + '&';
        }
    }
    queryString = queryString.substr(0, queryString.length - 1);


    form.setAttribute('method', 'post');
    form.setAttribute('action', '/delete?' + queryString + '&page=' + index);
    document.charset = "utf-8";
    document.body.appendChild(form);
    if (confirm('삭제하시겠습까?')) {
        if (queryString.length == 0) {
            alert('입력값이 없습니다.');
            return;
        }
        form.submit();
    }
    return;
}

function clickUpdateHandler() {
    let i = document.body.querySelector('.row-item.i');
    location.href = '/update?i=' + i.lastChild.textContent;
}


function checkTemplateHandler(event) { // check template
    let elem = event.target;

    if (elem.classList.contains('index')) {
        let index = elem.innerHTML;
        if (index != null) {
            location.href = `/check?page=${index}`;
        }
    }

    if (elem.classList.contains('agree')){
        let allCheck = document.body.querySelectorAll('.object.object-checkbox');
        let sessionItem = document.body.querySelectorAll('.session-item.i');
        let queryString = '';
        let form = document.createElement('form');
        let index = location.search.substr(1);

        for (let i = 0; i < allCheck.length; i++) {
            if (allCheck[i].classList.contains('active')) {
                queryString += 'i=' + sessionItem[i].innerHTML + '&';
            }
        }
        queryString = queryString.substr(0, queryString.length - 1);


        form.setAttribute('method', 'post');
        form.setAttribute('action', '/agree?' + queryString + '&agree_flag=1&'+index);
        document.charset = "utf-8";
        document.body.appendChild(form);
        if (confirm('승인하시겠습까?')) {
            if (queryString.length == 0) {
                alert('입력값이 없습니다.');
                return;
            }
            form.submit();
        }
        return;
    }

    if (elem.classList.contains('disagree')){
        let allCheck = document.body.querySelectorAll('.object.object-checkbox');
        let sessionItem = document.body.querySelectorAll('.session-item.i');
        let queryString = '';
        let index = location.search.substr(1);

        let form = document.createElement('form');

        for (let i = 0; i < allCheck.length; i++) {
            if (allCheck[i].classList.contains('active')) {
                queryString += 'i=' + sessionItem[i].innerHTML + '&';
            }
        }
        queryString = queryString.substr(0, queryString.length - 1);


        form.setAttribute('method', 'post');
        form.setAttribute('action', '/agree?' + queryString + '&agree_flag=0&'+index);
        document.charset = "utf-8";
        document.body.appendChild(form);
        if (confirm('승인을 취소 하시겠습까?')) {
            if (queryString.length == 0) {
                alert('입력값이 없습니다.');
                return;
            }
            form.submit();
        }
        return;
    }
}