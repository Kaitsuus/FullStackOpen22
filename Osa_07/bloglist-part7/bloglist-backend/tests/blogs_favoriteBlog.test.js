const listHelper = require('../utils/list_helper')
const testMaterials = require('./test_materials')

describe('THE FAVORITE BLOG WITH MOST LIKES:', () => {
  test('favorite blog of empty blog list', () => {
    const result = listHelper.favoriteBlog(testMaterials.listWithoutBlogs)
    expect(result).toEqual('no blogs')
  })

  test('favorite blog when list has only one blog', () => {
    const result = listHelper.favoriteBlog(testMaterials.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('favorite blog when list has many blogs', () => {
    const result = listHelper.favoriteBlog(testMaterials.listWithManyBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})
