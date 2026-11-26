import { MAP_HEIGHT, MAP_WIDTH, europeCentre, karachi, marketCities } from "@/lib/map-data";
import { markets } from "@/lib/site";

// Label offsets keep closely spaced South-East Asian markets readable.
const labelPos: Record<string, [number, number, "start" | "end"]> = {
  Vietnam: [10, 4, "start"],
  Taiwan: [9, 4, "start"],
  Thailand: [-9, -4, "end"],
  Cambodia: [-9, 10, "end"],
  China: [-10, -6, "end"],
  "Hong Kong": [9, 12, "start"],
  "South Korea": [9, 4, "start"],
  Indonesia: [9, 12, "start"],
  Singapore: [-9, 12, "end"],
};

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.max(30, Math.abs(x2 - x1) * 0.22);
  return `M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`;
};

export function MarketsMap() {
  const [kx, ky] = karachi;
  return (
    <div className="map-wrap">
      <figure className="map-figure" data-reveal="fade">
        <img src="/images/markets-map.svg" alt="" width={MAP_WIDTH} height={MAP_HEIGHT} loading="lazy" decoding="async" />
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} role="img" aria-label="Map showing SID Leather in Karachi, Pakistan, and its markets across Asia and Europe">
          <path className="map-route" d={curve(kx, ky, europeCentre[0], europeCentre[1])} />
          {marketCities.map((c) => (
            <path key={`r-${c.name}`} className="map-route" d={curve(kx, ky, c.x, c.y)} />
          ))}
          {marketCities.map((c) => {
            const [dx, dy, anchor] = labelPos[c.name] ?? [8, 4, "start"];
            return (
              <g key={c.name}>
                <circle className="map-dot" cx={c.x} cy={c.y} r={3.2} />
                <text className="map-label" x={c.x + dx} y={c.y + dy} textAnchor={anchor}>
                  {c.name}
                </text>
              </g>
            );
          })}
          <circle className="map-dot" cx={europeCentre[0]} cy={europeCentre[1]} r={3.2} />
          <text className="map-label" x={europeCentre[0]} y={europeCentre[1] - 12} textAnchor="middle">Europe</text>
          <circle className="map-pulse" cx={kx} cy={ky} r={9} />
          <circle className="map-dot map-dot--origin" cx={kx} cy={ky} r={4.5} />
          <text className="map-label map-label--origin" x={kx - 10} y={ky + 20} textAnchor="end">Karachi</text>
        </svg>
      </figure>
      <div className="map-legend" aria-hidden>
        <span><i style={{ background: "#d4b995" }} /> Pakistan — tannery</span>
        <span><i style={{ background: "#a66e45" }} /> Asian markets</span>
        <span><i style={{ background: "#7d5a40" }} /> Europe — selected markets</span>
      </div>
      <div className="markets">
        <div>
          <h3>Asia</h3>
          <ul>
            {markets.asia.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Europe</h3>
          <p>
            Supplying customers in parts of Europe. We work with imported European raw material too, where an order calls for it.
          </p>
        </div>
      </div>
    </div>
  );
}
