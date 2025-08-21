import request from "supertest";
import app from "../index";
import { supabase } from "../config/supabaseClient";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const signUpSpy = jest.spyOn(supabase.auth, "signUp").mockResolvedValue({
      data: { user: { id: "user-1" } } as any,
      error: null as any,
    });

    const fromSpy = jest.spyOn(supabase, "from").mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [
            {
              id: "user-1",
              email: "praveen123@gmail.com",
              password_hash: "hash",
            },
          ],
          error: null,
        }),
      }),
    } as any);

    const res = await request(app)
      .post("/user/register")
      .send({ email: "praveen123@gmail.com", password: "Test@1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(
      "Signup successful! Please verify your email."
    );

    signUpSpy.mockRestore();
    fromSpy.mockRestore();
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ email: "praveen123@gmail.com", password: "Test@1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  it("should send forgot password email", async () => {
    const spy = jest
      .spyOn(supabase.auth, "resetPasswordForEmail")
      .mockResolvedValue({ data: { ok: true } as any, error: null as any });

    const res = await request(app)
      .post("/user/forgot-password")
      .send({ email: "praveen123@gmail.com" });

    expect(spy).toHaveBeenCalledWith("praveen123@gmail.com", {
      redirectTo: "http://localhost:3000/reset-password",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password reset email sent");

    spy.mockRestore();
  });

  it("should refresh token", async () => {
    const spy = jest.spyOn(supabase.auth, "refreshSession").mockResolvedValue({
      data: { session: { access_token: "new" } } as any,
      error: null as any,
    });

    const res = await request(app)
      .post("/user/refresh-token")
      .send({ refresh_token: "test-refresh-token" });

    expect(spy).toHaveBeenCalledWith({ refresh_token: "test-refresh-token" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Token refreshed");

    spy.mockRestore();
  });
});
