new Promise(
    (resolve, reject) => {
        resolve(111);
    }).then(
    (res) => {
        console.log(res);
    }).catch(
    (err) => {
        console.log(err);
    }
)
