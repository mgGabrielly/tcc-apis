import http from 'k6/http';
import { check, group, sleep } from 'k6';

let resourceIds = [];
let currentIndex = 0;

function getResourceIds() {
  const getResponse = http.get('http://localhost:7000/books');
  check(getResponse, {
    'GET request is successful': (r) => r.status === 200,
  });

  const resources = getResponse.json();
  if (resources.length > 0) {
    return resources.map(resource => resource.id);
  } else {
    console.error('Nenhum recurso encontrado para atualização.');
    return [];
  }
}

export function setup() {
  resourceIds = getResourceIds();
  return { resourceIds };
}

export const options = {
  stages: [
    { duration: '3m', target: 10 }, 
  ],
};

export default function (data) {
  const { resourceIds } = data;

  group('PUT book', function () {
    const idToUse = resourceIds[currentIndex];

    currentIndex = (currentIndex + 1) % resourceIds.length;

    const uniqueTitle = `Book-PNPM-10-${__VU}-${__ITER}`;

    const payload = JSON.stringify({
      title: uniqueTitle,
      author: 'Author',
      year: 2015,
      numberPages: 57,
      genreId: '256eeb0b-dfad-4855-ab97-18515c42c46a',
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const putResponse = http.put(`http://localhost:7000/books/${idToUse}`, payload, params);

    check(putResponse, {
      'PUT request is successful': (r) => r.status === 200,
    });

    sleep(1);
  });
}
