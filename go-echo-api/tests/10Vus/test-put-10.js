import http from 'k6/http';
import { check, group, sleep } from 'k6';

let resourceIds = [];
let currentIndex = 0;

function getResourceIds() {
  const getResponse = http.get('http://localhost:8080/books');
  check(getResponse, {
    'GET request is successful': (r) => r.status === 200,
  });

  const resources = getResponse.json();
  if (resources.length > 0) {
    return resources.map(resource => resource.ID);
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

    const uniqueTitle = `Book-Gol-10-${__VU}-${__ITER}`;

    const payload = JSON.stringify({
      name: uniqueTitle,
      author: 'Author',
      year: 2021,
      pages: 280,
      genre_id: 1,
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const putResponse = http.put(`http://localhost:8080/books/${idToUse}`, payload, params);

    check(putResponse, {
      'PUT request is successful': (r) => r.status === 200,
    });

    sleep(1);
  });
}
