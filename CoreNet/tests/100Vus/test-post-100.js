import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 100 }, 
  ],
};

export default function () {
  const url = 'http://localhost:5095/books';

  const uniqueTitle = `Livro-Core-100-${__VU}-${__ITER}`;

  const payload = JSON.stringify({
    name: uniqueTitle,
    author: 'Core100',
    year: 2019,
    numberPages: 350,
    genreId: '1',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  const success = check(res, {
    'status é 201': (r) => r.status === 201,
  });

  sleep(1);
}
