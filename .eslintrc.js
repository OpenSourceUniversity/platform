module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"]
            }
        },
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-filename-extension": [
            1,
            { "extensions": [".js", ".jsx"]
        }],
        "react/prefer-stateless-function": [
            0,
            { "ignorePureComponents": true }
        ],
        "react/prop-types": [
            0
        ],
        "react/forbid-prop-types": [
            0
        ],
        "react/no-array-index-key": [
            0
        ],
        "class-methods-use-this": [
            0
        ],
        "import/prefer-default-export": [
            0
        ],
    }
};
