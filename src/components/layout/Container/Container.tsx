import { containerVariants } from "./Container.variants";

interface ContainerProps {
    children?: React.ReactNode;
    verticalSpacing?: boolean | 'large';
}

export default function Container({
    children,
    verticalSpacing = false,
}: ContainerProps) {
    const verticalSpacingSize = verticalSpacing === false
        ? undefined
        : verticalSpacing === 'large'
            ? 'large'
            : 'medium';

    return (
        <div className={containerVariants({ verticalSpacingSize })}>
            {children}
        </div>
    );
}
