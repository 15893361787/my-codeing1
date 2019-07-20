function* generator1() {
    yield new Promise((resolve => {setTimeout(()=>{resolve(33)},5000)}));
    yield new Promise((resolve => {setTimeout(()=>{resolve(11)},1000)}));

}
let it = generator1();
it.next().value.then(res=>{console.log(res)});
it.next().value.then(res=>{console.log(res)});
