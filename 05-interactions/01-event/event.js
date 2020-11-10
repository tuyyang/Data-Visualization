async function createEvent() {
  const rectColor = [
    'pink',
    'lightblue',
    'cornflowerblue',
    'seagreen'
  ]

  const rects = d3.select('#svg')
    .selectAll('.rect')
    .data(rectColor) //传递参数
    .enter().append('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('x', (d, i) => i * 110)
      .attr('fill', 'lightgrey')

  rects.on('mouseenter', function(datum, index, nodes) {
    // console.log({datum, index})
    d3.select(this).style('fill', datum)
  })
    .on('mouseout', function() {
    d3.select(this).style('fill', 'lightgrey')
  })

  //do not us arrow function, this will always refer to the same thing
  
  setTimeout(() => {
    rects
      .dispatch('mouseout')
      .on('mouseenter', null)
      .on('mouseout', null)
  }, 3000)
}

createEvent()