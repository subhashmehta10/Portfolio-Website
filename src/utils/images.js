export function imageFromQuery(query, seedSuffix = '') {
  const width = 400
  const height = 300
  const normalized = String(query || 'shopping').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()
  const seed = `${normalized}-${seedSuffix || '1'}`
  // picsum.photos is a reliable placeholder image service
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
}


