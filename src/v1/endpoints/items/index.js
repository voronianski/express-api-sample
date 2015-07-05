import express from 'express';
import validate from 'is-express-schema-valid';

import Item from '../../models/Item';
import errors from '../../../utils/errors';
import validateAccessToken from '../../../middleware/validateAccessToken';
import validateUserRole from '../../../middleware/validateUserRole';

import { itemSchema } from './schemas';

export default function () {
    var router = express.Router();

    router.post('/',
        validateAccessToken,
        validateUserRole('artist'),
        validate(itemSchema),
        createItem,
        returnItem
    );

    router.get('/:id',
        validateAccessToken,
        findItemById,
        returnItem
    );

    router.put('/:id',
        validateAccessToken,
        validateUserRole('artist'),
        validate(itemSchema),
        findItemById,
        updateItem,
        returnItem
    );

    router.delete('/:id',
        validateAccessToken,
        validateUserRole('artist'),
        findItemById,
        deleteItem
    );

    async function createItem (req, res, next) {
        try {
            const itemData = Object.assign({}, req.body, {owner: req.email});
            req.item = await Item.create(itemData);
            next();
        } catch (err) {
            next(err);
        }
    }

    async function findItemById (req, res, next) {
        try {
            req.item = await Item.findById(req.params.id);
            if (!req.item) {
                return next(new errors.NotFound('Item not found'));
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    async function updateItem (req, res, next) {
        try {
            req.item = await Item.update(req.item, req.body);
            next();
        } catch (err) {
            next(err);
        }
    }

    async function deleteItem (req, res, next) {
        try {
            await Item.remove(req.params.id);
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }

    }

    function returnItem (req, res) {
        res.json(Item.transformResponse(req.item));
    }

    return router;
}
