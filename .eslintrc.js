module.exports = {
    settings: {
        react: {
            version: "detect"
        }
    },
    extends: ["react-app", "react-app/jest"],
    rules: {
        "import/no-anonymous-default-export": "off",
        eqeqeq: ["off", { typeof: "always" }]
    }
}
