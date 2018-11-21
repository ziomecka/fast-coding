const ApiManager = {
    post: async (): Promise<{status: boolean}> => {
        return {status: false};
    },
    get: async (): Promise<{status: boolean}> => {
        return {status: false};
    }
};

export default ApiManager;