const $scope = { paginatedItems: [], pagination: {}, pages: [], liveItem: {} };

const generatePagination = () => {
  const { page, totalPages } = _.clone($scope.pagination);
  const pages = [];
  const start = Math.max(page - 2, 1);
  const finish = Math.min(page + 2, totalPages);
  for (let i = start; i <= finish; i += 1) {
    if (i === page) {
      pages.push({
        name: i,
        current: true
      });
    } else {
      pages.push({
        name: i
      });
    }
  }
  $scope.pages = pages;
};

const loadItem = index => {
  const item = { diff: {} };
  const liveItem = $scope.paginatedItems[index];
  const { diff, keys } = _.clone(liveItem);
  const { __old: oldSC } = diff.headers.statusCode;
  item.title = `${keys.url} - ${keys.method}`;
  _.forEach(diff, (sectionData, sectionKey) => {
    item.diff[sectionKey] = {};
    _.forEach(sectionData, (changeValue, changeKey) => {
      if (changeKey.indexOf('__deleted') !== -1) {
        if (oldSC === 404) {
          return;
        }
        item.diff[sectionKey][changeKey] = {
          type: 'deleted',
          reff: changeKey.replace('__deleted', ''),
          values: [changeValue, null]
        };
      } else if (changeKey.indexOf('__added') !== -1) {
        item.diff[sectionKey][changeKey] = {
          type: 'added',
          reff: changeKey.replace('__added', ''),
          values: [null, changeValue]
        };
      } else {
        item.diff[sectionKey][changeKey] = {
          type: 'changed',
          reff: changeKey,
          // eslint-disable-next-line
          values: [changeValue.__old, changeValue.__new]
        };
      }
    });
  });
  $scope.liveItem = item;
};

const loadPage = page =>
  $.get(`/data.json?page=${page}`, data => {
    _.forEach(data, (value, key) => {
      $scope[key] = value;
    });
    generatePagination();
  });

const logout = () => {
  const url = window.location.href
    .replace('http://', 'http://bad:pw@')
    .replace('https://', 'https://bad:pw@');
  $.post(url).always(() => {
    window.location.href = '/';
  });
};

const $methods = {
  loadPage,
  loadItem,
  logout
};

$(document).ready(() => {
  loadPage(1);
  const app = new Vue({
    el: '#app',
    data: $scope,
    methods: $methods
  });
  return app;
});
