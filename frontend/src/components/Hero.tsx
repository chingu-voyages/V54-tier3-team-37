import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAppSelector } from '@/store/hooks';

import Container from './Container';
import Nav from './Nav';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const Hero = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="flex w-full flex-col bg-[url(/hero-image.png)] bg-cover text-center text-white">
      <header className="w-full">
        <Nav />
      </header>
      <Container className="gap-16 py-20">
        <h1 className="text-h1 max-w-4xl">
          Unlock the Power of AI with Perfect Prompts, Every Time
        </h1>
        <p className="text-h5 max-w-2xl">
          Effortlessly craft AI prompts that deliver consistent, high-quality results—no experience
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

          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="max-sm:w-full"
                onClick={() => setOpen(true)}
              >
                See How It Works
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-6xl p-4">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full rounded-lg"
                  src="https://www.youtube.com/embed/1KSk7SBugYM"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
