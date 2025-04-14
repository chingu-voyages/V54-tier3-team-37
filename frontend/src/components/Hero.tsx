import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';

import Container from './Container';
import Nav from './Nav';
import { Button } from './ui/button';

const Hero = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="flex min-h-screen w-full flex-col bg-[url('hero-image.png')] bg-cover text-center text-white">
      <header className="w-full">
        <Nav />
      </header>
      <Container className="gap-16 py-40">
        <h1 className="text-h1 max-w-4xl">
          Unlock the Power of AI with Perfect Prompts, Every Time
        </h1>
        <p className="text-h5 max-w-2xl">
          Effortlessly craft AI prompts that delivery consistent, high-quality results—no experience
          required.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGetStartedClick}
            className="place-self-end"
          >
            Get Started
          </Button>
          <button className="text-h5 active:prompto-gray-dark inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 place-self-center rounded-lg bg-transparent px-6 py-4 whitespace-nowrap text-white transition-all duration-300 outline-none hover:bg-[#E6E5FF] hover:text-prompto-gray-dark focus-visible:border-white focus-visible:ring-[3px] focus-visible:ring-white/50 active:scale-95 active:bg-[#AEA7FF] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-4 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            See How It Works
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
