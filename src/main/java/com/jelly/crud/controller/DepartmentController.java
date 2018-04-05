package com.jelly.crud.controller;

import com.jelly.crud.bean.Department;
import com.jelly.crud.service.DepartmentService;
import com.jelly.crud.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 部门CRUD的操作
 */
@Controller
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    /**
     * 返回所有部门信息
     *
     * @return
     */
    @RequestMapping("/getDeps")
    @ResponseBody
    public Msg getDeps() {
        List<Department> departments = departmentService.selectByExample();
        return Msg.success().add("deps", departments);
    }
}
