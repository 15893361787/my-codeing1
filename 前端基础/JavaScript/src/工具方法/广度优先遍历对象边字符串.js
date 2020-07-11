function getEmpty(o) {
  if (Object.prototype.toString.call(o) === '[object Object]' && Object.keys(o).length>0 ) {
    return {};
  }
  if (Object.prototype.toString.call(o) === '[object Array]'&& o.length>0) {
    return [];
  }
  return o;
}

function deepCopyBFS(source) {
  let queue = [];
  let result = [];
  queue.push(['', source]);
  while (queue.length) {
    let [pre, source] = queue.shift();
    pre = !pre ? pre : pre + '.';
    if (Array.isArray(source)) {
      source = source[0];
      pre += '0.';
    }
    for (let key in source) {
      if (getEmpty(source[key]) === source[key]) {
        result.push(pre + key + '');
        continue;
      }
      queue.push([pre + key + '', source[key]]);

    }
  }

  return result;
  ;
}

console.log(deepCopyBFS({a:
    {
      b: {c: 'c1', d: 'd1'},
      e: [{e1: 'e1', e2: 'e2'}],
      f:[],
      g:{},
      h:'h'
    },


}));
