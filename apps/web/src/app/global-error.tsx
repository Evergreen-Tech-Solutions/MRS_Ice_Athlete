'use client';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body style={{ padding: 24, fontFamily: 'ui-sans-serif,system-ui' }}>
        <h1>Something went wrong</h1>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      </body>
    </html>
  );
}
