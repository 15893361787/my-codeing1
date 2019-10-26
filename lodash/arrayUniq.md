### understore数组去重方式
```javascript
 /**
  * @description 数组去重
  * @param array 需要排序的数组
  * @param isSorted 数组是否已经排序
  * @param iteratee 对数组的每个元素执行迭代器计算
  * @param context 迭代器上下文
  * */
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
      //如果isSorted没传  默认false
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    //获取完整迭代器函数
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      //如果数组有序切不需要进行任何运算 则比较相邻两个的数值是否相等
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
          //如果有迭代器吧每次迭代的记过放到seen里面比较seen里面是否存在迭代的结果
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
        //都没有的话直接比较数组里面的每一项是否在result里面存在
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };
```
### lodash数组去重
```javascript
/**
 * @description 数组去重
 * @param array 需要去重的数组
 * @param iteratee 对数组的每一项进行特殊的计算
 * @param comparator 自定义比较函数
 * */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,//判断array是否有value
      length = array.length,
      isCommon = true,//普通模式
      result = [],
      seen = result;
//如果有自定义的函数
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  //数组过长启用set去重
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;//hash存储
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  //遍历出array的每一项元素如果是普通模式遍历缓存容器的每一项如果有重复跳出进行下一轮判断
  //没有的话向缓存容器和result里面各添加对应的元素
  //如果非普通模式调用对应的判断方法向缓存容器和result添加相应的元素 循环结束返回result
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}
```