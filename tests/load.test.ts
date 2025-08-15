import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 1000 }, // ramp up
    { duration: '3m', target: 1000 }, // hold load
    { duration: '1m', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // API latency check
    http_reqs: ['count>180000'],      // 1000 rps * 3 min
  }
};

// Login once, get JWT token, share with all VUs
export function setup() {
  const url = 'http://localhost:3000/api/auth/login';
  const payload = JSON.stringify({
    email: 'mhdmuflihkk@gmail.com',
    password: 'Muflih@123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  console.log('Login response:', res.body);

  check(res, {
    'login succeeded': (r) => r.status === 200 && r.json('accessToken') !== undefined,
  });

  if (res.status !== 200) {
    console.error('Login failed, aborting test');
    return null;
  }

  const token = res.json('accessToken');
  console.log('Extracted token:', token);
  return token;
}

export default function (token: string) {
  if (!token) {
    console.error('No token received from setup, aborting iteration');
    return;
  }

  const params = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const res = http.get('http://localhost:3000/api/accounts', params);

  check(res, {
    'status is 200': (r) => {
      if (r.status !== 200) {
        console.log(`Unexpected status: ${r.status} Body: ${r.body}`);
      }
      return r.status === 200;
    },
  });

  sleep(1);
}
