interface PluralizerProps {
  count: number;
  singular: string;
  plural: string;
}

export default function Pluralizer({
  count,
  singular,
  plural
}: PluralizerProps) {
  if (count === 1 || count === -1) {
    return singular.replace('$n', count.toString());
  }

  return plural.replace('$n', count.toString());
}
