import fs from 'node:fs';
import path from 'node:path';

export type Fields = Record<string, string | string[]>;
export interface Item { type: string; fields: Fields }
export interface Section { name: string; fields: Fields; items: Item[] }

/**
 * Parses content/landing.md. Format: `## name` opens a section, `key: value` is a
 * single-line field, `key:` with no value owns the paragraphs that follow it,
 * `### name` opens a repeated item whose fields follow.
 */
export function parseLanding(): Record<string, Section> {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', 'landing.md'), 'utf8');
  const sections: Record<string, Section> = {};
  let section: Section | null = null;
  let target: Fields | null = null;
  let multiKey: string | null = null;
  let paras: string[] = [];
  let buf: string[] = [];

  const flushPara = () => {
    if (buf.length) { paras.push(buf.join(' ').trim()); buf = []; }
  };
  const endMulti = () => {
    if (multiKey && target) { flushPara(); target[multiKey] = paras; }
    multiKey = null; paras = []; buf = [];
  };

  for (const line of raw.split('\n')) {
    if (line.startsWith('## ')) {
      endMulti();
      const name = line.slice(3).trim();
      section = { name, fields: {}, items: [] };
      sections[name] = section;
      target = section.fields;
      continue;
    }
    if (!section) continue;
    if (line.startsWith('### ')) {
      endMulti();
      const item: Item = { type: line.slice(4).trim(), fields: {} };
      section.items.push(item);
      target = item.fields;
      continue;
    }
    const m = line.match(/^([a-z][a-z0-9_]*):\s*(.*)$/);
    if (m && target) {
      endMulti();
      if (m[2] === '') { multiKey = m[1]; paras = []; buf = []; }
      else target[m[1]] = m[2].trim();
      continue;
    }
    if (multiKey) {
      if (line.trim() === '') flushPara(); else buf.push(line.trim());
    }
  }
  endMulti();
  return sections;
}

export const str = (v: string | string[] | undefined): string => (Array.isArray(v) ? v.join(' ') : v ?? '');
export const list = (v: string | string[] | undefined): string[] => (Array.isArray(v) ? v : v ? [v] : []);

export interface Publication { title: string; summary: string; pdf: string; date: string }
export function loadPublications(): Publication[] {
  const p = path.join(process.cwd(), 'content', 'publications.json');
  if (!fs.existsSync(p)) return [];
  try { const j = JSON.parse(fs.readFileSync(p, 'utf8')); return Array.isArray(j) ? j : []; } catch { return []; }
}

export function llmInfoRaw(): string {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'llm-info.md'), 'utf8');
}
