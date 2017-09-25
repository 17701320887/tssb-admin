package com.tssb.controller.system;

import com.tssb.service.system.spi.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Controller of SysDict
 * @author xuyl
 * @date 2013-2-28
 */
@Controller
public class RoleController {
	@Autowired
	private IRoleService roleService;
	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String show(Model model) {
		String name = roleService.findById(1l);
		model.addAttribute("role",name);
		return "index";
	}
}
