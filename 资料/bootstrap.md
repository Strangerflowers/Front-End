# 【bootstrap环境】

## 《教学目标》

了解bootstrap框架掌握bootstrap环境搭建(重要)和相关代码作用。 

 

## 《涉及知识点》

## bootstrap简介

由**Twitter**公司的两名前端工程师Mark Otto和Jacob Thornton在**2011**年发起的，并利用业余时间完成了第一个版本的开发。是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。

## 什么是框架？

库 lib library 

**写的更少**做的更多 提供一套较为便捷的操作方式；

将一套功能体系封装到一个单独的文件中的东西；

Bootstrap提供一套前端需要的界面工具集合。

### bootstrap特点

响应式布局；

移动设备优先；

丰富的组件；

界面简介美观；

主流浏览器都支持

​       （IE8+，firefox，chrome，Opera，Safari）；

简单易上手（ctrl+c，ctrl+v）；

 

> 注意:
>
> 1. 使用 Bootstrap 并不代表不用写 CSS 样式，而是不用写绝大多数大家都会用到的样式
> 2. Bootstrap 不是 Bootstrap！这是一个词，不是合成词，其含义为：n. 引导指令,引导程序

### 官网

BootStrap官网：

​       http://getbootstrap.com/

 

BootStrap中文网：

​       http://www.bootcss.com/

 

 

### 结构环境搭建

**1 下载相关文件**

 官网打开后下载即可。可以事先安装完成

**2 环境搭建相关代码（引入主要文件）**

```html
<!DOCTYPE html>

<html lang="zh-CN">

  <head>

<meta charset="utf-8">

<meta http-equiv="X-UA-Compatible"
content="IE=edge">

<meta name="viewport" content="width=device-width,
initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<title>Bootstrap 101 Template</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
<script
src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script
src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

**3分析相关代码**

**告诉IE浏览器以最新**的 解析器  去解析当前的页面，**
            **content="IE=edge"中的edge代表是最新的解析器,也可以说是IE-11。**
            content="IE=10" 代表指定使用IE-10的解析器**

快捷方式： __meta:compat__   可以快速插入

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

**禁止视口缩放**

快捷键 meta:vp

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

**引入核心css文件**

```html
<link href="css/bootstrap.min.css" rel="stylesheet"> 
```

 

**引入文件处理低版本浏览器兼容（版本低于ie9引入）**

 ```html
    <!--[if lt IE 9]>
