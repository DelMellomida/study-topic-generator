// hooks/useLocalStorage.ts
"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
    const [value, setValue] = useState<T>(initialValue);
    const [hydrated, setHydrated] = useState<boolean>(false);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(key);
            if (stored !== null) {
                // Hydration is the intentional external-state handoff from localStorage.
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setValue(JSON.parse(stored) as T);
            }
        } catch (error) {
            console.error("Error parsing localStorage value:", error);
        } finally {
            setHydrated(true);
        }
    }, [key]);

    useEffect(() => {
        if (!hydrated) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }, [key, value, hydrated]);

    const setAndPersist = useCallback((next: T | ((prev: T) => T)) => {
        setValue((prev) => {
            const nextValue = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;

            try {
                window.localStorage.setItem(key, JSON.stringify(nextValue));
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }

            return nextValue;
        });
    }, [key]);

    return [value, setAndPersist, hydrated];
}
