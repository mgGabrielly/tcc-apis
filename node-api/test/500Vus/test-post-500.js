import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 500 }, 
  ],
};

export default function () {
  const url = 'http://localhost:7000/books';

  const uniqueTitle = `Livro-PNPM-500-${__VU}-${__ITER}`;

  const payload = JSON.stringify({
    title: uniqueTitle,
    author: 'Autor',
    year: 2005,
    numberPages: 193,
    genreId: '256eeb0b-dfad-4855-ab97-18515c42c46a',
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
