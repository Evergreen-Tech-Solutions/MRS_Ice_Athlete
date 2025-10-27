'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  // Logs land in the Function logs for the request
  console.error('Page error boundary:', error);
  return (
    <div style={{ padding: 24 }}>
      <h2>Page error</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <button onClick={() => reset()} style={{ marginTop: 12, padding: 8 }}>
        Try again
      </button>
    </div>
  );
}
