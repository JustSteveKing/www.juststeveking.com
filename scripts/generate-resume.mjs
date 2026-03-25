import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OWNER = 'juststeveking';
const REPO = 'content';
const PATH = 'resume.json';
const BRANCH = 'main';

async function fetchResume() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3.raw',
      // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` // Add if needed
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function generateHtml(resume) {
  const { basics, work, education, skills, projects, publications, awards, certificates } = resume;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume - ${basics.name}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @page {
          margin: 0;
        }
        body {
          -webkit-print-color-adjust: exact;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }
      </style>
    </head>
    <body class="bg-white text-slate-900 p-8">
      <div class="max-w-4xl mx-auto">
        <header class="mb-8 border-b-2 border-slate-900 pb-4">
          <h1 class="text-4xl font-bold uppercase tracking-tight">${basics.name}</h1>
          <p class="text-xl text-slate-600 mt-1">${basics.label || ''}</p>
          <div class="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-500">
            ${basics.email ? `<span>${basics.email}</span>` : ''}
            ${basics.url ? `<span>${basics.url}</span>` : ''}
            ${basics.location ? `<span>${basics.location.city}, ${basics.location.countryCode}</span>` : ''}
          </div>
        </header>

        <section class="mb-8">
          <h2 class="text-lg font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-4 pb-1">Summary</h2>
          <p class="text-slate-700 leading-relaxed">${basics.summary || ''}</p>
        </section>

        <section class="mb-8">
          <h2 class="text-lg font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-4 pb-1">Experience</h2>
          <div class="space-y-6">
            ${work.map(job => `
              <div>
                <div class="flex justify-between items-baseline mb-1">
                  <h3 class="font-bold text-slate-800">${job.position}</h3>
                  <span class="text-sm text-slate-500">${job.startDate} &mdash; ${job.endDate || 'Present'}</span>
                </div>
                <div class="text-slate-600 font-medium mb-2">${job.name}</div>
                <p class="text-slate-700 text-sm mb-2 leading-relaxed">${job.summary || ''}</p>
                <ul class="list-disc list-inside text-slate-700 text-sm space-y-1">
                  ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 class="text-lg font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-4 pb-1">Education</h2>
            <div class="space-y-4">
              ${education.map(edu => `
                <div>
                  <div class="font-bold text-slate-800">${edu.area}</div>
                  <div class="text-slate-600 text-sm">${edu.institution}</div>
                  <div class="text-xs text-slate-500">${edu.startDate} &mdash; ${edu.endDate || 'Present'}</div>
                </div>
              `).join('')}
            </div>
          </section>

          <section>
            <h2 class="text-lg font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-4 pb-1">Skills</h2>
            <div class="flex flex-wrap gap-2">
              ${skills.map(skill => `
                <span class="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                  ${skill.name}
                </span>
              `).join('')}
            </div>
          </section>
        </div>

        ${publications && publications.length > 0 ? `
          <section class="mb-8">
            <h2 class="text-lg font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-4 pb-1">Publications</h2>
            <div class="space-y-4">
              ${publications.map(pub => `
                <div>
                  <div class="flex justify-between items-baseline mb-1">
                    <h3 class="font-bold text-slate-800 text-sm">${pub.name}</h3>
                    <span class="text-xs text-slate-500">${pub.releaseDate}</span>
                  </div>
                  <div class="text-slate-600 text-xs">${pub.publisher}</div>
                  ${pub.summary ? `<p class="text-slate-700 text-xs mt-1">${pub.summary}</p>` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${awards && awards.length > 0 ? `
            <section>
              <h2 class="text-lg font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-4 pb-1">Awards</h2>
              <div class="space-y-3">
                ${awards.map(award => `
                  <div>
                    <div class="font-bold text-slate-800 text-sm">${award.title}</div>
                    <div class="text-slate-600 text-xs">${award.awarder} (${award.date})</div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${certificates && certificates.length > 0 ? `
            <section>
              <h2 class="text-lg font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 mb-4 pb-1">Certificates</h2>
              <div class="space-y-3">
                ${certificates.map(cert => `
                  <div>
                    <div class="font-bold text-slate-800 text-sm">${cert.name}</div>
                    <div class="text-slate-600 text-xs">${cert.issuer} (${cert.date})</div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

async function main() {
  try {
    console.log('Fetching resume data...');
    const resume = await fetchResume();

    console.log('Generating HTML...');
    const html = generateHtml(resume);

    console.log('Starting Playwright...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    const distDir = join(process.cwd(), 'public');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }

    const pdfPath = join(distDir, 'resume.pdf');
    console.log(`Generating PDF at ${pdfPath}...`);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true
    });

    await browser.close();
    console.log('Done! Resume PDF generated successfully.');
  } catch (error) {
    console.error('Error generating resume PDF:', error);
    process.exit(1);
  }
}

main();
