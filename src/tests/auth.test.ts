import request from "supertest";
import app from "../index";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "testuser@example.com", password: "Test@1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Signup successful! Please verify your email.");
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser@example.com", password: "Test@1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });
});
