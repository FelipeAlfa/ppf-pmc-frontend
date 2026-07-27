import { containerVariants } from "./Container.variants";

interface ContainerProps {
    children?: React.ReactNode;
    verticalSpacing?: boolean;
}

export default function Container({
    children,
    verticalSpacing = false,
}: ContainerProps) {
    return (
        <div className={containerVariants({ verticalSpacing })}>
            {children}
        </div>
    );
}
