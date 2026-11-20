/** Check the built artifacts visitors, crawlers and social previews receive. */
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { sortedProjects } from '../src/data/projects.ts';
import { blogPosts } from '../src/data/blog.ts';
const root = new URL('../dist/', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const paths = ['', 'projects', 'skills', 'services', 'contact', 'blog', 'playground', 'admin', 'contact/success', '404', ...blogPosts.map(p => `blog/${p.slug}`)];
const seenTitles = new Set();
for (const path of paths) {
  const html = await read(path ? `${path}/index.html` : 'index.html');
  assert.equal([...html.matchAll(/<title>/g)].length, 1, `${path}: one title`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(!seenTitles.has(title), `${path}: unique title`); seenTitles.add(title);
  assert.equal([...html.matchAll(/name="description"/g)].length, 1, `${path}: one description`);
  assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1, `${path}: one canonical`);
  assert(html.includes(`href="https://chainlit-shine-site.lovable.app/${path}"`), `${path}: route canonical`);
  assert(html.includes('<h1>'), `${path}: readable content without JS`);
  assert(html.includes('social-card.png'), `${path}: social image`);
  const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
  assert(policy, `${path}: production CSP`);
  assert(!policy.match(/script-src[^;]*unsafe-inline/), `${path}: no unrestricted inline script`);
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    JSON.parse(match[1]);
    assert(policy.includes(`'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`), `${path}: JSON-LD CSP hash`);
  }
  if (['admin', 'contact/success', '404'].includes(path)) assert(html.includes('content="noindex, nofollow"'), `${path}: private/utility robots`);
  for (const [, src] of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) await stat(new URL(src.slice(1), root));
}
const sitemap = await read('sitemap.xml');
assert(!sitemap.includes('/admin') && !sitemap.includes('/contact/success'), 'sitemap excludes utility routes');
for (const post of blogPosts) assert(sitemap.includes(`/blog/${post.slug}`), 'all articles discoverable');
assert.equal(new Set(sortedProjects.map(p => p.slug)).size, sortedProjects.length, 'unique projects');
const previews = JSON.parse(await readFile(new URL('../src/data/project-previews.json', import.meta.url), 'utf8'));
for (const [slug, preview] of Object.entries(previews)) {
  assert(sortedProjects.some(p => p.slug === slug), `${slug}: known project`);
  if (preview.src) {
    assert(preview.src.startsWith('/projects/') && !preview.src.includes('..'), `${slug}: local preview`);
    assert((await stat(new URL(preview.src.slice(1), root))).size > 1000, `${slug}: nonempty preview`);
    assert(['website', 'repository'].includes(preview.kind), `${slug}: labeled preview`);
  }
}
await stat(new URL('social-card.png', root));
await stat(new URL('downloads/hafiz-wildan-siddiqui-resume.pdf', root));
console.log(`Build checks passed: ${paths.length} routes, ${sortedProjects.length} projects, ${Object.values(previews).filter(p => p.src).length} local previews.`);
