export const trimAddress = (addr: string) => {
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
}

export const swrFetcher = (url: string) => fetch(url).then((r) => r.json())
