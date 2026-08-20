export default function Section ({ children }: { children: React.ReactNode }) {
    return (
        <section className="my-4">
            {children}
        </section>
    );
}
