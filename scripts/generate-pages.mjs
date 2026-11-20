/** Build route-specific crawlable HTML. React enhances the same URLs after load. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { sortedProjects } from '../src/data/projects.ts';
import { blogPosts } from '../src/data/blog.ts';

const origin = 'https://chainlit-shine-site.lovable.app';
const image = `${origin}/social-card.png`;
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
const link = (url, title) => `<a href="${escape(url)}">${escape(title)}</a>`;
const person = { '@type': 'Person', '@id': `${origin}/#person`, name: 'Hafiz Wildan Ahmed Siddiqui', alternateName: 'Hafiz Wildan Siddiqui', url: `${origin}/`, jobTitle: 'Agentic AI Engineer & Full-Stack Python Developer', address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' }, sameAs: ['https://github.com/hafizsiddiqui1211', 'https://www.linkedin.com/in/hafiz-siddiqui-018587295/'] };
const routes = [
  { path: '/', title: 'Hafiz Wildan Siddiqui | Agentic AI Engineer & Full-Stack Python Developer', description: 'Agentic AI engineer and Python developer in Karachi building useful automation, AI agents and full-stack applications.', body: '<p>I build AI agents, useful automation and thoughtful interfaces. Based in Karachi, Pakistan; open to AI roles, internships and freelance projects.</p><h2>Recent work</h2>' + sortedProjects.slice(0, 5).map(p => `<article><h3>${escape(p.title)}</h3><p>${escape(p.summary)}</p></article>`).join(''), schema: { '@context': 'https://schema.org', '@graph': [person, { '@type': 'WebSite', url: `${origin}/`, name: 'Hafiz Wildan Siddiqui', publisher: { '@id': person['@id'] } }] } },
  { path: '/projects', title: 'Projects — AI Agents, Automation & Full-Stack Apps', description: 'Browse AI agents, Python automation, websites and mobile projects by Hafiz Wildan Siddiqui, with recent public updates first.', body: sortedProjects.map(p => `<article><h2>${escape(p.title)}</h2><p>${escape(p.summary)}</p><p>${escape(p.status)} · ${escape(p.date)} · ${escape(p.tags.join(', '))}</p><p>${p.demo ? link(p.demo, 'Visit demo') : ''} ${p.repo ? link(p.repo, 'Source code') : ''}</p></article>`).join(''), schema: { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Projects by Hafiz Wildan Siddiqui', itemListElement: sortedProjects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, ...(p.demo || p.repo ? { url: p.demo || p.repo } : {}) })) } },
  { path: '/skills', title: 'Skills — Agentic AI, Python & Full-Stack Development', description: 'Explore Hafiz Wildan Siddiqui’s practical skills in AI agents, Python automation, React, Next.js, Flutter and modern development tools.', body: '<h2>Agentic AI & automation</h2><p>OpenAI Agents SDK, Chainlit, prompt and context engineering, Claude Code and Python.</p><h2>Full-stack development</h2><p>FastAPI, Streamlit, React, Next.js, TypeScript, Tailwind CSS, Motion and Supabase.</p><h2>Mobile & data</h2><p>Flutter, Firebase, PostgreSQL, SQLite, Pandas and Excel reporting.</p>' },
  { path: '/services', title: 'Services — AI Agents, Automation & Web Development', description: 'AI assistants, workflow automation and full-stack development services from Hafiz Wildan Siddiqui in Karachi.', body: '<h2>AI agents & assistants</h2><p>Tool-calling assistants, conversational experiences and grounded workflows.</p><h2>Python automation</h2><p>Data processing, reporting and practical internal tools.</p><h2>Web applications</h2><p>Responsive websites, dashboards and full-stack applications.</p>' },
  { path: '/contact', title: 'Contact — Let’s Build Something Useful', description: 'Contact Hafiz Wildan Siddiqui for AI engineering roles, internships, freelance development and project collaborations.', body: '<p>Tell me about your project, timeline and goals.</p><p>' + link('mailto:wildansiddiqui8@gmail.com', 'wildansiddiqui8@gmail.com') + '</p><p>Karachi, Pakistan · Remote collaborations welcome.</p>' },
  { path: '/blog', title: 'Articles & Notes — AI, Python & Automation', description: 'Notes by Hafiz Wildan Siddiqui on agentic workflows, prompt engineering and shipping useful Python applications.', body: blogPosts.map(p => `<article><h2>${link(`/blog/${p.slug}`, p.title)}</h2><p>${escape(p.excerpt)}</p><time datetime="${p.date}">${p.date}</time></article>`).join('') },
  { path: '/playground', title: 'Prompt Playground — Explore AI Instructions', description: 'Explore prompt optimization, code review and agent planning examples in Hafiz Wildan Siddiqui’s interactive prompt playground.', body: '<p>Explore three prompt examples: Prompt Optimizer, Code Reviewer and Agent Planner. Enable JavaScript to edit prompts and use live responses when configured.</p>' },
  ...blogPosts.map(p => ({ path: `/blog/${p.slug}`, title: p.title, description: p.excerpt, type: 'article', published: p.date, body: `<time datetime="${p.date}">${p.date}</time>` + p.body.map(paragraph => `<p>${escape(paragraph)}</p>`).join(''), schema: { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.excerpt, datePublished: p.date, dateModified: p.date, mainEntityOfPage: `${origin}/blog/${p.slug}`, image, author: person } })),
  { path: '/admin', title: 'Private Inbox', description: 'Private portfolio administration.', noindex: true, body: '<p>This page requires authorization and JavaScript.</p>' },
  { path: '/contact/success', title: 'Message Received', description: 'Your portfolio contact request was received.', noindex: true, body: '<p>Thank you for reaching out.</p>' },
  { path: '/404', title: '404 — Page Not Found', description: 'The requested page could not be found.', noindex: true, body: '<p>Explore the portfolio using the navigation below.</p>' },
];
const nav = '<nav aria-label="Portfolio">' + [['/', 'Home'], ['/projects', 'Projects'], ['/skills', 'Skills'], ['/services', 'Services'], ['/blog', 'Writing'], ['/contact', 'Contact']].map(([url, label]) => link(url, label)).join(' · ') + '</nav>';
for (const route of routes) {
  const title = route.title.includes('Hafiz') ? route.title : `${route.title} | Hafiz Wildan Siddiqui`;
  const url = `${origin}${route.path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*(?:name="(?:description|robots|twitter:[^"]+)"|property="(?:og:[^"]+|article:[^"]+)")[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');
  const meta = [
    `<title>${escape(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escape(route.description)}">`,
    `<meta data-rh="true" name="robots" content="${route.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">`,
    `<link data-rh="true" rel="canonical" href="${url}">`,
    ...Object.entries({ type: route.type || 'website', site_name: 'Hafiz Wildan Siddiqui', title, description: route.description, url, image, 'image:width': '1200', 'image:height': '630', 'image:alt': 'Hafiz Wildan Siddiqui — AI agents, automation and thoughtful interfaces' }).map(([key, value]) => `<meta data-rh="true" property="og:${key}" content="${escape(value)}">`),
    ...Object.entries({ card: 'summary_large_image', title, description: route.description, image }).map(([key, value]) => `<meta data-rh="true" name="twitter:${key}" content="${escape(value)}">`),
    ...(route.published ? [`<meta data-rh="true" property="article:published_time" content="${route.published}">`] : []),
    ...(route.schema ? [`<script data-rh="true" type="application/ld+json">${json(route.schema)}</script>`] : []),
  ].join('\n');
  html = html.replace('</head>', `${meta}\n</head>`).replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root"><main class="static-fallback"><p>HAFIZ.DEV / PORTFOLIO</p><h1>${escape(route.title.split(' | ')[0])}</h1>${route.body}${nav}<noscript><p>JavaScript adds filtering, animations and interactive forms. All project links above work without it.</p></noscript></main></div>`);
  const hashes = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => `'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`);
  html = html.replace(/script-src [^;"<]+/, `script-src 'self' ${hashes.join(' ')}`.trim());
  const directory = new URL(`../dist${route.path === '/' ? '' : route.path}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
  if (route.path === '/404') await writeFile(new URL('../dist/404.html', import.meta.url), html);
}
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.filter(p => !p.noindex).map(p => `  <url><loc>${origin}${p.path}</loc>${p.published ? `<lastmod>${p.published}</lastmod>` : ''}</url>`).join('\n') + '\n</urlset>\n';
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap);
console.log(`Generated ${routes.length} crawlable routes, social metadata and sitemap.`);
