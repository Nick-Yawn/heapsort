const heapsort = require('./heapsort');
const shuffle = require('./shuffle');

const ARRAY_LENGTH = 15;
const VERBOSE = true;
const highContrast = process.argv[2] ? true : false;

// This function checks not only that the array is sorted, but that no values have been duplicated
const isSorted = array => {
  for( let i = 0; i < ARRAY_LENGTH - 1; i++ ){
    if( array[i] + 1 !== array[i + 1] ) return false;
  }
  return true;
}

// ARRAY SETUP

const arr = new Array(ARRAY_LENGTH);

for( let i = 0; i < arr.length; i++ ){
  arr[i] = i;
}

shuffle(arr);

// THE SORT

const str = `SORTED ${ARRAY_LENGTH} values:`;

console.time(str);
heapsort(arr, VERBOSE, highContrast);
console.timeEnd(str);

console.log(`isSorted: ${isSorted(arr)}`);
