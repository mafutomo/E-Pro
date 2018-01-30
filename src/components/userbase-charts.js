import * as d3 from 'd3';

document.addEventListener("DOMContentLoaded", function() {

  function drawUsersByAge() {
    var initialWidth;
    window.innerWidth > 600 ? initialWidth = 600 : initialWidth = window.innerWidth;
    var initialHeight = initialWidth * 0.7;   // best relative size for chart
    var svg = d3.select("#svg1");
    var  margin = {
        top: 40,
        right: 20,
        bottom: 50,
        left: 40
      };
    var  width = initialWidth - margin.left - margin.right,
      height = initialHeight - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define the div for the tooltip
    var div = d3.select("#userbase").append("div").attr("class", "tooltip").style("opacity", 0);

    var data = [
      {
          "age": 18,
          "frequency": 120
      },
      {
          "age": 19,
          "frequency": 260
      },
      {
          "age": 20,
          "frequency": 360
      },
      {
          "age": 21,
          "frequency": 445
      }
    ];

      x.domain(data.map(function(d) {
        return d.age;
      }));
      y.domain([
        0,
        d3.max(data, function(d) {
          return d.frequency;
        })
      ]);

      g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

      g.append("g").attr("class", "axis")
        .call(d3.axisLeft(y)).append("text").attr("x", 2).attr("y", y(y.ticks().pop()) + 0.5)
        .attr("fill", "#000").attr("font-weight", "bold").attr("text-anchor", "start").text("Number of Users");

      g.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
        return x(d.age);
      }).attr("y", function(d) {
        return y(d.frequency);
      }).attr("width", x.bandwidth()).attr("height", function(d) {
        return height - y(d.frequency);
      });

      g.append("text").attr("x", (width / 2)).attr("y", 0 - (margin.top / 4)).attr("text-anchor", "middle").style("font-size", "18px").style("text-decoration", "underline").text("Number of Users By Age");

      // text label for the x axis
      g.append("text").attr("x", (width / 2)).attr("y", height+40)
          .style("text-anchor", "middle")
          .text("Age");

  }

  function drawContraceptionMethodsByFrequency() {
    var initialWidth;
    window.innerWidth > 800 ? initialWidth = 800 : initialWidth = window.innerWidth;
    var initialHeight = initialWidth * 0.5;   // best relative size for chart
    var donut = donutChart()
        .width(initialWidth)
        .height(initialHeight)
        .cornerRadius(3) // sets how rounded the corners are on each slice
        .padAngle(0.015) // effectively dictates the gap between slices
        .variable('Users')
        .category('Type');

    var data = [
      {"Type":"Non-Hormonal","Users":1002,"Details":"None, Condoms","More":"Paraguard, Copper IUD"},
      {"Type":"Triphasic","Users":2415,"Details":"The Pill - varied amount","More":"Ortho Tricyclen"},
      {"Type":"Monophasic","Users":687,"Details":"The Pill - constant amount","More":"Levora"},
      {"Type":"Progestins","Users":1234,"Details":"Mirena IUD, Skyla, Mini Pill","More":"Depo Shot, The Ring"},
    ]

    d3.select('#svg2')
            .datum(data) // bind data to the div
            .call(donut); // draw chart in div

  }

  function drawContraceptionByAge() {
    var initialWidth;
    window.innerWidth > 600 ? initialWidth = 600 : initialWidth = window.innerWidth;
    var initialHeight = initialWidth * 0.7;   // best relative size for chart
    var svg = d3.select("#svg3"),
      margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 40
      },
      width = initialWidth - margin.left - margin.right - 80,
      height = initialHeight - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define the div for the tooltip
    var div = d3.select("#userbase").append("div").attr("class", "tooltip").style("opacity", 0);

    var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.05).align(0.1);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    var z = d3.scaleOrdinal().range([
      "wheat",
      "#ffa200",
      "#FF3E00",
      "#70608e",
      "teal",
      "#484043",
      "#b8a09d",
      "#52BFAB"
    ]);

    var data = [
      {
        "Age":18,"Triphasic":3,"Monophasic":30,"Progestins":6, "Non-Hormonal": 160, "No Answer":32
      },
      {
        "Age":19,"Triphasic":16,"Monophasic":40,"Progestins":76, "Non-Hormonal": 270, "No Answer":65
      },
      {
        "Age":20,"Triphasic":11,"Monophasic":22,"Progestins":6, "Non-Hormonal": 230, "No Answer":55
      }
    ]


      // var keys = data.columns.slice(1);
      var keys = ["Age", "Triphasic", "Monophasic", "Progestins", "Non-Hormonal", "No Answer"];

      //  loop through the data for each age and save the total in data
      data.map(function(d) {
        let t, i;
        for (i = 1, t = 0; i < keys.length; ++i) {
          t += d[keys[i]] = +d[keys[i]];
        }
        d.total = t;
      })


      x.domain(data.map(function(d) {
        return d.Age;
      }));
      y.domain([
        0,
        d3.max(data, function(d) {
          return d.total;
        })
      ]).nice();
      z.domain(keys);

      g.append("g").selectAll("g").data(d3.stack().keys(keys)(data)).enter().append("g").attr("fill", function(d) {
        return z(d.key);
      }).selectAll("rect").data(function(d) {
        return d;
      }).enter().append("rect").attr("x", function(d) {
        return x(d.data.Age);
      }).attr("y", function(d) {
        return y(d[1]);
      }).attr("height", function(d) {
        return y(d[0]) - y(d[1]);
      }).attr("width", x.bandwidth()).attr("myval", function(d) {
        return d.key;
      }).on("mouseover", function(d) {
        div.transition().duration(200).style("opacity", .9);
        div.html("<br/>" + `${d[1] - d[0]}` + "<br/>").style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
      }).on("mouseout", function(d) {
        div.transition().duration(500).style("opacity", 0);
      });

      g.append("g").attr("class", "axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

      if (width > 700) {
        g.append("g").attr("class", "axis")
        .call(d3.axisLeft(y)).append("text").attr("x", 2).attr("y", y(y.ticks().pop()) + 0.5)
        .attr("fill", "#000").attr("font-weight", "bold").attr("text-anchor", "start").text("Number Reported");
      } else {
        g.append("g").attr("class", "axis")
        .call(d3.axisLeft(y)).append("text").attr("x", 2).attr("y", y(y.ticks().pop()) + 0.5)
        .attr("fill", "#000").attr("font-weight", "bold").attr("text-anchor", "start");
      }

      var legend = g.append("g").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "end").selectAll("g").data(keys.slice().reverse()).enter().append("g").attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

      legend.append("rect").attr("x", width + 64).attr("width", 19).attr("height", 19).attr("fill", z);

      legend.append("text").attr("x", width + 60).attr("y", 9.5).text(function(d) {
        return d;
      });

      g.append("text").attr("x", (width / 2)).attr("y", 0 - (margin.top / 4)).attr("text-anchor", "middle").style("font-size", "18px").style("text-decoration", "underline").text("Contraception By Age");

      // text label for the x axis
      g.append("text").attr("x", (width / 2)).attr("y", height+40)
          .style("text-anchor", "middle")
          .text("Age");

  }

  function donutChart() {
    var width,
      height,
      margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      colour = d3.scaleOrdinal(d3.schemeCategory20c), // colour scheme
      variable, // value in data that will dictate proportions on chart
      category, // compare data by
      padAngle, // effectively dictates the gap between slices
      floatFormat = d3.format('.4r'),
      cornerRadius, // sets how rounded the corners are on each slice
      percentFormat = d3.format('');

    function chart(selection) {
      selection.each(function(data) {
        // generate chart

        // Add title
        selection.append("text").attr("x", (width / 2)).attr("y", 20).attr("text-anchor", "middle").style("font-size", "18px").style("text-decoration", "underline").text("Contraceptive Methods By Users");

        // ======================================================================================

        // ===========================================================================================
        // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
        var radius;
        if (width < 400) {
          radius = Math.min(width, height) / 7;
        } else if (width < 800) {
          radius = Math.min(width, height) / 4;
        } else {
          radius = Math.min(width, height) / 2;
        }

        // creates a new pie generator
        var pie = d3.pie().value(function(d) {
          return floatFormat(d[variable]);
        }).sort(null);

        // contructs and arc generator. This will be used for the donut. The difference between outer and inner
        // radius will dictate the thickness of the donut
        var arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.6).cornerRadius(cornerRadius).padAngle(padAngle);

        // this arc is used for aligning the text labels
        var outerArc = d3.arc().outerRadius(radius * 0.9).innerRadius(radius * 0.9);
        // ===========================================================================================

        // ===========================================================================================
        // append the svg object to the selection
        var svg = selection.append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        // ===========================================================================================

        // ===========================================================================================
        // g elements to keep elements within svg modular
        svg.append('g').attr('class', 'slices');
        svg.append('g').attr('class', 'labelName');
        svg.append('g').attr('class', 'lines');
        // ===========================================================================================

        // ===========================================================================================
        // add and colour the donut slices
        var path = svg.select('.slices').datum(data).selectAll('path').data(pie).enter().append('path').attr('fill', function(d) {
          return colour(d.data[category]);
        }).attr('d', arc);
        // ===========================================================================================

        // ===========================================================================================
        // add text labels
        var label = svg.select('.labelName').selectAll('text').data(pie).enter().append('text').attr('dy', '.35em').html(function(d) {
          // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
          return d.data[category] + ': <tspan>' + percentFormat(d.data[variable]) + '</tspan>';
        }).attr('transform', function(d) {

          // effectively computes the centre of the slice.
          // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
          var pos = outerArc.centroid(d);

          // changes the point to be on left or right depending on where label is.
          pos[0] = radius * 0.95 * (midAngle(d) < Math.PI
            ? 1
            : -1);
          return 'translate(' + pos + ')';
        }).style('text-anchor', function(d) {
          // if slice centre is on the left, anchor text to start, otherwise anchor to end
          return (midAngle(d)) < Math.PI
            ? 'start'
            : 'end';
        });
        // ======================================================================================


        // add lines connecting labels to slice. A polyline creates straight lines connecting several points
        var polyline = svg.select('.lines').selectAll('polyline').data(pie).enter().append('polyline').attr('points', function(d) {

          // see label transform function for explanations of these three lines.
          var pos = outerArc.centroid(d);
          pos[0] = radius * 0.95 * (midAngle(d) < Math.PI
            ? 1
            : -1);
          return [arc.centroid(d), outerArc.centroid(d), pos]
        });
        // ===========================================================================================

        // ===========================================================================================
        // add tooltip to mouse events on slices and labels
        // d3.selectAll('.labelName text, .slices path').call(toolTip);
        // ===========================================================================================

        // ===========================================================================================
        // Functions

        // calculates the angle for the middle of a slice
        function midAngle(d) {
          return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        // function that creates and adds the tool tip to a selected element
        function toolTip(selection) {

          // add tooltip (svg circle element) when mouse enters label or slice
          selection.on('mouseenter', function(data) {

            svg.append('text').attr('class', 'toolCircle').attr('dy', -15). // hard-coded. can adjust this to adjust text vertical alignment in tooltip
            html(toolTipHTML(data)). // add text to the circle.
            style('font-size', '.9em').style('text-anchor', 'middle'); // centres text in tooltip

            svg.append('circle').attr('class', 'toolCircle').attr('r', radius * 0.55). // radius of tooltip circle
            style('fill', colour(data.data[category])). // colour based on category mouse is over
            style('fill-opacity', 0.35);

          });

          // remove the tooltip when mouse leaves the slice/label
          selection.on('mouseout', function() {
            d3.selectAll('.toolCircle').remove();
          });
        }

        // function to create the HTML string for the tool tip. Loops through each key in data object
        // and returns the html string key: value
        function toolTipHTML(data) {

          var tip = '',
            i = 0;

          for (var key in data.data) {

            // if value is a number, format it as a percentage
            var value = (!isNaN(parseFloat(data.data[key])))
              ? percentFormat(data.data[key])
              : data.data[key];

            // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
            // tspan effectively imitates a line break.
            if (i === 0)
              tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
            else
              tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
            i++;
          }

          return tip;
        }
        // ===========================================================================================

      });
    }

    // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
    chart.width = function(value) {
      if (!arguments.length)
        return width;
      width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length)
        return height;
      height = value;
      return chart;
    };

    chart.margin = function(value) {
      if (!arguments.length)
        return margin;
      margin = value;
      return chart;
    };

    chart.radius = function(value) {
      // if (!arguments.length)
      //   return radius;
      // radius = value;
      return chart;
    };

    chart.padAngle = function(value) {
      if (!arguments.length)
        return padAngle;
      padAngle = value;
      return chart;
    };

    chart.cornerRadius = function(value) {
      if (!arguments.length)
        return cornerRadius;
      cornerRadius = value;
      return chart;
    };

    chart.colour = function(value) {
      if (!arguments.length)
        return colour;
      colour = value;
      return chart;
    };

    chart.variable = function(value) {
      if (!arguments.length)
        return variable;
      variable = value;
      return chart;
    };

    chart.category = function(value) {
      if (!arguments.length)
        return category;
      category = value;
      return chart;
    };

    return chart;
  }

  function drawCharts() {
    drawUsersByAge();
    drawContraceptionMethodsByFrequency();
    drawContraceptionByAge();
  }

  window.addEventListener('resize', function(){window.location.reload(true);});

  drawCharts();

})
