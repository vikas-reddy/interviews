const PRODUCTS = [
  {
    name: "iPhone 11"
  },
  {
    name: "iPhone 11 Pro"
  },
  {
    name: "iPhone 11 Pro Max"
  },
  {
    name: "iPhone 12"
  },
  {
    name: "iPhone 12 Mini"
  },
  {
    name: "iPhone 12 Pro"
  },
  {
    name: "iPhone 12 Pro Max"
  },
  {
    name: "iPhone 13"
  },
  {
    name: "Galaxy S22"
  },
  {
    name: "Galaxy S22 Plus"
  },
  {
    name: "Galaxy S22 Ultra"
  }
];

function filteredProducts(searchText) {
  console.log("Filtering products by", searchText)
  if (searchText) {
    return PRODUCTS.filter(p => new RegExp(searchText, "i").test(p.name))
  } else {
    return PRODUCTS;
  }
}