async function fetchPreviewData(url) {
  try {
    const cachedData = localStorage.getItem(`preview_${url}`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Fetch preview data (Replace with your own API key)
    const response = await fetch(`https://api.linkpreview.net/?key=aaa7230ebb992802342d52c742564440&q=${url}`);
    const data = await response.json();

    // Store data in localStorage for future use
    localStorage.setItem(`preview_${url}`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch link preview:", error);
  }
}

// Debounce function to delay execution
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

async function showPreview(event, link) {
  const url = link.href;
  const data = await fetchPreviewData(url);
  const tooltip = document.getElementById("tooltip");

  if (data && data.title) {
    tooltip.innerHTML = `
      <div class="tooltip-body">
        <img src="${data.image}"><br>
        <div>
          <p><a href="${url}" target="_blank">${data.title}</a></p>
          <p>${data.description}</p>
        </div>
      </div>
    `;
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + "px";
    tooltip.style.top = event.pageY + "px";
  }
}

const debouncedShowPreview = debounce(showPreview, 1000);

document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('a[href]:not([href="#"])');
  const tooltip = document.getElementById("tooltip");

  links.forEach(link => {
    link.addEventListener("mouseenter", (event) => debouncedShowPreview(event, link));

    link.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
});