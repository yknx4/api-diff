/**
 * FishBrain
 * As the name says, its a RAM memory
 * that its destroyed on each restart.
 */

const fishBrain = [];
const memoryItems = 5000;
const itemsByPage = 10;

const set = (diff, keys) => {
  fishBrain.unshift({
    diff,
    keys: Object.assign(keys, { timeStamp: new Date() })
  });
  const maxSize = Math.min(fishBrain.length, memoryItems);
  fishBrain.length = maxSize;
};
const get = (page = 1) => {
  const shrinked = fishBrain.filter(e => e);
  const paginatedItems = shrinked.slice(
    (page - 1) * itemsByPage,
    (page - 1) * itemsByPage + itemsByPage
  );
  return {
    total_requests: fishBrain.length,
    pagination: {
      itemsByPage,
      page,
      totalPages: Math.ceil(shrinked.length / itemsByPage),
      totalItems: shrinked.length
    },
    paginatedItems
  };
};

export default {
  set,
  get
};
