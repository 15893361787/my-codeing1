let express = require('express');
let app = express();
app.listen(3000);
app.get('/',(req,res)=>{
    res.send({"bb":"bb"});
});
