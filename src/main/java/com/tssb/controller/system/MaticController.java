package com.tssb.controller.system;

import com.tssb.model.system.Users;
import com.tssb.service.system.spi.IMaticService;
import com.tssb.service.system.spi.IRoleService;
import com.tssb.service.system.spi.IUsersService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Controller of SysDict
 * @author xuyl
 * @date 2013-2-28
 */
@Controller
@RequestMapping(value = "/matic")
public class MaticController {
	@Autowired
	private IMaticService maticService;
	@Autowired
	private IUsersService usersService;

	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String show(Model model) {
		List<Users> usersList = usersService.findAll();
		model.addAttribute("usersList",usersList);
		model.addAttribute("page_flag",10);
		return "system/maticList";
	}

	@ResponseBody
	@RequestMapping(value = "/check/user",method = RequestMethod.POST)
	public Object checkUser(String name,String password){
		JSONObject jsonObject = new JSONObject();
		try {
			Users user = usersService.findByName(name);
			if(user!=null){
				if(user.getPassword().equals(password)){
					jsonObject.put("code","200");
					jsonObject.put("user_id",user.getId());
				}else{
					jsonObject.put("code","201");
				}
			}else{
				jsonObject.put("code","404");
			}
		}catch (Exception ex){
			System.out.println(ex);
			jsonObject.put("code","500");
		}
		return jsonObject;
	}

    @RequestMapping(value="/auditShow", method = RequestMethod.GET)
    public String auditShow(Model model) {
        List<Users> usersList = usersService.findAll();
        model.addAttribute("usersList",usersList);
        model.addAttribute("page_flag",20);
        return "system/auditList";
    }
}
