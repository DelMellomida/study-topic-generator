// hooks/useTimer.ts
"use client";

import {useState, useRef, useEffect, useCallback} from "react";

const DEFAULT_DURATION_SECONDS = 60 * 60;

export interface UseTimerReturn {
    secondsLeft: number;
    isRunning: boolean;
    isFinished: boolean;
    start: () => void;
    pause: () => void;
    reset: (newDuration?: number) => void;
}

export function useTimer(
    initialDuration: number = DEFAULT_DURATION_SECONDS
): UseTimerReturn {
    const [secondsLeft, setSecondsLeft] = useState<number>(initialDuration);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const endTimeRef = useRef<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimerInterval = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const tick = useCallback(() => {
        if (endTimeRef.current === null) return;

        const remainingMs = endTimeRef.current! - Date.now();
        const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

        setSecondsLeft(remainingSec);

        if (remainingSec <= 0) {
            clearTimerInterval();
            setIsRunning(false);
            endTimeRef.current = null;
        }
    }, [clearTimerInterval]);

    const start = useCallback(() => {
        if (isRunning || secondsLeft <= 0) return;

        endTimeRef.current = Date.now() + secondsLeft * 1000;
        setIsRunning(true);
        clearTimerInterval();
        intervalRef.current = setInterval(tick, 250);
    }, [isRunning, secondsLeft, tick, clearTimerInterval]);

    const pause = useCallback(() => {
        if (!isRunning) return;
        
        clearTimerInterval();
        setIsRunning(false);

        if (endTimeRef.current !== null) {
            const remainingMs = endTimeRef.current - Date.now();
            setSecondsLeft(Math.max(0, Math.ceil(remainingMs / 1000)));
            endTimeRef.current = null;
        }
    }, [isRunning, clearTimerInterval]);

    const reset = useCallback(
        (newDuration: number = initialDuration) => {
            clearTimerInterval();
            setIsRunning(false);
            endTimeRef.current = null;
            setSecondsLeft(newDuration);
        },
        [initialDuration, clearTimerInterval]
    )

    useEffect(() => {
        return () => {
            clearTimerInterval();
        };
    }, [clearTimerInterval]);

    return {
        secondsLeft,
        isRunning,
        isFinished: secondsLeft <= 0 && !isRunning,
        start,
        pause,
        reset,
    };
}