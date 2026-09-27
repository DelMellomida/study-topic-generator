// lib/sampling.ts
import { TopicBank, TopicItem, DrawResult } from '../types/index';

export function makeId(field: string, topic: string): string {
    return `${field}::${topic}`;
}

// Fisher-Yates (Knuth) Shuffle
export function shuffle<T>(items: readonly T[]): T[] {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function buildBalancedPool(bank: TopicBank, perField?:number): TopicItem[] {
    const pool: TopicItem[] = [];
    for (const field of Object.keys(bank)) {
        const topics = bank[field];
        if (!topics || topics.length === 0) continue;

        const sampleSize = perField === undefined ? topics.length : Math.min(perField, topics.length);
        const sampledTopics = shuffle(topics).slice(0, sampleSize);

        for (const topic of sampledTopics) {
            pool.push({ id: makeId(field, topic), field, topic });
        }
    }
    return shuffle(pool);
}

export function drawFromPool(pool: TopicItem[]): DrawResult {
    if (pool.length === 0) {
        return { item: null, pool: [] };
    }

    const index = Math.floor(Math.random() * pool.length);
    const item = pool[index];

    const newPool = pool.slice(0, index).concat(pool.slice(index + 1));
    return { item, pool: newPool };
}

export function skipAndDrawNext(currentItem: TopicItem, pool: TopicItem[]): DrawResult {
    if (pool.length === 0) {
        return { item: null, pool: [] };
    }

    const { item: nextItem, pool: remainingPool } = drawFromPool(pool);

    return { item: nextItem, pool: remainingPool.concat(currentItem) };
}