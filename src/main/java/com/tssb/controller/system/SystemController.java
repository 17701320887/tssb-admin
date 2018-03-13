package com.tssb.controller.system;

import com.tssb.common.util.DateUtils;
import com.tssb.common.util.StringUtil;
import com.tssb.model.system.NewsMenu;
import com.tssb.model.system.Users;
import com.tssb.service.system.spi.INewsMenuService;
import com.tssb.service.system.spi.IUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * Created by admin on 2017/9/22.
 */
@Controller
@RequestMapping("/system")
public class SystemController {
    @Autowired
    private IUsersService usersService;
    @Autowired
    private INewsMenuService newsMenuService;

    @RequestMapping("/userList")
    public String userList(){
        return "system/userList";
    }
    @RequestMapping("/findUserList")
    public String findUserList(HttpServletRequest request,Model model,String name,String wxNo,String mobile){
        Users users = new Users();
        users.setName(name);
        users.setWxNo(wxNo);
        users.setMobile(mobile);
        users.setDeleteFlag(1);
        List<Users> usersList = usersService.search(users);
        model.addAttribute("usersList",usersList);
        model.addAttribute("name",name);
        model.addAttribute("wxNo",wxNo);
        model.addAttribute("mobile",mobile);
        model.addAttribute("page_flag",1);
        return "index";
    }

    @ResponseBody
    @RequestMapping(value = "/user/save",method = RequestMethod.POST)
    public Object saveUser(HttpServletRequest request,HttpServletResponse response,String name,String mobile,String wxNo,String sex,String workNo,Integer role){
        try {
            Users user = new Users();
            user.setName(name);
            user.setMobile(mobile);
            user.setWorkNo(workNo);
            user.setWxNo(wxNo);
            if(sex.equals('男')){
                user.setSex(1);
            }else{
                user.setSex(0);
            }
            user.setPassword("123456");
            user.setDeleteFlag(1);
            user.setCreateDate(new Date());
            user.setRole(role);
            usersService.save(user);
            return "200";
        }catch (Exception ex){
            System.out.print(ex);
            return "500";
        }
    }

    @ResponseBody
    @RequestMapping(value = "/user/edit",method = RequestMethod.POST)
    public Object editUser(HttpServletRequest request,HttpServletResponse response,Long id,String name,String mobile,String wxNo,String sex,String workNo){
        try {
            Users user = new Users();
            user.setId(id);
            user.setName(name);
            user.setMobile(mobile);
            user.setWorkNo(workNo);
            user.setWxNo(wxNo);
            user.setModifyDate(new Date());
            usersService.update(user);
            return "200";
        }catch (Exception ex){
            System.out.print(ex);
            return "500";
        }
    }

    @ResponseBody
    @RequestMapping(value = "/user/del",method = RequestMethod.POST)
    public Object delUser(HttpServletRequest request,HttpServletResponse response,Long id){
        try {
            Users user = new Users();
            user.setId(id);
            user.setDeleteFlag(2);
            usersService.update(user);
            return "200";
        }catch (Exception ex){
            System.out.print(ex);
            return "500";
        }
    }

    @ResponseBody
    @RequestMapping(value = "/menu/save",method = RequestMethod.POST)
    public Object saveMenu(HttpServletRequest request,HttpServletResponse response,Integer code,String codeName){
        try {
            NewsMenu newsMenu = new NewsMenu();
            newsMenu.setCode(code);
            newsMenu.setCodeName(codeName);
            newsMenuService.save(newsMenu);
            return "200";
        }catch (Exception ex){
            System.out.print(ex);
            return "500";
        }
    }
}
