
/**
 * @param {object[]} items
 * @param { Array< {k: string, v: any} >} excludes
 * @return {object[]}
 */
function excludeItems(items, excludes) {
  const excludesMap = new Map;
  for (const {k,v} of excludes) {
    if (!excludesMap.has(k)) {
      excludesMap.set(k, new Set());
    }
    excludesMap.get(k).add(v);
  }
  /**
   * excludesMap = Map {
   *   color: Set {'silver', 'red'},
   *   type: Set { 'tv' }
   * }
   */
  return items.filter(item => {
    const itemKeys = Object.keys(item);
    return itemKeys.some(itemKey => {
      return excludesMap.has(itemKey) && 
        excludesMap.get(itemKey).has(item[itemKey])
    })
  });
}

// Given an input of array, 
// which is made of items with >= 3 properties

let items = [
  {color: 'red', type: 'tv', age: 18}, 
  {color: 'silver', type: 'phone', age: 20},
  {color: 'blue', type: 'book', age: 17},
] 

// an exclude array made of key value pair
const excludes = [ 
  {k: 'color', v: 'silver'}, 
  {k: 'type', v: 'tv'}, 
] 

console.log(
  excludeItems(items, excludes)
)