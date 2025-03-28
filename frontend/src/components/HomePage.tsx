import Hero from './Hero';
import About from './About';
import PromptGenMockup from './PromptGenMockup';
import { useAppSelector } from '@/store/hooks';

const HomePage = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <>
      <Hero />
      {user ? (
        <PromptGenMockup />
      ) : (
        <div className="bg-muted w-full p-16">
          <p className="mx-auto max-w-xl text-center">
            💫 Oh no you're not logged in ahhh you can't see the prompt creator hurry up and log in
            you know you want to get this show on the road yeah? 🐕
          </p>
        </div>
      )}
      <About />
    </>
  );
};

export default HomePage;
