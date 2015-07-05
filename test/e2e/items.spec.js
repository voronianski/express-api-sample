import supertest from 'supertest';

import { apiUrl } from 'c0nfig';
import { getTestUser, getUserAccessToken } from '../testUtils';

let request = supertest(`${apiUrl}/items`);
let authHeaders;
let authUser;

let itemData = {
    title: 'Basket Case',
    description: 'Seventh track and third single from Green Day third album, Dookie (1994).',
    isPublic: true
};

describe('/items endpoints', () => {
    before(async done => {
        try {
            const { user, accessToken } = await getTestUser();
            authUser = user;
            authHeaders = {'X-Access-Token': accessToken};
            done();
        } catch (err) {
            done(err);
        }
    });

    describe('POST /', () => {
        describe('when creating item as a listener', () => {
            let invalidAuthHeaders;

            before(async done => {
                try {
                    const accessToken = await getUserAccessToken('listener');
                    invalidAuthHeaders = {'X-Access-Token': accessToken};
                    done();
                } catch (err) {
                    done(err);
                }
            });

            it('should return a proper error', done => {
                request
                    .post('/')
                    .set(invalidAuthHeaders)
                    .send(itemData)
                    .expect(403)
                    .expect(res => {
                        expect(res.body).to.have.keys('errors');
                        expect(res.body.errors.length).to.be.equal(1);
                        expect(res.body.errors[0].message).to.be.equal('Only artist have permission to execute this operation');
                    })
                    .end(done);
            });
        });

        describe('when creating item as an artist', () => {
            let createdItem;

            it('should create new item successfully', done => {
                request
                    .post('/')
                    .set(authHeaders)
                    .send(itemData)
                    .expect(200)
                    .expect(res => {
                        const keys = Object.keys(itemData).concat(['_id', 'owner']);
                        expect(res.body).to.have.keys(keys);
                        expect(res.body.owner).to.be.equal(authUser.email);

                        createdItem = res.body;
                    })
                    .end(done);
            });

            describe('GET /:id', () => {
                describe('when getting created item', () => {
                    it('should return item successfully', done => {
                        request
                            .get(`/${createdItem._id}`)
                            .set(authHeaders)
                            .expect(200)
                            .expect(res => {
                                const keys = Object.keys(itemData).concat(['_id', 'owner']);
                                expect(res.body).to.have.keys(keys);
                                expect(res.body._id).to.be.equal(createdItem._id);
                                expect(res.body.owner).to.be.equal(authUser.email);
                            })
                            .end(done);
                    });

                    describe('PUT /:id', () => {
                        let itemUpdatedData = Object.assign({}, itemData, {
                            title: 'Basket Case (Single)'
                        });

                        describe('when updating created item', () => {
                            it('should return updated successfully', done => {
                                request
                                    .put(`/${createdItem._id}`)
                                    .set(authHeaders)
                                    .send(itemUpdatedData)
                                    .expect(200)
                                    .expect(res => {
                                        const keys = Object.keys(itemData).concat(['_id', 'owner']);
                                        expect(res.body).to.have.keys(keys);
                                        expect(res.body.owner).to.be.equal(authUser.email);
                                        expect(res.body.title).to.be.equal(itemUpdatedData.title);
                                    })
                                    .end(done);
                            });

                            describe('when getting updated item', () => {
                                it('should return item successfully', done => {
                                    request
                                        .get(`/${createdItem._id}`)
                                        .set(authHeaders)
                                        .expect(200)
                                        .expect(res => {
                                            const keys = Object.keys(itemData).concat(['_id', 'owner']);
                                            expect(res.body).to.have.keys(keys);
                                            expect(res.body.owner).to.be.equal(authUser.email);
                                            expect(res.body.title).to.be.equal(itemUpdatedData.title);
                                        })
                                        .end(done);
                                });

                                describe('DELETE /:id', () => {
                                    describe('when deleting created item', () => {
                                        it('should delete item successfully', done => {
                                            request
                                                .del(`/${createdItem._id}`)
                                                .set(authHeaders)
                                                .expect(204)
                                                .end(done);
                                        });

                                        describe('when getting deleted item', () => {
                                            it('should return a proper error', done => {
                                                request
                                                    .get(`/${createdItem._id}`)
                                                    .set(authHeaders)
                                                    .expect(404)
                                                    .expect(res => {
                                                        expect(res.body).to.have.keys('errors');
                                                        expect(res.body.errors.length).to.be.equal(1);
                                                        expect(res.body.errors[0].message).to.be.equal('Item not found');
                                                    })
                                                    .end(done);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
