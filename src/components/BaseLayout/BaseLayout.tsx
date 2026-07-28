interface BaseLayoutProps {
  top: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
}

export default function BaseLayout({ top, middle, bottom }: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {top}
      <div className="flex-1 w-full z-9">{middle}</div>
      <div className="flex-none w-full z-10">{bottom}</div>
    </div>
  );
}
