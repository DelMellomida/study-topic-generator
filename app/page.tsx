"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import topicBank from "@/data/topics.json";
import {PoolStats} from "@/components/PoolStats";
import {Timer} from "@/components/Timer";
import {TopicCard} from "@/components/TopicCard";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useTimer} from "@/hooks/useTimer";
import {buildBalancedPool, drawFromPool, skipAndDrawNext} from "@/lib/sampling";
import type {StudyState, TopicItem} from "@/types";

const STUDY_STATE_VERSION = 2;
const STUDY_STATE_STORAGE_KEY = "study-topic-state-v2";
const INITIAL_POOL = buildBalancedPool(topicBank);
const INITIAL_STATE: StudyState = {
    pool: INITIAL_POOL,
    current: null,
    totalAtReset: INITIAL_POOL.length,
    version: STUDY_STATE_VERSION,
};

export default function Home() {
    const [studyState, setStudyState, hydrated] = useLocalStorage<StudyState>(STUDY_STATE_STORAGE_KEY, INITIAL_STATE);
    const [sessionCount, setSessionCount] = useState(0);
    const [drawingTopic, setDrawingTopic] = useState<TopicItem | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const drawIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timer = useTimer();

    useEffect(() => {
        return () => {
            if (drawIntervalRef.current !== null) clearInterval(drawIntervalRef.current);
        };
    }, []);

    const drawTopic = () => {
        if (isDrawing || studyState.pool.length === 0) return;

        let previewCount = 0;
        setIsDrawing(true);
        drawIntervalRef.current = setInterval(() => {
            const preview = studyState.pool[Math.floor(Math.random() * studyState.pool.length)];
            setDrawingTopic(preview);
            previewCount += 1;

            if (previewCount >= 5) {
                if (drawIntervalRef.current !== null) clearInterval(drawIntervalRef.current);
                const result = drawFromPool(studyState.pool);
                setStudyState((currentState) => ({...currentState, current: result.item, pool: result.pool}));
                setDrawingTopic(null);
                setIsDrawing(false);
                setSessionCount((count) => count + 1);
            }
        }, 110);
    };

    const skipTopic = () => {
        if (!studyState.current) return;
        const result = skipAndDrawNext(studyState.current, studyState.pool);
        setStudyState((currentState) => ({...currentState, current: result.item, pool: result.pool}));
    };

    const resetPool = () => {
        const newPool = buildBalancedPool(topicBank);
        setStudyState({pool: newPool, current: null, totalAtReset: newPool.length, version: STUDY_STATE_VERSION});
        setSessionCount(0);
    };

    const studied = Math.max(0, studyState.totalAtReset - studyState.pool.length - (studyState.current ? 1 : 0));

    if (!hydrated) {
        return <main className="app-shell app-shell--loading"><span className="loading-label">Preparing your study space...</span></main>;
    }

    return (
        <main className={`app-shell${isDarkMode ? " app-shell--dark" : ""}`}>
            <header className="site-header">
                <Link className="brand" href="/" aria-label="Study pool home"><span className="brand-mark" aria-hidden="true">S</span><span>Study pool</span></Link>
                <div className="header-tools">
                    <button className="theme-toggle" type="button" aria-pressed={isDarkMode} onClick={() => setIsDarkMode((mode) => !mode)}>
                        {isDarkMode ? "Light mode" : "Dark mode"}
                    </button>
                    <div className="header-meta"><span className="live-indicator" /> Session {sessionCount > 0 ? sessionCount.toString().padStart(2, "0") : "00"}</div>
                </div>
            </header>

            <div className="workspace-grid">
                <section className="intro-block">
                    <span className="eyebrow">A little structure for curious minds</span>
                    <h1>One good question<br /><em>at a time.</em></h1>
                    <p>Choose a topic, give it your full attention, and leave with a clearer understanding than you started with.</p>
                </section>

                <div className="content-grid">
                    <div className="main-column">
                        <TopicCard topic={isDrawing ? drawingTopic : studyState.current} onDraw={drawTopic} onSkip={skipTopic} isDrawing={isDrawing} disabled={studyState.pool.length === 0 && !studyState.current} />
                        <div className="tip-line"><span className="tip-line__icon" aria-hidden="true">i</span><span>Tip: write down your first explanation before reaching for a reference.</span></div>
                    </div>
                    <aside className="side-column">
                        <Timer secondsLeft={timer.secondsLeft} isRunning={timer.isRunning} isFinished={timer.isFinished} onStart={timer.start} onPause={timer.pause} onReset={() => timer.reset()} />
                        <PoolStats remaining={studyState.pool.length} studied={studied} total={studyState.totalAtReset} onReset={resetPool} />
                    </aside>
                </div>
            </div>

            <footer className="site-footer"><span>Designed for unrushed learning</span><span>Local session · Private by default</span></footer>
        </main>
    );
}
