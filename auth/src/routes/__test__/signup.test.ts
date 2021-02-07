import request from "supertest";
import { app } from "../../app";

it("return 201", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "ahmed@gamil.com",
      password: "ahsjdkhalsj",
    })
    .expect(201);
});
