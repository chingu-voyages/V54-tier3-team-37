import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="text-center flex max-w-xl flex-col items-center gap-10">
      <h1 className="text-5xl font-bold">AI Prompt Generator</h1>
      <p className="text-lg">
        Create effective prompts for AI systems with our intuitive generator. Fill in the details
        below to generate a well-structured prompt.
      </p>
      <Button size="lg">Get Started</Button>
    </section>
  );
}

export default Hero
