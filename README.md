#SSM_CRUD

(Spring+SpringMVC+Mybatis)整合项目练习

项目是在IDEA中编写的，使用maven构建依赖，MySQL数据库.前端用bootstrap框架搭建界面

使用了mybatis逆向工程生成的bean-dao-mapper。（使用了Example类）

界面使用ajax异步访问，将界面静态化，使前、后端脱离。

构建了一个通用返回类，用于返回json数据。

使用了REST风格传参（注意PUT方法）

使用PageHelper插件做分页。

实现了前端jquary校验、ajax异步访问校验、后端JSR303校验，三次校验数据（数据库校验未实现）


是一个很好的SSM增删改差的练习项目。


