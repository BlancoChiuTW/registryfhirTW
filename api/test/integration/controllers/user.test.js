const supertest = require('supertest');
const { description } = require('../../../api/models/Users');

const randomUser = {
  username: 'testuser' + Math.floor(Math.random() * 1000),
  password: 'testpassword',
  email: `test${Math.floor(Math.random() * 1000)}@user.com`,
  firstname: 'test',
  lastname: 'user',
}

let token = '';

describe('User', () => {
  describe('顯示測試使用者', () => {
    it('本次測試使用的使用者資料', (done) => {
      console.log(randomUser);
      done();
    });
  })

  // 註冊新使用者
  describe('註冊：POST /user/register', () => {
    it('should return 200 with valid parameters', (done) => {
      // 期望回傳 success: true
      supertest(sails.hooks.http.app)
        .post('/user/register')
        .send(randomUser)
        .expect(200, done)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.success) throw new Error('missing success key');
        })
    });
  });

  describe('登入：POST /user/login', () => {
    it('should return 200 with valid parameters', (done) => {
      // 期望回傳 token 與 expiresAt 兩個 key

      supertest(sails.hooks.http.app)
        .post('/user/login')
        .send({
          username: randomUser.username,
          password: randomUser.password
        })
        .expect(200, done)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.success) throw new Error('missing success key');
          if (!res.body.data.token) throw new Error('missing token key');
          if (!res.body.data.expiresAt) throw new Error('missing expiresAt key');
          token = res.body.data.token;
        })
    });
  });

  describe('取得當前使用者資訊：GET /user/me', () => {
    it('should return 200 with valid token', (done) => {
      // 期望回傳 success: true
      // 必須要有以下欄位：username, email, firstname, lastname, role, active, id
      supertest(sails.hooks.http.app)
        .get('/user/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.success) throw new Error('missing success key');
          if (!res.body.data.username) throw new Error('missing username key');
          if (!res.body.data.email) throw new Error('missing email key');
          if (!res.body.data.firstname) throw new Error('missing firstname key');
          if (!res.body.data.lastname) throw new Error('missing lastname key');
          if (!res.body.data.role) throw new Error('missing role key');
          if (!res.body.data.id) throw new Error('missing id key');
        })
    });
  });

  describe('修改使用者資訊：PUT /user/me', () => {
    it('should return 200 with valid token', (done) => {
      // 期望回傳 success: true
      supertest(sails.hooks.http.app)
        .put('/user/me')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstname: 'newfirstname',
          lastname: 'newlastname'
        })
        .expect(200, done)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.success) throw new Error('missing success key');
        })
    });
  });

  describe('登出：POST /user/logout', () => {
    it('should return 200 with valid token', (done) => {
      // 期望回傳 success: true
      supertest(sails.hooks.http.app)
        .post('/user/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!res.body.success) throw new Error('missing success key');
        })
    });
  });
});