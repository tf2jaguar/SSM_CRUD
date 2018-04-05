package com.jelly.crud.service;

import com.jelly.crud.bean.Employee;
import com.jelly.crud.bean.EmployeeExample;
import com.jelly.crud.dao.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    EmployeeMapper employeeMapper;

    /**
     * 根据主键更新员工信息
     *
     * @param record
     * @return
     */
    public int updateByPrimaryKeySelective(Employee record) {
        return employeeMapper.updateByPrimaryKeySelective(record);
    }

    /**
     * 根据主键获取员工数据
     *
     * @param empId
     * @return
     */
    public Employee selectByPrimaryKey(Integer empId) {
        return employeeMapper.selectByPrimaryKey(empId);
    }

    /**
     * 批量删除员工
     *
     * @param del_ids
     * @return
     */
    public int deleteBanch(List<Integer> del_ids) {
        EmployeeExample example = new EmployeeExample();
        EmployeeExample.Criteria criteria = example.createCriteria();
        criteria.andEmpIdIn(del_ids);
        return employeeMapper.deleteByExample(example);
    }

    /**
     * 删除单个员工
     *
     * @param del_id
     * @return
     */
    public int deleteEmployee(Integer del_id) {
        return employeeMapper.deleteByPrimaryKey(del_id);
    }

    /**
     * 保存员工
     *
     * @param employee
     */
    public void saveEmp(Employee employee) {
        employeeMapper.insertSelective(employee);
    }

    /**
     * 检查注册名是否重复
     *
     * @param empName
     * @return
     */
    public boolean checkEmpName(String empName) {
        EmployeeExample example = new EmployeeExample();
        EmployeeExample.Criteria criteria = example.createCriteria();
        criteria.andEmpNameEqualTo(empName);
        int i = employeeMapper.countByExample(example);
        return i > 0;
    }

    /**
     * 获取所有的员工 包含部门信息
     *
     * @return
     */
    public List<Employee> selectByExampleWithDept() {
        return employeeMapper.selectByExampleWithDept();
    }

}
