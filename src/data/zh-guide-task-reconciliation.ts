export type ZhA1TaskPreservation = 'maintained-guide' | 'absorbed-task-module';

export interface ZhA1TaskReconciliationEntry {
  taskId: string;
  historicalPath: string;
  maintainedPath: string;
  preservation: ZhA1TaskPreservation;
  evidence: string;
  migrationState: 'not_assessed';
}

/**
 * T20 content-task reconciliation only. It proves where the eight audited reader
 * tasks are served in the current five-guide Chinese cluster. It is not a URL
 * migration decision and does not validate any pre-existing redirect.
 */
export const zhA1TaskReconciliation: readonly ZhA1TaskReconciliationEntry[] = [
  {
    taskId: 'zh-a1-requirement-and-exceptions',
    historicalPath: '/zh/guides/german-family-reunion-language-requirement/',
    maintainedPath: '/zh/guides/german-family-reunion-language-requirement/',
    preservation: 'maintained-guide',
    evidence: 'The maintained guide separates the China application scope, competent-mission decision, general rule, exception questions, and reader-side verification action.',
    migrationState: 'not_assessed',
  },
  {
    taskId: 'zh-a1-existing-certificate-verification',
    historicalPath: '/zh/guides/goethe-a1-germany-family-reunion/',
    maintainedPath: '/zh/guides/german-family-reunion-language-requirement/',
    preservation: 'absorbed-task-module',
    evidence: 'The maintained requirement guide includes the existing-certificate branch; Route Finder and Checklist retain product, document-form, recency, and receiving-authority checks as separate tasks.',
    migrationState: 'not_assessed',
  },
  {
    taskId: 'zh-a1-product-comparison',
    historicalPath: '/zh/guides/goethe-a1-vs-telc-a1/',
    maintainedPath: '/zh/guides/goethe-a1-vs-telc-a1/',
    preservation: 'maintained-guide',
    evidence: 'The maintained comparison guide and shared Comparison tool distinguish exam-owner facts from local execution and authority acceptance.',
    migrationState: 'not_assessed',
  },
  {
    taskId: 'zh-a1-authorised-centre-verification',
    historicalPath: '/zh/guides/goethe-a1-test-centers/',
    maintainedPath: '/zh/guides/goethe-a1-test-centers/',
    preservation: 'maintained-guide',
    evidence: 'The maintained centre guide preserves official-directory, authorisation, exact-product, and selected-centre verification steps.',
    migrationState: 'not_assessed',
  },
  {
    taskId: 'zh-a1-china-booking-recovery',
    historicalPath: '/zh/guides/goethe-a1-booking-mistakes/',
    maintainedPath: '/zh/guides/goethe-a1-test-centers/',
    preservation: 'absorbed-task-module',
    evidence: 'The maintained centre guide and Checklist preserve China-reader booking recovery for product mismatch, name/identity, payment, cancellation, and unavailable local terms.',
    migrationState: 'not_assessed',
  },
  {
    taskId: 'zh-a1-booking-to-certificate-timeline',
    historicalPath: '/zh/guides/german-a1-exam-booking-timeline/',
    maintainedPath: '/zh/guides/german-a1-exam-booking-timeline/',
    preservation: 'maintained-guide',
    evidence: 'The maintained timeline guide and calculator preserve user-entered buffers, explicit assumptions, near-date recovery, and authority/centre boundaries.',
    migrationState: 'not_assessed',
  },
  {
    taskId: 'zh-a1-three-material-sets',
    historicalPath: '/zh/guides/german-a1-documents-checklist/',
    maintainedPath: '/zh/guides/german-a1-exam-booking-timeline/',
    preservation: 'absorbed-task-module',
    evidence: 'The maintained timeline guide and Checklist keep registration evidence, test-day instructions, and receiving-authority submission materials as three separately owned sets.',
    migrationState: 'not_assessed',
  },
  {
    taskId: 'zh-a1-thirty-day-preparation',
    historicalPath: '/zh/guides/goethe-a1-30-day-study-plan/',
    maintainedPath: '/zh/guides/goethe-a1-30-day-study-plan/',
    preservation: 'maintained-guide',
    evidence: 'The maintained study guide retains audience limits, diagnostic work, daily tasks, official practice materials, and no pass guarantee.',
    migrationState: 'not_assessed',
  },
] as const;
