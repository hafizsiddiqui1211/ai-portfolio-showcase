/** Quiet, non-interactive texture: one light source, no continuous animation. */
const AmbientBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
    <div className="absolute inset-0 gradient-hero" />
    <div className="absolute inset-0 bg-grid-pattern opacity-40" />
    <div className="absolute inset-0 bg-noise" />
  </div>
);

export default AmbientBackground;
