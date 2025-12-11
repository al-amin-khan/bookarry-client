// src/hooks/useTheme.js

import { useEffect, useState } from "react";

const THEME_KEY = "bookarry-theme";
// match the custom theme name defined in index.css
const LIGHT = "bookarry-light";
const DARK = "bookarry-dark";

const getInitialTheme = () => {
    if (typeof window === "undefined") return LIGHT;

    const storedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
        .matches;

    if (storedTheme === LIGHT || storedTheme === DARK) {
        return storedTheme;
    }

    return prefersDark ? DARK : LIGHT;
};

export const useTheme = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    // react to system theme changes (if user hasn't chosen manually)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (event) => {
            const storedTheme = localStorage.getItem(THEME_KEY);
            if (!storedTheme) {
                setTheme(event.matches ? DARK : LIGHT);
            }
        };

        if (media.addEventListener) {
            media.addEventListener("change", handleChange);
        } else {
            // Safari fallback
            media.addListener(handleChange);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", handleChange);
            } else {
                media.removeListener(handleChange);
            }
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === LIGHT ? DARK : LIGHT));
    };

    const setLight = () => setTheme(LIGHT);
    const setDark = () => setTheme(DARK);

    return {
        theme,
        isDark: theme === DARK,
        toggleTheme,
        setTheme,
        setLight,
        setDark,
    };
};



{/* <button
    className="btn btn-ghost btn-square"
    onClick={toggleTheme}
    aria-label="Toggle theme"
>
    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
</button> */}
