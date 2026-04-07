<script lang="ts">
  import { onMount } from 'svelte';
  import ReviewHero from './ReviewHero.svelte';
  import ReviewSection from './ReviewSection.svelte';
  import ScoreGaugeRow from './ScoreGaugeRow.svelte';
  import type { ReviewExperienceProps } from './types';

  export let hero: ReviewExperienceProps['hero'];
  export let scores: ReviewExperienceProps['scores'];
  export let sections: ReviewExperienceProps['sections'];
  export let footerNote: ReviewExperienceProps['footerNote'];

  let activeSectionId = sections[0]?.id ?? '';

  onMount(() => {
    if (!sections.length) {
      return;
    }

    activeSectionId = sections[0].id;

    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const topOffset = 140;
    const switchThreshold = 24;
    let rafId = 0;

    const updateActiveSection = () => {
      let crossedIndex = 0;

      for (let index = 0; index < sectionElements.length; index += 1) {
        const element = sectionElements[index];
        const top = element.getBoundingClientRect().top;
        if (top - topOffset <= 0) {
          crossedIndex = index;
        } else {
          break;
        }
      }

      const activeIndex = Math.max(
        0,
        sectionElements.findIndex((element) => element.id === activeSectionId),
      );

      if (crossedIndex > activeIndex) {
        const nextTop = sectionElements[crossedIndex].getBoundingClientRect().top;
        if (nextTop - topOffset <= -switchThreshold) {
          activeSectionId = sectionElements[crossedIndex].id;
        }
      } else if (crossedIndex < activeIndex) {
        const currentTop = sectionElements[activeIndex].getBoundingClientRect().top;
        if (currentTop - topOffset >= switchThreshold) {
          activeSectionId = sectionElements[crossedIndex].id;
        }
      }

      rafId = 0;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
</script>

<div class="review-shell">
  <ReviewHero {hero} />
  <ScoreGaugeRow {scores} onSelect={scrollToSection} />

  <div class="review-content-wrap">
    <aside class="section-nav" aria-label="Section navigation">
      <p>Sections</p>
      <ul>
        {#each sections as section}
          <li>
            <button
              class:active={activeSectionId === section.id}
              type="button"
              on:click={() => scrollToSection(section.id)}
            >
              {section.number} {section.title}
            </button>
          </li>
        {/each}
      </ul>
    </aside>

    <div class="review-sections">
      {#each sections as section}
        <div class="section-divider" aria-hidden="true">
          <hr />
        </div>
        <ReviewSection {section} />
      {/each}
    </div>
  </div>

  <footer class="review-footer">
    <p>{footerNote}</p>
  </footer>
</div>

<style>
  .review-shell {
    --review-ink: #f5f5f4;
    --review-paper: rgba(28, 25, 23, 0.55);
    --review-warm: #1c1917;
    --review-warm-dark: #44403c;
    --review-rust: #60a5fa;
    --review-slate: #a8a29e;
    --review-border: #292524;
    --review-score-track: #292524;
    --review-mono: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;

    margin: 48px auto 80px;
    overflow: hidden;
    border: 1px solid var(--review-border);
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(28, 25, 23, 0.86), rgba(12, 10, 9, 0.96));
  }

  .section-divider {
    max-width: 100%;
    margin: 0;
    padding: 0 32px;
  }

  .review-content-wrap {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .review-sections {
    min-width: 0;
  }

  .section-nav {
    display: none;
  }

  .section-nav p {
    margin: 0 0 10px;
    font-family: var(--review-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--review-slate);
  }

  .section-nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .section-nav li + li {
    margin-top: 6px;
  }

  .section-nav button {
    display: block;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 10px;
    background: transparent;
    padding: 8px 10px;
    font-size: 12px;
    line-height: 1.4;
    text-align: left;
    color: var(--review-slate);
    cursor: pointer;
  }

  .section-nav button.active {
    border-color: rgba(96, 165, 250, 0.35);
    background: rgba(96, 165, 250, 0.1);
    color: #dbeafe;
  }

  .section-divider hr {
    margin: 0 0 56px;
    border: 0;
    border-top: 1px solid var(--review-border);
  }

  .review-footer {
    max-width: 900px;
    margin: 0 auto;
    padding: 24px 32px 80px;
    border-top: 1px solid var(--review-border);
  }

  .review-footer p {
    margin: 0;
    font-size: 13px;
    font-style: italic;
    line-height: 1.7;
    color: var(--review-slate);
  }

  @media (max-width: 720px) {
    .review-shell {
      margin: 24px -4px 64px;
      border-radius: 20px;
    }

    .section-divider {
      padding: 0 20px;
    }

    .review-footer {
      padding: 24px 20px 72px;
    }
  }

  @media (min-width: 1160px) {
    .review-shell {
      overflow: visible;
    }

    .review-content-wrap {
      grid-template-columns: 240px minmax(0, 1fr);
      align-items: start;
      padding-right: 24px;
    }

    .section-nav {
      position: sticky;
      top: 104px;
      max-height: calc(100vh - 128px);
      overflow: auto;
      display: block;
      align-self: start;
      margin-left: 28px;
      border: 1px solid var(--review-border);
      border-radius: 14px;
      background: rgba(12, 10, 9, 0.55);
      padding: 14px;
    }
  }
</style>