<script
src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
兼容h5新增标签
<script
src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
兼容媒体查询
<![endif]-->
 ```

**引入jquery文件**

```html
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
```

**引入核心js文件**

```html
<script src="js/bootstrap.min.js"></script>
```

> 注意：线上cdn文件替换成本地本件，没网络时也能正常访问

 

## 《相关案例》

体验bootstrap案例

 

## 视口ViewPort

### 什么是视口？  虚拟窗口

每个网页默认都会有一个**视口**，视口其实是一个**虚拟的窗口** ，默认的尺寸是**980**像素;
为了兼容移动设备，一般让**网页视口的宽度和设备的宽度的比例为 1:1 , 并且不允许用户缩放网页**;

### 一句话归纳

> viewport的大小决定了，css中的设置多少像素能刚好占满屏幕。例如，viewport=320,那么设置div的宽度为320px,则div刚好能占满屏幕

### 移动设备中1px不等于1个物理像素

现如今，移动设备多已经采用高倍屏，像素分辨率（物理分辨率）要比逻辑分辨率高，下表为iphone分辨率数据

| 型号         | 像素分辨率 | 逻辑分辨率 | 倍率 |
| ------------ | ---------- | ---------- | ---- |
| iphone5      | 640*1136   | 320*568    | 2    |
| iphone6      | 750*1334   | 375*667    | 2    |
| iphone6 plus | 1242*2208  | 414*736    | 3    |

第一张图片为未添加viewport的效果

![1555988637173](assets/1555988637173.png)

第二张图片是添加了viewport的显示效果

![1555988649927](assets/1555988649927.png)

## 【配置自定义模板html】

![1556164235412](assets/1556164235412.png)

![1556164262558](assets/1556164262558.png)

![1556164350440](assets/1556164350440.png)

![1556164324654](assets/1556164324654.png)

![1556164469375](assets/1556164469375.png)

## 【全局css样式】（了解多次使用后要求掌握）

## 《教学目标》

掌握bootstrap并运用bootstrap基本样式类

 

## 《涉及知识点》

### 简介

bootstrap预设好很多通用的样式，可以直接添加类名使用。

 

### 版心

bootstrap分不同屏幕大小写好媒体查询的版心类

.container  响应式版心

.container-fluid 通屏版心

### 表格

**基本样式类**

.table               基本样式 (只有横向分隔线)；

.table-striped      在 <tbody> 内添加斑马线形式的条纹，隔行变色 ( IE8 不支持)；

.table-bordered     添加边框；

.table-hover        在 <tbody> 内的任一行启用鼠标悬停状态；

.table-condensed   紧凑表格。

 

注意：以上所有类名都是给table添加的！

 

**行或单元格设置颜色状态类**

.active     鼠标悬停在行或单元格上时所设置的颜色

.success  标识成功或积极的动作

.info 标识普通的提示信息或动作

.warning 标识警告或需要用户注意

.danger   标识危险或潜在的带来负面影响的动作

![1555986288574](assets/1555986288574.png)

 

```html
  <div class="container">
  
  	<table class="table table-bordered table-condensed table-striped table-hover">
  	<thead>
    	<tr class="success">
        	<th>序号</th>
        	<th>姓名</th>
        	<th>性别</th>
        	<th>年龄</th>
        	<th>爱好</th>
        </tr>  	
    </thead>
    <tbody>
    	<tr class="info">
        	<td>1</td>
        	<td>小明</td>
        	<td>男</td>
        	<td>18</td>
        	<td>设计+代码</td>
        </tr>
    	<tr class="active">
        	<td>1</td>
        	<td>小明</td>
        	<td>男</td>
        	<td>18</td>
        	<td>设计+代码</td>
        </tr>
    	<tr>
        	<td>1</td>
        	<td>小明</td>
        	<td>男</td>
        	<td>18</td>
        	<td>设计+代码</td>
        </tr>
    	<tr class="warning">
        	<td>1</td>
        	<td>小明</td>
        	<td>男</td>
        	<td>18</td>
        	<td>设计+代码</td>
        </tr>
    	<tr>
        	<td>1</td>
        	<td class="danger">小明</td>
        	<td>男</td>
        	<td>18</td>
        	<td>设计+代码</td>
        </tr>
    </tbody>
  </table>
  
  </div>

```



**响应式表表格**

把表格 .table 包在 .table-responsive 的类内，就可以实现表格水平滚动以适应小型设备（< 768px）.

> 注意想要实现响应式表格必须表格**内部内容足够多**才可以。否则还是不会显示。需要将上面的代码进行多次复制

举例：

![1555986318879](assets/1555986318879.png)

 ```html
<div class="container">
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>爱好</th>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>爱好</th>
                </tr>  	
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                    <td>1</td>
                    <td>小明</td>
                    <td>男</td>
                    <td>18</td>
                    <td>设计+代码</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
 ```



### 表单

根据需求复制相关代码并修改使用

> 表单基本类
>
> 对input表单元素 select  textarea 标签 添加form-control 会让表单显示更好。其它的就是复制粘贴修改。

 ![1555986470032](assets/1555986470032.png)

```html
  
  <div class="container">
  
	<form>
  <div class="form-group">
    <label for="exampleInputEmail1">邮箱</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">文件</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">点击上传文件</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox">已阅读协议
    </label>
  </div>
  <button type="submit" class="btn btn-default">提交</button>
