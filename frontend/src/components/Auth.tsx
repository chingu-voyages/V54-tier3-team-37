import { Github, X } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { API_BASE_URL } from './constants';
import { OAuthButtonProps } from '@/types';

import Container from './Container';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Auth() {
  return (
    <Container className="relative flex min-h-screen w-screen items-center justify-center">
      <Link
        to="/"
        className="absolute top-0 left-0 py-8"
      >
        <img src="/logo-color.png" />
      </Link>
      <Card className="relative w-full max-w-3xl gap-16 rounded-2xl border border-border p-6 shadow-xl shadow-prompto-primary/50">
        <Link to="/">
          <X className="absolute top-6 left-6 size-8" />
        </Link>
        <CardHeader className="space-y-4">
          <CardTitle className="text-center text-[36px] text-prompto-gray-dark">
            Thanks for trying Prompto
          </CardTitle>
          <CardDescription className="text-center text-xl text-prompto-gray-medium">
            Login to get efficient prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8 pb-20">
          <OAuthButton
            icon={<FcGoogle size={20} />}
            label="Continue with Google"
            href={`${API_BASE_URL}/auth/google`}
          />
          <OAuthButton
            icon={<Github size={20} />}
            label="Continue with GitHub"
            href={`${API_BASE_URL}/auth/github`}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

const OAuthButton = ({ icon, label, href }: OAuthButtonProps) => (
  <Button
    variant="outline"
    className="min-w-1/2 inset-ring-prompto-primary/50"
    asChild
  >
    <a href={href}>
      <span className="flex items-center">{icon}</span>
      {label}
    </a>
  </Button>
);
