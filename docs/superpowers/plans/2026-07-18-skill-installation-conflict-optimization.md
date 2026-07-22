# Skill Installation Conflict Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce Claude Code Skill noise and perceived conflicts while preserving ECC, Superpowers, Graphify, Claude-mem, and other necessary plugins.

**Architecture:** Treat this as a reversible configuration hygiene change, not a destructive uninstall. First capture evidence and backups, then quarantine only clearly duplicated multi-platform user-level skill copies, then verify the available skill list and behavior in a fresh Claude Code session before any permanent deletion.

**Tech Stack:** Claude Code user configuration, `~/.claude/settings.json`, `~/.claude/skills`, Claude plugin marketplace cache, shell commands, Node.js inspection scripts.

---

## File and Directory Map

**Primary directories involved:**

- `~/.claude/settings.json`
  - User-level Claude Code settings.
  - Contains `enabledPlugins`, MCP settings, permissions, model/theme preferences.
  - Must be backed up before edits.

- `~/.claude.json`
  - Claude Code runtime/user state.
  - Contains historical usage and MCP server state.
  - Do not manually edit unless absolutely necessary.
  - Back up only for diagnostics.

- `~/.claude/skills/graphify/SKILL.md`
  - Keep.
  - Current scan found only one `graphify` skill.
  - No conflict detected.

- `~/.claude/skills/gstack/`
  - Main cleanup target.
  - Contains many repeated skills for non-Claude-Code platforms such as `.cursor`, `.kiro`, `.opencode`, `.factory`, `.gbrain`, `.agents`, `.hermes`, `.slate`.
  - Quarantine instead of deleting.

- `~/.claude/plugins/marketplaces/ecc/`
  - Keep.
  - Many duplicate-looking `SKILL.md` files exist under docs and platform folders, but ECC health is green and this is marketplace-owned.
  - Do not manually prune inside this directory.

- `~/.claude/plugins/cache/superpowers-marketplace/superpowers/5.1.0/`
  - Keep initially.
  - Superpowers is not duplicate-broken; it is behaviorally strong.
  - Disable only if the user later decides OMC should be the sole workflow controller.

- `~/.claude/skill-cleanup-backups/`
  - Create during execution if needed.
  - Stores timestamped backups and scan outputs.
  - Safe rollback source.

---

## Success Criteria

- `graphify` remains available and unique.
- ECC remains enabled and `ecc:skill-health` still reports healthy skills.
- `~/.claude/skills/gstack` multi-platform copies are quarantined, not deleted.
- A rollback command can restore the previous state.
- Available skill list after restart is shorter or less noisy.
- Short-name ambiguity is documented for daily use.
- No plugin marketplace-owned directory is manually modified.
- Any config inspection output is redacted before sharing.

---

## Risk Controls

1. **Do not delete first.** Use `mv` into a timestamped backup/quarantine path.
2. **Do not edit plugin marketplace internals.** Avoid touching `~/.claude/plugins/marketplaces/ecc` and plugin cache directories.
3. **Redact tokens.** Never print full `headers.Authorization`, API keys, or `env.*KEY` values.
4. **Restart to verify.** Skill registration is startup-dependent, so a fresh Claude Code session is required for final verification.
5. **One change per stage.** First quarantine `gstack`, then evaluate whether Superpowers should be disabled.

---

## Task 1: Capture Baseline and Backups

**Files:**
- Read/backup: `~/.claude/settings.json`
- Read/backup: `~/.claude.json`
- Create: `~/.claude/skill-cleanup-backups/<timestamp>/`
- Create: `~/.claude/skill-cleanup-backups/<timestamp>/baseline-skill-scan.json`

- [ ] **Step 1: Create a timestamped backup directory**

Run:

```bash
BACKUP_DIR="$HOME/.claude/skill-cleanup-backups/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
printf '%s\n' "$BACKUP_DIR" > "$HOME/.claude/skill-cleanup-backups/latest"
printf 'Backup directory: %s\n' "$BACKUP_DIR"
```

