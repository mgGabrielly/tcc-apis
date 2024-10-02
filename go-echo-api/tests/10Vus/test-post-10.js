import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 10 }, 
  ],
};

export default function () {
  const url = 'http://localhost:8080/books';

  const uniqueTitle = `Livro-Go-10-${__VU}-${__ITER}`;

  const payload = JSON.stringify({
    name: uniqueTitle,
    author: '10Go',
    year: 2017,
    pages: 360,
    genre_id: 1,
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
