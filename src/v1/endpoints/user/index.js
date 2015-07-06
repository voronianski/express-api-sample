import express from 'express';
import validate from 'is-express-schema-valid';

import User from '../../models/User';
import Item from '../../models/Item';
import errors from '../../../utils/errors';
import { validateAccessToken, validateUserRole } from '../../../middleware';

import {
    signupSchema,
    loginSchema
} from './schemas';

export default function () {
    var router = express.Router();

    router.post('/signup',
        validate(signupSchema),
        findUserByEmail,
        signupUser,
        generateAccessToken,
        returnUser
    );

    router.post('/login',
        validate(loginSchema),
        findUserByEmail,
        loginUser,
        generateAccessToken,
        returnUser
    );

    router.get('/me',
        validateAccessToken,
        findUserByEmail,
        returnUser
    );

    router.get('/items',
        validateAccessToken,
        validateUserRole('artist'),
        findUserItems,
        returnItems
    );

    async function findUserByEmail (req, res, next) {
        try {
            const email = req.email || req.body.email;
            req.user = await User.findByEmail(email);
            next();
        } catch (err) {
            next(err);
        }
    }

    async function signupUser (req, res, next) {
        try {
            if (req.user) {
                next(new errors.BadRequest('Email is already registered'));
            }
            req.user = await User.create(req.body);
            next();
        } catch (err) {
            next(err);
        }
    }

    async function loginUser (req, res, next) {
        try {
            if (!req.user) {
                next(new errors.NotFound('User with this email is not found'));
            }

            const same = await User.comparePassword(req.body.password, req.user.password);
            if (!same) {
                next(new errors.BadRequest('Password is not matching email address'));
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    async function findUserItems (req, res, next) {
        try {
            if (!req.user) {
                next(new errors.NotFound('User with this email is not found'));
            }
            req.items = await Item.getArtistItems(req.email);
            next();
        } catch (err) {
            next(err);
        }
    }

    async function generateAccessToken (req, res, next) {
        try {
            req.accessToken = await User.generateAccessToken(req.user.email);
            next();
        } catch (err) {
            next(err);
        }
    }

    function returnItems (req, res) {
        res.json(req.items.map(Item.transformResponse));
    }

    function returnUser (req, res) {
        const user = User.transformResponse(req.user);
        const data = req.accessToken ? { accessToken: req.accessToken, user } : user;
        res.json(data);
    }

    return router;
}
