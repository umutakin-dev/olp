import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dracula theme colors
                dracula: {
                    background: "#282a36",
                    currentLine: "#44475a",
                    selection: "#44475a",
                    foreground: "#f8f8f2",
                    comment: "#6272a4",
                    cyan: "#8be9fd",
                    green: "#50fa7b",
                    orange: "#ffb86c",
                    pink: "#ff79c6",
                    purple: "#bd93f9",
                    red: "#ff5555",
                    yellow: "#f1fa8c",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
