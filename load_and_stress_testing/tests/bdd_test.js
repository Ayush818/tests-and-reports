import http from "k6/http";
import { group, check, sleep } from "k6";

export let options = {
  vus: 10,
  duration: "1m",
};

export default function () {
  group("Client Registration", function () {
    const url = "http://127.0.0.1:5001/client_registeration";

    const payload = {
      fullName: `BDD Test User ${__VU}-${__ITER}`,
      userName: `bdd_user_${__VU}${__ITER}`,
      email: `bdd_user_${__VU}${__ITER}@example.com`,
      password: "password123",
      phone: `123456789${__VU}`,
    };

    const params = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const res = http.post(url, payload, params);

    check(res, {
      "is status 200": (r) => r.status === 200,
      "response contains User Registered or Email already Exist": (r) =>
        r.status === 200 &&
        (r.json().msg === "User Registered" ||
          r.json().msg === "Email already Exist"),
    });
  });

  group("Client Login", function () {
    const url = "http://127.0.0.1:5001/client_login";

    const payload = {
      email: `user_1@example.com`,
      password: "password123",
    };

    const params = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const res = http.post(url, payload, params);

    check(res, {
      "is status 200": (r) => r.status === 200,
      "response contains Login Successful": (r) =>
        r.status === 200 && r.json().msg === "Login Successful",
    });
  });

  sleep(1);
}
