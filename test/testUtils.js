import moment from 'moment';
import User from '../src/v1/models/User';
import Item from '../src/v1/models/Item';

export function createTestEmail () {
    return moment().valueOf() + '@tests.com';
}

export async function getTestUser (role = 'artist') {
    const user = await User.create({
        email: createTestEmail(),
        password: 'qwerty',
        firstName: 'John',
        lastName: 'Doe',
        role
    });
    const accessToken = User.generateAccessToken(user.email);
    return { accessToken, user };
}

export async function getUserAccessToken (role) {
    const { accessToken } = await getTestUser(role);
    return accessToken;
}

export function generateAccessToken () {
    return User.generateAccessToken(createTestEmail());
}

export async function generateItems (email, num = 5) {
    for (let i = 0; i < num; i++) {
        await Item.create({
            owner: email,
            title: `title${i}`
        });
    }
}
