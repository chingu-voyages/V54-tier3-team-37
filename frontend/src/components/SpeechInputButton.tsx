import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AlertCircle, Mic, MicOff } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { cn } from '@/lib/cn';
import { FormValues } from '@/types/prompt';

import { Button } from './ui/button';

// Optional I think because I installed the types as devDeps
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechInputButtonProps {
  fieldName: keyof FormValues;
  form: UseFormReturn<FormValues>;
  language?: string;
  className?: string;
}

const languageMap: { [key: string]: string } = {
  EN: 'en-US',
  ES: 'es-ES',
  FR: 'fr-FR',
};

const SpeechInputButton: React.FC<SpeechInputButtonProps> = ({
  fieldName,
  form,
  language = 'EN',
  className,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.warn('Web Speech API not supported by this browser.');
      setIsSupported(false);
      toast.error('Speech recognition is not supported by your browser.');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || isListening) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.error('SpeechRecognition API constructor not found.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;

    recognition.lang = languageMap[language] || 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        const currentVal = form.getValues(fieldName) || '';
        form.setValue(fieldName, (currentVal + ' ' + transcript).trim(), {
          shouldValidate: true,
          shouldDirty: true,
        });
        toast.success('Text added from speech.');
      } else {
        toast.error('Could not understand speech.');
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      let errorMsg = 'Speech recognition error.';
      switch (event.error) {
        case 'no-speech':
          errorMsg = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMsg = 'Microphone error. Please ensure it is enabled.';
          break;
        case 'not-allowed':
          errorMsg = 'Microphone permission denied. Please allow access.';
          break;
        case 'network':
          errorMsg = 'Network error during speech recognition.';
          break;
        default:
          errorMsg = `An unknown error occurred: ${event.error}`;
      }
      toast.error(errorMsg, { icon: <AlertCircle className="text-red-600" /> });
      recognitionRef.current = null;
      setIsListening(false);
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
    };

    try {
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Could not start microphone.', {
        icon: <AlertCircle className="text-red-600" />,
      });
      recognitionRef.current = null;
      setIsListening(false);
    }
  }, [isSupported, isListening, language, fieldName, form]);

  const handleToggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const buttonTitle = !isSupported
    ? 'Speech input not supported'
    : isListening
      ? 'Stop listening'
      : `Start listening (${languageMap[language] || 'en-US'})`;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleToggleListen}
      disabled={!isSupported}
      className={cn(
        'absolute right-2 bottom-2 focus-visible:ring-prompto-gray-medium',
        isListening && 'animate-pulse text-red-500',
        className
      )} // Example styling
      aria-label={buttonTitle}
      title={buttonTitle}
    >
      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
    </Button>
  );
};

export default SpeechInputButton;
