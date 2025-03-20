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
    <div className="w-full text-muted-foreground">
      <AboutWhat />
      <AboutFeatures />
      <AboutWhy />
      <AboutHow />
    </div>
  );
};

export default About;

const AboutWhat = () => {
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
          <Separator className="border-muted-foreground mx-auto mt-4 max-w-1/2 border-2" />
        </div>
        <div className="grid grid-cols-2 tracking-tighter">
          <div className="grid h-fit w-fit grid-cols-2 text-center tracking-tighter">
            {personas.map((persona, index) => (
              <div
                key={persona.name}
                className={cn(
                  `bg-muted flex size-40 flex-col justify-end p-8`,
                  index % 2 === 0 && 'mt-8 mr-8 self-end'
                )}
              >
                <span className="text-xl">{persona.name}</span>
              </div>
            ))}
          </div>
          <div className="space-y-8">
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

const AboutFeatures = () => {
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
          <Separator className="border-muted-foreground mx-auto mt-4 max-w-1/2 border-2" />
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

const AboutWhy = () => {
  const reasons = [
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
    <section className="w-full">
      <Container className="gap-32 pt-16 pb-32">
        <div>
          <h2 className="text-3xl font-bold uppercase">Why Choose Our AI Prompt Generator</h2>
          <Separator className="border-muted-foreground mx-auto mt-4 max-w-1/2 border-2" />
        </div>
        <div className="grid grid-cols-2 gap-32 tracking-tighter">
          <div className="space-y-16 tracking-tighter">
            {reasons.map((reason) => (
              <div
                key={reason.heading}
                className="text-lg"
              >
                <h3 className="inline font-bold">{reason.heading}: </h3>
                <p className="inline">{reason.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-muted h-full w-full"></div>
        </div>
      </Container>
    </section>
  );
};

const AboutHow = () => {
  const reasons = [
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

  const steps = [
    {
      step: 1,
      name: 'Login or Sign Up',
      items: [
        {
          heading: '',
          description: (
            <p>
              Login to your existing account or Sign Up if you don't have one yet. This will give
              you access to the prompt generation features.
            </p>
          ),
        },
      ],
    },
    {
      step: 2,
      name: 'Fill in the form',
      items: [
        {
          heading: 'Persona',
          description: (
            <p className="inline">
              Define the role or identity you want the AI model to adopt (e.g. "UX Designer",
              "Content Writer"). This helps guide the tone and style of the response.
            </p>
          ),
        },
        {
          heading: 'Context',
          description: (
            <p className="inline">
              Provide background information relevant to the task. This ensures the AI understands
              the situation or specific task at hand.
            </p>
          ),
        },
        {
          heading: 'Task',
          description: (
            <p className="inline">
              Clearly specify the action or output you want from the AI model. Be direct and concise
              about what you need.
            </p>
          ),
        },
        {
          heading: 'Output',
          description: (
            <p className="inline">
              Detail the format, style, and tone of the AI's response. Do you need a creative piece,
              a formal report, or a technical document?
            </p>
          ),
        },
        {
          heading: 'Constraints',
          description: (
            <p className="inline">
              Set any limitations or guidelines the AI must follow, such as accessibility
              requirements, word count limits, or content restrictions.
            </p>
          ),
        },
      ],
    },
    {
      step: 3,
      name: 'Click "Generate Prompt"',
      items: [
        {
          heading: '',
          description: (
            <p>
              Once all fields are filled, click, the <strong>"Generate Prompt"</strong> button to
              generate your custom prompt based on the input provided.
            </p>
          ),
        },
      ],
    },
    {
      step: 4,
      name: 'View the result',
      items: [
        {
          heading: 'Copy',
          description: (
            <p className="inline">
              The generated prompt will appear in the <strong>"Result"</strong> section. You can
              copy it by selecting the text and using <strong>Ctrl+C (Cmd+C)</strong>or the{' '}
              <strong>"Copy" button.</strong>
            </p>
          ),
        },
        {
          heading: 'Save for Future Use',
          description: (
            <p className="inline">
              If you plan to use the prompt later, save it to your device, or store it in the app
              for quick access.
            </p>
          ),
        },
        {
          heading: 'Regenerate',
          description: (
            <p className="inline">
              If you're not satisfied with the result, click "Regenerate" to create a new version of
              the prompt with potentially different output.
            </p>
          ),
        },
      ],
    },
  ];

  return (
    <section className="w-full">
      <Container className="gap-32 pt-16 pb-32">
        <div>
          <h2 className="text-3xl font-bold uppercase">How to Use Prompto's AI Prompt Generator</h2>
          <Separator className="border-muted-foreground mx-auto mt-4 max-w-1/2 border-2" />
        </div>

        <ol className="space-y-16 text-lg">
          {steps.map((step) => (
            <li
              key={step.step}
              className="grid grid-cols-2 justify-between gap-32 tracking-tighter"
            >
              <div className="space-y-4">
                <h3 className="font-bold">
                  Step {step.step}: {step.name}
                </h3>
                {step.items.length > 1 ? (
                  <ul className="list-disc space-y-4">
                    {step.items.map((item) => (
                      <li
                        key={item.heading}
                        className="ml-8"
                      >
                        <h4 className="inline font-bold">{item.heading}</h4>: {item.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  step.items[0].description
                )}
              </div>
              <div className="bg-muted mt-12 h-full w-full"></div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};
