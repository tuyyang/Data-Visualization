const generateRandomData = () => Array.from({length: 50}, () => [
  Math.floor(Math.random() * 10),
  Math.floor(Math.random() * 10)
])

async function drawScatter() {

  //access data
  let dataset = generateRandomData()
  // let dataset = await d3.json('../../my_weather_data.json')
  // console.table(dataset[0])
  // console.log(dataset[0].humidity)
  // const dateParser = d3.timeParse('%Y-%m-%d')
  // const dataAccessor = d => dateParser(d.date)
  // dataset = dataset.sort((a, b) => dataAccessor(a) - dataAccessor(b)).slice(0, 10)

  // console.log(dataset[19].date)

  // const xAccessor = d => d.dewPoint
  // const yAccessor = d => d.humidity
  // console.log(yAccessor(dataset[9]))
  const xAccessor = d => d[0]
  const yAccessor = d => d[1]

  //create dimensions
  const width = d3.min([
    window.innerWidth * 0.95,
    window.innerHeight * 0.95
  ])

  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50
    }
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  //create chart area
  const wrapper = d3.select('#wrapper')
    .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)

  const bounds = wrapper.append('g')
    .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  bounds.append('g')
      .attr('class', 'x-axis')
    .append('text')
      .attr('class', 'x-axis-label')
  bounds.append('g')
      .attr('class', 'y-axis')
    .append('text')
      .attr('class', 'y-axis-label')

  
    //create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice()

    const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yAccessor))
      .range([dimensions.boundedHeight, 0])
      .nice()

    //draw points
    const drawDots = (dataset) => {

      const dots = bounds.selectAll('circle')
        .data(dataset, d => d[0])

      const transition = d3.transition()
        .duration(1200)
        .ease(d3.easeLinear)

      const newDots = dots.enter()
        .append('circle')
          .attr('r', 0)
          .attr('cx', d => xScale(xAccessor(d)))
          .attr('cy', d => yScale(yAccessor(d)))
          .attr('fill', 'purple')

      const allDots = newDots.merge(dots)
      allDots.transition(transition)
        .delay((d, i) => d[0] * 50)
          .attr('cx', d => xScale(xAccessor(d)))
          .attr('cy', d => yScale(yAccessor(d)))
          .attr('r', 5)
          .on('end', function() {
            d3.select(this).attr('fill', 'cornflowerblue')
          })
        
      const oldDots = dots.exit()
          .attr('fill', 'red')
        .transition(transition)
          .attr('r', 0)
          .remove()
    }
    drawDots(dataset)

    //draw axes
    const xAxisGenerator = d3.axisBottom()
      .scale(xScale)

    const xAxis = bounds.select('.x-axis')
      .call(xAxisGenerator)
        .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    const xAxisLabel = xAxis.select('.x-axis-label')
      .attr('x', dimensions.boundedWidth / 2)
      .attr('y', dimensions.margin.bottom - 10)
      .html('dew point (&deg;F)')

    const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
      .ticks(4)

    const yAxis = bounds.select('.y-axis')
      .call(yAxisGenerator)

    const yAxisLabel = yAxis.select('.y-axis-label')
      .attr('x', -dimensions.boundedHeight / 2)
      .attr('y', -dimensions.margin.left + 10)
      .attr("fill", "black")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle")
      .style("font-size", "1.4em")
      .html('relative humidity')

  
  // init interactive button
  const button = d3.select("body")
    .append("button")
      .text("Update data")
      .on("click", () => {
        const newDataset = generateRandomData()
        drawDots(newDataset)

      })
  
}
drawScatter()