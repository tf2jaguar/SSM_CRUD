package com.jelly.crud.service;

import com.jelly.crud.bean.Department;
import com.jelly.crud.dao.DepartmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    DepartmentMapper departmentMapper;

    /**
     * 获取所有的部门信息
     *
     * @return
     */
    public List<Department> selectByExample() {
        return departmentMapper.selectByExample(null);
    }
}
