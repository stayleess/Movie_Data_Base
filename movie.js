const movies = [];
const tableHeader = ["Movie Rank", "Movie Title"];
const output = document.querySelector(".output");

const endoint =
  "https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json";

fetch(endoint)
  .then((blob) => blob.json())
  .then((movies) => {
    let temp = `<table>`;
    tableHeader.forEach(
      (header) => (temp += `<th class="theader"> ${header.toUpperCase()} </th>`)
    );
    movies.forEach((movie) => {
      temp += `
        <tr class="hover">
          <td class="rank">${movie.rank}</td>
          <td class="title">${movie.title}</td>
     
        </tr>
        `;
    });

    temp += `</table>`;
    output.innerHTML = temp;
  });

fetch(endoint)
  .then((blob) => blob.json())
  .then((data) => movies.push(...data));

const search = document.querySelector(".filter-input");
function filter(e) {
  let results;
  let temp = "";

  results = movies.filter((item) =>
    item.title.toLowerCase().includes(e.target.value.toLowerCase())
  );

  if (results.length > 0) {
    temp = `<table><tr>`;
    tableHeader.forEach(
      (header) =>
        (temp += `<th class="filter-theader"> ${header.toUpperCase()} </th>`)
    );
    temp += `<tr>`;
    results.forEach((row) => {
      temp += `
            <tr class="tr-filter-hover">
              <td>${row.rank}</td>
              <td>${row.title}</td>

            </tr>
            `;
    });
    temp += `</table>`;
  } else {
    temp = `<div class="no-item">Item Not Found </div>`;
  }

  output.innerHTML = temp;
}
search.addEventListener("input", filter);
