# Data-Visualization

### 1.数据绑定

* `d3.data()`：将数据绑定到DOM元素
* `d3.enter()`：在绑定数据之后，选择缺少的DOM元素，一般和`append()`一起创建DOM
* `d3.exit()`：选择多余的DOM元素，并用`remove()`移除



### 2.日期对象和字符串的相互转化

将日期字符串转化为d3中的日期对象

```javascript
const dateParser = d3.timeParse('%Y-%m-%d')
```

将日期对象转换为字符串

```javascript
const dateFormat = d3.timeFormat()
```

```markdown
%a：星期的缩写 // Thu
%A：星期的全称 // Thursday

%b：月的缩写 // Jan
%B：月的全称 // January

%d：在本月的天数， 不足2位用0补全 [01, 31]
%e：在本月的天数， 不足2位用空格补全 [ 1, 31]

%H：小时， 24小时制 [00, 23]
%I：小时， 12小时制 [01, 12]

%w：以小数形式表示星期数
%W：在本年的周数

%j：在本年中的天数 [001, 366]
%m：月份 [01, 12]
%M：分钟 [00, 59]
%L：毫秒 [000, 999]
%p：AM或PM
%S：秒 [00, 60]
%x：日期部分， 等同于”%m%d%Y”
%X：时间部分， 等同于”%H:%M:%S”
%y：不含纪元的年份 [00, 99]
%Y：包含纪年的4位数年份
```