Expected output:

```text
Backup directory: /Users/fanlw/.claude/skill-cleanup-backups/<timestamp>
```

- [ ] **Step 2: Back up Claude settings and runtime state**

Run:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
cp "$HOME/.claude/settings.json" "$BACKUP_DIR/settings.json.bak"
cp "$HOME/.claude.json" "$BACKUP_DIR/claude.json.bak"
ls -l "$BACKUP_DIR/settings.json.bak" "$BACKUP_DIR/claude.json.bak"
```

Expected output:

```text
-rw-r--r-- ... settings.json.bak
-rw-r--r-- ... claude.json.bak
```

- [ ] **Step 3: Save a redacted settings snapshot**

Run:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
node - <<'NODE' > "$BACKUP_DIR/settings.redacted.json"
const fs = require('fs');
const os = require('os');
const path = require('path');
const file = path.join(os.homedir(), '.claude', 'settings.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => {
      if (/authorization|api[_-]?key|token|secret|password/i.test(key)) return [key, '[REDACTED]'];
      return [key, redact(child)];
    }));
  }
  if (typeof value === 'string' && /(Bearer\s+|sk-|jina_|mk-)/i.test(value)) return '[REDACTED]';
  return value;
}
process.stdout.write(JSON.stringify(redact(data), null, 2));
NODE
wc -c "$BACKUP_DIR/settings.redacted.json"
```

Expected output:

```text
<number> /Users/fanlw/.claude/skill-cleanup-backups/<timestamp>/settings.redacted.json
```

- [ ] **Step 4: Capture a baseline skill scan**

Run:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
node - <<'NODE' > "$BACKUP_DIR/baseline-skill-scan.json"
const fs = require('fs');
const path = require('path');
const os = require('os');
const home = os.homedir();
const roots = [
  path.join(home, '.claude', 'skills'),
  path.join(home, '.claude', 'plugins', 'marketplaces', 'ecc'),
  path.join(home, '.claude', 'plugins', 'cache', 'superpowers-marketplace')
];
function existsDir(p) { try { return fs.statSync(p).isDirectory(); } catch { return false; } }
function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    if (entry.isFile() && entry.name === 'SKILL.md') out.push(full);
  }
  return out;
}
function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  const result = {};
  if (!match) return result;
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (field) result[field[1]] = field[2].replace(/^['"]|['"]$/g, '').trim();
  }
  return result;
}
function rel(file) { return file.startsWith(home) ? '~' + file.slice(home.length) : file; }
const skills = roots.filter(existsDir).flatMap(root => walk(root)).map(file => {
  const frontmatter = parseFrontmatter(fs.readFileSync(file, 'utf8'));
  return {
    name: frontmatter.name || path.basename(path.dirname(file)),
    dir: path.basename(path.dirname(file)),
    file: rel(file)
  };
});
const byName = new Map();
for (const skill of skills) {
  if (!byName.has(skill.name)) byName.set(skill.name, []);
  byName.get(skill.name).push(skill.file);
}
const duplicates = [...byName.entries()]
  .filter(([, files]) => files.length > 1)
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
process.stdout.write(JSON.stringify({
  totalSkillFiles: skills.length,
  duplicateNameCount: duplicates.length,
  graphify: skills.filter(skill => skill.name === 'graphify'),
  gstackCount: skills.filter(skill => skill.file.includes('/.claude/skills/gstack/')).length,
  superpowersCount: skills.filter(skill => skill.file.includes('/superpowers-marketplace/')).length,
  topDuplicates: duplicates.slice(0, 30).map(([name, files]) => ({ name, count: files.length, files: files.slice(0, 12) }))
}, null, 2));
NODE
node -e "const d=require(process.argv[1]); console.log(JSON.stringify({totalSkillFiles:d.totalSkillFiles, duplicateNameCount:d.duplicateNameCount, gstackCount:d.gstackCount, graphifyCount:d.graphify.length}, null, 2))" "$BACKUP_DIR/baseline-skill-scan.json"
```

Expected output:

```json
{
  "totalSkillFiles": <number>,
  "duplicateNameCount": <number>,
  "gstackCount": <number>,
  "graphifyCount": 1
}
```

---

## Task 2: Quarantine the Gstack Multi-Platform User Skill Tree

**Files:**
- Move: `~/.claude/skills/gstack/`
- Create: `~/.claude/skill-cleanup-backups/<timestamp>/quarantine/gstack/`

- [ ] **Step 1: Confirm the exact directory that will be moved**

Run:

```bash
if [ -d "$HOME/.claude/skills/gstack" ]; then
  find "$HOME/.claude/skills/gstack" -name SKILL.md | wc -l
  find "$HOME/.claude/skills/gstack" -maxdepth 2 -type d | sort | head -40