</form>  

    <hr>
    
    <form class="form-inline">
      <div class="form-group">
        <label for="exampleInputName2">Name</label>
        <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail2">Email</label>
        <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
      </div>
      <button type="submit" class="btn btn-default">Send invitation</button>
    </form>
    
    <hr>
    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
        <div class="input-group">
          <div class="input-group-addon">$</div>
          <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
          <div class="input-group-addon">.00</div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Transfer cash</button>
    </form>
    
    <hr>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <label>
              <input type="checkbox"> Remember me
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default">Sign in</button>
        </div>
      </div>
    </form>


	<hr>
    
    <div class="form-group has-success has-feedback">
      <label class="control-label" for="inputSuccess2">Input with success</label>
      <input type="text" class="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status">
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputSuccess2Status" class="sr-only">(success)</span>
    </div>
    <div class="form-group has-warning has-feedback">
      <label class="control-label" for="inputWarning2">Input with warning</label>
      <input type="text" class="form-control" id="inputWarning2" aria-describedby="inputWarning2Status">
      <span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
      <span id="inputWarning2Status" class="sr-only">(warning)</span>
    </div>
    <div class="form-group has-error has-feedback">
      <label class="control-label" for="inputError2">Input with error</label>
      <input type="text" class="form-control" id="inputError2" aria-describedby="inputError2Status">
      <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
      <span id="inputError2Status" class="sr-only">(error)</span>
    </div>
    <div class="form-group has-success has-feedback">
      <label class="control-label" for="inputGroupSuccess1">Input group with success</label>
      <div class="input-group">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
      </div>
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
    </div>


	<hr>
    
    <input type="text" class="form-control input-lg" placeholder="lg">
    <br>
	<br>
    <input type="text" class="form-control" placeholder="md">
    <br>
	<br>
    <input type="text" class="form-control input-sm" placeholder="sm">


  </div>

```



### 按钮

**基本样式类**  a标签 和button元素 input类型为button都可以添加

.btn                 基本样式（必需）

 

.btn-default          默认样式

.btn-primary         首选项

.btn-success         成功

.btn-info             一般信息

.btn-warning         警告

.btn-danger          危险

.btn-link             链接（button作为链接

 

 

.btn-lg               大按钮

.btn-sm              小按钮

.btn-xs               超小按钮

.btn-block            块级按钮

.active                激活状态（:active）

.disabled              按钮禁用

 ![1555986487577](assets/1555986487577.png)

 

```html

  <a href="#" class="btn btn-default" role="button">link</a>
  <button class="btn btn-default">button</button>
  <input type="submit" class="btn btn-default" value="submit">
  <input type="button" class="btn btn-default" value="input">
  
  
  <hr>
  
    <!-- Standard button -->
    <button type="button" class="btn btn-default">（默认样式）Default</button>
    
    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
    <button type="button" class="btn btn-primary">（首选项）Primary</button>
    
    <!-- Indicates a successful or positive action -->
    <button type="button" class="btn btn-success">（成功）Success</button>
    
    <!-- Contextual button for informational alert messages -->
    <button type="button" class="btn btn-info">（一般信息）Info</button>
    
    <!-- Indicates caution should be taken with this action -->
    <button type="button" class="btn btn-warning">（警告）Warning</button>
    
    <!-- Indicates a dangerous or potentially negative action -->
    <button type="button" class="btn btn-danger">（危险）Danger</button>
    
    <!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
    <button type="button" class="btn btn-link">（链接）Link</button>  
    
    
    <hr>
    
    
    
    <button class="btn btn-primary">蓝色按钮</button>
    <button class="btn btn-danger">红色按钮</button>
    
    <button class="btn btn-link">链接外观按钮</button>
    
    
    
    <hr>
    <button class="btn btn-primary btn-lg">大按钮</button>
    <button class="btn btn-primary">常规按钮</button>
    <button class="btn btn-primary btn-sm">小按钮</button>
    <button class="btn btn-primary btn-xs">超小按钮</button>
    
    <hr>
    <button class="btn btn-primary btn-block btn-lg">块级按钮</button>
    
    <hr>
    <button class="btn btn-primary btn-block active btn-lg">按压状态</button>
    
    <hr>
    <button class="btn btn-primary btn-block disabled btn-lg">禁用状态</button>

