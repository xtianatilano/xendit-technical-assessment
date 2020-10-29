import request from 'supertest';

describe('organization members', () => {
    it('should get all mebers of an organization', async () => {
        await request('http://localhost:3000')
            .get('/orgs/xendit/members')
            .expect(({ body }) => {
                expect(body).toHaveProperty('0.id');
                expect(body).toHaveProperty('0.username');
                expect(body).toHaveProperty('0.password');
                expect(body).toHaveProperty('0.avatarUrl');
                expect(body).toHaveProperty('0.followerCount');
                expect(body).toHaveProperty('0.followingCount');
            })
            .expect(200);
    });
});
