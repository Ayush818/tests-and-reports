import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 10 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<5000"],
  },
};

export default function () {
  const url = "http://127.0.0.1:5000/client_registeration";

  const payload = {
    fullName: `Load Test User ${__VU}`,
    userName: `user_${__VU}`,
    email: `user_${__VU}@example.com`,
    password: "password123",
    phone: `123456789${__VU}`,
  };

  const params = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    timeout: "10s",
  };

  const res = http.post(url, payload, params);

  check(res, {
    "is status 200": (r) => r.status === 200,
    "response contains User Registered or Email already Exist": (r) =>
      r.status === 200 &&
      (r.json().msg === "User Registered" ||
        r.json().msg === "Email already Exist"),
    "request timeout handling": (r) => r.status !== 0,
  });

  if (res.status === 0) {
    console.error(`Request to ${url} failed: Timeout or no response`);
  } else if (res.status !== 200) {
    console.error(`Request to ${url} failed with status ${res.status}`);
  }

  sleep(1);
}
