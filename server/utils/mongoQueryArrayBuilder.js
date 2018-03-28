const mongoQueryArrayBuilder = function(queryObject) {
  for (let prop in queryObject) {
    if (queryObject[prop] instanceof Array) {
      queryObject[prop] = {'$in': queryObject[prop]}
    }
  }
  return queryObject;
};

module.exports = mongoQueryArrayBuilder;
