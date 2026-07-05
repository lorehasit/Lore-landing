export default function DocsLoading() {
  return (
    <div className="docs-layout" aria-busy="true" aria-label="Loading documentation">
      <aside className="docs-side" />
      <main className="doc">
        <div
          style={{
            height: 38,
            width: "40%",
            background: "var(--line)",
            borderRadius: 8,
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 18,
            width: "60%",
            background: "var(--line)",
            borderRadius: 8,
            marginBottom: 36,
          }}
        />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 120,
              background: "var(--paper-2)",
              borderRadius: 12,
              marginBottom: 20,
            }}
          />
        ))}
      </main>
    </div>
  );
}
