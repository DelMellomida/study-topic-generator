// types/index.ts

export type TopicBank = Record<string, string[]>;

export interface TopicItem {
    id: string;
    field: string;
    topic: string;
}

export interface StudyState {
    pool: TopicItem[];
    current: TopicItem | null;
    totalAtReset: number;
    version: number;
}

export interface DrawResult {
    item: TopicItem | null;
    pool: TopicItem[];
}