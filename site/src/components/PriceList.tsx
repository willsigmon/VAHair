interface PriceItem {
  name: string;
  price: string;
  detail?: string;
  href?: string;
}

/** Printed-menu rows: name, dotted leader, price. */
export default function PriceList({ items, className = '' }: { items: readonly PriceItem[]; className?: string }) {
  return (
    <ul className={`price-list ${className}`.trim()}>
      {items.map((item) => {
        const row = (
          <>
            <span className="price-name">
              {item.name}
              {item.detail && <small>{item.detail}</small>}
            </span>
            <span className="price-leader" aria-hidden="true" />
            <span className="price-amount">{item.price}</span>
          </>
        );
        return (
          <li key={item.name}>
            {item.href ? <a href={item.href} className="price-row">{row}</a> : <div className="price-row">{row}</div>}
          </li>
        );
      })}
    </ul>
  );
}
