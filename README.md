# SSM_CRUD

(Spring+SpringMVC+Mybatis)整合项目练习

项目是在IDEA中编写的，使用maven构建依赖，MySQL数据库.前端用bootstrap框架搭建界面

使用了mybatis逆向工程生成的bean-dao-mapper。（使用了Example类）

界面使用ajax异步访问，将界面静态化，使前、后端脱离。

构建了一个通用返回类，用于返回json数据。

使用了REST风格传参（注意PUT方法）

使用PageHelper插件做分页。

实现了前端jquary校验、ajax异步访问校验、后端JSR303校验，三次校验数据（数据库校验未实现）  

是一个很好的SSM增删改差的练习项目。



## ssm:SpringMVC+Spring+MyBatis

## CRUD： Create（创建）Retrieve（查询）Update（更新）Delete（删除）


ps：此项目笔者写了很详细的备注，便于理解，已更新，换为HTML静态页，相关自己的js在 

```java
/src/webapp/静态主/js/index.crud.js
```

源码下载地址：--> https://github.com/jelly54/SSM_CRUD

## 功能点
>1、分页  
>2、数据校验    jquery前端校验+JSR303后端校验  
>3、 ajax  
>4、 Rest风格的URI；使用HTTP协议请求方式的动词，来表示对资源的操作（ GET（查询）， POST（新增）， PUT（修改）， DELETE（删除））


## 技术点
>基础框架-ssm（ SpringMVC+Spring+MyBatis）  
>数据库-MySQL  
>前端框架-bootstrap快速搭建简洁美观的界面  
>项目的依赖管理-Maven  
>分页-pagehelper  
>逆向工程-MyBatis Generator   


## 基础环境搭建
>1、创建一个maven工程  
>2、引入项目依赖的jar包  
>   spring  
>   springmvc  
>   mybatis  
>   数据库连接池，驱动包  
>   其他（ jstl， servlet-api， junit）    
>3、引入bootstrap前端框架  
>4、编写ssm整合的关键配置文件 web.xml， spring,springmvc,mybatis，使用mybatis的逆向工程生成对应的bean以及mapper  
>5、测试mapper  

<center><img src="https://img-blog.csdn.net/20180314205620157?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L2d1b2Rvbmc1NA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/></center>


## 查询
>1、访问index.jsp页面  
>2、 index.jsp页面发送出查询员工列表请求  
>3、 EmployeeController来接受请求，查出员工数据  
>4、来到list.jsp页面进行展示  
>5、 pageHelper分页插件完成分页查询功能  
  URI： /emp  

## 查询-ajax
>1、 index.jsp页面直接发送ajax请求进行员工分页数据的查询  
>2、服务器将查出的数据，以json字符串的形式返回给浏览器  
>3、浏览器收到js字符串。可以使用js对json进行解析，使用js通过dom增删改改变页面。  
>4、返回json。实现客户端的无关性  



## 新增
<center><img src="https://img-blog.csdn.net/20180314205826808?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L2d1b2Rvbmc1NA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/></center>

## 新增-逻辑
>1、在index.jsp页面点击”新增”  
>2、弹出新增对话框  
>3、去数据库查询部门列表，显示在对话框中  
>4、用户输入数据，并进行校验jquery前端校验， ajax用户名重复校验，重要数据（后端校验(JSR303)，唯一约束）；  
>5、完成保存  

 URI:  
  /emp/{id} GET 查询员工  
  /emp POST 保存员工  
  /emp/{id} PUT 修改员工  
  /emp/{id} DELETE 删除员工  


## 修改
<center><img src="https://img-blog.csdn.net/20180314210111137?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L2d1b2Rvbmc1NA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/></center>

## 修改-逻辑
>1、点击编辑  
>2、弹出用户修改的模态框（显示用户信息）  
>3、点击更新，完成用户修改  


## 删除
<center><img src="https://img-blog.csdn.net/20180314210341730?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L2d1b2Rvbmc1NA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/></center>

<center><img src="https://img-blog.csdn.net/20180314210318796?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L2d1b2Rvbmc1NA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/></center>

## 删除-逻辑
>1、单个删除  
>>URI:/emp/{id} DELETE  
  
>2、批量删除  

