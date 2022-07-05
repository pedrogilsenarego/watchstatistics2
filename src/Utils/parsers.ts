export const priceBrackets = (price:string) => {
  switch(price) {
    case "0-200€": return "0-200€"
    case "200-500€": return "200-500€"
    case "500-1000€": return "500-1k€"
    case "1000-5000€": return "1k-5k€"
    case "5000-10.000€": return "5k-10k€"
    case "10.000-30.000€": return "10k-30k€"
    case "30.000-50.000€": return "30k-50k€"
    case "50.000-100.000€": return "50k-100k€"
    case "100.000€+": return "100k€plus"
  }
}