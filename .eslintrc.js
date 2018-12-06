module.exports = {
    "extends": "airbnb",
    "env": { "jest": true },
    "rules": {
      "no-underscore-dangle": 0,
      "prefer-destructuring": ["error", {"object": true, "array": false}]
    }
};
