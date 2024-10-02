import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 1000 }, 
  ],
};

export default function () {
  const url = 'http://localhost:5095/books';

  const uniqueTitle = `Livro-Core-1000-${__VU}-${__ITER}`;

  const payload = JSON.stringify({
    name: uniqueTitle,
    author: '10Core00',
    year: 2024,
    numberPages: 360,
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
