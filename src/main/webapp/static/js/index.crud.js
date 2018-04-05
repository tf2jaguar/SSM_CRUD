//定义两个全局变量 总记录数，当前页
var totalRecord, currentPage;
//界面初始化完成后执行的js
$(function () {
    to_page(1);
});

//ajax异步请求要访问的页面，传入页数
function to_page(pn) {
    //解决刷新后checkbox为选中状态
    $("#check_all").prop("checked", false);
    //发送ajax请求
    $.ajax({
        url: "emps",
        data: "pn=" + pn,
        type: "GET",
        success: function (result) {
            //1、解析并显示员工数据
            build_emps_table(result);
            //2、解析并显示分页信息
            build_page_info(result);
            //3、解析显示分页条数据
            build_page_nav(result);
        }
    });

}

//构建数据表格
function build_emps_table(result) {
    //清空表格
    $("#emps_table tbody").empty();
    var emps = result.datas.pageInfo.list;
    $.each(emps, function (index, item) {
        var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>");
        var empIdTd = $("<td></td>").append(item.empId);
        var empNameTd = $("<td></td>").append(item.empName);
        var genderTd = $("<td></td>").append(item.gender == 'M' ? "男" : "女");
        var emailTd = $("<td></td>").append(item.email);
        var deptNameTd = $("<td></td>").append(item.department.deptName);
        //定义编辑/删除按钮
        /*
         * <button type="button" class="btn btn-default" aria-label="Left Align">
         *     <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
         * </button>
         */
        var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
        editBtn.attr("edi_id", item.empId);
        var deleBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
        deleBtn.attr("del_id", item.empId);
        var btnTd = $("<td></td>").append(editBtn).append(" ").append(deleBtn);

        $("<tr></tr>").append(checkBoxTd)
            .append(empIdTd)
            .append(empNameTd)
            .append(genderTd)
            .append(emailTd)
            .append(deptNameTd)
            .append(btnTd)
            .appendTo("#emps_table tbody");
    });
}

//构建分页信息
function build_page_info(result) {
    var pageInfo = result.datas.pageInfo;
    $("#page_info_area").empty();
    $("#page_info_area").append("当前第 " + pageInfo.pageNum + " 页,总计 " + pageInfo.pages + " 页,总 " + pageInfo.total + " 条记录");
    totalRecord = pageInfo.total;
    currentPage = pageInfo.pageNum;
}

//构建分页条信息
function build_page_nav(result) {
    //每次写入前先清空
    $("#page_nav_area").empty();
    //构建元素
    var nav = $("<nav></nav>").attr("aria-label", "Page navigation");
    var ul = $("<ul></ul>").addClass("pagination");

    var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
    var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
    //判断是否有前一页
    if (result.datas.pageInfo.hasPreviousPage) {
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.datas.pageInfo.prePage);
        });
    }
    else {
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }

    var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"))
    //判断是否有下一页
    if (result.datas.pageInfo.hasNextPage) {
        lastPageLi.click(function () {
            to_page(result.datas.pageInfo.total + 100);
        });
        nextPageLi.click(function () {
            to_page(result.datas.pageInfo.nextPage);
        });
    }
    else {
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }
    //添加首页和前一页
    ul.append(firstPageLi).append(prePageLi);

    //遍历给ul中添加页码提示
    $.each(result.datas.pageInfo.navigatepageNums, function (index, item) {
        var numLi = $("<li></li>").append($("<a></a>").append(item));
        if (result.datas.pageInfo.pageNum == item) {
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_page(item)
        });
        ul.append(numLi);
    });
    //添加下一页和最后一页
    ul.append(nextPageLi).append(lastPageLi);
    nav.append(ul).appendTo("#page_nav_area");
}

//清空表单样式及内容
function reset_form(ele) {
    $(ele)[0].reset();
    //清空表单样式
    $(ele).find("*").removeClass("has-error has-success");
    $(ele).find(".help-block").text("");
}

//添加员工模态框调用方法
$("#emp_add_modal_btn").click(function () {
    reset_form('#empAddModal form');
    getDeps('#empAddModal select');
    $('#empAddModal').modal({
        backdrop: 'static'
    })
});

//获取部门列表
function getDeps(ele) {
    $(ele).empty();
    $.ajax({
        url: "getDeps",
        type: "GET",
        success: function (result) {
            $.each(result.datas.deps, function (index, item) {
                $("<option></option>").append(item.deptName).attr("value", item.deptId).appendTo(ele);
            });
        }
    });
}

//显示校验后展示信息
function show_validate_msg(ele, status, msg) {
    $(ele).parent().removeClass("has-success has-error");
    $(ele).next("span").text("");
    if ("success" == status) {
        $(ele).parent().addClass("has-success");
    } else if ("error" == status) {
        $(ele).parent().addClass("has-error");
    }
    $(ele).next("span").text(msg);

}

//校验提交前的数据
//ajax校验用户名是否可用
function valudate_empName(empName) {
    $.ajax({
        url: "checkEmpName",
        data: "empName=" + empName,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg("#empName_add_input", "success", "用户名可用");
            } else if (result.code == 200) {
                show_validate_msg("#empName_add_input", "error", "该用户名已存在，不可用");
            }
        }
    });
}

