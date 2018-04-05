package com.jelly.crud.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jelly.crud.bean.Employee;
import com.jelly.crud.service.EmployeeService;
import com.jelly.crud.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 员工的CRUD操作
 */
@Controller
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    /**
     * 如果直接发送ajax=PUT形式的请求
     * 封装的数据
     * Employee
     * [empId=1014, empName=null, gender=null, email=null, dId=null]
     * <p>
     * 问题：
     * 请求体中有数据；
     * 但是Employee对象封装不上；
     * update tbl_emp  where emp_id = 1014;
     * <p>
     * 原因：
     * Tomcat：
     * 1、将请求体中的数据，封装一个map。
     * 2、request.getParameter("empName")就会从这个map中取值。
     * 3、SpringMVC封装POJO对象的时候。会把POJO中每个属性的值，request.getParamter("email");
     * AJAX发送PUT请求引发的血案：
     * PUT请求，请求体中的数据，request.getParameter("empName")拿不到
     * Tomcat一看是PUT不会封装请求体中的数据为map，只有POST形式的请求才封装请求体为map
     * org.apache.catalina.connector.Request--parseParameters() (3111);
     * <p>
     * protected String parseBodyMethods = "POST";
     * if( !getConnector().isParseBodyMethod(getMethod()) ) {
     * success = true;
     * return;
     * }
     * <p>
     * <p>
     * 解决方案；
     * 我们要能支持直接发送PUT之类的请求还要封装请求体中的数据
     * 1、配置上HttpPutFormContentFilter；
     * 2、他的作用；将请求体中的数据解析包装成一个map。
     * 3、request被重新包装，request.getParameter()被重写，就会从自己封装的map中取数据
     * 员工更新方法
     * <p>
     * 根据id更新员工信息
     *
     * @param id
     * @param employee
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/emp/{empId}", method = RequestMethod.PUT)
    public Msg updateEmp(@PathVariable("empId") Integer id, Employee employee) {
        employeeService.updateByPrimaryKeySelective(employee);
        return Msg.success();
    }

    /**
     * 根据id获取员工信息
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/emp/{empId}", method = RequestMethod.GET)
    public Msg getEmpById(@PathVariable("empId") Integer id) {
        Employee employee = employeeService.selectByPrimaryKey(id);
        return Msg.success().add("emp", employee);
    }

    /**
     * 单个员工删除+批量员工删除
     *
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/emp/{del_empIds}", method = RequestMethod.DELETE)
    public Msg deleteEmp(@PathVariable("del_empIds") String ids) {

        if (ids.contains("-")) {
            String[] str_ids = ids.split("-");
            List<Integer> del_ids = new ArrayList<Integer>();
            for (String s : str_ids) {
                del_ids.add(Integer.parseInt(s));
            }
            employeeService.deleteBanch(del_ids);
        } else {
            employeeService.deleteEmployee(Integer.parseInt(ids));
        }
        return Msg.success();
    }

    /**
     * 员工保存
     * 1.支持JSR303校验
     * 2.导入Hibernate-Validate
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/emp", method = RequestMethod.POST)
    public Msg saveEmp(@Valid Employee employee, BindingResult result) {
        System.out.println("进入  emp  添加");
        if (result.hasErrors()) {
            //后端校验失败，
            //应该返回失败，在模态框中显示校验失败提示信息
            Map<String, Object> map = new HashMap<>();
            List<FieldError> errors = result.getFieldErrors();
            for (FieldError f : errors) {
                System.out.println("错误的字段： " + f.getField());
                System.out.println("错误信息： " + f.getDefaultMessage());
                map.put(f.getField(), f.getDefaultMessage());
            }
            return Msg.fail().add("JSR303Error", map);
        } else {
            employeeService.saveEmp(employee);
            return Msg.success().add("msg", "添加成功！！");
        }
    }

    /**
     * 检查注册名是否重复
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("/checkEmpName")
    public Msg checkEmpName(@RequestParam("empName") String empName) {
        if (employeeService.checkEmpName(empName)) {
            return Msg.fail();
        } else {
            return Msg.success();
        }
    }

    /**
     * 查询员工
     * 获取的员工列表，并执行分页查询。
     * 默认从第一页查询，每页显示五行数据
     *
     * @param pn 从第 pn 页查询
     * @return
     */
    @ResponseBody
    @RequestMapping("/emps")
    public Msg getEmps(@RequestParam(value = "pn", defaultValue = "1") Integer pn) {
        // 引入PageHelper分页插件
        // 在查询之前只需要调用，传入页码，以及每页的大小
        PageHelper.startPage(pn, 5);
        // startPage后面紧跟的这个查询就是一个分页查询
        List<Employee> list = employeeService.selectByExampleWithDept();
        // 使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
        // 封装了详细的分页信息,包括有我们查询出来的数据，传入连续显示的页数
        PageInfo page = new PageInfo(list, 5);
        return Msg.success().add("pageInfo", page);
    }

}
