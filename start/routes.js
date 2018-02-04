'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/post', 'PostController.index')

Route.get('/post/create', 'PostController.create')

Route.get('/post/edit', 'PostController.edit')

Route.get('/post/show', 'PostController.show')

Route.post('/post', 'PostController.store')

Route.get('/post/:id/edit', 'PostController.edit')

Route.get('/post/:id', 'PostController.show')

Route.put('/post/:id', 'PostController.update')

Route.delete('/post/:id', 'PostController.destroy')