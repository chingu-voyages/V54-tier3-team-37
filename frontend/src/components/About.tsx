import { cn } from '@/lib/utils';

import Container from './Container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';

const About = () => {
  return (
    <div className="w-full">
      <AboutWhatIs />
      <AboutKeyFeatures />
    </div>
  );
};

export default About;

const AboutWhatIs = () => {
  const personas = [
    {
      name: 'Students',
      imgSrc: '',
    },
    {
      name: 'Creatives',
      imgSrc: '',
    },
    {
      name: 'Developers',
      imgSrc: '',
    },
    {
      name: 'Businesses',
      imgSrc: '',
    },
  ];

  return (
    <section className="w-full">
      <Container className="gap-32 pt-16 pb-32">
        <div>
          <h2 className="text-3xl font-bold uppercase">Welcome to Prompto</h2>
          <Separator className="border-foreground mx-auto mt-4 max-w-1/2 border-2" />
        </div>
        <div className="grid grid-cols-2 tracking-tighter">
          <div className="grid w-fit h-fit grid-cols-2 text-center tracking-tighter">
            {personas.map((persona, index) => (
              <div
                key={persona.name}
                className={cn(`bg-muted size-40 flex flex-col justify-end p-8`, index % 2 === 0 && 'self-end mt-8 mr-8')}
              >
                <span className="text-xl">{persona.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">What is Prompto?</h3>
            <p className="text-lg leading-loose">
              Prompto is an advanced <strong>AI prompt generator</strong> designed to streamline the
              process of creating effective and tailored prompts that optimize AI model performance.
              It's a versatile tool that caters to various users, including{' '}
              <strong>
                students, developers, engineers, designers, creatives, business professionals and
                many more.
              </strong>{' '}
              With Prompto's structured prompt generating model, users can quickly generate
              well-crafted prompts, eliminating the hassle of writer's blockm trial-and-error, and
              inconsistencies, By using Prompto, individuals can boost their productivity,
              creativity, and efficiency, ensuring that they get the best possible results from AI
              models in a fraction of the time.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

const AboutKeyFeatures = () => {
  const cards = [
    {
      heading: 'Customizable Options',
      description: 'Tailor prompts to your unique needs with our easy-to-use, dynamic interface.',
      imgSrc: '',
    },
    {
      heading: 'Multimodal Support',
      description:
        "Whether you're working with GPT, DALL-E, or other AI models, out generator works across platforms seamlessly.",
      imgSrc: '',
    },
    {
      heading: 'Pre-built Templates',
      description:
        'Choose from a variety of pre-built prompt templates designed to enhance outputs across multiple AI models.',
      imgSrc: '',
    },
    {
      heading: 'Save History',
      description:
        'Save an revisit your past prompts in your personal profile to track your progress, reuse successful queries, and build a library of optimized prompts for future use.',
      imgSrc: '',
    },
  ];

  return (
    <section className="from-muted to-background w-full bg-gradient-to-b from-50% to-50%">
      <Container className="gap-24 pt-16 pb-48">
        <div>
          <h2 className="text-3xl font-bold">Key Features</h2>
          <Separator className="border-foreground mx-auto mt-4 max-w-1/2 border-2" />
        </div>
        <div className="grid h-112 w-full grid-cols-4 gap-8 text-center tracking-tighter">
          {cards.map((card, index) => (
            <Card
              key={card.heading}
              className={cn(`h-fit rounded-none py-16`, index % 2 === 0 && 'self-end')}
            >
              <CardHeader className="gap-8">
                <div className="bg-muted m-auto size-8"></div>
                <CardTitle className="text-xl font-bold">{card.heading}</CardTitle>
              </CardHeader>
              <CardContent>{card.description}</CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
