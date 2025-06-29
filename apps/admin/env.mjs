// env.mjs - Safe version that doesn't try to modify read-only crypto
if (typeof globalThis.crypto === 'undefined') {
  const nodeCrypto = await import('crypto')
  globalThis.crypto = {
    getRandomValues: (arr) => nodeCrypto.webcrypto.getRandomValues(arr),
    // Add other needed methods
  }
}