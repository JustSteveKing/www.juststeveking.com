<script lang="ts">
  import ScoreGauge from './ScoreGauge.svelte';
  import { inView } from './actions';
  import type { ReviewScore } from './types';

  export let scores: ReviewScore[];
  export let onSelect: (sectionId: string) => void;

  let visible = false;
</script>

<section class="scores-section" use:inView={{ threshold: 0.3, onEnter: () => (visible = true) }}>
  <div class:visible class="scores-label">Overall Assessment</div>
  <div class="scores-row">
    {#each scores as score, index}
      <div class:visible class="score-wrap" style={`transition-delay: ${index * 0.1}s`}>
        <ScoreGauge {score} animate={visible} {onSelect} />
      </div>
    {/each}
  </div>
</section>

<style>
  .scores-section {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px 56px;
  }

  .scores-label {
    margin-bottom: 20px;
    font-family: var(--review-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--review-rust);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .scores-label.visible {
    opacity: 1;
  }

  .scores-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }

  .score-wrap {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 0.6s ease,
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .score-wrap.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 720px) {
    .scores-section {
      padding: 0 20px 48px;
    }

    .scores-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .scores-row {
      grid-template-columns: 1fr;
    }
  }
</style>
