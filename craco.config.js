const path = require("path");

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, "src/components/"),
            '@container': path.resolve(__dirname, "src/container/"),
            '@shared': path.resolve(__dirname, "src/shared/"),
            '@images': path.resolve(__dirname, "src/assets/images/"),
            '@icons': path.resolve(__dirname, "src/assets/icons/"),
            '@videos': path.resolve(__dirname, "src/assets/videos/"),
            '@rive': path.resolve(__dirname, "src/assets/rive/"),
        },
        configure: {
            module: {
                rules: [
                    {
                        type: 'javascript/auto',
                        test: /\.mjs$/,
                        include: /node_modules/,
                    },
                ],
            },
        },
    },
}