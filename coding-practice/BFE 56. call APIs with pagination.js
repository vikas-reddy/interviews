async function fetchList(since = 0) {
  console.log("fetchList called")
  const LIMIT = 27
  if (since >= LIMIT) {
    return []
  }
  const results = []
  for (let i = since + 1; i <= LIMIT && i <= since + 5; i++) {
    results.push({id: i})
  }
  return results
}

// you can change this to generator function if you want
async function* fetchListWithAmount (amount = 5) {
  let itemsFetched = 0
  let since = 0
  while (itemsFetched < amount) {
    const list = await fetchList(since)
    if (!list.length) {
      break
    }
    for (let i = 0; i < list.length && itemsFetched < amount; i++, itemsFetched) {
      yield list[i]
      itemsFetched++
    }
    since = list[list.length - 1].id
  }
}

(async function(){
  // fetchListWithAmount().then(console.log)
  for await (const item of fetchListWithAmount(13)) {
    console.log(item)
  }
})()