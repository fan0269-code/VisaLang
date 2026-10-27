import { decisionStages, type DecisionStage } from './source-review.ts';
import { guidePurposeLabels, type GuidePurpose } from './guide-taxonomy.ts';

export type GuideDiscoveryLanguage = 'en' | 'zh';
export type GuideDiscoverySort = 'updated' | 'relevance';

export interface GuideDiscoveryState {
  q: string;
  purpose: GuidePurpose | '';
  stage: DecisionStage | '';
  language: GuideDiscoveryLanguage | '';
  sort: GuideDiscoverySort;
}

export interface GuideDiscoveryCard {
  search: string;
  purposes: readonly GuidePurpose[];
  stage: DecisionStage;
  language: GuideDiscoveryLanguage;
}

const defaultState: GuideDiscoveryState = {
  q: '',
  purpose: '',
  stage: '',
  language: '',
  sort: 'updated',
};

const supportedPurposes = Object.keys(guidePurposeLabels) as GuidePurpose[];
const supportedLanguages: GuideDiscoveryLanguage[] = ['en', 'zh'];
const supportedSorts: GuideDiscoverySort[] = ['updated', 'relevance'];

function controlledValue<T extends string>(value: string | null, supported: readonly T[]): T | '' {
  return value && supported.includes(value as T) ? value as T : '';
}

export function clearGuideDiscoveryState(): GuideDiscoveryState {
  return { ...defaultState };
}

export function parseGuideDiscoveryState(search: string): GuideDiscoveryState {
  const params = new URLSearchParams(search);
  const sort = controlledValue(params.get('sort'), supportedSorts);
  return {
    q: (params.get('q') ?? '').trim(),
    purpose: controlledValue(params.get('purpose'), supportedPurposes),
    stage: controlledValue(params.get('stage'), decisionStages),
    language: controlledValue(params.get('language'), supportedLanguages),
    sort: sort || defaultState.sort,
  };
}

export function serializeGuideDiscoveryState(state: GuideDiscoveryState): string {
  const params = new URLSearchParams();
  if (state.q.trim()) params.set('q', state.q.trim());
  if (state.purpose) params.set('purpose', state.purpose);
  if (state.stage) params.set('stage', state.stage);
  if (state.language) params.set('language', state.language);
  if (state.sort !== defaultState.sort) params.set('sort', state.sort);
  return params.toString();
}

export function filterGuideDiscoveryCards<T extends GuideDiscoveryCard>(cards: readonly T[], state: GuideDiscoveryState): T[] {
  const query = state.q.trim().toLocaleLowerCase();
  return cards.filter((card) => {
    if (query && !card.search.toLocaleLowerCase().includes(query)) return false;
    if (state.purpose && !card.purposes.includes(state.purpose)) return false;
    if (state.stage && card.stage !== state.stage) return false;
    if (state.language && card.language !== state.language) return false;
    return true;
  });
}

export function summarizeGuideDiscoveryResults(visible: number, total: number) {
  if (visible === 0) {
    return {
      empty: true,
      announcement: 'No guides match these filters. Clear a filter or clear all to see every guide.',
    } as const;
  }
  return {
    empty: false,
    announcement: `Showing ${visible} of ${total} guides.`,
  } as const;
}
