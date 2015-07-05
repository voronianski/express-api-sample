import express from 'express';

import user from './endpoints/user';
import items from './endpoints/items';

export default function () {
    var router = express.Router();

    router.use('/user', user());
    router.use('/items', items());

    return router;
}
