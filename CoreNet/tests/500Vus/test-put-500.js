import http from 'k6/http';
import { check, group, sleep } from 'k6';

let resourceIds = [];
let currentIndex = 0;

function getResourceIds() {
  const getResponse = http.get('http://localhost:5095/books');
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
    { duration: '3m', target: 500 }, 
  ],
};

export default function (data) {
  const { resourceIds } = data;

  group('PUT book', function () {
    const idToUse = resourceIds[currentIndex];

    currentIndex = (currentIndex + 1) % resourceIds.length;

    const uniqueTitle = `Book-Core-500-${__VU}-${__ITER}`;

    const payload = JSON.stringify({
      name: uniqueTitle,
      author: 'Author',
      year: 2023,
      numberPages: 280,
      genreId: '1',
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const putResponse = http.put(`http://localhost:5095/books/${idToUse}`, payload, params);

    check(putResponse, {
      'PUT request is successful': (r) => r.status === 200,
    });

    sleep(1);
  });
}
