import Container from './Container';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="bg-muted text-muted-foreground w-full text-center">
      <Container className="gap-16 py-32">
        <h1 className="max-w-4xl text-5xl font-bold">
          Unlock the Power of AI with Perfect Prompts, Every Time
        </h1>
        <p className="max-w-lg text-xl">
          Effortlessly craft AI prompts that delivery consistent, high-quality results—no experience
          required.
        </p>
        <Button
          size="lg"
          className="bg-muted-foreground text-muted cursor-pointer rounded-2xl px-12 py-8 text-2xl"
        >
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
