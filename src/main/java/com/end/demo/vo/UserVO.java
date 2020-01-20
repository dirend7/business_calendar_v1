package com.end.demo.vo;

import lombok.Data;

@Data
public class UserVO {
    private int id;
    private String name;
    private String password;
    private String authority;
    private int enabled;
    private String nickname;
}
