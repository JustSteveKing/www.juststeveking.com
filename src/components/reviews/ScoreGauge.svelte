<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { get } from 'svelte/store';
  import { tonePalette } from './theme';
  import type { ReviewScore } from './types';

  export let score: ReviewScore;
  export let animate = false;
  export let onSelect: (sectionId: string) => void;

  const circumference = 2 * Math.PI * 40;
  const progress = tweened(0, { duration: 0 });

  $: if (animate && get(progress) === 0) {
    progress.set(score.score, {
      duration: 1600,
      easing: cubicOut,
    });
  }

  $: tone = tonePalette[score.tone];
  $: current = $progress;
  $: dashOffset = circumference - (current / 100) * circumference;
</script>

<button class="score-gauge" type="button" on:click={() => onSelect(score.sectionId)}>
  <div class="gauge-ring" aria-hidden="true">
    <svg viewBox="0 0 100 100">
      <circle class="gauge-bg" cx="50" cy="50" r="40"></circle>
      <circle
        class="gauge-fill"
        cx="50"
        cy="50"
        r="40"
        stroke={tone.solid}
        stroke-dasharray={circumference}
        stroke-dashoffset={dashOffset}
      ></circle>
    </svg>
    <span class="gauge-value" style={`color: ${tone.solid}`}>{Math.round(current)}</span>
  </div>
  <div class="gauge-label">{score.label}</div>
  <div class="gauge-verdict" style={`color: ${tone.solid}`}>{score.verdict}</div>
  <span class="gauge-hint">Click to jump</span>
</button>

<style>
  .score-gauge {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--review-border);
    border-radius: 16px;
    background: rgba(12, 10, 9, 0.6);
    padding: 28px 20px 26px;
    text-align: center;
    cursor: pointer;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .score-gauge:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  .score-gauge:focus-visible {
    outline: 2px solid var(--review-rust);
    outline-offset: 3px;
  }

  .gauge-ring {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto 14px;
  }

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .gauge-bg,
  .gauge-fill {
    fill: none;
    stroke-width: 7;
  }

  .gauge-bg {
    stroke: var(--review-score-track);
  }

  .gauge-fill {
    stroke-linecap: round;
  }

  .gauge-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--review-mono);
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.05em;
  }

  .gauge-label {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 700;
    color: var(--review-ink);
  }

  .gauge-verdict,
  .gauge-hint {
    font-family: var(--review-mono);
    text-transform: uppercase;
  }

  .gauge-verdict {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .gauge-hint {
    display: block;
    margin-top: 12px;
    font-size: 9px;
    letter-spacing: 0.12em;
    color: #78716c;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .score-gauge:hover .gauge-hint,
  .score-gauge:focus-visible .gauge-hint {
    opacity: 1;
  }
</style>
