let eventHandlers = {};
let delegatorDefined = false;

/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
function onClick(root, predicate, handler) {
  if (!delegatorDefined) {
    root.addEventListener("click", function (event) {
      console.log(Object.values(eventHandlers));
      for (const [p, h] of Object.values(eventHandlers)) {
        if (p.call(this, event.target)) {
          h.call(this, event);
        }
      }
    });
    delegatorDefined = true;
  }

  if (!eventHandlers[root]) {
    eventHandlers[root] = [];
  }
  eventHandlers[root].push([predicate, handler]);
}

const root = document.createElement('div')
root.innerHTML = `
  <div id="div1">
    <div id="div2">
      <div id="div3">
        div
      </div>
    </div>
  </div>
`
const div1 = root.querySelector('#div1')
const div2 = root.querySelector('#div2')
const div3 = root.querySelector('#div3')

const logs = []
onClick(root, (el) => el.id === 'div1', function (e) {
  logs.push(this.id)
})
onClick(root, (el) => el.id === 'div2', function (e) {
  logs.push(this.id)
})
onClick(root, (el) => el.id === 'div3', function (e) {
  logs.push(this.id)
})
onClick(root, (el) => el.id === 'div3', function (e) {
  logs.push(this.id)
})
console.log(eventHandlers)
console.log(delegatorDefined);
div3.click()
setTimeout(() => {
  console.log(logs, ['div3', 'div3', 'div2', 'div1'])
}, 100)