```



### 图片

.img-responsive             让图片支持响应式布局

.img-rounded               圆角图片

.img-circle                  圆形图片

.img-thumbnail              加边框和间距的图片（自带响应）

.center-block                图片水平居中类（不要用.text-center）

 

 ![1555986508769](assets/1555986508769.png)

 ```html

  <img src="images/cat.jpg" width="800" class="img-responsive" alt="">
  <hr>
    <img src="images/cat.jpg" width="800" class="img-circle img-responsive" alt="">
   <hr>
    <img src="images/cat.jpg" width="800" class="img-rounded img-responsive" alt="">    <hr>  
  <img src="images/cat.jpg" width="800" class="img-thumbnail" alt="">
 ```



### 文本&列表

**文本**

.text-left   左对齐

.text-center 居中对齐

.text-right  右对齐

.text-justify  默认换行

.text-nowrap  不换行

.text-lowercase 小写

.text-uppercase 大写

.text-capitalize 首字母大写

 

**列表**

. list-unstyled     清除列表默认样式

. list-inline    多个列表在一行排列

.dl-horizontal   项目列表水平排列，截断过长标题，省略号显示

![1555986526596](assets/1555986526596.png) 

```html
 <p class="text-left">左对齐</p>
    <p class="text-center">居中对齐</p>
    <p class="text-right">右对齐</p>
    
    <p class="text-justify">默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行</p>
    
    <p class="text-nowrap">不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行</p>          
    <hr>    
    <ul class="list-unstyled list-inline">
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    </ul>    
    <dl class="dl-horizontal">
    	<dt>项目标题</dt>
    	<dd>项目详情</dd>
    	<dt>项目标题项目标题项目标题项目标题项目标题项目标题</dt>
    	<dd>项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情</dd>
    </dl>
  </div>
```



### 辅助类

**文本颜色**

.text-muted

.text-primary

.text-success

.text-info

.text-warning

.text-danger

 

**背景颜色**

.bg-primary

.bg-success

.bg-info

.bg-warning

.bg-danger

 ![1555986568899](assets/1555986568899.png)

```html
  <p class="text-left text-muted">左对齐</p>
    <p class="text-center text-info">居中对齐</p>
    <p class="text-right text-warning">右对齐</p>
    
    <p class="text-justify">默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行默认换行</p>
    
    <p class="text-nowrap">不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行</p>
    
    
    
    <hr>
    
    <ul class="list-unstyled">
    	<li>列表项</li>
    	<li class="text-danger">列表项</li>
    	<li class="bg-info">列表项</li>
    	<li class="bg-primary">列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li class="bg-danger">列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    	<li>列表项</li>
    </ul>
    
    
    <dl class="dl-horizontal">
    	<dt>项目标题</dt>
    	<dd>项目详情</dd>
    	<dt>项目标题项目标题项目标题项目标题项目标题项目标题</dt>
    	<dd>项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情项目详情</dd>
    	<dt>项目标题</dt>
    	<dd>项目详情</dd>
    </dl>
    
    <div class="box clearfix">
        <p class="bg-success pull-left">左浮动</p>
        <p class="bg-danger pull-right">右浮动</p>
    </div>
  	<p class="bg-primary hidden">其他内容</p>
    
    <img src="images/con1_01.png" class="center-block" alt="">
```



**其他辅助类**

.pull-left   左浮动

.pull-right  右浮动

以上两个在导航条不建议使用（导航条内部有专门的类名控制左浮和右浮）

.clearfix   清除浮动

.center-block  转化成块并居中

.sr-only  隐藏(一般和输入框配合)

.show 显示

.hidden 隐藏

# 栅格系统(重点掌握)

## 《教学目标》

掌握bootstrap核心栅格系统原理并运用。

 

## 《涉及知识点》

### 栅格系统简介

Bootstrap 为了更好地实现响应式、移动设备优先的原则，将所有的行（row）和列（column）组合到一起，设计了最多12列的流式栅格系统。

> **栅格的重点在于在排版上更好的进行适配，在不同的分辨率下能够显示显示不同的效果。将所有分辨率下的网页水平方向分成12列，那么在不同的分辨率下，水平方向显示不同的列数进而达到适配。**

 ![1555986706800](assets/1555986706800.png)

栅格系统运用媒体查询的原理，意义在于实现响应式设计。

### 响应式&栅格

响应式：为同一个页面设计多种布局形态（区块），根据不同的屏幕尺寸情况，调整这些区块     的排版，从而实现不同屏幕尺寸的响应（适配）。

栅格：将页面划分为若干等宽的列（区块），然后通过等宽列进行一定规则的组合，从而实现响  应式的页面。

### 栅格系统基本结构

container（包括 container-fluid ）、row、column必须保持特定的层级关系，栅格系统才可以正常工作（版心>行>列）

> **重点：先有行，再有列**

举例：

 ```html
