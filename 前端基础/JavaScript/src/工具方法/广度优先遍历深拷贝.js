function getEmpty(o){
  if(Object.prototype.toString.call(o) === '[object Object]'){
    return {};
  }
  if(Object.prototype.toString.call(o) === '[object Array]'){
    return [];
  }
  return o;
}
function deepCopyBFS(origin){
  let queue = [];
  let map = new Map(); // 记录出现过的对象，用于处理环

  let target = getEmpty(origin);
  if(target !== origin){
    queue.push([origin, target]);
    map.set(origin, target);
  }

  while(queue.length){
    let [ori, tar] = queue.shift();
    for(let key in ori){
      // 处理环状
      if(map.get(ori[key])){
        tar[key] = map.get(ori[key]);
        continue;
      }

      tar[key] = getEmpty(ori[key]);
      if(tar[key] !== ori[key]){
        queue.push([ori[key], tar[key]]);
        map.set(ori[key], tar[key]);
      }
    }
  }

  return target;
}
let circleObj = {
  foo: {
    name: function() {
      console.log(1)
    },
    bar: {
      name: 'bar',
      baz: {
        name: 'baz',
        aChild: null //待会让它指向obj.foo
      }
    }
  }
};
circleObj.foo.bar.baz.aChild = circleObj.foo;
console.dir(deepCopyBFS(circleObj));
