import request from 'supertest';

describe('organization comments', () => {
    it('should add comment to an organization', async () => {
        await request('http://localhost:3000')
        .post('/orgs/xendit/comments')
        .set('Accept', 'application/json')
        .send({
            comment: 'test comment'
        }).expect(201);
    })

    it('should get all comments of an organization', async () => {
        await request('http://localhost:3000')
            .get('/orgs/xendit/comments')
            .expect(({ body }) => {
                expect(body).toHaveProperty('0.id');
                expect(body).toHaveProperty('0.comment');
            })
            .expect(200);
    });

    it('should delete all comments of an organization', async () => {
        await request('http://localhost:3000').delete('/orgs/xendit/comments').expect(200);
        await request('http://localhost:3000')
            .get('/orgs/xendit/comments')
            .expect(({ body }) => {
                expect(body).toEqual([])
            })
            .expect(200);
    })

});
