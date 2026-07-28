import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Generates dist/sitemap.xml from the routes Astro actually built.
 *
 * The sitemap used to be a hand-maintained file in public/, which drifted:
 * pages shipped without ever being added to it, so Google never discovered
 * them. Generating it from the build output makes drift impossible.
 *
 * We deliberately keep the filename `sitemap.xml` (rather than switching to
 * @astrojs/sitemap, which emits sitemap-index.xml) because that exact URL is
 * already submitted in Google Search Console.
 *
 * `changefreq` and `priority` are omitted on purpose — Google ignores both.
 * `lastmod` comes from the source file's last commit date, so it is accurate;
 * if git history isn't available the field is simply left off, since a wrong
 * lastmod is worse than none.
 */
export default function sitemap({ site }) {
  return {
    name: 'privacycomply-sitemap',
    hooks: {
      'astro:build:done': ({ dir, routes, logger }) => {
        const origin = site.replace(/\/$/, '');

        // distURL is a single URL on Astro 4 and an array on newer versions.
        const distURLof = (route) =>
          Array.isArray(route.distURL) ? route.distURL[0] : route.distURL;

        const entries = routes
          .filter((route) => route.type === 'page' && distURLof(route))
          .map((route) => {
            const distFile = fileURLToPath(distURLof(route));
            const relative = path
              .relative(fileURLToPath(dir), distFile)
              .split(path.sep)
              .join('/');

            return {
              loc: `${origin}/${relative === 'index.html' ? '' : relative}`,
              lastmod: lastCommitDate(route.component),
            };
          })
          .sort((a, b) => a.loc.localeCompare(b.loc));

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...entries.map(({ loc, lastmod }) =>
            [
              '  <url>',
              `    <loc>${loc}</loc>`,
              ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
              '  </url>',
            ].join('\n'),
          ),
          '</urlset>',
          '',
        ].join('\n');

        writeFileSync(new URL('sitemap.xml', dir), xml, 'utf8');
        logger.info(`Generated sitemap.xml with ${entries.length} URLs`);
      },
    },
  };
}

function lastCommitDate(component) {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', component],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}
