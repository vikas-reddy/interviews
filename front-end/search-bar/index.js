function showProducts(searchText) {
  const list = document.getElementById("filtered-result-list");
  list.innerHTML = "";

  const products = filteredProducts(searchText);
  const noResultsMessage = document.getElementById("no-results-message");

  if (products.length === 0) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
    products.forEach(product => {
      const listItem = document.createElement("li");
      listItem.textContent = product.name;
      list.appendChild(listItem);
    });
  }
}

const debounce = function(callback, timeout) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callback.apply(this, args), timeout);
  }
};

function addSearchListener() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", 
    debounce((event) => showProducts(event.target.value), 500)
  );
}

window.addEventListener('load', function() {
  showProducts();
  addSearchListener();
});