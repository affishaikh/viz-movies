const countByYear = function(movies) {
  const m = movies.reduce((acc, movie) => {
    if (Object.keys(acc).includes(movie.year)) {
      acc[movie.year]++;
      return acc;
    }
    acc[movie.year] = 1;
    return acc;
  }, {});

  return Object.keys(m).map(k => {
    return { year: k, count: m[k] };
  });
};

const main = function() {
  fetch("http://localhost:8000/movies.csv")
    .then(res => {
      return res.text();
    })
    .then(m => {
      return csv({
        delimiter: ["|"],
        noheader: true,
        headers: [
          "name",
          "year",
          "rated",
          "time",
          "genre",
          "director",
          "characters",
          "language",
          "country",
          "rating"
        ]
      }).fromString(m);
    })
    .then(movies => {
      const radius = 100;
      const ground = d3
        .select("svg")
        .append("g")
        .attr("width", 500)
        .attr("height", 500)
        .attr("transform", `translate(${radius}, ${radius})`);
      const byYear = countByYear(movies);
      const pie = d3.pie().value(d => d.count);
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(100);
      ground
        .selectAll("path")
        .data(pie(byYear))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr(
          "fill",
          () =>
            `rgb(${Math.floor(Math.random() * 255)}, 
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)})`
        );
    });
};

window.onload = main;
