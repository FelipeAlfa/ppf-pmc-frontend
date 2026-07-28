interface FilterGroup {
  title: string;
  items: string[];
}

interface FilterListProps {
  groups: FilterGroup[];
}

export default function FilterList({ groups }: FilterListProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <fieldset className="space-y-3" key={group.title}>
          <legend className="text-xs font-bold uppercase tracking-wider text-foreground">
            {group.title}
          </legend>
          <div className="space-y-2">
            {group.items.map((item) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm" key={item}>
                <input
                  className="h-4 w-4 accent-brand-blue"
                  type="checkbox"
                  name={group.title}
                  value={item} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
