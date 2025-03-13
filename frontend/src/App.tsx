import Hero from './components/Hero';
import PromptGenMockup from './components/PromptGenMockup';

function App() {
  return (
    <div className="flex flex-col gap-8 h-screen w-screen items-center justify-start py-16">
      <Hero />
      <PromptGenMockup />
    </div>
  );
}

export default App;
