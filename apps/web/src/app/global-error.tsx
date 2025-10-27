'use client';
export default function GlobalError({ error }: { error: Error }) {
  console.error('Global error boundary:', error);
  return (
    <html><body style={{ padding: 24 }}>
      <h1>Something went wrong</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
    </body></html>
  );
}