else
  printf 'No gstack directory found; nothing to quarantine.\n'
fi
```

Expected output if present:

```text
<number>
/Users/fanlw/.claude/skills/gstack
/Users/fanlw/.claude/skills/gstack/.agents
/Users/fanlw/.claude/skills/gstack/.cursor
...
```

- [ ] **Step 2: Move gstack into quarantine**

Run:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
mkdir -p "$BACKUP_DIR/quarantine"
if [ -d "$HOME/.claude/skills/gstack" ]; then
  mv "$HOME/.claude/skills/gstack" "$BACKUP_DIR/quarantine/gstack"
  printf 'Moved gstack to %s\n' "$BACKUP_DIR/quarantine/gstack"
else
  printf 'No gstack directory found; skipped.\n'
fi
```

Expected output:

```text
Moved gstack to /Users/fanlw/.claude/skill-cleanup-backups/<timestamp>/quarantine/gstack
```

or:

```text
No gstack directory found; skipped.
```

- [ ] **Step 3: Verify graphify still exists**

Run:

```bash
test -f "$HOME/.claude/skills/graphify/SKILL.md" && printf 'graphify present\n'
```

Expected output:

```text
graphify present
```

- [ ] **Step 4: Capture post-quarantine scan**

Run:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
node - <<'NODE' > "$BACKUP_DIR/post-gstack-quarantine-skill-scan.json"
const fs = require('fs');
const path = require('path');
const os = require('os');
const home = os.homedir();
const roots = [
  path.join(home, '.claude', 'skills'),
  path.join(home, '.claude', 'plugins', 'marketplaces', 'ecc'),
  path.join(home, '.claude', 'plugins', 'cache', 'superpowers-marketplace')
];
function existsDir(p) { try { return fs.statSync(p).isDirectory(); } catch { return false; } }
function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    if (entry.isFile() && entry.name === 'SKILL.md') out.push(full);
  }
  return out;
}
function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  const result = {};
  if (!match) return result;
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (field) result[field[1]] = field[2].replace(/^['"]|['"]$/g, '').trim();
  }
  return result;
}
function rel(file) { return file.startsWith(home) ? '~' + file.slice(home.length) : file; }
const skills = roots.filter(existsDir).flatMap(root => walk(root)).map(file => {
  const frontmatter = parseFrontmatter(fs.readFileSync(file, 'utf8'));
  return {
    name: frontmatter.name || path.basename(path.dirname(file)),
    dir: path.basename(path.dirname(file)),
    file: rel(file)
  };
});
const byName = new Map();
for (const skill of skills) {
  if (!byName.has(skill.name)) byName.set(skill.name, []);
  byName.get(skill.name).push(skill.file);
}
const duplicates = [...byName.entries()].filter(([, files]) => files.length > 1);
process.stdout.write(JSON.stringify({
  totalSkillFiles: skills.length,
  duplicateNameCount: duplicates.length,
  graphify: skills.filter(skill => skill.name === 'graphify'),
  gstackCount: skills.filter(skill => skill.file.includes('/.claude/skills/gstack/')).length,
  reviewLikeNames: skills.filter(skill => /(^review$|code-review|security-review)/.test(skill.name)).map(skill => skill.name).sort()
}, null, 2));
NODE
node -e "const d=require(process.argv[1]); console.log(JSON.stringify({totalSkillFiles:d.totalSkillFiles, duplicateNameCount:d.duplicateNameCount, gstackCount:d.gstackCount, graphifyCount:d.graphify.length}, null, 2))" "$BACKUP_DIR/post-gstack-quarantine-skill-scan.json"
```

Expected output:

```json
{
  "totalSkillFiles": <lower-number-than-baseline>,
  "duplicateNameCount": <number>,
  "gstackCount": 0,
  "graphifyCount": 1
}
```

- [ ] **Step 5: Rollback command if anything looks wrong**

Run only if rollback is needed:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
if [ -d "$BACKUP_DIR/quarantine/gstack" ] && [ ! -e "$HOME/.claude/skills/gstack" ]; then
  mv "$BACKUP_DIR/quarantine/gstack" "$HOME/.claude/skills/gstack"
  printf 'Restored gstack to ~/.claude/skills/gstack\n'
else
  printf 'Rollback skipped: source missing or destination already exists.\n'
fi
```

