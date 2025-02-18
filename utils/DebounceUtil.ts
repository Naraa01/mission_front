// eslint-disable-next-line prettier/prettier
export function debounce<F extends((...args: Parameters<F>) => ReturnType<F>)>(
  func: F,
  waitFor: number,
): (...args: Parameters<F>) => void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }
}
