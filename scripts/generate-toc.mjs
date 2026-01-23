#!/usr/bin/env node

/**
 * Auto-generate TOC items from Section components in an Astro file
 * Usage: node scripts/generate-toc.mjs src/pages/reports/your-report.astro
 */

import { readFileSync } from 'fs';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node scripts/generate-toc.mjs <path-to-astro-file>');
  process.exit(1);
}

try {
  const content = readFileSync(filePath, 'utf-8');
  
  // Regex to match <Section id="..." title="...">
  const sectionRegex = /<Section\s+id="([^"]+)"\s+title="([^"]+)"/g;
  
  const tocItems = [];
  let match;
  
  while ((match = sectionRegex.exec(content)) !== null) {
    const [, id, title] = match;
    tocItems.push({ id, title });
  }
  
  if (tocItems.length === 0) {
    console.log('No Section components found in the file.');
    process.exit(0);
  }
  
  // Generate the tocItems array code
  console.log('const tocItems = [');
  tocItems.forEach((item, index) => {
    const comma = index < tocItems.length - 1 ? ',' : '';
    console.log(`  { id: "${item.id}", title: "${item.title}" }${comma}`);
  });
  console.log('];');
  
} catch (error) {
  console.error('Error reading file:', error.message);
  process.exit(1);
}
