const supertest = require("supertest");
const { app, server } = require("../app");
const request = supertest(app);
const { login } = require("./login");

const { connectDB, disconnectDB } = require("../config/db");

const jobBaseApi = "/api/job";
// Used for login
let commonHeaders = {};

describe("Job api test", () => {
    beforeAll(async () => {
        await connectDB();

        const { accessToken, refreshToken } = await login(request);
        commonHeaders["x-access-token"] = accessToken;
    });

    afterAll(async () => {
        await disconnectDB();
        server.close();
    });

    const createApi = `${jobBaseApi}/create`;

    describe(`POST ${createApi}`, () => {
        it("Should be able to create a job", async () => {
            const req = request.post(createApi).set(commonHeaders);

            const res = await req.send({
                position: "Groot",
                department: "GoG",
                office: "Jet",
            });

            expect(res.status).toBe(200);
        });

        it("Should fail to create a job because no auth", async () => {
            const req = request.post(createApi);

            const res = await req.send({
                position: "Groot",
                department: "GoG",
                office: "Jet",
            });

            expect(res.status).toBe(403);
        });
    });
});
