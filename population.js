const COLORS = [
  "#778899",
  "#b0c4de",
  "#ffffe0",
  "#00ff00",
  "#32cd32",
  "#faf0e6",
  "#ff00ff",
  "#800000",
  "#66cdaa",
  "#0000cd",
  "#ba55d3",
  "#9370db",
  "#3cb371",
  "#7b68ee",
  "#00fa9a",
  "#48d1cc",
  "#c71585",
  "#191970",
  "#f5fffa",
  "#ffe4e1",
  "#ffe4b5",
  "#ffdead",
  "#000080",
  "#fdf5e6",
  "#808000",
  "#6b8e23",
  "#ffa500",
  "#ff4500",
  "#da70d6",
  "#eee8aa",
  "#98fb98",
  "#afeeee",
  "#db7093",
  "#ffefd5",
  "#ffdab9",
  "#cd853f",
  "#ffc0cb",
  "#dda0dd",
  "#b0e0e6",
  "#800080",
  "#663399",
  "#ff0000",
  "#bc8f8f",
  "#4169e1",
  "#8b4513",
  "#fa8072",
  "#f4a460",
  "#2e8b57",
  "#fff5ee",
  "#a0522d",
  "#c0c0c0",
  "#87ceeb",
  "#6a5acd",
  "#708090",
  "#708090",
  "#fffafa",
  "#00ff7f",
  "#4682b4",
  "#d2b48c",
  "#008080",
  "#d8bfd8",
  "#ff6347",
  "#40e0d0",
  "#ee82ee",
  "#f5deb3",
  "#ffffff",
  "#f5f5f5",
  "#ffff00",
  "#9acd32"
];

const getTopTen = function(population) {
  const topTen = population.slice(0, 10);
  const other = population.slice(10).reduce(
    (res, country) => {
      return {
        population: +res.population + +country.population,
        World: +res.World + +country.World
      };
    },
    { population: 0, World: 0 }
  );
  return [...topTen, other];
};

const main = function() {
  const width = 500;
  const height = 500;
  const colors = d3
    .scaleOrdinal()
    .domain([])
    .range(COLORS);
  const radius = 250;
  const ground = d3
    .select("svg")
    .append("g")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${radius}, ${radius})`);
  const pie = d3.pie().value(d => d.World * 100);
  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);
  const info = d3.select("#info");

  fetch("https://query.data.world/s/mlanz5ie3uaugdcnkxoffvwdqipfwb")
    .then(res => res.json())
    .then(population => {
      const topTen = getTopTen(population);

      ground
        .selectAll("path")
        .data(pie(topTen))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => colors(d.data.World * 100));

      info
        .selectAll("div")
        .data(topTen)
        .enter()
        .append("div")
        .text(d => d.country)
        .append("p")
        .style("background-color", d => colors(d.World * 100))
        .style("width", "50px")
        .style("height", "20px");
    });
};

window.onload = main;
