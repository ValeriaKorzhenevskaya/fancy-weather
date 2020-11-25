module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'linebreak-style': 'off',
        'prefer-destructuring': 'off',
        'no-shadow': 'off',
        'class-methods-use-this': 'off'
    },
    "extends": ['airbnb'],
};
