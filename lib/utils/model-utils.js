import _ from 'lodash';

const { size, each, map } = _;

const detectChanges = (prev = {}, next = {}) => {
  const changes = {};
  each(prev, (value, key) => {
    if (typeof next[key] !== 'undefined' && next[key] !== value) {
      changes[key] = next[key];
    }
  });

  if (size(changes)) {
    return changes;
  }
  return null;
};

const fromList = (list, Model = Object) => {
  return map(list, (item) => {
    return new Model(item);
  });
};

export default {
  detectChanges,
  fromList,
};
