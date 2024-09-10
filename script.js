document.addEventListener("DOMContentLoaded", () => {
  const apiURL = 'https://api.jsonbin.io/v3/b/66e002b6acd3cb34a8811cf3'; // Replace with your actual API URL

  const tableBody = document.getElementById("table-body");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && data.record && Array.isArray(data.record)) {
        data.record.forEach(paper => {
          const row = document.createElement("tr");

          const titleCell = document.createElement("td");
          titleCell.textContent = paper.T || "No title";
          row.appendChild(titleCell);

          const typeCell = document.createElement("td");
          typeCell.textContent = paper.ee || "No type";
          row.appendChild(typeCell);

          const linkCell = document.createElement("td");
          const link = document.createElement("a");
          link.href = paper.ee_link || "#";
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "View Profile";
          linkCell.appendChild(link);
          row.appendChild(linkCell);

          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = "<tr><td colspan='3'>No records found.</td></tr>";
      }
    } catch (error) {
      error.textContent = `Error: ${error.message}`;
      error.style.display = "block";
    } finally {
      loading.style.display = "none";
    }
  };

  fetchData();
});
