import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 500 }, 
  ],
};

export default function () {
  const url = 'http://localhost:5095/books';

  const res = http.get(url);

  const success = check(res, {
    'status é 200': (r) => r.status === 200, 
  });

  sleep(1);
}
