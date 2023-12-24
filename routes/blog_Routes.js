const express = require('express')
const Blog = require('../models/blog');

const router = express.Router()



router.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    
    .catch((err)=>{
        console.log(err)
    })
})

//sending a post request to the db and page
router.post('/blogs', (req, res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
})
//finding a blog by id , you'll be taken to  a page with the blog after clicking on it
router.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res. render('details', {blog: result, title: 'Blog Details'})
    })
    .catch((err)=>{
        console.log(err)
    })
})
//dleting a blog
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                // If no blog found with the given id
                return res.status(404).json({ error: 'Blog not found' });
            }

            // Successfully deleted, send a response
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


router.get('/blog/create', (req, res)=>{
    res.render('create', {title: 'Create new blog'})
});

module.exports = router