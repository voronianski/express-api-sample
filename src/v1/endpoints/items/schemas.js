export const itemSchema = {
    payload: {
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string'
        },
        isPublic: {
            type: 'boolean'
        }
    }
};
