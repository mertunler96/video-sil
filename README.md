# MUNLER Website

munler.co.uk için statik HTML prototip + canlı Shopify mağazası.

---

## Shopify Mağaza Bilgileri

| | |
|---|---|
| Mağaza URL | https://munler.co.uk |
| Admin URL | https://admin.shopify.com/store/munler |
| Aktif Tema | video-sil/main |
| Tema ID | 201875882315 |

---

## Klasör Yapısı

```
shopify-theme/        ← Shopify'a push edilen tema dosyaları
  assets/
    style.css         ← Global stiller (footer, collection sayfası)
    product.css       ← Ürün sayfası stilleri + Judge.me badge CSS
  layout/
    theme.liquid      ← Header, footer, Klaviyo newsletter formu
  templates/
    product.liquid    ← Ürün sayfası (Judge.me widget + Klaviyo tracking)
    collection.liquid ← Koleksiyon sayfası (Judge.me badge)

index.html            ← Statik HTML prototip (anasayfa)
shop.html             ← Statik HTML prototip (shop sayfası)
...                   ← Diğer statik sayfalar
```

---

## Kurulu Uygulamalar

### Judge.me (Ürün Yorumları)
- Ürün sayfasında yorum widget'ı ve yıldız badge'i aktif
- Review request emailler sipariş tesliminden 14 gün sonra otomatik gönderiliyor
- Admin bildirimleri: info@munler.co.uk
- Badge, `judgeme.badge` metafield'ından render ediliyor (JS'e bağımlı değil)

### Klaviyo (Email Marketing)
- Public API Key: `U2UQE5`
- Newsletter List ID: `WqGLDz`
- Footer'da newsletter formu (double opt-in açık)
- Ürün sayfasında "Viewed Product" ve "Added to Cart" event tracking aktif

### Trustpilot
- Shopify ile entegre — sipariş sonrası otomatik review daveti gönderiliyor
- Profil: munler.co.uk

---

## Shopify'a Dosya Push Etme

Tema dosyaları MCP (Shopify GraphQL API) ile push edilir.  
**Önemli:** MCP, aktif/live temaya yazamaz. Push yapmadan önce temayı unpublish et, push et, sonra tekrar publish et.

```graphql
mutation {
  themeFilesUpsert(
    themeId: "gid://shopify/OnlineStoreTheme/201875882315"
    files: [{ filename: "assets/style.css", body: { type: TEXT, value: "..." } }]
  ) {
    upsertedThemeFiles { filename }
    userErrors { field message }
  }
}
```

---

## Ürünler

| Ürün | Fiyat |
|---|---|
| Brook Mirror – Champagne Gold (S) | £199 |
| Brook Mirror – Champagne Gold (L) | £259 |
| Brook Mirror – Matte Black (S) | £199 |
| Brook Mirror – Matte Black (L) | £259 |
| Solenne Mirror | £749 |
