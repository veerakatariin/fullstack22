

const dummy = (blogs) => {
  // ...
  return 1;

}

const totalLikes = (blogs) => {

    if(blogs.length < 1){
        return 0;
    }
    else {
        var Alllikes = 0;

        blogs.map(blog => {
          Alllikes += blog.likes
        })
        return Alllikes;
    }
}

const favoriteBlog = (blogs) => {

    var maxLikes = 0;
    var blogWithMostLikes

    blogs.map(blog => {
        if(blog.likes > maxLikes){
            maxLikes = blog.likes
            blogWithMostLikes = blog
        }
      })
      return blogWithMostLikes;
}

const mostBlogs = (blogs) => {

    var author
    var mostPopularAuthor
    var numOfBlogs = 0
    var mostBlogs = 0

    blogs.map(blog => {
        author = blog.author
        blogs.map(blog2 => {
            if(blog2.author === author){
                numOfBlogs ++
                console.log('kirjailija:'+ author+'blogeja'+numOfBlogs)
            }
        })
        if(numOfBlogs > mostBlogs){
            mostBlogs = numOfBlogs
            mostPopularAuthor = author
        }
        numOfBlogs = 0
      })

      return result = {
        author: mostPopularAuthor,
        blogs: mostBlogs 
    }

}

const mostLikes = (blogs) => {

    var author
    var mostLikedAuthor
    var numOfLikes = 0
    var mostLikes = 0

    blogs.map(blog => {
        author = blog.author
        blogs.map(blog2 => {
            if(blog2.author === author){
                numOfLikes = blog2.likes + numOfLikes
            }
        })
        if(numOfLikes > mostLikes){
            mostLikes = numOfLikes
            mostLikedAuthor = author
        }
        numOfLikes = 0
      })
      return result = {
        author: mostLikedAuthor,
        likes : mostLikes 
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}