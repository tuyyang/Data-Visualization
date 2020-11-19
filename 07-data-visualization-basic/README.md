<h2>linearGradient</h2>

<p>用来定义线性渐变，用于图形元素的填充或描边</p>

```html
<svg width="120" height="120"  viewBox="0 0 120 120"
     xmlns="http://www.w3.org/2000/svg" version="1.1"
     xmlns:xlink="http://www.w3.org/1999/xlink" >

    <defs>
        <linearGradient id="MyGradient">
            <stop offset="5%"  stop-color="green"/>
            <stop offset="95%" stop-color="gold"/>
        </linearGradient>
    </defs>

    <rect fill="url(#MyGradient)"
          x="10" y="10" width="100" height="100"/>
</svg>
```

<h5>属性：</h5>

 * `spreadMethod`：确定如何填充超出定义的渐变边的形状

   ​						`pad`、`reflect`、`repeat`

*  `x1`、`y1`、`x2`、`y2`
* `gradientTransform`、`gradientUnits`

