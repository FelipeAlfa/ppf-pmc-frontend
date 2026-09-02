interface EventDetailLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function EventDetailLayout({
  children,
  modal,
}: EventDetailLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
