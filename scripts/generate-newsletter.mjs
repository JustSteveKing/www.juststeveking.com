import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const STATE_FILE = path.resolve(ROOT_DIR, 'newsletter-state.json');

// 1. Get configuration
// Note: In local development, you might need to use dotenv or similar if these aren't in your shell
const API_KEY = process.env.BUTTONDOWN_API_KEY;
if (!API_KEY) {
  console.error("Error: BUTTONDOWN_API_KEY is not set in environment.");
  process.exit(1);
}

// 2. Get last sent date
let lastSentDate = new Date(0);
if (fs.existsSync(STATE_FILE)) {
  const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  lastSentDate = new Date(state.lastSentAt);
}

const collections = ['articles', 'api-guides', 'videos'];
const newContent = [];

console.log(`\n--- SCANNING CONTENT ---`);
console.log(`Looking for updates since: ${lastSentDate.toLocaleString()}`);

// 3. Scan content collections
// Note: This assumes local content files exist. If using remote loaders, 
// you may need to adjust this to fetch from your API or data-store.json.
collections.forEach(collection => {
  const collectionPath = path.resolve(ROOT_DIR, 'src/content', collection);
  if (!fs.existsSync(collectionPath)) {
    console.warn(`Warning: Collection path not found: ${collectionPath}`);
    return;
  }

  const files = fs.readdirSync(collectionPath);
  files.forEach(file => {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) return;
    
    const content = fs.readFileSync(path.join(collectionPath, file), 'utf8');
    const { data } = matter(content);
    
    // Support different date field names across collections
    const pubDate = new Date(data.pubDate || data.publishedDate);

    if (pubDate > lastSentDate) {
      newContent.push({
        collection,
        title: data.title,
        description: data.description,
        url: `https://www.juststeveking.com/${collection}/${file.replace(/\.(md|mdx)$/, '')}`,
        date: pubDate
      });
    }
  });
});

if (newContent.length === 0) {
  console.log("No new content found since last newsletter.");
  process.exit(0);
}

newContent.sort((a, b) => b.date - a.date);
const limitedContent = newContent.slice(0, 10);

// 4. THE HTML TEMPLATE
function generateHTML(contentItems) {
  const accentColor = "#8dd3ff"; // Site primary accent
  const bgColor = "#070707";
  const cardBg = "#0d0d0d";
  const textColor = "#f6f6f6";
  const mutedColor = "#9a9a9a";

  const itemsHtml = contentItems.map(item => {
    const areaColors = {
      'api-guides': '#c084fc',
      'articles': '#fb923c',
      'videos': '#f87171',
      'default': accentColor
    };
    const currentAccent = areaColors[item.collection] || areaColors.default;
    const emoji = item.collection === 'videos' ? '🎥' : (item.collection === 'api-guides' ? '📘' : '✍️');
    const ctaText = item.collection === 'videos' ? 'Watch Video' : 'Read Article';

    return `
      <div style="background-color: ${cardBg}; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; color: ${currentAccent}; font-weight: 600; margin-bottom: 8px;">
          ${emoji} ${item.collection.replace('-', ' ')}
        </div>
        <h3 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; line-height: 1.3;">
          <a href="${item.url}" style="color: ${textColor}; text-decoration: none;">${item.title}</a>
        </h3>
        <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: ${mutedColor};">
          ${item.description}
        </p>
        <a href="${item.url}" style="display: inline-block; background-color: ${textColor}; color: ${bgColor}; padding: 10px 20px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em;">
          ${ctaText}
        </a>
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Latest from JustSteveKing</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${bgColor}; font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${textColor};">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${bgColor};">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; text-align: left;">
              <!-- Header -->
              <tr>
                <td style="padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                  <div style="font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">
                    JustSteveKing<span style="color: ${accentColor};">.com</span>
                  </div>
                  <div style="font-size: 12px; color: ${mutedColor}; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.1em;">
                    Developer Education & API Mentorship
                  </div>
                </td>
              </tr>
              
              <!-- Intro -->
              <tr>
                <td style="padding: 40px 0 20px 0;">
                  <h2 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.03em;">New resources are ready.</h2>
                  <p style="margin: 0; font-size: 16px; line-height: 1.6; color: ${mutedColor};">
                    Here's a summary of the latest guides and tutorials added to the site since our last update.
                  </p>
                </td>
              </tr>

              <!-- Content Items -->
              <tr>
                <td style="padding-top: 20px;">
                  ${itemsHtml}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                  <p style="font-size: 12px; color: ${mutedColor}; margin-bottom: 8px;">
                    &copy; ${new Date().getFullYear()} JustSteveKing. All rights reserved.
                  </p>
                  <p style="font-size: 12px; color: ${mutedColor};">
                    <a href="https://www.juststeveking.com" style="color: ${accentColor}; text-decoration: none;">Visit Website</a> &nbsp;•&nbsp; 
                    <a href="{{ unsubscribe_url }}" style="color: ${mutedColor}; text-decoration: underline;">Unsubscribe</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// 5. Generate Content
const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const subject = `Latest from JustSteveKing - ${today}`;
const htmlBody = generateHTML(limitedContent);

// 6. Create Draft in Buttondown
async function createDraft() {
  console.log(`\n--- CREATING DRAFT ---`);
  console.log(`Subject: ${subject}`);
  
  try {
    const response = await fetch('https://api.buttondown.email/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: subject,
        body: htmlBody,
        status: 'draft',
        // Prepend editor mode comment for Buttondown
        body_text: `<!-- buttondown-editor-mode: fancy -->\n${htmlBody}`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Buttondown API Error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log(`\n✅ Draft created successfully!`);
    console.log(`Draft ID: ${data.id}`);
    
    // 7. Update Local State
    fs.writeFileSync(STATE_FILE, JSON.stringify({ 
      lastSentAt: new Date().toISOString(),
      lastDraftId: data.id 
    }, null, 2));
    
    console.log(`\nState updated in newsletter-state.json`);
    console.log(`Check your Buttondown dashboard to review and send.`);
  } catch (error) {
    console.error(`\n❌ Failed to create draft:`, error.message);
    process.exit(1);
  }
}

createDraft();
