async function async1() {
    let name = await 33;
    console.log(name);
    return name;
}

async1().then(res=>{
    console.log(res);});