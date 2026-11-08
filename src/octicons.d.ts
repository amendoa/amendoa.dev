declare module '@primer/octicons' {
  const icons: Record<string, { toSVG(options: Record<string, unknown>): string }>
  export default icons
}
