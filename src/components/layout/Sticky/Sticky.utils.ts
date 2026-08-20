export function getStickyCSSName(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function getStickyStackExpression(stack?: string | string[]) {
  const stackItems = typeof stack === "string" ? [stack] : stack;

  if (!stackItems?.length) {
    return "0px";
  }

  return `calc(${stackItems
    .map((stackItem) => `var(--layout-offset-${getStickyCSSName(stackItem)}, 0px)`)
    .join(" + ")})`;
}
