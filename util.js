const arr = [2, 3, 4, 3, 2, 1];
function ocurrences(arr, ent) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ent) {
      count++;
    }
  }
  return count;
}

console.log(ocurrences(arr, 3)); // 2
