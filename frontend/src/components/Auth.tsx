import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export default function Auth() {
  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center"
      style={{ backgroundColor: '#f7f7f7' }}
    >
      <Card className="border-border w-full max-w-md rounded-2xl border shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <OAuthButton
            icon={<FcGoogle size={20} />}
            label="Continue with Google"
            href="http://localhost:8000/auth/google"
          />
          <OAuthButton
            icon={<Github size={20} />}
            label="Continue with GitHub"
            href="http://localhost:8000/auth/github"
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface OAuthButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const OAuthButton = ({ icon, label, href }: OAuthButtonProps) => (
  <Button
    variant="outline"
    className="w-full justify-start gap-3 border"
    asChild
  >
    <a href={href}>
      <span className="flex items-center">{icon}</span>
      {label}
    </a>
  </Button>
);
