export type PurposeSuggestionMode = 'off' | 'laya' | 'typesafe';
export type AdvertisingMode = 'off' | 'on';

export interface RuntimeFeatures {
  schemaVersion: 1;
  purposeSuggestions: PurposeSuggestionMode;
  advertising: AdvertisingMode;
}

const purposeModes = new Set<PurposeSuggestionMode>(['off', 'laya', 'typesafe']);
const advertisingModes = new Set<AdvertisingMode>(['off', 'on']);

export function resolveRuntimeFeatures(env: Record<string, string | undefined> = {}): RuntimeFeatures {
  const purposeSuggestions = env.VISALANG_PURPOSE_MODE ?? 'off';
  const advertising = env.VISALANG_ADS_MODE ?? 'off';
  if (!purposeModes.has(purposeSuggestions as PurposeSuggestionMode)
    || !advertisingModes.has(advertising as AdvertisingMode)) {
    throw new Error('Unsupported runtime feature mode');
  }
  return {
    schemaVersion: 1,
    purposeSuggestions: purposeSuggestions as PurposeSuggestionMode,
    advertising: advertising as AdvertisingMode,
  };
}

declare const __VISALANG_RUNTIME_FEATURES__: RuntimeFeatures | undefined;

const runtimeEnvironment = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env ?? {};

export const runtimeFeatures: RuntimeFeatures = typeof __VISALANG_RUNTIME_FEATURES__ === 'undefined'
  ? resolveRuntimeFeatures(runtimeEnvironment)
  : __VISALANG_RUNTIME_FEATURES__;

export const purposeSuggestionsEnabled = runtimeFeatures.purposeSuggestions !== 'off';
export const advertisingEnabled = runtimeFeatures.advertising === 'on';
