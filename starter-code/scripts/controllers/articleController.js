(function(module) {
  var articlesController = {};

  Article.createTable();

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path? It's in the middleware chain for /articles/:id. It gets
  //called before articlesController.index. Finds an article by
  //the params id and sets it to the context object as ctx.articles
  // This method loads by the id
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
    // This method is in the middleware chain for /author/:authorName. It is called before article.controller.index. It finds articles using the parameter authorName and sets it to ctx.articles

  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This is in the middleware chain for /category/:categoryName. It is called before article.controller.index. It finds articles using the parameters categoryName and sets it to ctx.articles

  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is in the middleware chain for '/' it is called on
  // before articlesController.index.
  // If Article.all.length returns truthy, sets ctx. Articles to the  Article.all array
  // If it returns falsy, then passes articleData to fetchAll as a callback function and sets ctx.articles to Article.all.



  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
