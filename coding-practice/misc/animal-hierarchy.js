/*

https://leetcode.com/discuss/interview-question/847073/Amazon-or-Phone-or-Front-End-Engineer

['dog', 'mammal'],
["shark, fish"],
["cat", "mammal"],
["mammal", "animal"],
['fish', 'animal']

animal
  fish
    shark
  mammal
    dog
    cat
*/

const relationships = new Map();

const insert = function ([child, parent]) {
  if (!relationships.has(parent)) {
    relationships.set(parent, {children: [], parentsCount: 0});
  }
  if (!relationships.has(child)) {
    relationships.set(child, {children: [], parentsCount: 0});
  }
  relationships.get(parent).children.push(child);
  relationships.get(child).parentsCount++;
};

const print = function () {
  const results = {};
  const dfs = function (k) {
    if (k == null || !relationships.has(k)) {
      return {};
    }
    const result = {};
    for (const child of relationships.get(k).children) {
      result[child] = dfs(child);
    }
    return result;
  };

  Array.from(relationships)
    .filter(([k, v]) => v.parentsCount === 0)
    .forEach(([k, v]) => results[k] = dfs(k));

  console.log(JSON.stringify(results));
};

insert(['dog', 'mammal'])
insert(["shark", "fish"])
insert(["cat", "mammal"])
insert(["mammal", "animal"])
insert(['fish', 'animal'])
print();

console.log(
  JSON.stringify(Array.from(relationships.entries()))
)