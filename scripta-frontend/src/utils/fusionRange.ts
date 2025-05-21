export function fusionRange(range: [number, number][]) {
  if (range.length === 0) {
    return []
  }

  range.sort((a, b) => a[0] - b[0])
  const result = [range[0]]

  for (let i = 1; i < range.length; i++) {
    const last = result[result.length - 1]
    const actual = range[i]

    if (actual[0] <= last[1]) {
      last[1] = Math.max(last[1], actual[1])
    } else {
      result.push(actual)
    }
  }

  return result
}
