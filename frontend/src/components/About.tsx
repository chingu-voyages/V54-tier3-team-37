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
    <section className="w-full">
      <Container className="gap-32 pt-16 pb-32">
        <div>
          <h2 className="text-center text-3xl font-bold text-prompto-accent uppercase">
            Welcome to Prompto
          </h2>
          <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-prompto-accent" />
        </div>
        <div className="max-w-4xl tracking-tighter">
          <div className="relative space-y-8 text-center text-lg">
            <span className="pointer-events-none absolute -top-10 left-0 text-5xl font-bold tracking-wider text-prompto-gray-extralight">
              Students
            </span>
            <span className="pointer-events-none absolute -top-0 right-20 text-3xl font-bold tracking-wider text-prompto-gray-extralight">
              Bloggers
            </span>
            <span className="pointer-events-none absolute -right-5 bottom-0 text-5xl font-bold tracking-wider text-prompto-gray-extralight">
              Developers
            </span>
            <span className="pointer-events-none absolute right-1/2 -bottom-10 text-2xl font-bold tracking-wider text-prompto-gray-extralight">
              Businesses
            </span>
            <span className="pointer-events-none absolute bottom-5 left-10 text-4xl font-bold tracking-wider text-prompto-gray-extralight">
              Creatives
            </span>
            <h3 className="text-2xl font-semibold text-prompto-primary">What is Prompto?</h3>
            <p className="pb-32 text-center leading-loose text-prompto-gray-dark">
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
      heading: 'Pre-built Templates',
      description:
        'Choose from a variety of pre-built prompt templates designed to enhance outputs across multiple AI models.',
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
    <section className="w-full max-sm:bg-muted sm:bg-gradient-to-b sm:from-[#e4cfff] sm:from-0% sm:via-[#a3daff] sm:via-50% sm:to-background sm:to-50%">
      <Container className="gap-24 pt-16 pb-48">
        <div>
          <h2 className="text-center text-3xl font-bold text-prompto-accent">Key Features</h2>
          <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-prompto-accent" />
        </div>
        <div className="w-full gap-8 text-center tracking-tighter max-sm:flex max-sm:flex-col max-sm:gap-16 sm:grid sm:h-112 sm:grid-cols-4">
          {cards.map((card, index) => (
            <Card
              key={card.heading}
              className={cn(`h-fit rounded-none pt-12 pb-16`, index % 2 === 0 && 'self-end')}
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
    <section className="w-full">
      <Container className="gap-32 pt-16 pb-32">
        <div>
          <h2 className="text-center text-3xl font-bold text-prompto-accent uppercase">
            Why Choose Our AI Prompt Generator
          </h2>
          <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-prompto-accent" />
        </div>
        <div className="tracking-tighter max-sm:flex max-sm:flex-col-reverse max-sm:gap-16 sm:grid sm:grid-cols-2 sm:gap-32">
          <div className="space-y-8 tracking-tighter">
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
          <img src="/bot-explainer.png" />
        </div>
      </Container>
    </section>
  );
};

// const AboutHow = () => {
//   const steps: AboutStep[] = [
//     {
//       step: 1,
//       name: 'Login or Sign Up',
//       items: [
//         {
//           heading: '',
//           description: (
//             <p>
//               Login to your existing account or Sign Up if you don't have one yet. This will give
//               you access to the prompt generation features.
//             </p>
//           ),
//         },
//       ],
//     },
//     {
//       step: 2,
//       name: 'Fill in the form',
//       items: [
//         {
//           heading: 'Persona',
//           description: (
//             <p className="inline">
//               Define the role or identity you want the AI model to adopt (e.g. "UX Designer",
//               "Content Writer"). This helps guide the tone and style of the response.
//             </p>
//           ),
//         },
//         {
//           heading: 'Context',
//           description: (
//             <p className="inline">
//               Provide background information relevant to the task. This ensures the AI understands
//               the situation or specific task at hand.
//             </p>
//           ),
//         },
//         {
//           heading: 'Task',
//           description: (
//             <p className="inline">
//               Clearly specify the action or output you want from the AI model. Be direct and concise
//               about what you need.
//             </p>
//           ),
//         },
//         {
//           heading: 'Output',
//           description: (
//             <p className="inline">
//               Detail the format, style, and tone of the AI's response. Do you need a creative piece,
//               a formal report, or a technical document?
//             </p>
//           ),
//         },
//         {
//           heading: 'Constraints',
//           description: (
//             <p className="inline">
//               Set any limitations or guidelines the AI must follow, such as accessibility
//               requirements, word count limits, or content restrictions.
//             </p>
//           ),
//         },
//       ],
//     },
//     {
//       step: 3,
//       name: 'Click "Generate Prompt"',
//       items: [
//         {
//           heading: '',
//           description: (
//             <p>
//               Once all fields are filled, click, the <strong>"Generate Prompt"</strong> button to
//               generate your custom prompt based on the input provided.
//             </p>
//           ),
//         },
//       ],
//     },
//     {
//       step: 4,
//       name: 'View the result',
//       items: [
//         {
//           heading: 'Copy',
//           description: (
//             <p className="inline">
//               The generated prompt will appear in the <strong>"Result"</strong> section. You can
//               copy it by selecting the text and using <strong>Ctrl+C (Cmd+C)</strong>or the{' '}
//               <strong>"Copy" button.</strong>
//             </p>
//           ),
//         },
//         {
//           heading: 'Save for Future Use',
//           description: (
//             <p className="inline">
//               If you plan to use the prompt later, save it to your device, or store it in the app
//               for quick access.
//             </p>
//           ),
//         },
//         {
//           heading: 'Regenerate',
//           description: (
//             <p className="inline">
//               If you're not satisfied with the result, click "Regenerate" to create a new version of
//               the prompt with potentially different output.
//             </p>
//           ),
//         },
//       ],
//     },
//   ];

//   return (
//     <section className="w-full">
//       <Container className="gap-32 pt-16 pb-32">
//         <div>
//           <h2 className="text-3xl font-bold uppercase">How to Use Prompto's AI Prompt Generator</h2>
//           <Separator className="mx-auto mt-4 max-w-1/2 border-2 border-muted-foreground" />
//         </div>

//         <ol className="space-y-16 text-lg">
//           {steps.map((step) => (
//             <li
//               key={step.step}
//               className="justify-between tracking-tighter max-sm:flex max-sm:flex-col-reverse max-sm:gap-16 sm:grid sm:grid-cols-2 sm:gap-32"
//             >
//               <div className="space-y-4">
//                 <h3 className="font-bold">
//                   Step {step.step}: {step.name}
//                 </h3>
//                 {step.items.length > 1 ? (
//                   <ul className="list-disc space-y-4">
//                     {step.items.map((item) => (
//                       <li
//                         key={item.heading}
//                         className="ml-8"
//                       >
//                         <h4 className="inline font-bold">{item.heading}</h4>: {item.description}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   step.items[0].description
//                 )}
//               </div>
//               <div className="mt-12 h-full w-full bg-muted max-sm:h-48"></div>
//             </li>
//           ))}
//         </ol>
//       </Container>
//     </section>
//   );
// };
