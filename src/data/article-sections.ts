import { createMarkdownProcessor } from '@astrojs/markdown-remark';

export interface ArticleSections {
  who: string;
  detailed: string;
  detailedHeadings: { text: string; slug: string; depth?: number }[];
  commonMistakes: string;
  nextAction: string;
  officialSources: string;
}

type SectionKind = 'who' | 'detailed' | 'commonMistakes' | 'nextAction' | 'officialSources';
const processorPromise = createMarkdownProcessor({ syntaxHighlight: false });

function classifyHeading(heading: string): SectionKind {
  const value = heading.trim().toLowerCase();
  if (/^who\b|who this|who needs|who should/.test(value)) return 'who';
  if (/common (mistakes|ways)|mistakes|lose money/.test(value)) return 'commonMistakes';
  if (/next action|next step|what to do next|decision tools and next steps/.test(value)) return 'nextAction';
  if (/^official sources?$|^official links?( and practice resources)?$/.test(value)) return 'officialSources';
  return 'detailed';
}

export async function buildArticleSections(markdown: string, fileURL?: URL): Promise<ArticleSections> {
  const groups: Record<SectionKind, string[]> = { who: [], detailed: [], commonMistakes: [], nextAction: [], officialSources: [] };
  const lines = markdown.split(/\r?\n/);
  let currentHeading = '';
  let currentBody: string[] = [];

  const flush = () => {
    const body = currentBody.join('\n').trim();
    if (!currentHeading) {
      if (body) groups.detailed.push(body);
    } else {
      const kind = classifyHeading(currentHeading);
      groups[kind].push(kind === 'detailed' ? `## ${currentHeading}\n\n${body}` : body);
    }
    currentBody = [];
  };

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      flush();
      currentHeading = match[1].trim();
    } else {
      currentBody.push(line);
    }
  }
  flush();

  const processor = await processorPromise;
  const renderGroup = async (kind: SectionKind) => {
    const content = groups[kind].filter(Boolean).join('\n\n');
    if (!content) return { code: '', metadata: { headings: [] as { text: string; slug: string; depth?: number }[] } };
    return processor.render(content, { fileURL });
  };
  const [who, detailed, commonMistakes, nextAction, officialSources] = await Promise.all([
    renderGroup('who'), renderGroup('detailed'), renderGroup('commonMistakes'), renderGroup('nextAction'), renderGroup('officialSources'),
  ]);

  return {
    who: who.code,
    detailed: detailed.code,
    detailedHeadings: detailed.metadata.headings,
    commonMistakes: commonMistakes.code,
    nextAction: nextAction.code,
    officialSources: officialSources.code,
  };
}
