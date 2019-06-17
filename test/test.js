[1, 2, 3].map((item, index) => {
  console.log(item + '' + index)
})

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
(async function(){
  await sleep(3000);
})()

fetch()