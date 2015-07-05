import supertest from 'supertest';

import { apiUrl } from 'c0nfig';
import { createTestEmail } from '../testUtils';

let request = supertest(`${apiUrl}/user`);
let userData = {
    email: createTestEmail(),
    password: 'qwerty',
    firstName: 'John',
    lastName: 'Doe',
    role: 'artist'
};

describe('/user endpoints', () => {
    describe('POST /signup', () => {
        describe('when sending not valid user data', () => {
            describe('when email is not valid', () => {
                it('should not register new user', done => {
                    request
                        .post('/signup')
                        .send(Object.assign({}, userData, {email: 'notvalid'}))
                        .expect(400)
                        .expect(res => {
                            expect(res.body).to.have.keys('errors');

                            let [ error ] = res.body.errors;
                            expect(error.message).to.equal('must be email format');
                        })
                        .end(done);
                });
            });

            describe('when some field is missed', () => {
                it('should not register new user', done => {
                    request
                        .post('/signup')
                        .send({email: 'valid@example.com', 'password': 'qwerty'})
                        .expect(400)
                        .expect(res => {
                            expect(res.body).to.have.keys('errors');
                            expect(res.body.errors.length).to.equal(3);
                        })
                        .end(done);
                });
            });
        });

        describe('when creating non-existed user', () => {
            it('should register and return new user with access token', done => {
                request
                    .post('/signup')
                    .send(userData)
                    .expect(200)
                    .expect(res => {
                        expect(res.body).to.have.keys('accessToken', 'user');
                        expect(res.body.user).to.have.keys('email', 'firstName', 'lastName', 'role');
                        expect(res.body.user.email).to.equal(userData.email);
                    })
                    .end(done);
            });

            describe('when trying to create existed user', () => {
                it('should return error', done => {
                    request
                        .post('/signup')
                        .send(userData)
                        .expect(400)
                        .expect(res => {
                            expect(res.body).to.have.keys('errors');
                        })
                        .end(done);
                });
            });

            describe('POST /login', () => {
                describe('when login with valid credentianls', () => {
                    let validAccessToken;

                    it('should return user and access token', done => {
                        request
                            .post('/login')
                            .send({email: userData.email, password: userData.password})
                            .expect(200)
                            .expect(res => {
                                expect(res.body).to.have.keys('accessToken', 'user');
                                expect(res.body.user).to.have.keys('email', 'firstName', 'lastName', 'role');
                                expect(res.body.user.email).to.equal(userData.email);

                                validAccessToken = res.body.accessToken;
                            })
                            .end(done);
                    });

                    describe('GET /me', () => {
                        describe('when requesting self info as authorized user', () => {
                            it('should return user and access token', done => {
                                request
                                    .get('/me')
                                    .set({'X-Access-Token': validAccessToken})
                                    .expect(200)
                                    .expect(res => {
                                        expect(res.body).to.have.keys('email', 'firstName', 'lastName', 'role');
                                        expect(res.body.email).to.equal(userData.email);
                                    })
                                    .end(done);
                            });
                        });

                        describe('when requesting self info as non-authorized user', () => {
                            it('should return user and access token', done => {
                                request
                                    .get('/me')
                                    .set({'X-Access-Token': '12345'})
                                    .expect(401)
                                    .expect(res => {
                                        expect(res.body).to.have.keys('errors');
                                        expect(res.body.errors.length).to.equal(1);
                                        expect(res.body.errors[0].message).to.equal('User is not authorized');
                                    })
                                    .end(done);
                            });
                        });
                    });
                });

                describe('when trying to login with invalid email', () => {
                    it('should return error', done => {
                        request
                            .post('/login')
                            .send({email: 'notvalid', password: 'qwerty'})
                            .expect(400)
                            .expect(res => {
                                expect(res.body).to.have.keys('errors');
                                expect(res.body.errors.length).to.equal(1);
                            })
                            .end(done);
                    });
                });

                describe('when trying to login with invalid password', () => {
                    it('should return error', done => {
                        request
                            .post('/login')
                            .send({email: userData.email, password: 'foo'})
                            .expect(400)
                            .expect(res => {
                                expect(res.body).to.have.keys('errors');
                                expect(res.body.errors.length).to.equal(1);
                            })
                            .end(done);
                    });
                });
            });
        });
    });
});
