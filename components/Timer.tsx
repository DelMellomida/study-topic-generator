interface TimerProps {
    secondsLeft: number;
    isRunning: boolean;
    isFinished: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return [hours, minutes, remainingSeconds].map((part) => part.toString().padStart(2, "0")).join(":");
}

export function Timer({secondsLeft, isRunning, isFinished, onStart, onPause, onReset}: TimerProps) {
    return (
        <section className="timer-panel" aria-label="Study timer">
            <div className="panel-heading">
                <div><span className="eyebrow">Focus block</span><h2>Deep work timer</h2></div>
                <span className={`status-dot${isRunning ? " status-dot--active" : ""}`} aria-label={isRunning ? "Timer running" : "Timer paused"} />
            </div>
            <div className="timer-display" aria-live="polite">{formatTime(secondsLeft)}</div>
            <p className="timer-status">{isFinished ? "Block complete" : isRunning ? "Stay with the idea" : "Ready when you are"}</p>
            <div className="timer-controls">
                <button className="button button--dark" type="button" onClick={isRunning ? onPause : onStart}>{isRunning ? "Pause" : "Start timer"}</button>
                <button className="icon-button" type="button" onClick={onReset} aria-label="Reset timer" title="Reset timer">Reset</button>
            </div>
        </section>
    );
}