interface PoolStatsProps {
    remaining: number;
    studied: number;
    total: number;
    onReset: () => void;
}

export function PoolStats({remaining, studied, total, onReset}: PoolStatsProps) {
    return (
        <section className="stats-panel" aria-labelledby="pool-stats-title">
            <div className="panel-heading panel-heading--compact">
                <div><span className="eyebrow">Your progress</span><h2 id="pool-stats-title">Topic pool</h2></div>
                <span className="pool-count">{remaining}/{total}</span>
            </div>
            <div className="stats-list">
                <div className="stat-row"><span>Remaining</span><strong>{remaining}</strong></div>
                <div className="stat-row"><span>Studied</span><strong>{studied}</strong></div>
                <div className="stat-row"><span>All topics</span><strong>{total}</strong></div>
            </div>
            <button className="text-button" type="button" onClick={onReset}>Reset topic pool <span aria-hidden="true">-&gt;</span></button>
        </section>
    );
}