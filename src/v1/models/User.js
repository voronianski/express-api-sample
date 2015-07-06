import { users } from '../../utils/db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import moment from 'moment';
import config from 'c0nfig';

const { hashRounds } = config.bcrypt;
const { signKey, tokenTTL } = config.auth;

function create (doc) {
    return new Promise((resolve, reject) => {
        storePassword(doc.password, (err, hash) => {
            if (err) {
                return reject(err);
            }

            let user = Object.assign({}, doc, {
                password: hash,
                createdAt: Date.now()
            });
            users.insert(user, (err, saved) => {
                err ? reject(err) : resolve(saved);
            });
        });
    });
}

function findByEmail (email) {
    return new Promise((resolve, reject) => {
        users.findOne({ email }, (err, user) => {
            err ? reject(err) : resolve(user);
        });
    });
}

function storePassword (password, callback) {
    bcrypt.genSalt(hashRounds, (err, salt) => {
        if (err) {
            return callback(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return callback(err);
            }
            callback(null, hash);
        });
    });
}

function comparePassword (passwordToCompare, actualPassword) {
    return new Promise((resolve, reject) => {
        if (!passwordToCompare) {
            return resolve(false);
        }

        bcrypt.compare(passwordToCompare, actualPassword, (err, same) => {
            return err ? reject(err) : resolve(same);
        });
    });
}

function generateAccessToken (email) {
    const timestamp = moment();
    const message = `${email};${timestamp.valueOf()}`;
    const hmac = crypto.createHmac('sha1', signKey).update(message).digest('hex');
    const token = `${message};${hmac}`;
    const tokenBase64 = new Buffer(token).toString('base64');

    return tokenBase64;
}

function validateAccessToken (token) {
    const decoded = new Buffer(token, 'base64').toString();
    const parsed = decoded.split(';');

    if (parsed.length !== 3) {
        return false;
    }

    const [ email, timestamp, receivedHmac ] = parsed;
    const message = `${email};${timestamp}`;
    const computedHmac = crypto.createHmac('sha1', signKey).update(message).digest('hex');

    if (receivedHmac !== computedHmac) {
        return false;
    }

    const currentTimestamp = moment();
    const receivedTimestamp = moment(+timestamp);
    const tokenLife = currentTimestamp.diff(receivedTimestamp);

    if (tokenLife >= tokenTTL) {
        return false;
    }

    return email;
}

function transformResponse (user) {
    const { email, firstName, lastName, role } = user;
    return Object.assign({}, { email, firstName, lastName, role });
}

export default {
    create,
    findByEmail,
    comparePassword,
    generateAccessToken,
    validateAccessToken,
    transformResponse
};
