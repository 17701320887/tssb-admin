package com.tssb.controller.system;

import com.tssb.model.system.Users;
import com.tssb.service.system.spi.IRoleService;
import com.tssb.service.system.spi.IUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller of SysDict
 * @author xuyl
 * @date 2013-2-28
 */
@Controller
public class RoleController {
	@Autowired
	private IRoleService roleService;
	@Autowired
	private IUsersService usersService;

	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String show(Model model) {
		String name = roleService.findById(1l);
		model.addAttribute("role",name);
		return "index";
	}

	@ResponseBody
	@RequestMapping(value = "/check/user",method = RequestMethod.POST)
	public Object checkUser(String name,String password){
		try {
			Users user = usersService.findByName(name);
			if(user!=null){
				if(user.getPassword().equals(password)){
					return "200";
				}else{
					return "201";
				}
			}else{
				return "404";
			}
		}catch (Exception ex){
			System.out.println(ex);
			return "500";
		}
	}
}
