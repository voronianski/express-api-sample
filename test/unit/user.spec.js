import User from '../../src/v1/models/User';
import { createTestEmail } from '../testUtils';

describe('User model static methods', () => {
    let email = createTestEmail();
    let token;

    describe('when generating access token', () => {
        before(() => token = User.generateAccessToken(email));

        it('should return access token string', () => {
            expect(token).to.be.a('string');
        });

        describe('when validating access token', function () {
            let validEmail;

            before(() => validEmail = User.validateAccessToken(token));

            it('should return email used for this token', () => {
                expect(validEmail).to.equal(email);
            });
        });
    });
});
