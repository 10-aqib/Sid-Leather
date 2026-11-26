import Link from "next/link";
import { applicationOrder, applications, productsFor, type ApplicationKey } from "@/lib/products";
import { IconFashion, IconFootwear, IconGarment, IconGlove, IconHandbag } from "./Icons";

export const appIcons: Record<ApplicationKey, (p: { className?: string }) => React.ReactElement> = {
  footwear: IconFootwear,
  handbags: IconHandbag,
  garments: IconGarment,
  fashion: IconFashion,
  gloves: IconGlove,
};

export function ApplicationsGrid() {
  return (
    <div className="apps">
      {applicationOrder.map((key, i) => {
        const Icon = appIcons[key];
        const list = productsFor(key);
        return (
          <article className="app" key={key} data-reveal style={{ ["--d" as string]: i * 90 }}>
            <Icon className="app__icon" />
            <h3 className="app__title">
              <Link href={`/applications#${key}`}>{applications[key].title}</Link>
            </h3>
            <p className="app__text">{applications[key].text}</p>
            <div className="app__tags">
              {list.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="tag">
                  {p.short}
                </Link>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
