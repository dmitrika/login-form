export const API = {
  async login({ email, password }) {
    // Simulate network delay
    await sleep(500);

    if (email === "formError@hey.com") {
      return Promise.reject({ formError: "Try again tomorrow" });
    }

    if (email !== "rybin@hey.com") {
      return Promise.reject({ email: "Email is not found" });
    }

    if (password !== "password") {
      return Promise.reject({ password: "Password is not correct" });
    }

    return Promise.resolve();
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
