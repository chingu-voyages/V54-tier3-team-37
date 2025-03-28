import { Button } from './ui/button';
import {
  Card,
  CardContent,
} from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';

const selects = [
  {
    label: 'Prompt Type',
    options: [
      {
        value: 'text-generation',
        text: 'Text Generation',
      },
      {
        value: 'image-generation',
        text: 'Image Generation',
      },
      {
        value: 'code-generation',
        text: 'Code Generation',
      },
      {
        value: 'chat-conversation',
        text: 'Chat/Conversation',
      },
      {
        value: 'custom',
        text: 'Custom',
      },
    ],
  },
  {
    label: 'Tone',
    options: [
      {
        value: 'neutral',
        text: 'Neutral',
      },
      {
        value: 'casual',
        text: 'Casual',
      },
      {
        value: 'friendly',
        text: 'Friendly',
      },
      {
        value: 'professional',
        text: 'Professional',
      },
      {
        value: 'formal',
        text: 'Formal',
      },
    ],
  },
  {
    label: 'Output Format',
    options: [
      {
        value: 'paragraph',
        text: 'Paragraph',
      },
      {
        value: 'bullet-points',
        text: 'Bullet Points',
      },
      {
        value: 'numbered-list',
        text: 'Numbered List',
      },
      {
        value: 'table',
        text: 'Table',
      },
    ],
  },
];

const PromptGenMockup = () => {
  return (
    <div className="flex w-xl max-w-full flex-col items-center gap-8 pb-16">
      <Card className="w-full">
        <CardContent>
          <h2 className="mb-8 text-center text-2xl">Prompt Builder #1</h2>
          <div className="grid grid-cols-2 gap-8">
            <Label className="col-span-2 flex flex-col items-start sm:col-span-1">
              Task Description
              <Textarea className="h-full" />
            </Label>
            <div className="flex flex-col gap-4">
              {selects.map((item) => (
                <Label
                  key={item.label}
                  className="col-span-2 flex flex-col items-start sm:col-span-1"
                >
                  {item.label}
                  <Select>
                    <SelectTrigger className="w-full min-w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {item.options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Label>
              ))}
            </div>
            <Label className="col-span-2 flex flex-col items-start">
              Context/Background
              <Textarea
                placeholder="Provide any relevant context or background information"
                className="h-full min-h-24"
              />
            </Label>
            <Label className="col-span-2 flex flex-col items-start">
              Response Length
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
              />
            </Label>
          </div>
        </CardContent>
      </Card>
      <Button
        size="lg"
        className="cursor-pointer"
      >
        Generate Prompt
      </Button>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-8">
          <h2 className="text-center text-2xl">Prompt Builder #2</h2>
          <Label className="col-span-2 flex flex-col items-start">
            Persona
            <Textarea className="h-full min-h-24 min-w-[240px]" />
          </Label>
          <Label className="col-span-2 flex flex-col items-start">
            Context
            <Textarea className="h-full min-h-24 min-w-[240px]" />
          </Label>
          <Label className="col-span-2 flex flex-col items-start">
            Task
            <Textarea className="h-full min-h-24 min-w-[240px]" />
          </Label>
          <Label className="col-span-2 flex flex-col items-start">
            Output
            <Textarea className="h-full min-h-24 min-w-[240px]" />
          </Label>
          <Label className="col-span-2 flex flex-col items-start">
            Constraints
            <Textarea className="h-full min-h-24 min-w-[240px]" />
          </Label>
        </CardContent>
      </Card>
      <Button
        size="lg"
        className="cursor-pointer"
      >
        Generate Prompt
      </Button>
    </div>
  );
};

export default PromptGenMockup;
