'use strict'

const Post = use('App/Models/Post')

const Helpers = use('Helpers')

const { validate } = use('Validator')

class PostController {

    async index({ view }) {
       
        const posts = await Post.all();

        return view.render('post/index', {
            posts: posts.toJSON()
        });
    }

    async create({ view }) {
        return view.render('post/create');
    }

    async store({ request, response, session }) {

        const validation = await validate(request.all(), {
            title: "required|min:3|max:67",
            body: "required|min:5"
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = new Post();
        post.title =  request.input('title');
        post.body  =  request.input('body');
        
        //upload Process
        const myPicture = request.file('image', {
            types: ['png'],
            size: '2mb'
        })
        
        post.image = new Date().getTime()+'.'+myPicture.subtype

        await myPicture.move(Helpers.publicPath('uploads/post'), {
            name: post.image
        })

        if(!myPicture.moved()) {
          session.withErrors([{field: 'image', message:  myPicture.error().message }]).flashAll()
          return response.redirect('back')
        }

        post.save();

        session.flash({ notification: 'Post a été crée avec succès' })
        response.redirect('/post');
    }

    async edit({ view, params }) {

        const post = await Post.find(params.id)

        return view.render('post/edit', {
            post: post
        });
    }

    async update({ request, params, response, session }) {
        
        const validation = await validate(request.all(), {
            title: "required|min:3|max:67",
            body: "required|min:5"
        })


        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = await Post.find(params.id)

        post.title = request.input('title')
        post.body  = request.input('body')

        post.save();
        session.flash({ notification: 'Post a été modifier avec succès' })
        response.redirect('/post')
    }

    async destroy({ session, params, response }) {

        const post = await Post.find(params.id)

        post.delete();

        session.flash({ notification: 'Post supprimé !' })

        response.redirect('/post')
    }

    async show({ view, params }) {
        const post = await Post.find(params.id)
        return view.render('post/show', {post:post});
    }
}

module.exports = PostController
