import moment from 'moment';
import User from '../src/v1/models/User';

export function createTestEmail () {
    return moment().valueOf() + '@tests.com';
}

export async function getTestUser(role) {
    const user = await User.create({
        email: createTestEmail(),
        password: 'qwerty',
        firstName: 'John',
        lastName: 'Doe',
        role: role || 'artist'
    });
    const accessToken = User.generateAccessToken(user.email);
    return { accessToken, user };
}

export async function getUserAccessToken(role) {
    const { accessToken } = await getTestUser(role);
    return accessToken;
}

export function generateAccessToken () {
    return User.generateAccessToken(createTestEmail());
}
