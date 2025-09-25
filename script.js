document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const mobile = document.getElementById("mobile").value.trim();
  const files = document.getElementById("files").files;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!mobile) {
    alert("Please enter a mobile number.");
    return;
  }

  let matchedFiles = [];

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const content = event.target.result;
      if (content.includes(mobile)) {
        matchedFiles.push(file);
      }

      if (matchedFiles.length > 0) {
        resultsDiv.innerHTML = `<h2>Results for ${mobile}:</h2>`;
        const ul = document.createElement("ul");
        matchedFiles.forEach(mf => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = URL.createObjectURL(mf);
          link.download = mf.name;
          link.textContent = `Download ${mf.name}`;
          li.appendChild(link);
          ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
      } else {
        resultsDiv.innerHTML = `<p>No matches found.</p>`;
      }
    };
    reader.readAsText(file);
  });
});