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
    <section className="relative flex min-h-[calc(100vh)] w-full flex-col bg-cover text-center text-white">
      <img
        src="/hero-image.png"
        className="absolute top-0 left-0 -z-10 size-full object-cover"
      />
      <header className="w-full">
        <Nav />
      </header>
      <Container className="gap-16 py-20 lg:py-60">
        <h1 className="text-h1 max-w-4xl">
          Unlock the Power of AI with Perfect Prompts, Every Time
        </h1>
        <p className="text-h5 max-w-2xl">
          Effortlessly craft AI prompts that delivery consistent, high-quality results—no experience
          required.
        </p>
        <div className="flex items-center gap-4 max-sm:flex-col sm:gap-8">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGetStartedClick}
            className="max-sm:w-full"
          >
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="lg"
          >
            See How It Works
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
