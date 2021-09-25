import testimonialsRepository from '../repositories/testimonialsRepository.js';


function view(req, res){
    res.render('index');
} 
function viewContact(req, res){
    res.render('contacto');
}
 
export default {
    view,
    viewContact,
    viewInWeb
} 