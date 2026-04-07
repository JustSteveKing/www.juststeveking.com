<script lang="ts">
  import { slide } from 'svelte/transition';
  import { inView } from './actions';
  import { evidencePalette, tonePalette } from './theme';
  import type { ReviewSectionData } from './types';

  type TabKey = 'findings' | 'detail' | 'recommendations';
  const tabOrder: TabKey[] = ['findings', 'detail', 'recommendations'];

  export let section: ReviewSectionData;

  let visible = false;
  let activeTab: TabKey = 'findings';
  let openEvidence = -1;

  function sanitizeHtml(input: string): string {
    return input
      .replace(/<\/?(script|style|iframe|object|embed)[^>]*>/gi, '')
      .replace(/\son[a-z]+="[^"]*"/gi, '')
      .replace(/\son[a-z]+='[^']*'/gi, '')
      .replace(/javascript:/gi, '');
  }

  function getTabId(tab: TabKey): string {
    return `${section.id}-${tab}-tab`;
  }

  function getPanelId(tab: TabKey): string {
    return `${section.id}-${tab}-panel`;
  }

  function activateTab(tab: TabKey) {
    activeTab = tab;
  }

  function onTabKeydown(event: KeyboardEvent) {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex === -1) {
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      activeTab = tabOrder[(currentIndex + 1) % tabOrder.length];
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      activeTab = tabOrder[(currentIndex - 1 + tabOrder.length) % tabOrder.length];
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      activeTab = tabOrder[0];
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      activeTab = tabOrder[tabOrder.length - 1];
    }
  }

  function toggleEvidence(index: number) {
    openEvidence = openEvidence === index ? -1 : index;
  }

  function withRef(url: string): string {
    try {
      const hasWindow = typeof window !== 'undefined';
      const base = hasWindow ? window.location.href : 'https://example.com';
      const parsed = new URL(url, base);

      // Only tag outbound http(s) links.
      const isHttp = parsed.protocol === 'http:' || parsed.protocol === 'https:';
      const isExternal = hasWindow ? parsed.origin !== window.location.origin : true;
      if (!isHttp || !isExternal) {
        return url;
      }

      parsed.searchParams.set('ref', 'juststeveking');
      return parsed.toString();
    } catch {
      return url;
    }
  }
</script>

<section
  id={section.id}
  class:visible
  class="review-section"
  use:inView={{ threshold: 0.15, onEnter: () => (visible = true) }}
