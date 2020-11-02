async function drawBars() {
  //access data
  const dataset = await d3.json('../my_weather_data.json')

  const metricAccessor = d => d.humidity

  //create dimensions
  const width = 600

  let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 20,
      right: 10,
      bottom: 50,
      left: 50
    }
  }

  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  //draw canvas
  const wrapper = d3.select('#wrapper')
    .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)

  const bounds = wrapper.append('g')
    .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  //create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, metricAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  //create bins
  const binsGenerator = d3.histogram()
    .domain(xScale.domain())
    .value(metricAccessor)
    .thresholds(12)

  const bins = binsGenerator(dataset)
  // console.log(bins)

  //create y scale
  const yAccessor = d => d.length

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor())])
    .range([dimensions.boundedHeight, 0])
    .nice()
  
  //draw data
  const binsGroup = bounds.append('g')
    .data(bins)
    .enter().append('g')
  
  const barPadding = 1

  const barRects = binsGroup.append('rect')
    .attr('x', d => xScale(d.x0) + barPadding / 2)
    .attr('y', d => yScale(yAccessor(d)))
}

drawBars()