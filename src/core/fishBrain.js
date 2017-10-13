/**
 * FishBrain
 * As the name says, its a RAM memory
 * that its destroyed on each restart.
 */

const fishBrain = [];
const memoryItems = 500;
const itemsByPage = 20;

const set = (diff, keys) => {
  fishBrain.unshift({
    diff,
    keys: Object.assign(keys, { timeStamp: new Date() })
  });
  const maxSize = Math.min(fishBrain.length, memoryItems);
  fishBrain.length = maxSize;
};
const get = (page = 1) => {
  const paginatedItems = fishBrain.slice(
    (page - 1) * itemsByPage,
    (page - 1) * itemsByPage + itemsByPage
  );
  return {
    pagination: {
      itemsByPage,
      page,
      totalPages: Math.ceil(fishBrain.length / itemsByPage),
      totalItems: fishBrain.length
    },
    paginatedItems
  };
};

export default {
  set,
  get
};
