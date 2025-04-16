import { Cog, Handshake, Save, Star } from 'lucide-react';

import { cn } from '@/lib/cn';
import { AboutFeatureCard, AboutReason } from '@/types/ui';

import Container from './Container';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

const About = () => {
  return (
    <div className="w-full">
      <AboutWhat />
      <AboutFeatures />
      <AboutWhy />
      {/* <AboutHow /> */}
    </div>
  );
};

export default About;

const AboutWhat = () => {
  return (
    <section className="w-full from-background from-80% to-[#e4cfff] max-sm:bg-gradient-to-b sm:px-8">
      <Container className="gap-32 pt-16 pb-32">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-wide text-prompto-accent uppercase">
            Welcome to Prompto
          </h2>
          <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-prompto-accent" />
        </div>
        <div className="max-w-4xl tracking-tighter">
          <div className="relative space-y-8 text-center text-lg">
            <span className="pointer-events-none absolute -top-10 left-0 -z-10 text-5xl font-semibold tracking-wider text-prompto-gray-extralight max-sm:-top-20 max-sm:-left-8">
              Students
            </span>
            <span className="pointer-events-none absolute top-6 right-20 -z-10 text-3xl font-semibold tracking-wider text-prompto-gray-extralight max-sm:-top-12 max-sm:-right-8">
              Bloggers
            </span>
            <span className="max-sm: max-sm: pointer-events-none absolute -right-5 bottom-0 -z-10 text-5xl font-semibold tracking-wider text-prompto-gray-extralight max-sm:top-10">
              Developers
            </span>
            <span className="max-sm: max-sm: pointer-events-none absolute right-1/2 -bottom-10 -z-10 text-2xl font-semibold tracking-wider text-prompto-gray-extralight max-sm:top-3 max-sm:left-0">
              Businesses
            </span>
            <span className="max-sm: max-sm: pointer-events-none absolute bottom-5 left-10 -z-10 text-4xl font-semibold tracking-wider text-prompto-gray-extralight max-sm:-top-6 max-sm:right-20">
              Creatives
            </span>
            <h3 className="text-2xl font-semibold tracking-wide text-prompto-primary max-sm:pt-32">
              What is Prompto?
            </h3>
            <p className="pb-32 text-center leading-loose tracking-wide text-prompto-gray-dark">
              Prompto is an advanced <strong>AI prompt generator</strong> designed to streamline the
              process of creating effective and tailored prompts that optimize AI model performance.
              It's a versatile tool that caters to various users, including{' '}
              <strong>
                students, developers, engineers, designers, creatives, business professionals and
                many more.
              </strong>{' '}
              With Prompto's structured prompt generating model, users can quickly generate
              well-crafted prompts, eliminating the hassle of writer's block, trial-and-error, and
              inconsistencies. By using Prompto, individuals can boost their productivity,
              creativity, and efficiency, ensuring that they get the best possible results from AI
              models in a fraction of the time.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

const AboutFeatures = () => {
  const cards: AboutFeatureCard[] = [
    {
      heading: 'Customizable Options',
      description: 'Tailor prompts to your unique needs with our easy-to-use, dynamic interface.',
      icon: <Cog className="size-10 self-center text-prompto-primary" />,
    },
    {
      heading: 'Multimodal Support',
      description:
        "Whether you're working with GPT, DALL-E, or other AI models, out generator works across platforms seamlessly.",
      icon: <Handshake className="size-10 self-center text-prompto-primary" />,
    },
    {
      heading: 'Rate your prompt',
      description:
        'After generating a prompt, give it a personal rating to track your growth, spot what works best, and fine-tune your creative process over time.',
      icon: <Star className="size-10 self-center text-prompto-primary" />,
    },
    {
      heading: 'Save History',
      description:
        'Save and revisit your past prompts in your personal profile to track your progress, reuse successful queries, and build a library of optimized prompts for future use.',
      icon: <Save className="size-10 self-center text-prompto-primary" />,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#e4cfff] from-0% via-[#a3daff] via-75% to-background to-100% lg:via-50% lg:to-50%">
      <Container className="gap-24 pt-16 pb-48">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-wide text-prompto-accent uppercase">
            Key Features
          </h2>
          <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-prompto-accent" />
        </div>
        <div className="w-full gap-8 text-center tracking-tighter max-sm:flex max-sm:flex-col max-sm:gap-16 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Card
              key={card.heading}
              className={cn(
                `h-fit rounded-none pt-12 pb-16 tracking-wide`,
                index % 2 === 0 && 'self-end'
              )}
            >
              <CardHeader className="gap-12">
                {card.icon}
                <CardTitle className="text-xl font-bold">{card.heading}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 text-prompto-gray-dark">{card.description}</CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

const AboutWhy = () => {
  const reasons: AboutReason[] = [
    {
      heading: 'Simplified Prompt Creation',
      description: 'No more guessing. Generate prompts that align with your goals instantly.',
    },
    {
      heading: 'Consistency & Quality',
      description:
        "Ensure your AI's outputs are predictable, relevant, and of high quality, every time.",
    },
    {
      heading: 'Save Time & Boost Productivity',
      description:
        'Focus on what matters most—innovation—while we handle the prompt crafting for you.',
    },
  ];

  return (
    <section className="w-full sm:px-8">
      <Container className="gap-32 pt-16 pb-32 max-lg:gap-16">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-wide text-prompto-accent uppercase">
            Why Choose Our AI Prompt Generator
          </h2>
          <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-prompto-accent" />
        </div>
        <div className="tracking-tighter max-md:flex max-md:flex-col-reverse max-md:gap-16 md:grid md:grid-cols-2 md:gap-32">
          <div className="space-y-8 tracking-wide">
            {reasons.map((reason) => (
              <div
                key={reason.heading}
                className="text-lg max-sm:text-center"
              >
                <h3 className="inline font-bold">{reason.heading}: </h3>
                <p className="inline">{reason.description}</p>
              </div>
            ))}
          </div>
          <img
            src="/bot-explainer.png"
            className="place-self-center"
          />
        </div>
      </Container>
    </section>
  );
};
