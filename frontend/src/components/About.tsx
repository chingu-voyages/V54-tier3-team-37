import { useEffect, useState } from 'react';

import { Cog, Handshake, Save, Star } from 'lucide-react';

import { type CarouselApi, CarouselDot } from '@/components/ui/carousel';
import { cn } from '@/lib/cn';
import { AboutFeatureCard, AboutReason } from '@/types/ui';

import Container from './Container';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Separator } from './ui/separator';

const About = () => {
  return (
    <div className="w-full">
      <AboutWhat />
      <AboutFeatures />
      <AboutWhy />
      <AboutHow />
    </div>
  );
};

export default About;

const AboutWhat = () => {
  return (
    <section className="w-full from-transparent from-80% to-[#e4cfff] max-sm:bg-gradient-to-b sm:px-8">
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

const AboutHow = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on('scroll', () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const steps = [
    {
      heading: 'Login or Sign Up',
      content: (
        <p className="mx-auto w-11/12">
          Login to your existing account or Sign Up if you don't have one yet. This will give you
          access to the prompt generation features.
        </p>
      ),
      imgSrc: '/step-1.png',
      imgAlt: 'Step 1 Image',
    },
    {
      heading: 'Fill in the form',
      content: (
        <ul className="mx-auto grid w-11/12 list-disc gap-4 sm:grid-cols-2">
          <li>
            <strong>Role:</strong> Define the role or identity you want the AI model to adopt. This
            helps guide the tone and style of the response.
          </li>
          <li>
            <strong>Output:</strong> Detail the format, style, and tone of the AI's response. Do you
            need a creative piece, a formal report, or a technical document?
          </li>
          <li>
            <strong>Task:</strong> Clearly specify the action or output you want from the AI model.
            Be direct and concise about what you need.
          </li>
          <li>
            <strong>Context:</strong> Provide background information relevant to the task. This
            ensures the AI understands the situation or specific task at hand.
          </li>
          <li>
            <strong>Constraints:</strong> Set any limitations or guidelines the AI must follow, such
            as accessibility requirements, word count limits, or content restrictions.
          </li>
        </ul>
      ),
      imgSrc: '/step-2.png',
      imgAlt: 'Step 2 Image',
    },
    {
      heading: 'Click "Generate Prompt"',
      content: (
        <p className="mx-auto w-11/12">
          Once all fields are filled, click the <strong>"Generate Prompt"</strong> button to
          generate your custom prompt based on the input provided.
        </p>
      ),
      imgSrc: '/step-3.png',
      imgAlt: 'Step 3 Image',
    },
    {
      heading: 'View the result',
      content: (
        <ul className="mx-auto grid w-11/12 list-disc gap-4">
          <li>
            <strong>Copy:</strong> The generated prompt will appear in the <strong>"Result"</strong>{' '}
            section. You can copy it by selecting the text and using <strong>Ctrl+C (Cmd+C)</strong>{' '}
            or the <strong>"Copy"</strong> button.
          </li>
          <li>
            <strong>Save for Future Use:</strong> If you plan to use the prompt later, save it the
            app for quick access.
          </li>
          <li>
            <strong>Regenerate:</strong> If you’re not satisfied with the result, click "Regenerate"
            to create a new version of the prompt with potentially different output.
          </li>
        </ul>
      ),
      imgSrc: '/step-4.png',
      imgAlt: 'Step 4 Image',
    },
  ];

  return (
    <section className="w-full sm:px-8">
      <Container className="gap-32 pt-16 pb-32">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-wide text-prompto-accent uppercase">
            How to Use Prompto's AI Prompt Generator?
          </h2>
          <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-prompto-accent" />
        </div>
        <Card className="max-w-screen shadow-xl shadow-prompto-primary/50">
          <CardContent>
            <Carousel setApi={setApi}>
              <div className="flex justify-center gap-8 pt-4 pb-8">
                {Array.from('s'.repeat(steps.length)).map((_, i) => (
                  <CarouselDot
                    key={i}
                    index={i}
                    selectedIndex={selectedIndex}
                    scrollToIndex={(i) => api?.scrollTo(i)}
                  />
                ))}
              </div>
              <CarouselContent>
                {steps.map((step) => (
                  <CarouselItem
                    key={step.heading}
                    className="flex h-fit flex-col items-center justify-between gap-12 pb-12 text-prompto-gray-dark"
                  >
                    <h3 className="text-h4">{step.heading}</h3>
                    <div className="flex h-full flex-col items-center justify-between gap-8 max-sm:flex-col-reverse">
                      <div className="px-4">{step.content}</div>
                      <img
                        src={step.imgSrc}
                        alt={step.imgAlt}
                        className="w-5/6 sm:pb-16"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="max-sm:hidden">
                <CarouselPrevious variant="link" />
                <CarouselNext variant="link" />
              </div>
            </Carousel>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};
