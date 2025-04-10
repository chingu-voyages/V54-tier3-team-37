import Container from './Container';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="bg-muted w-full text-center">
      <Container className="gap-16 py-32">
        <h1 className="text-h1 max-w-4xl font-bold text-white">
          Unlock the Power of AI with Perfect Prompts, Every Time
        </h1>
        <p className="text-h5 max-w-lg">
          Effortlessly craft AI prompts that delivery consistent, high-quality results—no experience
          required.
        </p>
        <Button
          size="lg"
          className="bg-muted-foreground text-h5 cursor-pointer rounded-2xl px-12 py-8 text-white"
        >
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
