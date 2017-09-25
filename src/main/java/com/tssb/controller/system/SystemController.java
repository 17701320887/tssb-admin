package com.tssb.controller.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by admin on 2017/9/22.
 */
@Controller
@RequestMapping("/system")
public class SystemController {
    @RequestMapping("/userList")
    public String userList(){
        return "system/userList";
    }
}
