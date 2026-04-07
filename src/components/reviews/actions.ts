import type { Action } from 'svelte/action';

interface InViewOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const inView: Action<HTMLElement, InViewOptions> = (node, options = {}) => {
  let observer: IntersectionObserver | undefined;

  const setup = (current: InViewOptions) => {
    observer?.disconnect();

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            current.onEnter?.();
            if (current.once ?? true) {
              observer?.unobserve(node);
            }
          } else if (!(current.once ?? true)) {
            current.onLeave?.();
          }
        }
      },
      {
        threshold: current.threshold ?? 0.2,
        rootMargin: current.rootMargin ?? '0px',
      },
    );

    observer.observe(node);
  };

  setup(options);

  return {
    update(next) {
      setup(next);
    },
    destroy() {
      observer?.disconnect();
    },
  };
};
