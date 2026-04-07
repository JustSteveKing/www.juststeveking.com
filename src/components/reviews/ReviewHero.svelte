<script lang="ts">
  import { onMount } from 'svelte';
  import type { ReviewHeroData } from './types';

  export let hero: ReviewHeroData;

  let ready = false;

  onMount(() => {
    requestAnimationFrame(() => {
      ready = true;
    });
  });
</script>

<section class:ready class="hero">
  <div class="hero-badge">{hero.badge}</div>
  <h1>
    <span class="accent">{hero.titleAccent}</span><br />
    {hero.title}
  </h1>
  <p class="hero-sub">{hero.subtitle}</p>
  <div class="hero-meta" aria-label="Review metadata">
    {#each hero.meta as item}
      <span>{item}</span>
    {/each}
  </div>
  <div class="hero-line" aria-hidden="true"></div>
</section>

<style>
  .hero {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 32px 56px;
  }

  .hero-badge,
  h1,
  .hero-sub,
  .hero-meta {
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.65s ease,
      transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-line {
    width: 100%;
    height: 3px;
    margin-top: 36px;
    background: var(--review-ink);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
  }

  .ready .hero-badge,
  .ready h1,
  .ready .hero-sub,
  .ready .hero-meta {
    opacity: 1;
    transform: translateY(0);
  }

  .ready h1 {
    transition-delay: 0.08s;
  }

  .ready .hero-sub {
    transition-delay: 0.16s;
  }

  .ready .hero-meta {
    transition-delay: 0.24s;
  }

  .ready .hero-line {
    transform: scaleX(1);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    border: 1px solid var(--review-border);
    border-radius: 999px;
    background: rgba(30, 58, 138, 0.18);
    padding: 6px 16px;
    font-family: var(--review-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--review-rust);
  }

  .hero-badge::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--review-rust);
    animation: pulse 2s ease-in-out infinite;
  }

  h1 {
    margin: 0 0 16px;
    font-size: clamp(2.6rem, 5vw, 4rem);
    line-height: 1.05;
    letter-spacing: -0.06em;
    color: var(--review-ink);
  }

  .accent {
    color: #93c5fd;
  }

  .hero-sub {
    max-width: 580px;
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.7;
    color: var(--review-slate);
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 28px;
    margin-top: 28px;
    font-family: var(--review-mono);
    font-size: 11.5px;
    letter-spacing: 0.03em;
    color: #78716c;
  }

  .hero-meta span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .hero-meta span::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: currentColor;
    opacity: 0.45;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }

    50% {
      opacity: 0.55;
      transform: scale(0.72);
    }
  }

  @media (max-width: 720px) {
    .hero {
      padding: 48px 20px 40px;
    }
  }

  @media (max-width: 480px) {
    .hero-meta {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
