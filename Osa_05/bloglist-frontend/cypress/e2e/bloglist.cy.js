// Cypress end-to-end tests for bloglist app

describe('Blog', function () {
  beforeEach(function () {
    cy.resetDatabase();
    cy.addTestUser({
      name: 'test-user',
      username: 'testuser',
      password: 'password'
    });
  });

  it('front page can be opened', function () {
    cy.contains('BLOGS');
  });

  describe('LOGIN', function () {
    it('login form is shown', function () {
      cy.contains('PLEASE LOG IN');
    });

    it('login form can be opened', function () {
      cy.contains('PLEASE LOG IN').click();
      cy.contains('username:');
      cy.contains('password:');
    });

    it('login succeeds with correct credentials', function () {
      cy.contains('PLEASE LOG IN').click();
      cy.get('#login-username').type('testuser');
      cy.get('#login-password').type('password');
      cy.get('#login-button').click();
      cy.get('.success')
        .should('contain', 'Welcome testuser')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.contains('Kai Jukarainen logged in');
    });

    it('login fails with wrong credentials', function () {
      cy.contains('PLEASE LOG IN').click();
      cy.get('#login-username').type('testuser');
      cy.get('#login-password').type('wrongpassword');
      cy.get('#login-button').click();
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', 'Kai Jukarainen logged in');
    });
  });

  describe('WHEN LOGGED IN', function () {
    beforeEach(function () {
      cy.login({
        username: 'testuser',
        password: 'password'
      });
    });

    it('infotext is shown if no blogs are added', function () {
      cy.contains('SHOW ALL BLOGS').click();
      cy.contains('Sorry, no blogs added at the moment');
    });

    it('a new blog can be created', function () {
      cy.contains('ADD A NEW BLOG').click();
      cy.get('#blogform-title').type('Type wars');
      cy.get('#blogform-author').type('Robert C. Martin');
      cy.get('#blogform-url').type(
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
      );
      cy.contains('SAVE BLOG').click();
      cy.get('.success')
        .should('contain', 'New blog "Type wars" by Robert C. Martin added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
    });

    describe('when blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 2
        });
        cy.createBlog({
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 4
        });
      });

      it('all blogs can viewed', function () {
        cy.contains('SHOW ALL BLOGS').click();
        cy.contains('First class tests');
        cy.contains('Canonical string reduction');
      });

      it('blog can be liked', function () {
        cy.contains('SHOW ALL BLOGS').click();
        cy.contains('First class tests').click();
        cy.contains('Likes: 2');
        cy.contains('LIKE').click();
        cy.get('.success')
          .should(
            'contain',
            'You liked blog "First class tests" which has now 3 likes in total!'
          )
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
        cy.contains('Likes: 3');
        cy.contains('Likes: 2').should('not.exist');
      });

      it.only('blog can be removed', function () {
        cy.contains('SHOW ALL BLOGS').click();
        cy.contains('First class tests').click();
        cy.contains('This blog was added by: Kai Jukarainen');
        cy.contains('REMOVE').click();
        cy.get('.success')
          .should('contain', 'You removed blog "First class tests"')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
        cy.contains('First class tests').should('not.exist');
      });

      it('only blog owner can remove blog', function () {
        cy.logout();
        cy.addTestUser({
          name: 'Linus Torvald',
          username: 'linus',
          password: 'verysecretpassword'
        });
        cy.login({
          username: 'linus',
          password: 'verysecretpassword'
        });
        cy.contains('SHOW ALL BLOGS').click();
        cy.contains('First class tests').click();
        cy.contains('REMOVE').should('not.exist');
        cy.contains('This blog was added by: Kai Jukarainen');
      });

      it('the blogs are sorted by the number of likes', function () {
        cy.contains('SHOW ALL BLOGS').click();
        cy.get('.blog').eq(0).should('contain', 'Canonical string reduction');
        cy.get('.blog').eq(1).should('contain', 'First class tests');
        cy.contains('First class tests').click();
        cy.contains('Likes: 2');
        cy.contains('LIKE').click();
        cy.wait(1000);
        cy.contains('LIKE').click();
        cy.wait(1000);
        cy.contains('LIKE').click();
        cy.wait(1000);
        cy.contains('Likes: 5');
        cy.visit('http://localhost:3000');
        cy.contains('SHOW ALL BLOGS').click();
        cy.get('.blog').eq(0).should('contain', 'First class tests');
        cy.get('.blog').eq(1).should('contain', 'Canonical string reduction');
      });
    });
  });
});
