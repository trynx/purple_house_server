const theAccount = {
    email: "nico@gmail.com",
    password: "12345678",
};

// Should register before it can login
const register = async (request) => {
    return new Promise((resolve) => {
        request
            .post("/api/auth/register")
            .send(theAccount)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                resolve();
            });
    });
};

exports.login = async (request) => {
    await register(request);

    return new Promise((resolve) => {
        request
            .post("/api/auth/signin")
            .send(theAccount)
            .end((err, res) => {
                if (err) {
                    throw err;
                }

                const { accessToken, refreshToken } = res.body;
                resolve({ accessToken, refreshToken });
            });
    });
};
