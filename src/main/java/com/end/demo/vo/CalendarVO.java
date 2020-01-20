package com.end.demo.vo;

import lombok.Data;

@Data
public class CalendarVO {
    private int i;
    private int id;
    private String name;
    private String title;
    private int type;
    private String startday;
    private String endday;
    private String content;
    private int delete_flag;
    private int agree_flag;
    private String color; // color table
    private String nickname; //join object
    private String start; //xhr object
    private String end; //xhr object
}

