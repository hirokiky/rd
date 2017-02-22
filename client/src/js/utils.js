function remove(arr, obj) {
  arr.splice(arr.indexOf(obj), 1);
}

module.exports = {
  remove: remove
};