Expected output:

```text
Restored gstack to ~/.claude/skills/gstack
```

---

## Task 3: Verify Skill Behavior in a Fresh Claude Code Session

**Files:**
- No file edits.
- Read: current session startup skill list.

- [ ] **Step 1: Restart Claude Code**

Close the current Claude Code session and start a new one in the same project directory:

```bash
cd "/Users/fanlw/Documents/搬迁测试/VisaLang"
claude
```

Expected behavior:

- Startup context should still show `graphify`.
- Startup context should still show ECC skills.
- Gstack repeated skills should be reduced or absent.

- [ ] **Step 2: Test graphify is still callable**

In the new Claude Code session, run:

```text
/graphify
```

Expected behavior:

- Claude Code invokes the installed `graphify` skill.
- It does not report missing skill.

- [ ] **Step 3: Test ECC health is still callable**

In the new Claude Code session, run:

```text
/ecc:skill-health
```

Expected behavior:

- ECC skill-health loads.
- It can still run its dashboard command.

- [ ] **Step 4: Check available skills list qualitatively**

In the new Claude Code session, inspect the available skills section in startup context or use the UI/help command if available.

Expected result:

```text
The list should still include namespaced ECC and Superpowers skills.
The list should have less gstack duplicate noise.
```

---

## Task 4: Adopt a Daily Skill Naming Policy

**Files:**
- Optional Create: `~/.claude/skill-cleanup-backups/<timestamp>/recommended-skill-policy.md`
- Optional Modify later: user global instruction file if the user explicitly asks to persist this policy.

- [ ] **Step 1: Write the policy note into the backup directory**

Run:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
cat > "$BACKUP_DIR/recommended-skill-policy.md" <<'EOF'
# Recommended Skill Invocation Policy

Use explicit namespaced skills when a short name has multiple possible meanings.

Prefer:

- `/ecc:code-review` for code review under ECC.
- `/ecc:security-scan` for security scanning under ECC.
- `/ecc:plan` for ECC planning workflows.
- `/superpowers:writing-plans` for formal task-by-task implementation plans.
- `/superpowers:test-driven-development` for strict TDD workflow.
- `/graphify` for graphify.
- `/claude-mem:mem-search` or `/claude-mem:learn-codebase` for memory-specific workflows.

Avoid unless intentionally targeting the unprefixed skill:

- `/review`
- `/plan`
- `/tdd`
- `/run`
- `/verify`
- `/learn`

Rationale:

