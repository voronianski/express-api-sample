const emailSchema = {
    type: 'string',
    format: 'email',
    required: true
};
const notEmptyStringSchema = {
    type: 'string',
    required: true,
    minLength: 1
};

export const loginSchema = {
    payload: {
        email: emailSchema,
        password: notEmptyStringSchema
    }
};

export const signupSchema = {
    payload: {
        email: emailSchema,
        password: notEmptyStringSchema,
        firstName: notEmptyStringSchema,
        lastName: notEmptyStringSchema,
        role: {
            type: 'string',
            required: true,
            enum: ['artist', 'listener']
        }
    }
};
