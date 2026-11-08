type SectionPosition = { id: string; top: number };

/** Pick the nearest section above the anchor line, independent of event order. */
export function getActiveSection(
  sections: readonly SectionPosition[],
  activationLine: number,
): string | undefined {
  let current: SectionPosition | undefined;
  for (const section of sections) {
    if (
      section.top <= activationLine &&
      (!current || section.top > current.top)
    ) {
      current = section;
    }
  }
  return (current ?? sections[0])?.id;
}
