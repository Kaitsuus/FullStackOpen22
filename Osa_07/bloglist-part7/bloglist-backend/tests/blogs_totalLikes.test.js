const listHelper = require('../utils/list_helper')
const testMaterials = require('./test_materials')

describe('TOTAL LIKES OF ALL BLOGS', () => {
  test('total likes of empty blog list', () => {
    const result = listHelper.totalLikes(testMaterials.listWithoutBlogs)
    expect(result).toBe(0)
  })

  test('total likes when list has only one blog', () => {
    const result = listHelper.totalLikes(testMaterials.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('total likes when list has many blogs', () => {
    const result = listHelper.totalLikes(testMaterials.listWithManyBlogs)
    expect(result).toBe(36)
  })
})
