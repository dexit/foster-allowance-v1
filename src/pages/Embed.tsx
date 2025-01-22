import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from './Index';

interface Config {
  submitUrl?: string;
  allowances?: number[];
  showLogo?: boolean;
  theme?: 'light' | 'dark';
  title?: string;
  logoUrl?: string;
  titleStyle?: React.CSSProperties;
  googleAnalytics?: string; // Added googleAnalytics property
}

const defaultConfig: Config = {
  submitUrl: 'https://api.example.com/foster-allowance',
  allowances: [100, 200, 300],
  showLogo: true,
  theme: 'light',
  googleAnalytics: '', // Default value for googleAnalytics
};

const Embed: React.FC & { init?: (configCallback?: () => Config) => void } = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const configParam = queryParams.get('config');
  let config: Config = defaultConfig;

  if (configParam) {
    try {
      config = { ...defaultConfig, ...JSON.parse(decodeURIComponent(configParam)) };
    } catch (error) {
      console.error('Failed to parse config from URL', error);
    }
  }
  const queryClient = new QueryClient();

  // Inject Google Analytics script if provided
  React.useEffect(() => {
    if (config.googleAnalytics) {
      const script = document.createElement('script');
      script.innerHTML = config.googleAnalytics;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [config.googleAnalytics]);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className={`w-full h-full min-h-screen p-4 ${config.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
          <Index config={config} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

Embed.init = function (configCallback?: () => Config) {
  let config: Config = defaultConfig;
  if (configCallback && typeof configCallback === 'function') {
    config = { ...config, ...configCallback() };
  }

  const embedContainer = document.getElementById('foster-allowance-embed');
  if (embedContainer) {
    createRoot(embedContainer).render(<Embed />);
  }
};

export default Embed;