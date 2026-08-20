interface GridViewProp<D> {
    items: D[];
    renderItem: (item: D, index: number) => React.ReactNode
}

export default function GridView<D>({ items, renderItem }: GridViewProp<D>) {
    return (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
                <li key={index}>
                    {renderItem(item, index)}
                </li>
            ))}
        </ul>
    );
}
