export async function fetchIa(tone: string, verbosity: string, text: string, words: string[]) {
  try {
    const response = await fetch(
      'https://scripta-backend.vercel.app/ia/consult',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tone,
          verbosity,
          text,
          dictionary: words
        })
      }
    )
    const data = await response.json()
    return data
  } catch {
    return null
  }
}
