module.exports = {
    E_STORE: {
        GENERIC: {
            USER_NAME: {
                MIN_LENGTH: 3,
                MAX_LENGTH: 32
            },
            PRODUCT_NAME: {
                MIN_LENGTH: 3,
                MAX_LENGTH: 32
            }
        },
        HTTP: {
            STATUS: {
                OK: {
                    CODE: 200,
                    MESSAGE: 'success'
                },
                CREATED: {
                    CODE: 201,
                    MESSAGE: 'created'
                },
                ACCEPTED_PROCESSING: {
                    CODE: 202,
                    MESSAGE: 'accepted processing'
                },
                PARTIAL_SUCCESS: {
                    CODE: 206,
                    MESSAGE: 'partial success'
                },
                BAD_REQUEST: {
                    CODE: 400,
                    MESSAGE: 'bad request'
                },
                UNAUTHORIZED: {
                    CODE: 401,
                    MESSAGE: 'unauthorised'
                },
                FORBIDDEN: {
                    CODE: 403,
                    MESSAGE: 'forbidden'
                },
                NOT_FOUND: {
                    CODE: 404,
                    MESSAGE: 'not found'
                },
                METHOD_NOT_ALLOWED: {
                    CODE: 405,
                    MESSAGE: 'method not allowed'
                },
                CONFLICT: {
                    CODE: 409,
                    MESSAGE: 'conflict'
                },
                EXPECTATION_FAILED: {
                    CODE: 417,
                    MESSAGE: 'expectation failed'
                },
                UNPROCESSABLE: {
                    CODE: 422,
                    MESSAGE: 'unprocessable'
                },
                INTERNAL_SERVER_ERROR: {
                    CODE: 500,
                    MESSAGE: 'internal server errot'
                },
                BAD_GATEWAY: {
                    CODE: 502,
                    MESSAGE: 'BAD GATEWAY'
                }
            }
        }
    }
};