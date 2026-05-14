const CHARS = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function scrambleText(
  target: string,
  onUpdate: (text: string) => void,
  duration = 1200
): () => void {
  let raf = 0;
  let cancelled = false;
  const start = performance.now();
  const len = target.length;

  const tick = (now: number) => {
    if (cancelled) return;
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);

    let out = '';
    for (let i = 0; i < len; i++) {
      const ch = target[i];
      if (ch === ' ' || ch === '.') {
        out += ch;
        continue;
      }
      // Each character has a reveal threshold spread across the first 60% of duration
      const revealAt = (i / Math.max(1, len - 1)) * 0.6;
      if (t >= revealAt + 0.4 || t >= 1) {
        out += ch;
      } else if (t >= revealAt) {
        // mid-window: 50/50 chance to show target so it "settles"
        out += Math.random() > 0.5 ? ch : randomChar();
      } else {
        out += randomChar();
      }
    }

    onUpdate(out);

    if (t < 1) {
      raf = requestAnimationFrame(tick);
    } else {
      onUpdate(target);
    }
  };

  raf = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}
