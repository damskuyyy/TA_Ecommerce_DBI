// priceFormatter.ts

type Currency = 'USD' | 'IDR'

const formatPrice = (locales: string, price: number, currency: Currency): string => {
  const formatter = new Intl.NumberFormat(locales, { style: 'currency', currency })
  return formatter.format(price)
}

const formattedPrice = {
  toUSD: (price: number): string => formatPrice('en-US', price, 'USD'),
  toIDR: (price: number): string => formatPrice('id-ID', price, 'IDR')
}

export default formattedPrice
