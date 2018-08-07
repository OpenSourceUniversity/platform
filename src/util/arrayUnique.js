export default function arrayUnique(array) {
  const a = array.concat();
  for (let i = 0; i < a.length; i += 1) {
    for (let j = i + 1; j < a.length; j += 1) {
      if (a[i] === a[j]) {
        a.splice(j, 1);
        j -= 1;
      }
    }
  }
  return a;
}
