# Price comparison evidence

The product pages run a `snippets/price-comparison.liquid` module that compares a MUNLER
mirror against a comparable competitor product. Under the Digital Markets, Competition and
Consumers Act 2024 and the CAP Code rules on comparative advertising, a price comparison
must be against a **genuine, currently available, comparable** product, and we must be able
to **evidence it on the date it was made**. This file is that evidence.

**Re-check every claim before each theme release, and update `checked_on` in the snippet.**
If a competitor price falls below ours, pull the module rather than leave a stale claim up.

---

## Comparator: Ethnik Living (ethnikliving.com)

Chosen because it is the closest like-for-like: a direct-to-consumer brand selling
asymmetrical / organic stainless-steel-framed wall mirrors, sells into the UK in GBP, and
sits in the same design language and size range. It is not a department store or a
showroom, so the comparison is not stacked in our favour.

Company facts as published on their site: warehouses in New Jersey and California, office
in Los Angeles, free shipping on US orders. **Orders to the UK ship from the US.**

### Method

GBP presentment prices read from their own Shopify storefront on **2026-07-10**:

```
curl -s "https://www.ethnikliving.com/products/aorganik-mirror.js?currency=GBP"
curl -s "https://www.ethnikliving.com/products/brody-full-length-mirror.js?currency=GBP"
```

These are their list prices in GBP, exclusive of any delivery or import charges added at
their checkout. Our prices are inclusive of free insured UK delivery. That asymmetry
favours us, so the module must not also claim their delivery is expensive; it states only
that they ship from the US, which they publish themselves.

### Recorded on 2026-07-10

| MUNLER product | MUNLER size | MUNLER price | Ethnik product | Ethnik size | Ethnik price (GBP) |
|---|---|---|---|---|---|
| Brook Wall Mirror | 73 × 52 cm | £199 | AOrganik Mirror, Medium | 74.9 × 54.9 cm | £306.00 |
| Brook Wall Mirror | 90 × 65 cm | £259 | AOrganik Mirror, Large | 88.9 × 64.8 cm | £408.00 |
| Solenne Full-Length | 170 × 90 cm | £749 | Brody Full Length, Standard | 172.7 × 93 cm | £1,122.00 |

Their AOrganik variants also list XL (76.2 × 102.9 cm) at £599 USD-base and XXL at £1,289
USD-base; we have no comparable size, so those are excluded rather than cherry-picked.

### Specification comparison, from their own product copy

| | MUNLER | Ethnik Living |
|---|---|---|
| Frame | 304-grade stainless steel | "Stainless steel frame" (grade not stated) |
| Glass | 4 mm, copper-free and lead-free | 4 mm "Flotal-E", "copper-free and plastic-free" |
| Warranty | 5 years | Not stated on the product page |
| Ships from | United Kingdom | United States |
| UK delivery | Free, insured, tracked | Not stated; US orders free |

**Materials are broadly equivalent.** Do not claim our glass or steel is superior. The
defensible claims are: comparable specification, materially lower price, UK stock, free
insured UK delivery, and a stated warranty where theirs is unstated.

### Claims we must NOT make

- That we are cheaper "because we cut out the middleman". Ethnik is also direct-to-consumer.
  The price gap comes from UK stock versus transatlantic fulfilment, and from our margin
  choice. Say that instead.
- That their frame is aluminium or their glass is inferior. Both are stainless steel and
  both are copper-free.
- That their delivery is expensive. We have not evidenced their UK delivery charge.
- Any "was / now" anchor on our own prices. We have never sold these at a higher price.

### Sale prices

Several Ethnik products carry sale pricing (for example Roland at -30%). The three products
above were at **full list price** with no compare-at price on the date checked. If they go
on sale below our price, the module must be updated or removed.
