const route = require('express').Router();
const crudController = require('./../controller/crud');
const user = require('./../controller/registration');

route.get('/read',crudController.read);
route.post('/create',crudController.create);
route.patch('/update/:id',crudController.update);
route.delete('/delete/:id',crudController.deleted);

route.post('/registration',user.registration);
route.get('/login',user.login)

module.exports = route