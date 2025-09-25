const fileDatabase = [
  "files/9876543210.txt",
  "files/1234567890.txt",
  "files/9998887777.pdf",
  "files/1122334455.pdf"
];

document.getElementById("searchForm").addEventListener("submit", function(e){
  e.preventDefault();
  const mobile = document.getElementById("mobile").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if(!mobile){
    alert("Please enter a mobile number.");
    return;
  }

  const matchedFiles = fileDatabase.filter(f => f.includes(mobile));

  if(matchedFiles.length > 0){
    const ul = document.createElement("ul");
    matchedFiles.forEach(f => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = f;
      link.download = f.split("/").pop();
      link.textContent = "Download " + f.split("/").pop();
      li.appendChild(link);
      ul.appendChild(li);
    });
    resultsDiv.appendChild(ul);
  } else {
    resultsDiv.innerHTML = "<p>No file found for this number.</p>";
  }
});