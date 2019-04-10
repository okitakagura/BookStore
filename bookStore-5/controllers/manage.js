'use strict';
var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
	// Dashboard
	router.get('/', function (req, res) {
		res.render('manage/index');
	});

	// Books
	router.get('/books', function (req, res) {
		Book.find({}, function(err, books) {
			if(err) console.log(err);

			var model = {
				books: books
			};

			res.render('manage/books/index', model);
		});
	});
	
	// Categories
	router.get('/categories', function (req, res) {
		Category.find({}, function(err, categories) {
			if(err) console.log(err);

			var model = {
				categories: categories
			};

			res.render('manage/categories/index', model);
		});
	});

	// Display add form
	router.get('/books/add', function (req, res) {
		Category.find({}, function(err, categories) {
			if(err) console.log(err);

			var model = {
				categories: categories
			};

			res.render('manage/books/add', model);
		});
	});

	// Add Book
	router.post('/books', function (req, res) {
		// Get form values
		var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        // var mainimage = req.body.mainimage && req.body.mainimage.trim();
        var price = req.body.price && req.body.price.trim();
        var description= req.body.description && req.body.description.trim();
        var title = req.body.title && req.body.title.trim();
        var cover = req.body.cover && req.body.cover.trim();

        // if (req.body.mainimage) {
        //     var mainImageOriginalName   = req.body.mainimage.originalname;
        //     var mainImageName           = req.body.mainimage.name;
        //     var mainImageMime           = req.body.mainimage.Mimetype;
        //     var mainImagePath           = req.body.mainimage.path;
        //     var mainImageExt            = req.body.mainimage.extension;
        //     var mainImageSize           = req.body.mainimage.size;
        // } else {
        //     var mainImageName = 'sample0.jpg';
        // }

        if (title == '' || price == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        if(isNaN(price)){
            req.flash('error', "价格必须是数字");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        var newBook = new Book({
            title: title,
            category: category,
            description: description,
            author: author,
            publisher: publisher,
            // mainimage: mainImageName,
            cover: cover,
            price: price
        });

        newBook.save(function(err) {
        	if(err) console.log('save error', err);

        	req.flash('success', "Book Added");
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
	});

	// Display edit form
	router.get('/books/edit/:id', function (req, res) {
		Category.find({}, function(err, categories) {
			Book.findOne({_id:req.params.id}, function(err, book) {
				if(err) console.log(err);

				var model = {
					book: book,
					categories: categories
				};

				res.render('manage/books/edit', model);	
			});
		});
	});

	// Edit Book
	router.post('/books/edit/:id', function (req, res) {
		// Get form values
		var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        // var mainimage = req.body.mainimage && req.body.mainimage.trim();
        var price = req.body.price && req.body.price.trim();
        var description= req.body.description && req.body.description.trim();
        var title = req.body.title && req.body.title.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title == '' || price == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        if(isNaN(price)){
            req.flash('error', "Price must be a number");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        Book.update({_id: req.params.id}, {
            title: title,
            category: category,
            description: description,
            author: author,
            publisher: publisher,
            // mainimage: mainImageName,
            cover: cover,
            price: price
        }, function(err) {
        	if(err) console.log('update error', err);

        	req.flash('success', "Book Updated");
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
	});

	// Delete Book
    router.delete('/books/delete/:id', function (req, res) {
        Book.remove({_id: req.params.id}, function (err) {
            if(err) console.log(err);

            req.flash('success', "Book Deleted");
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });


    // Display category add form
    router.get('/categories/add', function(req, res) {
    	res.render('manage/categories/add');
    });

    // Add new category
	router.post('/categories', function (req, res) {
		// Get form values
		var name = req.body.name && req.body.name.trim();

        if (name == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }

        var newCategory = new Category({
            name: name
        });

        newCategory.save(function(err) {
        	if(err) console.log('save error', err);

        	req.flash('success', "Category Added");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
	});

	// Display edit form
	router.get('/categories/edit/:id', function (req, res) {
		Category.findOne({_id:req.params.id}, function(err, category) {
			if(err) console.log(err);

			var model = {
				category: category
			};

			res.render('manage/categories/edit', model);	
		});
	});

	// Edit Category
	router.post('/categories/edit/:id', function (req, res) {
		// Get form values
		var name = req.body.name && req.body.name.trim();

        if (name == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/categories/edit');
            res.redirect('/manage/categories/edit');
        }

        Category.update({_id: req.params.id}, {
            name: name
        }, function(err) {
        	if(err) console.log('update error', err);

        	req.flash('success', "Category Updated");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
	});

	// Delete Category
    router.delete('/categories/delete/:id', function (req, res) {
        Category.remove({_id: req.params.id}, function (err) {
            if(err) console.log(err);

            req.flash('success', "Category Deleted");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });
};
