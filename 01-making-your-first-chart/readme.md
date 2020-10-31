[SVG attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)



* ```javascript
  d3.extent()
  ```

  返回给定数组的最小值和最大值



* ```    
  d3.range(start, stop, step)
  
  d3.range(1, 10, 1) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
  d3.range(10, 60, 10) // [10, 20, 30, 40, 50]
  d3.range(1, 5) // [1, 2, 3, 4]
  ```

  `domain()`、`range()`相当于定义比例尺的定义域和值域

  ```javascript
  cpnst scale = d3.scaleLinear()
  	.domain([0, 10])
  	.range([0,200])
  scale(1) //return 20
  scale(7) //return 140
  ```

[d3.js scale理解](https://www.cnblogs.com/kidsitcn/p/7182274.html)