import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "20s", target: 20 },
    { duration: "20s", target: 50 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const url = "http://127.0.0.1:5000/client_login";

  const payload = {
    email: "test_1@example.com",
    password: "password123",
  };

  const params = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "is status 200": (r) => r.status === 200,
    "response contains Login Successful": (r) => {
      try {
        const jsonResponse = r.json();
        return jsonResponse.msg === "Login Successful";
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);
}
