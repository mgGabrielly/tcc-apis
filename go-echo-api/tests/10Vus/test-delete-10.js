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
    console.error('Nenhum recurso encontrado para exclusão.');
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

  group('DELETE book', function () {
    const idToUse = resourceIds[currentIndex];

    currentIndex = (currentIndex + 1) % resourceIds.length;

    const deleteResponse = http.del(`http://localhost:8080/books/${idToUse}`);

    check(deleteResponse, {
      'DELETE request is successful': (r) => r.status === 204, 
    });

    sleep(1);
  });
}