<div class="container">
    <div class="row">
        <div class="col-md-1">

        </div>
        <div class="col-md-1">

        </div>
    </div>
</div>
 ```

### 各种设备类型排列

平均分成12列，不同设备从堆叠到水平排列设置

```
col-xs-[列数]：在超小屏幕下展示几份
col-sm-[列数]：在小屏幕下展示几份
col-md-[列数]：在中等屏幕下展示几份
col-lg-[列数]：在大屏幕下展示几份
__xs__ : 超小屏幕 手机 (<768px)  
__sm__ : 小屏幕 平板 (≥768px) 
__md__ : 中等屏幕 桌面显示器 (≥992px) 
__lg__ : 大屏幕 大桌面显示器 (≥1200px)
```

### 栅格特点

多余列（column）的元素将作为一个整体单元被另起一行排列

**一行排不满，自动向下排列。**

### 栅格系统响应(了解)

**列偏移**

一个栅格向右边偏移多少个列

.col-*-offset-*

举例：

.col-md-offset-2  中等屏幕桌面电脑开始向右偏移2个列

**列嵌套**（了解）

如果要嵌套使用栅格，只需要在列（column）内直接续接行（row），然后再继续接列（column） ，不再需要container。

**列嵌套这一列又被重新分成12列**

**列顺序**

使用 .col- * -push- * 和 .col- * -pull-* 类可以改变列（column）的顺序（注意要结合使用）

.col- * -push- * 往右推

.col- * -pull-*  往左拉

大于断点值都生效

 

## 《相关案例》

栅格基础案例

![1555987179796](assets/1555987179796.png)

```html

```





列偏移/嵌套/顺序案例

![1555987199572](assets/1555987199572.png)

栅格实现响应式案例

 ![1555987224632](assets/1555987224632.png)

![1555987235114](assets/1555987235114.png)

 

# 【布局组件/插件】

## 《教学目标》

掌握bootstrap布局组件/插件使用

 

## 《相关案例》

### 组件

下拉菜单

![1555987326208](assets/1555987326208.png)

 缩略图

![1555987317843](assets/1555987317843.png)

 

### 插件

标签页

![1555987346393](assets/1555987346393.png)

```html
   <div>
    
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">主页</a></li>
        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">简介</a></li>
        <li role="presentation" class="active"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">信息</a></li>
        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">设置</a></li>
      </ul>
    
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane" id="home">主页</div>
        <div role="tabpanel" class="tab-pane" id="profile">简介</div>
        <div role="tabpanel" class="tab-pane active" id="messages">信息</div>
        <div role="tabpanel" class="tab-pane" id="settings">设置</div>
      </div>
    
    </div>

```



### 模态框

![1555987363802](assets/1555987363802.png)

```html

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal1">
      弹出提示
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel1">通知</h4>
          </div>
          <div class="modal-body">
            	明天自习~~
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">好的，我知道了</button>
          </div>
        </div>
      </div>
    </div>

```

1.显示或者隐藏模态框方式一(  添加属性 )：

```html
   //调出模态框:
   //data-target="#myModal"   指定弹出的目标（值是：选择器）
   //data-toggle="modal"      指定以模态框的方式弹出 ['tɒg(ə)l] 
   //data-dismiss="modal"     指定以模态框的方式消失
<button type="button" data-toggle="modal" data-target="#myModal">Launch modal</button>
```

2.显示或者隐藏模态框方式二 (  调用 js 代码  )：

```js
$('#myModal').modal('show'); // 通过js代码显示模态框
```

3.监听模态框的显示和隐藏

```js
$('#myModal').on('show.bs.modal', function (e) {
  console.log('模态框显示时回调');
})

