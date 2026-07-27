import { TextFill } from "@/dev/components";
import Container from "@/components/Container/Container";

export default function ServicesPage() {
  return (
    <Container>
      <h1>Services</h1>
      <TextFill initialCount={50} initialText="你好，世界" />
    </Container>
  );
}
