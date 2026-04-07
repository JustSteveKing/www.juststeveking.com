import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { reviewDataBySlug, getOverallScore } from '../src/content/reviews/data.ts';

const OUTPUT_DIR = join(process.cwd(), 'exports', 'reviews');

function sanitizeInline(text) {
  return text
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<code>(.*?)<\/code>/g, '`$1`')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeBlock(text) {
  return text
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<code>(.*?)<\/code>/g, '`$1`')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function toMarkdown(slug, review) {
  const overall = getOverallScore(review);
  const lines = [];

  lines.push(`# ${review.hero.titleAccent}: ${review.hero.title}`);
  lines.push('');
  lines.push(`- Badge: ${review.hero.badge}`);
  lines.push(`- Overall Score: ${overall}/100`);
  lines.push(`- Meta: ${review.hero.meta.join(' | ')}`);
  lines.push('');
  lines.push(review.hero.subtitle);
  lines.push('');
  lines.push('## Pillar Scores');
  lines.push('');

  for (const score of review.scores) {
    lines.push(`- ${score.label}: ${score.score}/100 (${score.verdict})`);
  }

  lines.push('');
  lines.push('## Full Review');
  lines.push('');

  for (const section of review.sections) {
    lines.push(`### ${section.number}. ${section.title}`);
    lines.push('');
    lines.push(`_${section.subtitle}_`);
    lines.push('');
    lines.push('#### Findings');
    lines.push('');

    for (const finding of section.findings) {
      lines.push(`- ${sanitizeBlock(finding)}`);
    }

    lines.push('');
    lines.push('#### Evidence');
    lines.push('');

    for (const evidence of section.evidence) {
      lines.push(`- **${evidence.kind.toUpperCase()}** - ${sanitizeInline(evidence.title)}`);
      for (const bodyLine of evidence.body) {
        lines.push(`  - ${sanitizeBlock(bodyLine)}`);
      }
      if (evidence.sourceUrl) {
        const sourceText = evidence.sourceLabel ?? evidence.sourceUrl;
        lines.push(`  - Source: [${sourceText}](${evidence.sourceUrl})`);
      }
    }

    lines.push('');
    lines.push('#### Score Breakdown');
    lines.push('');

    for (const item of section.breakdown) {
      lines.push(`- ${item.label}: ${item.value}/100 (${item.tone})`);
    }

    lines.push('');
    lines.push('#### Action Items');
    lines.push('');

    for (const action of section.recommendations) {
      lines.push(`- ${sanitizeInline(action)}`);
    }

    lines.push('');
  }

  lines.push('## Notes');
  lines.push('');
  lines.push(review.footerNote);
  lines.push('');
  lines.push(`_Generated from review slug: ${slug}_`);
  lines.push('');

  return lines.join('\n');
}

function run() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const indexLines = ['# Review Exports', ''];

  for (const [slug, review] of Object.entries(reviewDataBySlug)) {
    const fileName = `${slug}.md`;
    const filePath = join(OUTPUT_DIR, fileName);
    const markdown = toMarkdown(slug, review);
    writeFileSync(filePath, markdown, 'utf8');

    indexLines.push(`- [${review.hero.titleAccent}: ${review.hero.title}](./${fileName})`);
  }

  indexLines.push('');
  indexLines.push('_These files are generated from src/content/reviews/data.ts._');
  indexLines.push('');

  writeFileSync(join(OUTPUT_DIR, 'README.md'), indexLines.join('\n'), 'utf8');
  console.log(`Exported ${Object.keys(reviewDataBySlug).length} reviews to ${OUTPUT_DIR}`);
}

run();