- Short names are convenient but ambiguous when ECC, Superpowers, PM skills, Claude-mem, and user-level skills are all installed.
- Namespaced skills make intent auditable and reduce accidental workflow switching.
EOF
printf 'Wrote %s\n' "$BACKUP_DIR/recommended-skill-policy.md"
```

Expected output:

```text
Wrote /Users/fanlw/.claude/skill-cleanup-backups/<timestamp>/recommended-skill-policy.md
```

- [ ] **Step 2: Do not persist this policy globally without explicit approval**

No command should be run in this step.

Expected result:

```text
Policy exists as a reference only. Global CLAUDE.md remains unchanged.
```

---

## Task 5: Decide Whether to Keep or Disable Superpowers Workflow Control

**Files:**
- Potential Modify: `~/.claude/settings.json`
- Backup already exists: `~/.claude/skill-cleanup-backups/<timestamp>/settings.json.bak`

This task is optional. Run it only if the user still feels that Superpowers is too aggressive after the `gstack` quarantine and restart.

- [ ] **Step 1: Inspect current Superpowers plugin flags without printing secrets**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const os = require('os');
const path = require('path');
const settings = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.claude', 'settings.json'), 'utf8'));
const enabledPlugins = settings.enabledPlugins || {};
const superpowers = Object.fromEntries(Object.entries(enabledPlugins).filter(([key]) => key.includes('superpowers')));
console.log(JSON.stringify(superpowers, null, 2));
NODE
```

Expected output:

```json
{
  "superpowers-developing-for-claude-code@superpowers-marketplace": true,
  "superpowers@superpowers-marketplace": true
}
```

- [ ] **Step 2: If approved, disable only the development helper first**

Run only after explicit user approval:

```bash
node - <<'NODE'
const fs = require('fs');
const os = require('os');
const path = require('path');
const file = path.join(os.homedir(), '.claude', 'settings.json');
const settings = JSON.parse(fs.readFileSync(file, 'utf8'));
const enabledPlugins = settings.enabledPlugins || {};
const nextSettings = {
  ...settings,
  enabledPlugins: {
    ...enabledPlugins,
    'superpowers-developing-for-claude-code@superpowers-marketplace': false
  }
};
fs.writeFileSync(file, JSON.stringify(nextSettings, null, 2) + '\n');
console.log('Disabled superpowers-developing-for-claude-code only.');
NODE
```

Expected output:

```text
Disabled superpowers-developing-for-claude-code only.
```

- [ ] **Step 3: Restart Claude Code and observe whether behavior improves**

Run:

```bash
cd "/Users/fanlw/Documents/搬迁测试/VisaLang"
claude
```

Expected result:

```text
Core Superpowers remains available.
Development-helper example skills are no longer present.
```

- [ ] **Step 4: If still too aggressive and explicitly approved, disable core Superpowers**

Run only after explicit user approval:

```bash
node - <<'NODE'
const fs = require('fs');
const os = require('os');
const path = require('path');
const file = path.join(os.homedir(), '.claude', 'settings.json');
const settings = JSON.parse(fs.readFileSync(file, 'utf8'));
const enabledPlugins = settings.enabledPlugins || {};
const nextSettings = {
  ...settings,
  enabledPlugins: {
    ...enabledPlugins,
    'superpowers@superpowers-marketplace': false
  }
};
fs.writeFileSync(file, JSON.stringify(nextSettings, null, 2) + '\n');
console.log('Disabled core Superpowers.');
NODE
```

Expected output:

```text
Disabled core Superpowers.
```

- [ ] **Step 5: Roll back Superpowers plugin flags if needed**

