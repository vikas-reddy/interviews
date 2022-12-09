const LOREM_IPSUM_TEXT = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum
`;

function loadFromAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(LOREM_IPSUM_TEXT);
    }, 1000)
  });
}

const loadNextItemOnScroll = function () {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  loadFromAPI().then((response) => {
    const container = document.getElementById("container");
    const item = document.createElement("div");
    item.className = "item";
    const heading = document.createElement("h2");
    heading.textContent = "New Item"
    const p = document.createElement("p")
    p.textContent = response;
    item.appendChild(heading);
    item.appendChild(p);
    container.appendChild(item);

    loader.style.display = 'none';
  });
}

const debounce = function (cb, time) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, time)
  };
};

const throttle = function (cb, wait) {
  let time = Date.now();
  return function (...args) {
    if (Date.now() > time + wait) {
      cb(args);
      time = Date.now();
    }
  };
};

window.addEventListener('load', () => {
  window.addEventListener('scroll', throttle(() => {
    const body = document.body;
    const { scrollHeight, clientHeight, scrollTop } = body;
    if (scrollHeight - clientHeight < scrollTop + 100) {
      loadNextItemOnScroll();
    }
  }), 1000)
});