const listHelper = require('../utils/list_helper');
const testMaterials = require('./test_materials');

describe('THE MOST LIKED AUTHOR:', () => {
  test('most liked author of empty blog list', () => {
    const result = listHelper.mostLikes(testMaterials.listWithoutBlogs);
    expect(result).toEqual('no blogs');
  });

  test('most liked author when list has only one blog', () => {
    const result = listHelper.mostLikes(testMaterials.listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('most liked author when list has many blogs', () => {
    const result = listHelper.mostLikes(testMaterials.listWithManyBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});

describe('THE MOST PRODUCTIVE AUTHOR:', () => {
  test('most productive author of empty blog list', () => {
    const result = listHelper.mostBlogs(testMaterials.listWithoutBlogs);
    expect(result).toEqual('no blogs');
  });

  test('most productive author when list has only one blog', () => {
    const result = listHelper.mostBlogs(testMaterials.listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('most productive author when list has many blogs', () => {
    const result = listHelper.mostBlogs(testMaterials.listWithManyBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});
