import { getQueryDefinition } from '@apollo/client/utilities';

export const addOrUpdateCachedQueryArrayItem = (cache, query, item) => {
  const {
    selectionSet: {
      selections: [{ name: { value: firstSelectionName } = {} } = {}] = [],
    } = {},
  } = getQueryDefinition(query.query);

  if (!firstSelectionName) return null;

  const deduplicate = (data) => {
    const map = new Map();
    data.forEach((item) => map.set(cache.identify(item), item));
    return Array.from(map.values());
  };

  return cache.updateQuery(
    query,
    (data) =>
      data && {
        [firstSelectionName]: deduplicate(
          data[firstSelectionName].concat(item)
        ),
      }
  );
};