>
  <div class="section-header">
    <span class="section-num">{section.number}</span>
    <div class="section-titles">
      <h2>{section.title}</h2>
      <p>{section.subtitle}</p>
    </div>
  </div>

  <div class="tab-bar" role="tablist" tabindex="0" aria-label={`${section.title} tabs`} on:keydown={onTabKeydown}>
    <button
      id={getTabId('findings')}
      class:active={activeTab === 'findings'}
      type="button"
      role="tab"
      aria-selected={activeTab === 'findings'}
      aria-controls={getPanelId('findings')}
      tabindex={activeTab === 'findings' ? 0 : -1}
      on:click={() => activateTab('findings')}
    >
      What We Found
    </button>
    <button
      id={getTabId('detail')}
      class:active={activeTab === 'detail'}
      type="button"
      role="tab"
      aria-selected={activeTab === 'detail'}
      aria-controls={getPanelId('detail')}
      tabindex={activeTab === 'detail' ? 0 : -1}
      on:click={() => activateTab('detail')}
    >
      Deep Dive
    </button>
    <button
      id={getTabId('recommendations')}
      class:active={activeTab === 'recommendations'}
      type="button"
      role="tab"
      aria-selected={activeTab === 'recommendations'}
      aria-controls={getPanelId('recommendations')}
      tabindex={activeTab === 'recommendations' ? 0 : -1}
      on:click={() => activateTab('recommendations')}
    >
      Action Items
    </button>
  </div>

  {#if activeTab === 'findings'}
    <div
      id={getPanelId('findings')}
      class="panel"
      role="tabpanel"
      aria-labelledby={getTabId('findings')}
      tabindex="0"
    >
      {#each section.findings as paragraph}
        <p>{@html sanitizeHtml(paragraph)}</p>
      {/each}

      <div class="evidence-list">
        {#each section.evidence as evidence, index}
          {@const palette = evidencePalette[evidence.kind]}
          <article class:open={openEvidence === index} class="evidence-card">
            <button
              class="evidence-header"
              type="button"
              aria-expanded={openEvidence === index}
              aria-controls={`${section.id}-evidence-${index}`}
              on:click={() => toggleEvidence(index)}
            >
              <span class="evidence-tag" style={`background: ${palette.soft}; color: ${palette.solid}`}>
                {palette.label}
              </span>
              <span class="evidence-title">{evidence.title}</span>
              <span class="evidence-toggle">+</span>
            </button>
            {#if openEvidence === index}
              <div
                id={`${section.id}-evidence-${index}`}
                class="evidence-body"
                transition:slide={{ duration: 260 }}
              >
                <div class="evidence-content">
                  {#each evidence.body as body}
                    <p>{@html sanitizeHtml(body)}</p>
                  {/each}
                  {#if evidence.sourceUrl}
                    <a class="source-url" href={withRef(evidence.sourceUrl)} target="_blank" rel="noreferrer noopener">
                      {evidence.sourceLabel ?? evidence.sourceUrl}
                    </a>
                  {/if}
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  {/if}

  {#if activeTab === 'detail'}
    <div
      id={getPanelId('detail')}
      class="panel"
      role="tabpanel"
      aria-labelledby={getTabId('detail')}
      tabindex="0"
    >
      <p class="breakdown-intro">{section.breakdownIntro}</p>
      <div class="breakdown-list">
        {#each section.breakdown as item, index}
          {@const tone = tonePalette[item.tone]}
          <div class="score-bar-row" style={`transition-delay: ${index * 0.08}s`}>
            <span class="score-bar-label">{item.label}</span>
            <div class="score-bar-track">
              <div
                class="score-bar-fill"
                style={`background: ${tone.solid}; width: ${visible ? item.value : 0}%`}
              ></div>
            </div>
            <span class="score-bar-value">{item.value}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if activeTab === 'recommendations'}
    <div
      id={getPanelId('recommendations')}
      class="panel"
      role="tabpanel"
      aria-labelledby={getTabId('recommendations')}
      tabindex="0"
    >
      <div class="action-items">
        <div class="action-items-title">Action Items</div>
        {#each section.recommendations as item, index}
          <div class="action-item">
            <span class="action-item-index">{String(index + 1).padStart(2, '0')}</span>
            <span class="action-item-text">{item}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .review-section {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px 64px;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.7s ease,
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .review-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--review-border);
  }

  .section-num {
    flex-shrink: 0;
    font-family: var(--review-mono);
    font-size: 42px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.08em;
    color: #57534e;
  }

  h2 {
    margin: 0;
    font-size: 28px;
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: var(--review-ink);
  }

  .section-titles p,
  .panel p {
    margin: 0;
    color: var(--review-slate);
  }

  .section-titles p {
    margin-top: 4px;
    font-size: 14px;
  }

  .tab-bar {
    display: flex;
    gap: 0;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--review-border);
  }

  .tab-bar button {
    position: relative;
    border: 0;
    background: transparent;
    padding: 10px 20px;
    font-family: var(--review-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #78716c;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .tab-bar button::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -2px;
    left: 0;
    height: 2px;
    transform: scaleX(0);
    transform-origin: left;
    background: var(--review-rust);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .tab-bar button.active {
    color: var(--review-ink);
  }

  .tab-bar button.active::after {
    transform: scaleX(1);
  }

  .panel > p,
  .evidence-content p,
  .breakdown-intro {
    margin-bottom: 14px;
    font-size: 15.5px;
    line-height: 1.7;
    color: #d6d3d1;
  }

  .panel :global(strong) {
    color: var(--review-ink);
  }

  .panel :global(code),
  .evidence-content :global(code) {
    border-radius: 4px;
    background: rgba(28, 25, 23, 0.9);
    padding: 2px 6px;
    font-family: var(--review-mono);
    font-size: 12px;
  }

  .evidence-list {
    margin-top: 20px;
  }

  .evidence-card {
    margin-bottom: 12px;
    overflow: hidden;
    border: 1px solid var(--review-border);
    border-radius: 12px;
    background: rgba(12, 10, 9, 0.6);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .evidence-card.open,
  .evidence-card:hover {
    border-color: #44403c;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  }

  .evidence-header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    border: 0;
    background: transparent;
    padding: 14px 18px;
    text-align: left;
    cursor: pointer;
  }

  .evidence-tag {
    flex-shrink: 0;
    border-radius: 4px;
    padding: 3px 10px;
    font-family: var(--review-mono);
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .evidence-title {
    flex: 1;
    font-size: 14.5px;
    font-weight: 600;
    color: #e7e5e4;
  }

  .evidence-toggle {
    display: inline-flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: rgba(28, 25, 23, 0.9);
    color: #a8a29e;
    font-size: 14px;
    transition:
      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      background 0.2s ease,
      color 0.2s ease;
  }

  .open .evidence-toggle {
    transform: rotate(45deg);
    background: rgba(30, 58, 138, 0.18);
    color: var(--review-rust);
  }

  .evidence-content {
    border-top: 1px solid var(--review-border);
    padding: 0 18px 18px;
  }

  .source-url {
    display: inline-block;
    margin-top: 8px;
    border-radius: 5px;
    background: rgba(30, 58, 138, 0.18);
    padding: 3px 10px;
    font-family: var(--review-mono);
    font-size: 11px;
    color: #93c5fd;
    text-decoration: none;
  }

  .breakdown-list {
    margin-top: 20px;
  }

  .score-bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
  }

  .score-bar-label {
    width: 140px;
    flex-shrink: 0;
    font-size: 13px;
    font-weight: 600;
    color: #e7e5e4;
  }

  .score-bar-track {
    flex: 1;
    overflow: hidden;
    height: 8px;
    border-radius: 4px;
    background: var(--review-score-track);
  }

  .score-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .score-bar-value {
    width: 36px;
    flex-shrink: 0;
    font-family: var(--review-mono);
    font-size: 13px;
    font-weight: 700;
    text-align: right;
    color: #e7e5e4;
  }

  .action-items {
    margin-top: 12px;
    border-radius: 12px;
    border: 1px solid var(--review-border);
    background: rgba(28, 25, 23, 0.55);
    padding: 22px 24px;
  }

  .action-items-title {
    margin-bottom: 14px;
    font-family: var(--review-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--review-rust);
  }

  .action-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--review-warm-dark);
    font-size: 14px;
    color: #e7e5e4;
  }

  .action-item:last-child {
    border-bottom: 0;
  }

  .action-item-index {
    display: inline-flex;
    min-width: 2ch;
    flex-shrink: 0;
    font-family: var(--review-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--review-slate);
  }

  .action-item-text {
    line-height: 1.6;
  }

  @media (max-width: 720px) {
    .review-section {
      padding: 0 20px 56px;
    }

    .section-num {
      font-size: 32px;
    }

    h2 {
      font-size: 22px;
    }

    .tab-bar {
      overflow-x: auto;
    }

    .tab-bar button {
      padding: 8px 12px;
      font-size: 10.5px;
      white-space: nowrap;
    }

    .score-bar-row {
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;
    }

    .score-bar-label,
    .score-bar-value {
      width: auto;
    }
  }
</style>
