async function drawTable() {

  const dateParser = d3.timeParse('%Y-%m-%d')
  const dateAccessor = d => dateParser(d.date)

  let dataset = await d3.json('./../my_weather_data.json')
  dataset = dataset.sort((a, b) => dateAccessor(a) - dateAccessor(b))

  // console.log(dataset[3].precipType)

  const table = d3.select('#table')

  const dateFormat = d => d3.timeFormat('%-m/%d')(dateParser(d))
  const hourFormate = d => d3.timeFormat('%-I %p')(new Date(d * 1000))
  const format24HourTime = d => +d3.timeFormat('%H')(new Date(d * 1000))

  const numberOfRow = 60
  const colorScale = d3.interpolateHcl("#a5c3e8", "#efa8a1")
  const grayColorScale = d3.interpolateHcl('#fff', '#dbc4ca')
  const tempScale = d3.scaleLinear()
    .domain(d3.extent(dataset.slice(0, numberOfRow), d => d.temperatureMax))
    .range([0, 1])

  const timeScale = d3.scaleLinear()
    .domain([0, 24])
    .range([0, 80])

  const humidityScale = d3.scaleLinear()
    .domain(d3.extent(dataset.slice(0, numberOfRow), d => d.windSpeed))
    .range([0, 1])
  
  const columns = [
    {label: 'Day', type: 'date', format: d => dateFormat(d.date)},
    {label: 'Summary', type: 'text', format: d => d.summary},
    {label: 'Max Temp', type: 'number', format: d => d3.format('.1f')(d.temperatureMax), background: d => colorScale(tempScale(d.temperatureMax))},
    {label: 'Max Temp Time', type: 'marker', format: d => '|', transform: d => `translateX(${timeScale(format24HourTime(d.apparentTemperatureMaxTime))}%)`},
    {label: 'Wind Speed', type: 'number', format: d => d3.format('.2f')(d.windSpeed), background: d => grayColorScale(humidityScale(d.windSpeed))},
    {label: 'Did Snow', type: 'centered', format: d => d.precipType == 'snow' ? '❄' : ''},
    {label: 'UV Index', type: 'symbol', format: d => new Array(+d.uvIndex).fill('✸').join('')}
  ]

  table.append('thead').append('tr')
    .selectAll('thead')
    .data(columns)
    .enter().append('th')
      .text(d => d.label)
      .attr('class', d => d.type)

  const body = table.append('tbody')

  dataset.slice(0, numberOfRow).forEach(d => {
    body.append('tr')
      .selectAll('td')
      .data(columns)
      .enter().append('td')
        .text(columns => columns.format(d))
        .attr('class', columns => columns.type)
        .style('background', columns => columns.background && columns.background(d))
        .style('transform', columns => columns.transform && columns.transform(d))
  })
}

drawTable()