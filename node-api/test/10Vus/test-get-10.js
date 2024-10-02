import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 10 }, 
  ],
};

export default function () {
  const url = 'http://localhost:7000/books';

  const res = http.get(url);

  const success = check(res, {
    'status é 200': (r) => r.status === 200, 
  });

  sleep(1);
}
