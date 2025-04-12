const emissions_by_year = d3.csv("emissions_by_year.csv");


emissions_by_year.then(function(data) {
  data.forEach(function(d) {
      d.Year = +d.Year;
  });

  let width = 540, height = 450;

  let margin = {
    top: 20,
    bottom: 100,
    left: 100,
    right: 0
  };

  let svg = d3.select('#emissions')
    .append('svg')
    .attr('width', width)
    .attr('height', height);



  let xscale = d3.scaleBand()
    .domain(data.map(d => d.Year))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  let yscale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total_emission)])
    .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .call(d3.axisLeft(yscale))
      .attr('transform', `translate(${margin.left},0)`);

    svg.append('g')
      .call(d3.axisBottom(xscale).tickFormat(d3.format("d")))
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .selectAll('text')
      .attr("transform", "translate(-12, 10) rotate(-45)");

      svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 50)
      .attr('text-anchor', 'middle')
      .text('Year');
  
      svg.append('text')
      .attr('x', -height / 2)
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Emissions (kt)');

    const line = d3.line()
      .x(d => xscale(d.Year) + xscale.bandwidth() / 2)
      .y(d => yscale(d.total_emission))
      .curve(d3.curveNatural);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll('text')
      .style('font-family', 'Montserrat')
});

const avg_temp = d3.csv("avg_temp.csv");

avg_temp.then(function(data) {
  data.forEach(function(d) {
      d.Year = +d.Year;
  });

  let width = 540, height = 450;

  let margin = {
    top: 20,
    bottom: 100,
    left: 100,
    right: 0
  };

  let svg = d3.select('#temp')
    .append('svg')
    .attr('width', width)
    .attr('height', height);



  let xscale = d3.scaleBand()
    .domain(data.map(d => d.Year))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  let yscale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["Average Temperature °C"])])
    .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .call(d3.axisLeft(yscale))
      .attr('transform', `translate(${margin.left},0)`);

    svg.append('g')
      .call(d3.axisBottom(xscale).tickFormat(d3.format("d")))
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .selectAll('text')
      .attr("transform", "translate(-12, 10) rotate(-45)");

      svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 50)
      .attr('text-anchor', 'middle')
      .text('Year');
  
      svg.append('text')
      .attr('x', -height / 2)
      .attr('y', 60)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Average Temperature Change °C');

    const line = d3.line()
      .x(d => xscale(d.Year) + xscale.bandwidth() / 2)
      .y(d => yscale(d["Average Temperature °C"]))
      .curve(d3.curveNatural);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll('text')
      .style('font-family', 'Montserrat')
});