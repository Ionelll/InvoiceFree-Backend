const app = require('express')();

app.get('/', (req, res)=>{
    res.send('home page')
})

app.listen(5000, ()=>{
    console.log('server is listening on port 5000')
})