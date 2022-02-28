const heapsort = (array, verbose = false) => {
  
  // first, we need to heap-order the array.
  // heaps are interesting in that they are arrays represented as n-trees.
  // usually binary, but they can technically be made with any value n
  // the relationship between array indices and the binary tree is as follows:
  
  // [1 2 3 4 5 6 7 8 9 10]
  //             1
  //       2            3
  //    4     5      6     7
  //   8 9  10 11  12 13 14 15
  // 16 etc.

  // an array is heap ordered if each node is greater than both of its children
  // heaps are excellent for maintaining priority queues.

  // notice that we are indexing from 1 instead of 0, (we will have to account for this later)
  // that each row begins with a power of 2, (including 0)
  // and that the parent of each node is the index
  // of that node divided by 2, in truncated integer division,
  // e.g. 7 / 2 === 3
  // from these facts, it should be possible to see how a
  // ternary tree could also be used 

  // In order to sort using a heap, first we need to heap-sort the array 
  // then, we will loop the following steps, tracking an index 
  // that stores the last value of the array:
  //    swap the largest value, which is the root node, with the index
  //    decrement the index
  //    fix the heap-order
  //    repeat, until there is only one value left in the heap.
  
  // VARIABLES WITH SUFFIX 'b1' HOLD 1-INDEXED VALUES AND MUST BE CORRECTED
  // BEFORE THEY ARE USED TO ACCESS THE ARRAY
  // TOO BAD JS DOESN'T HAVE AN INDEX 1 FLAG 

  let length = array.length;

  // helper function for swapping array values that takes 1-indexed indices
  const swapb1 = (ib1, jb1) => {
    let temp = array[ib1 - 1];
    array[ib1 - 1] = array[jb1 - 1];
    array[jb1 - 1] = temp;
  }

  // helper function for fixing the heap
  const sinkb1 = indexb1 => {
    while( 2 * indexb1 <= length ){
      if(verbose) console.log(`sinking ${array[indexb1-1]} at ${indexb1}`);
      let childIndexb1 = 2 * indexb1; // this should make sense, see line 20
      if( childIndexb1 < length && array[childIndexb1-1] < array[childIndexb1] ) 
        childIndexb1++; // we should swap with the larger child, if there is one
      if( array[indexb1-1] < array[childIndexb1-1] ){
        swapb1(indexb1, childIndexb1);
        indexb1 = childIndexb1;
      } else break; // if it's heap-ordered w/r/t its children, we're done.
    }               // we'll check its parent node on a different run
  }

  //heap-order
  for( let i = Math.floor(length / 2); i >= 1; i-- ){
    sinkb1(i);
    if(verbose) printHeap(array);
  }
  
  if(verbose) console.log(`ARRAY IS HEAP-ORDERED: ${checkHeapOrder(array)}\n`);
  
  while( length > 1 ){
    if(verbose) console.log(`Swapping ${array[0]} to ${length}`);
    swapb1( 1, length-- );
    sinkb1( 1 );
    if(verbose) printHeap(array);
  }

  if(verbose) console.log(array.join(' '));
}

const checkHeapOrder = arr => {
  for( let i = 1; i < Math.floor(arr.length / 2); i++ ){
    //console.log( arr.length, i, i * 2, i * 2 + 1);
    if( arr[i * 2 - 1] > arr[i - 1] || arr[i * 2] > arr[i - 1] )
      return false;
  }
  return true;
}

const printHeap = (arr) => {
  // We're stringbuilding.
  let string = '';
  const length = arr.length;
  let numlayers = 0;
  while( 2 ** numlayers <= length )
    numlayers++;

  for( let i = 0; i <= numlayers; i++ ){
    string += arr.slice( 2 ** i - 1, 2 ** (i + 1) - 1).map( n => {
      let subspace = spaces( 2 ** (numlayers - i - 1) - 1 );
      let unit = (n < 10 ? ` ${n}` : n );
      return subspace + unit + subspace;
    }).join('  ') 
    + '\n';  
  } 

  console.log(string);
}

const spaces = x => {
  let array = [];
  for( let i = 0; i < x; i++ ){
    array.push('  ');
  }
  return array.join('');
}

module.exports = heapsort;
