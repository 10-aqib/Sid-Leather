import { products, CAPACITY_PER_TYPE } from "@/lib/products";
import { Counter } from "./Counter";

export function CapacityStats() {
  const total = CAPACITY_PER_TYPE * products.length;
  return (
    <div>
      <div className="stats" data-reveal>
        {[...products]
          .sort((a, b) => ["sheep", "goat", "cow", "buffalo"].indexOf(a.animal) - ["sheep", "goat", "cow", "buffalo"].indexOf(b.animal))
          .map((p) => (
            <div className="stat" key={p.slug}>
              <span className="stat__label">{p.name}</span>
              <span className="stat__value">
                <Counter value={p.capacity} />
              </span>
              <span className="stat__unit">square feet per month</span>
            </div>
          ))}
      </div>
      <div className="stats-total" data-reveal>
        <span className="eyebrow eyebrow--plain">Combined monthly capacity</span>
        <strong>
          <Counter value={total} duration={2200} /> sq ft
        </strong>
      </div>
    </div>
  );
}
