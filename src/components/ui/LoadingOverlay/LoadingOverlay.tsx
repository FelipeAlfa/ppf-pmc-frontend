import { loadingOverlayCircleVariants } from "./LoadingOverlay.variants";

interface LoadingOverlayProps {
  small?: boolean
}

export default function LoadingOverlay({
  small = false
}: LoadingOverlayProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/70"
      role="status"
      aria-label="Loading...">
      <span className={loadingOverlayCircleVariants({ small })} />
    </div>
  );
}
