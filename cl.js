
const express =require('express');
const app =  express();

app.use('/',express.static(__dirname+'/views'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('mom/ok1.ejs')
})
app.get('/enjoy',(req,res)=>{
    res.render('mom/ok2.ejs')
})
 
app.listen(process.env.PORT ||8000,()=>{
    console.log(__dirname + '/TTT.html');
    
}) 