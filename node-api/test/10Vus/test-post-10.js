import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 10 }, 
  ],
};

export default function () {
  const url = 'http://localhost:7000/books';

  const uniqueTitle = `Livro-PNPM-10-${__VU}-${__ITER}`;

  const payload = JSON.stringify({
    title: uniqueTitle,
    author: 'Autor',
    year: 2005,
    numberPages: 193,
    genreId: '82b7f9a6-687a-4b0c-a781-6e414f3ecc90',
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
