export const randomDelay = async () => {
  const randomMs = Math.random() * 10_000
  
  return new Promise((resolve) => setTimeout(resolve, randomMs))
}
