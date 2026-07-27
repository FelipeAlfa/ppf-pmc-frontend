interface BaseLayoutProps {
  top: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
}

export default function BaseLayout({ top, middle, bottom }: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-none w-full">{top}</div>
      <div className="flex-1 w-full">{middle}</div>
      <div className="flex-none w-full">{bottom}</div>
    </div>
  );
}