//1. 校验用户名是否符合规范，是否在数据库已存在
$("#empName_add_input").focusout(function () {
    var empName = $("#empName_add_input").val();
    var regName = /(^[a-zA-Z0-9_-]{4,16}$)|(^[\u2E80-\u9FFF]{2,5}$)/;
    if (!regName.test(empName)) {
        show_validate_msg("#empName_add_input", "error", "用户名为4到16位数字字母或者2-5个汉字");
    } else {
        show_validate_msg("#empName_add_input", "success", "用户名符合规范");
        //进行ajax验证
        valudate_empName(empName);
    }
});

//正则校验邮箱
function checkEmail(ele) {
    var email = $(ele).val();
    var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!regEmail.test(email)) {
        show_validate_msg(ele, "error", "请输入正确的邮箱");
    } else {
        show_validate_msg(ele, "success", "邮箱可用");
    }
}

//2. 校验邮箱是否符合规范
$("#email_add_input").focusout(function () {
    checkEmail("#email_add_input");
});

//添加的员工数据提交服务器
$("#emp_save_btn").click(function () {
    //进行提交前的数据检查
    //非空验证
    if ($("#empName_add_input").val() == "") {
        show_validate_msg("#empName_add_input", "error", "请填写姓名！！");
        return false;
    } else if ($("#email_add_input").val() == "") {
        show_validate_msg("#email_add_input", "error", "请填可用的邮箱！！");
        return false;
    } else if (($("#empName_add_input").parent().hasClass("has-error")) || ($("#email_add_input").parent().hasClass("has-error"))) {
        alert("请填写正确的信息！");
        return false;
    }
    //发送ajax，保存数据
    $.ajax({
        url: "emp",
        type: "POST",
        data: $("#empAddModal form").serialize(),
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#empAddModal').modal('hide');
                //返回最后一页
                to_page(totalRecord);
            } else {
                //显示错误信息
                if (undefined != result.datas.JSR303Error.empName) {
                    show_validate_msg("#empName_add_input", "error", result.datas.JSR303Error.empName);
                }
                if (undefined != result.datas.JSR303Error.email) {
                    show_validate_msg("#email_add_input", "error", result.datas.JSR303Error.email);
                }
            }
        }
    });

});

//删除单个员工
$(document).on("click", ".delete_btn", function () {
    var del_empName = $(this).parents("tr").find("td:eq(2)").text();
    var del_empIds = $(this).attr("del_id");
    if (confirm("确定要删除【" + del_empName + "】么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "emp/" + del_empIds,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }
});

//完成check的全选全不选功能
$("#check_all").click(function () {
    //attr获取checked是undefined;
    //我们这些dom原生的属性；attr获取自定义属性的值；
    //prop修改和读取dom原生属性的值
    $(".check_item").prop("checked", $(this).prop("checked"));
});
$(document).on("click", ".check_item", function () {
    var flag = $(".check_item:checked").length == $(".check_item").length;
    $("#check_all").prop("checked", flag);
});

//批量删除员工
$("#emp_del_modal_btn").click(function () {
    var del_empNames = "";
    var del_empIds = "";
    $.each($(".check_item:checked"), function () {
        del_empNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
        del_empIds += $(this).parents("tr").find("td:eq(1)").text() + "-";
    });
    //去除多余的，
    del_empNames = del_empNames.substring(0, del_empNames.length - 1);
    //去除多余的-
    del_empIds = del_empIds.substring(0, del_empIds.length - 1);
    //发出确认的alert
    if(del_empNames==""){
        alert("请选择要删除的员工！");
    }else if (confirm("确定删除【" + del_empNames + "】么？")) {
        //确认删除，发送ajax请求
        $.ajax({
            url: "emp/" + del_empIds,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
                to_page(currentPage);
            }
        });
    }
});


//根据id获取员工信息
function getEmp(empId) {
    $.ajax({
        url: "emp/" + empId,
        type: "Get",
        success: function (result) {
            // console.log(result);
            $("#empName_update_input").text(result.datas.emp.empName);
            $("#email_update_input").val(result.datas.emp.email);
            $("#empUpdateModal input[name=gender]").val([result.datas.emp.gender]);
            $("#empUpdateModal select").val([result.datas.emp.dId]);
        }
    });
}

//更新时展示员工数据、调用模态框
$(document).on("click", ".edit_btn", function () {
    //清除之前选中的
    $(this).parents("tbody").find(".check_item").prop("checked", false);
    //标记当前选中的
    $(this).parents("tr").find(".check_item").prop("checked", true);
    //清空之前的表单
    reset_form('#empUpdateModal form');
    var empId = $(this).attr("edi_id");
    //1、查出部门信息，并显示部门列表
    getDeps("#empUpdateModal select");
    //2、查出员工信息，显示员工信息
    getEmp(empId);

    //3、把员工的id传递给模态框的更新按钮
    $("#emp_update_btn").attr("edit-id", empId);
    $("#empUpdateModal").modal({
        backdrop: "static"
    });
})

//更新数据前的数据校验
$("#email_update_input").focusout(function () {
    checkEmail("#email_update_input");
});

//更新员工数据
$("#emp_update_btn").click(function () {
    //先要对提交的数据进行校验，当前只用校验邮箱
    if ($("#email_update_input").val() == "") {
        show_validate_msg("#email_update_input", "error", "请填可用的邮箱！！");
        return false;
    } else if ($("#email_update_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    $.ajax({
        url: "emp/" + $(this).attr("edit-id"),
        data: $("#empUpdateModal form").serialize(),
        type: "PUT",
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#empUpdateModal').modal('hide');
                //返回最后一页
                to_page(currentPage);
            }
        }
    });
});
