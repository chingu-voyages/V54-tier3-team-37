import { Skeleton } from './ui/skeleton';

const About = () => {
  return (
    <section className="text-center flex w-full max-w-xl flex-col items-center gap-10">
      <h3 className="text-xl">What is an AI Prompt Generator?</h3>
      <div className="w-full space-y-4">
        <Skeleton className=" h-5 w-full" />
        <Skeleton className=" h-5 w-full" />
        <Skeleton className=" h-5 w-2/3" />
      </div>
      <h3 className="text-xl">How do I use an AI Prompt Generator?</h3>
      <div className="w-full flex justfiy-between gap-10">
        <Skeleton className="h-full w-full" />
        <div className="w-full space-y-4">
          <Skeleton className=" h-5 w-full" />
          <Skeleton className=" h-5 w-full" />
          <Skeleton className=" h-5 w-2/3" />
        </div>
      </div>
    </section>
  );
};

export default About;
