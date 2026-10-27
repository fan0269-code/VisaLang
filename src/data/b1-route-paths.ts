import { claimRegistry, validateClaimSet } from './claim-registry.ts';
import type { Claim, ClaimVersionRef } from './claim-registry.ts';

export interface B1RoutePath {
  id: string;
  title: string;
  provision: string;
  status: 'route-information' | 'unresolved';
  authority: string;
  language: string;
  knowledge: string;
  otherConditions: string;
  nextAction: string;
  checklistHref: string;
  guideHref: string;
  sources: { label: string; url: string }[];
  claimRefs?: ClaimVersionRef[];
}
interface B1RouteDefinition extends Omit<B1RoutePath, 'language' | 'knowledge' | 'otherConditions' | 'sources' | 'status'> {
  fieldClaims: Record<'language' | 'knowledge' | 'otherConditions', ClaimVersionRef>;
}
interface ResolveOptions { claims?: readonly Claim[]; asOf?: string }
const consumerId = 'hub:germany-b1-settlement-citizenship';
const definitions: B1RouteDefinition[] = [
  {
    "id": "settlement-general",
    "title": "General settlement permit",
    "provision": "§ 9(2) Residence Act",
    "authority": "Competent local foreigners authority (Ausländerbehörde)",
    "nextAction": "Ask the foreigners authority to confirm § 9 as your route and send its current language, knowledge and wider-file document instructions.",
    "checklistHref": "/guides/germany-b1-settlement-citizenship-checklist/#settlement-checklist",
    "guideHref": "/guides/goethe-b1-germany-settlement-work/",
    "fieldClaims": {
      "language": {
        "claimId": "germany-b1-settlement-general-language",
        "version": "2026-09-13.1"
      },
      "knowledge": {
        "claimId": "germany-b1-settlement-general-knowledge",
        "version": "2026-09-13.1"
      },
      "otherConditions": {
        "claimId": "germany-b1-settlement-general-wider-file",
        "version": "2026-09-13.1"
      }
    }
  },
  {
    "id": "settlement-skilled",
    "title": "Settlement permit for skilled workers",
    "provision": "§ 18c(1) Residence Act",
    "authority": "Competent local foreigners authority (Ausländerbehörde)",
    "nextAction": "Ask the foreigners authority whether § 18c(1) applies to your title and which work and contribution records it needs alongside language evidence.",
    "checklistHref": "/guides/germany-b1-settlement-citizenship-checklist/#skilled-settlement-checklist",
    "guideHref": "/guides/goethe-b1-germany-settlement-work/",
    "fieldClaims": {
      "language": {
        "claimId": "germany-b1-settlement-skilled-language",
        "version": "2026-09-13.1"
      },
      "knowledge": {
        "claimId": "germany-b1-settlement-skilled-knowledge",
        "version": "2026-09-13.1"
      },
      "otherConditions": {
        "claimId": "germany-b1-settlement-skilled-wider-file",
        "version": "2026-09-13.1"
      }
    }
  },
  {
    "id": "settlement-blue-card",
    "title": "Settlement permit for EU Blue Card holders",
    "provision": "§ 18c(2) Residence Act",
    "authority": "Competent local foreigners authority (Ausländerbehörde)",
    "nextAction": "Ask the foreigners authority which § 18c(2) language branch and employment evidence apply before planning an exam or application date.",
    "checklistHref": "/guides/germany-b1-settlement-citizenship-checklist/#blue-card-checklist",
    "guideHref": "/guides/goethe-b1-germany-settlement-work/",
    "fieldClaims": {
      "language": {
        "claimId": "germany-b1-settlement-blue-card-language",
        "version": "2026-09-13.1"
      },
      "knowledge": {
        "claimId": "germany-b1-settlement-blue-card-knowledge",
        "version": "2026-09-13.1"
      },
      "otherConditions": {
        "claimId": "germany-b1-settlement-blue-card-wider-file",
        "version": "2026-09-13.1"
      }
    }
  },
  {
    "id": "citizenship",
    "title": "General naturalisation",
    "provision": "§ 10 Nationality Act (StAG)",
    "authority": "Competent local nationality authority (Einbürgerungsbehörde)",
    "nextAction": "Ask the nationality authority to confirm your naturalisation route and its separate language, civic-knowledge and wider-file instructions.",
    "checklistHref": "/guides/germany-b1-settlement-citizenship-checklist/#citizenship-checklist",
    "guideHref": "/guides/germany-b1-citizenship-language-proof/",
    "fieldClaims": {
      "language": {
        "claimId": "germany-b1-citizenship-language",
        "version": "2026-09-13.1"
      },
      "knowledge": {
        "claimId": "germany-b1-citizenship-knowledge",
        "version": "2026-09-13.1"
      },
      "otherConditions": {
        "claimId": "germany-b1-citizenship-wider-file",
        "version": "2026-09-13.1"
      }
    }
  }
];

const unknownRoute: B1RoutePath = {
  "id": "unknown",
  "title": "Another route or route not confirmed",
  "provision": "Not classified here",
  "status": "unresolved",
  "authority": "Competent local foreigners or nationality authority, depending on the procedure",
  "language": "No language level or accepted proof is assigned to this branch.",
  "knowledge": "Ask whether knowledge evidence belongs to the exact procedure; leave it unresolved until confirmed.",
  "otherConditions": "Family, protection, other settlement and other nationality routes need their own statutory and local review. They are not evaluated by these cards.",
  "nextAction": "Find your local authority through your city or district official website. Send the procedure name and residence-title provision and ask which route and evidence checklist apply.",
  "checklistHref": "/guides/germany-b1-settlement-citizenship-checklist/#unknown-route-checklist",
  "guideHref": "/germany-b1-settlement-citizenship/#who-decides",
  "sources": []
};

export function resolveB1Route(routeId: unknown, options: ResolveOptions = {}): B1RoutePath {
  const definition = definitions.find((route) => route.id === routeId);
  if (!definition) return { ...unknownRoute };
  const { fieldClaims, ...result } = definition;
  const refs = Object.values(fieldClaims);
  const claims = options.claims ?? claimRegistry;
  if (!validateClaimSet(refs, { claims, asOf: options.asOf, consumerId, consumerLocale: 'en' }).valid) {
    return {
      ...unknownRoute,
      id: definition.id,
      title: definition.title,
      provision: definition.provision,
      authority: definition.authority,
      nextAction: 'The recorded route claims are missing, changed, withdrawn or overdue. Ask the competent authority for the current route and separate language, knowledge and wider-file instructions.',
    };
  }
  const claimFor = (ref: ClaimVersionRef) => claims.find((claim) => claim.claimId === ref.claimId && claim.version === ref.version)!;
  const sources = [...new Map(refs.flatMap((ref) => claimFor(ref).sourceRefs).map((source) => [source.url, { label: source.locator, url: source.url }])).values()];
  return {
    ...result,
    status: 'route-information',
    language: claimFor(fieldClaims.language).claimText,
    knowledge: claimFor(fieldClaims.knowledge).claimText,
    otherConditions: claimFor(fieldClaims.otherConditions).claimText,
    sources,
    claimRefs: refs,
  };
}

// Build-time readouts use the registry's current-date validation. Already-built
// static HTML must be rebuilt after review changes; there is no client calculator.
export const b1RoutePaths = [...definitions.map((route) => resolveB1Route(route.id)), { ...unknownRoute }];
