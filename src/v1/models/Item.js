import { items } from '../../utils/db';

function create (doc) {
    return new Promise((resolve, reject) => {
        const item = Object.assign({}, doc, {
            isPublic: doc.isPublic || true,
            createdAt: Date.now()
        });
        items.insert(item, (err, saved) => {
            err ? reject(err) : resolve(saved);
        });
    });
}

function findById (_id) {
    return new Promise((resolve, reject) => {
        items.findOne({ _id }, (err, item) => {
            err ? reject(err) : resolve(item);
        });
    });
}

function update (oldItem, doc) {
    return new Promise((resolve, reject) => {
        const newItem = Object.assign({}, oldItem, doc);
        items.update({_id: oldItem._id }, newItem, {}, (err) => {
            err ? reject(err) : resolve(newItem);
        });
    });
}

function remove (_id) {
    return new Promise((resolve, reject) => {
        items.remove({ _id }, {}, (err, num, item) => {
            err ? reject(err) : resolve(item);
        });
    });
}

function transformResponse (item) {
    const { _id, owner, title, description, isPublic } = item;
    return Object.assign({}, { _id, owner, title, description, isPublic });
}

export default {
    create,
    findById,
    update,
    remove,
    transformResponse
};
