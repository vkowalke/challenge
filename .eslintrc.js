module.exports = {
	"ecmaFeatures": {
        "blockBindings": true
    },
    "rules": {
		"no-undef": [
			0
		],
		"no-console": [
			0
		],
		"no-unused-vars": [
			1
		],
		"prefer-const": [ 
			2
		],
        "indent": [
            2,
            "tab"
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            2,
            "windows"
        ],
        "semi": [
            2,
            "always"
        ],
		"curly": [
			2
		],
		"no-alert": [
			2
		],
		"no-eval": [
			2
		],
		"strict": [
			2,
			"global"
		],
		// styling
		"array-bracket-spacing": [
			2,
			"always"
		],
		"block-spacing": [
			2, 
			"always"
		],
		"brace-style": [
			2
		],
		"camelcase": [
			2, 
			{"properties": "always"}
		],
		"comma-spacing": [
			2, 
			{"before": false, "after": true}
		],
		"comma-style": [
			2, 
			"last"
		]
    },
    "env": {
        "node": true
    },
    "extends": "eslint:recommended"
};