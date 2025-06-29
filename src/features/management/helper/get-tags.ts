export default function getTags (row) {
  return [
    'word',
    ...Object.keys(row).filter(key => key.startsWith('is_') && row[key])
  ]
}
