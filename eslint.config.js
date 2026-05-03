import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked, // Upgraded to Type-Checked rules
	{
		files: ["src/**/*.ts", "src/**/*.d.ts"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				project: true, // Tells ESLint to use your tsconfig.json
				tsconfigRootDir: import.meta.dir,
			},
		},
		rules: {
			"@typescript-eslint/unbound-method": "error", // Catch the "detached method" bug
			"@typescript-eslint/no-floating-promises": "error", // Ensure async calls are handled
			"arrow-spacing": ["warn", { before: true, after: true }],
			"brace-style": ["error", "stroustrup", { allowSingleLine: true }],
			"comma-dangle": ["error", "always-multiline"],
			"comma-spacing": "error",
			"comma-style": "error",
			curly: ["error", "multi-line", "consistent"],
			"dot-location": ["error", "property"],
			"handle-callback-err": "off",
			indent: ["error", "tab"],
			"keyword-spacing": "error",
			"max-nested-callbacks": ["error", { max: 4 }],
			"max-statements-per-line": ["error", { max: 2 }],
			"no-console": "off",
			"no-empty-function": "error",
			"no-floating-decimal": "error",
			"no-inline-comments": "error",
			"no-lonely-if": "error",
			"no-multi-spaces": "error",
			"no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
			"no-shadow": ["error", { allow: ["err", "resolve", "reject"] }],
			"no-trailing-spaces": ["error"],
			"no-var": "error",
			"no-undef": "off",
			"object-curly-spacing": ["error", "always"],
			"prefer-const": "error",
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"space-before-blocks": "error",
			"space-before-function-paren": [
				"error",
				{
					anonymous: "never",
					named: "never",
					asyncArrow: "always",
				},
			],
			"space-in-parens": "error",
			"space-infix-ops": "error",
			"space-unary-ops": "error",
			"spaced-comment": "error",
			yoda: "error",
		},
	},
);