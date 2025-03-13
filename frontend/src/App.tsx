import About from './components/About';
import Hero from './components/Hero';
import PromptGenMockup from './components/PromptGenMockup';

function App() {
  let user;

  return (
    <div className="flex flex-col gap-8 h-screen w-screen items-center justify-start py-16">
      <Hero />
      {user ? <PromptGenMockup /> : <div className="bg-muted w-full max-w-xl text-center p-16">Oh no you're not logged in ahhh you can't see the prompt creator hurry up and log in 🐕</div>}
      <About />
    </div>
  );
}

export default App;
