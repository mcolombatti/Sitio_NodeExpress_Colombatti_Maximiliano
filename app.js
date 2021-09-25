import express from 'express' ;
import routerPage from './routers/pageRouter.js';
import testimonialsApiRouter from './routers/testimonialsApiRouter.js';
const app = express(); 


app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs'); 
app.use(express.static('public'));

 app.use('/api/testimonials', testimonialsApiRouter);
 app.use('/home', routerPage);


app.listen(80, function(){
    console.log('el servidor esta encendido')
})  