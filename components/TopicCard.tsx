import type {TopicItem} from "@/types";

interface TopicCardProps {
    topic: TopicItem | null;
    onDraw: () => void;
    onSkip: () => void;
    disabled?: boolean;
    isDrawing?: boolean;
}

export function TopicCard({topic, onDraw, onSkip, disabled = false, isDrawing = false}: TopicCardProps) {
    return (
        <section className={`topic-card${isDrawing ? " topic-card--drawing" : ""}`} aria-live={isDrawing ? "off" : "polite"}>
            <div className="topic-card__topline">
                <span className="eyebrow">{isDrawing ? "Selecting prompt" : "Current prompt"}</span>
                <span className="topic-card__mark" aria-hidden="true">01</span>
            </div>
            {topic ? (
                <>
                    <div className="topic-card__field">{topic.field}</div>
                    <h2>{topic.topic}</h2>
                    <p className="topic-card__hint">Take a few minutes to explain the idea in your own words, then connect it to something you already know.</p>
                </>
            ) : (
                <div className="topic-card__empty">
                    <span className="topic-card__empty-icon" aria-hidden="true">+</span>
                    <h2>Your next idea is waiting.</h2>
                    <p>Draw a topic to begin a focused study session.</p>
                </div>
            )}
            <div className="topic-card__actions">
                <button className="button button--primary" type="button" onClick={onDraw} disabled={disabled || isDrawing}>
                    {isDrawing ? "Choosing..." : topic ? "Mark studied" : "Draw a topic"}<span aria-hidden="true">-&gt;</span>
                </button>
                <button className="button button--secondary" type="button" onClick={onSkip} disabled={!topic || disabled || isDrawing}>Skip for now</button>
            </div>
        </section>
    );
}