Run only if rollback is needed:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
cp "$BACKUP_DIR/settings.json.bak" "$HOME/.claude/settings.json"
printf 'Restored ~/.claude/settings.json from backup. Restart Claude Code to apply.\n'
```

Expected output:

```text
Restored ~/.claude/settings.json from backup. Restart Claude Code to apply.
```

---

## Task 6: Final Verification and Decision Log

**Files:**
- Create: `~/.claude/skill-cleanup-backups/<timestamp>/decision-log.md`

- [ ] **Step 1: Run ECC health check again**

Run inside Claude Code via the skill:

```text
/ecc:skill-health --json
```

Expected result:

```text
healthy_skills remains equal to total_skills or no declining skills are reported.
```

- [ ] **Step 2: Write the decision log**

Run:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
cat > "$BACKUP_DIR/decision-log.md" <<'EOF'
# Claude Code Skill Cleanup Decision Log

## Kept

- `~/.claude/skills/graphify/SKILL.md` because it is unique and explicitly used by `/graphify`.
- `ecc@ecc` because `ecc:skill-health` reported healthy skills and no declining skills.
- `claude-mem@thedotmack` because it provides project memory and was not part of the conflict.
- `understand-anything@understand-anything` because it is namespaced and not part of the duplicate user-level gstack tree.

## Quarantined

- `~/.claude/skills/gstack/` moved into the timestamped backup quarantine because it contained many multi-platform duplicate skill copies.

## Not manually modified

- `~/.claude/plugins/marketplaces/ecc/`
- `~/.claude/plugins/cache/`

## Optional follow-up

- If workflow behavior remains too aggressive, consider disabling `superpowers-developing-for-claude-code@superpowers-marketplace` first.
- Disable `superpowers@superpowers-marketplace` only if the user wants OMC to be the sole workflow controller.

## Rollback

- Restore gstack by moving `<backup>/quarantine/gstack` back to `~/.claude/skills/gstack`.
- Restore settings by copying `<backup>/settings.json.bak` to `~/.claude/settings.json`.
EOF
printf 'Wrote %s\n' "$BACKUP_DIR/decision-log.md"
```

Expected output:

```text
Wrote /Users/fanlw/.claude/skill-cleanup-backups/<timestamp>/decision-log.md
```

- [ ] **Step 3: Final rollback commands for reference**

Do not run unless needed:

```bash
BACKUP_DIR="$(cat "$HOME/.claude/skill-cleanup-backups/latest")"
if [ -d "$BACKUP_DIR/quarantine/gstack" ] && [ ! -e "$HOME/.claude/skills/gstack" ]; then
  mv "$BACKUP_DIR/quarantine/gstack" "$HOME/.claude/skills/gstack"
fi
cp "$BACKUP_DIR/settings.json.bak" "$HOME/.claude/settings.json"
printf 'Rollback complete. Restart Claude Code.\n'
```

Expected output:

```text
Rollback complete. Restart Claude Code.
```

---

## Recommended Execution Order

1. Run Task 1 to create backups and baseline scan.
2. Run Task 2 to quarantine only `~/.claude/skills/gstack`.
3. Restart Claude Code.
4. Run Task 3 to verify `graphify` and ECC still work.
5. Adopt Task 4 as a usage convention.
6. Only if still noisy, run Task 5 with explicit approval.
7. Run Task 6 to record final state and rollback instructions.

---

## Self-Review

**Spec coverage:**

- Handles `~/.claude/skills/gstack` multi-platform duplicate pollution: Task 2.
- Preserves `graphify`: Task 2 Step 3 and Task 3 Step 2.
- Preserves ECC: Task 3 Step 3 and Task 6 Step 1.
- Addresses short-name conflicts: Task 4.
- Addresses Superpowers versus OMC workflow overlap: Task 5.
- Uses backup and rollback: Tasks 1, 2, 5, and 6.
- Uses phased verification: Tasks 3 and 6.
- Avoids destructive plugin-cache edits: Risk Controls and Task 6.
- Avoids token leakage in future outputs: Risk Controls and Task 1 Step 3.

**Placeholder scan:**

- No `TBD`, `TODO`, `implement later`, or unspecified test steps remain.
- Optional steps are clearly gated by explicit user approval.

**Type and command consistency:**

- `BACKUP_DIR` is consistently loaded from `~/.claude/skill-cleanup-backups/latest` after creation.
- Rollback paths match quarantine paths.
- `graphify` path remains `~/.claude/skills/graphify/SKILL.md`.
