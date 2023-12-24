const express = require('express')
const morgan = require('morgan')//logs into the console info aabout the incoming requests
const mongoose = require('mongoose');
const fs =require('fs')
const routes = require('./routes/blog_Routes')


const app = express();

//connect to mongoDb
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.hfdihuq.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=> app.listen(3000) )
.catch((err)=>console.log(err))


//register view engine
app.set('view engine', 'ejs')

//using the morgan middleware
app.use(morgan('dev'));
//midleware and static file
app.use(express.static('public'))//public is a folder with static files
app.use(express.urlencoded({extended:true}));

//routes
app.get('/', (req, res)=>{
    res.redirect('/blogs')

})

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'})
    
})

//blog routes

// app.get('/blogs', (req, res)=>{
//     Blog.find().sort({createdAt: -1})
//     .then((result)=>{
//         res.render('index', {title: 'All Blogs', blogs: result})
//     })
    
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// //sending a post request to the db and page
// app.post('/blogs', (req, res)=>{
//     const blog = new Blog(req.body);
//     blog.save()
//     .then((result)=>{
//         res.redirect('/blogs')
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })
// //finding a blog by id , you'll be taken to  a page with the blog after clicking on it
// app.get('/blogs/:id', (req, res)=>{
//     const id = req.params.id;
//     Blog.findById(id)
//     .then((result)=>{
//         res. render('details', {blog: result, title: 'Blog Details'})
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })
// //dleting a blog
// app.delete('/blogs/:id', (req, res) => {
//     const id = req.params.id;

//     Blog.findByIdAndDelete(id)
//         .then((result) => {
//             if (!result) {
//                 // If no blog found with the given id
//                 return res.status(404).json({ error: 'Blog not found' });
//             }

//             // Successfully deleted, send a response
//             res.json({ redirect: '/blogs' });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// });


// app.get('/blog/create', (req, res)=>{
//     res.render('create', {title: 'Create new blog'})
// });

app.use( routes)



app.use((req, res) => {
    console.log('404 handler triggered');
    res.status(404).render('404', {title: '404'});
});
