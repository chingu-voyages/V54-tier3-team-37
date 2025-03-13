import About from './components/About';
import Hero from './components/Hero';
import PromptGenMockup from './components/PromptGenMockup';

function App() {
  let user;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-8 py-16">
      <Hero />
      {user ? (
        <PromptGenMockup />
      ) : (
        <div className="bg-muted w-full p-16">
          <p className="text-center max-w-xl mx-auto">
            💫 Oh no you're not logged in ahhh you can't see the prompt creator hurry up and log in you know you want to get this show on the road yeah? 🐕
          </p>
        </div>
      )}
      <About />
    </div>
  );
}

export default App;
