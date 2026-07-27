import { TextFill } from "@/dev/components";
import Container from "@/components/Container/Container";

export default function AboutPage() {
  return (
    <Container>
      <h1>About</h1>
      <TextFill initialCount={50} initialText="你好，世界" />
    </Container>
  );
}
