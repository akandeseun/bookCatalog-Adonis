/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// User Routes
Route.group(() => {
  Route.post('/sign-up', 'AuthController.create')
  Route.post('/sign-in', 'AuthController.authenticate')
}).prefix('/api')

// Category routes
Route.group(() => {
  Route.get('/category/', 'CategoryController.all')
  Route.post('/category/new', 'CategoryController.create')
  Route.patch('/category/update/:id', 'CategoryController.update').where(
    'id',
    Route.matchers.uuid()
  )
  Route.delete('/category/delete/:id', 'CategoryController.delete').where(
    'id',
    Route.matchers.uuid()
  )
})
  .prefix('/api')
  .middleware('auth')

// Role routes
Route.group(() => {
  Route.get('/role/', 'RoleController.all')
  Route.post('/role/new', 'RoleController.create')
  Route.patch('/role/update/:id', 'RoleController.update').where('id', Route.matchers.uuid())
  Route.delete('/role/delete/:id', 'RoleController.delete').where('id', Route.matchers.uuid())
})
  .prefix('/api')
  .middleware('auth')

// Route.post('/test/', 'CategoryController.addCategory')

// Book Routes
Route.group(() => {
  Route.post('/book/new', 'BookController.create')
  Route.post('/book/category/:bookId', 'BookController.addCategory').where(
    'bookId',
    Route.matchers.uuid()
  )
})
  .prefix('/api')
  .middleware('auth')

// Optional parameters
Route.get('/api/book/s/:searchf', 'BookController.findBook')