$('#myModal').on('hidden.bs.modal', function (e) {
   console.log('模态框隐藏时回调');
})
```



### 焦点图

![1555987378874](assets/1555987378874.png)

小码哥综合应用案例

 ![1555987459206](assets/1555987459206.png)

```html

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>小码哥</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    	<script src="js/html5shiv.min.js"></script>
    	<script src="js/respond.min.js"></script>
    <![endif]-->
    <style>

	html{min-width:320px; overflow-x:hidden;}
	
	.nomargin{margin-bottom: 0;}
	
	.news{height: 36px; line-height: 36px; font-size: 14px; white-space:nowrap; text-overflow:ellipsis; overflow: hidden;}
	
	.noborder{border: 0;}
	
	.footer{ padding:60px 10px;}
	
	.copy{ padding:20px 10px 10px 10px;}
    
    </style>
  </head>
  <body>
  
  
<nav class="navbar navbar-default nomargin">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#"><img src="images/logo.png" alt=""></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">
        <li class="active"><a href="#">首页<span class="sr-only">(current)</span></a></li>
        <li><a href="#">课程体系</a></li>
        <li><a href="#">课师资力量</a></li>
        <li><a href="#">常见问题</a></li>
        <li><a href="#">我要报名</a></li>
      </ul>
      
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>  
  
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="images/banner1.jpg" width="100%" alt="...">
    </div>
    <div class="item">
      <img src="images/banner2.jpg" width="100%" alt="...">
    </div>
    <div class="item">
      <img src="images/banner3.jpg" width="100%" alt="...">
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> 

<div class="container">
	<p class="news"><strong>新闻：</strong><a href="#">叩丁狼H5的院长今天拉肚子！你造吗？</a></p>
    <div class="row">
    	<div class="col-md-6">
        	<div class="row">
            	<div class="col-sm-6 col-md-6">
                    <div class="thumbnail noborder">
                      <img src="images/con1_01.png" alt="...">
                      <div class="caption">
                        <h3 class="text-center">学习技能·改命运</h3>
                        <p>无论你是零基础，还是已入门；无论你是职场新人，还是在校学生；只要想改变，都可以来学！我们有科学完善的课程体系，系统而全面，跟着讲师一步一步学习，改变命运！</p>
                      </div>
                    </div>
                </div>
            	<div class="col-sm-6 col-md-6">
                    <div class="thumbnail noborder">
                      <img src="images/con1_02.png" alt="...">
                      <div class="caption">
                        <h3 class="text-center">职业广泛·就业好</h3>
                        <p>课程体系一步到位，工作职位选择广，易找工作！Nodejs、Webapp、移动端网站、微信小程序、混合app开发、Vue、React应有尽有，更大程度提升学生技能与价值！</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    	<div class="col-md-6">
        	<div class="row">
            	<div class="col-sm-6 col-md-6">
                    <div class="thumbnail noborder">
                      <img src="images/con1_03.png" alt="...">
                      <div class="caption">
                        <h3 class="text-center">学习技能·改命运</h3>
                        <p>前端行业一直顺应潮流平稳发展，越走越好！高端大气上档次，低调奢华有内涵！工资逐年升高，越来越吃香!</p>
                      </div>
                    </div>
                </div>
            	<div class="col-sm-6 col-md-6">
                    <div class="thumbnail noborder">
                      <img src="images/con1_04.png" alt="...">
                      <div class="caption">
                        <h3 class="text-center">职业广泛·就业好</h3>
                        <p>由资深高级讲师授课，质量保证，课程实施双老师指导模式，随时解决学生课堂上问题。广州叩丁狼教育实力IT教育，已经被多家线上媒体，电视媒体报道！</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container-fuild bg-primary text-center footer">
    <h3>九大阶段·高质量课程体系·前端工程师一步到位</h3>
    <p>网站制作基础+javascript网页编程+动画设计响应式网站+H5全栈开发和AJAX交互+移动Web和Vue电商+React实战和移动App+微信小程序和大数据可视化+就业和售后+升职加薪技能</p>
    <button class="btn btn-success btn-lg">立即报名</button>
</div>

<div class="container-fuild bg-info text-center copy">
	<p>&copy; 2019广州叩丁狼教育科技有限公司</p>
</div>
 
  


		
				
   

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```



 

 