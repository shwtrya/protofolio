const LoadingSpinner = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-bg">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
      <p className="t-mono">MEMUAT…</p>
    </div>
  </div>
);

export default LoadingSpinner;
