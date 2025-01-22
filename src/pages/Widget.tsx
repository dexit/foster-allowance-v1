import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type ConfigKeys =
  | 'submitUrl'
  | 'allowances'
  | 'showLogo'
  | 'theme'
  | 'title'
  | 'logoUrl'
  | 'titleStyle'
  | 'googleAnalytics';

type Config = {
  submitUrl: string;
  allowances: number[];
  showLogo: boolean;
  theme: 'light' | 'dark';
  title?: string;
  logoUrl?: string;
  titleStyle?: React.CSSProperties;
  googleAnalytics?: string;
};

export const Widget = () => {
  const [config, setConfig] = useState<Config>({
    submitUrl: 'https://api.example.com/foster-allowance',
    allowances: [100, 200, 300],
    showLogo: true,
    theme: 'light',
    googleAnalytics: '',
  });
  const [copied, setCopied] = useState(false);

  const handleConfigChange = (key: ConfigKeys, value: any) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  const currentUrl = window.location.origin;
  const embedCode = `
<iframe src="${currentUrl}/embed" width="100%" height="800px" frameborder="0" style="border: 1px solid #eee; border-radius: 8px;"></iframe>
<script>
  window.initFosterAllowanceEmbed(${JSON.stringify(config, null, 2)});
</script>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast.success('Embed code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy embed code');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl-bold mb-4">Foster Allowance Widget Generator</h1>

      <Tabs defaultValue="config">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="code">Embed Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <div>
            <Label htmlFor="submitUrl">Submit URL</Label>
            <Input
              id="submitUrl"
              value={config.submitUrl}
              onChange={e => handleConfigChange('submitUrl', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="allowances">Allowances (comma-separated)</Label>
            <Input
              id="allowances"
              value={config.allowances.join(', ')}
              onChange={e =>
                handleConfigChange(
                  'allowances',
                  e.target.value.split(',').map(Number)
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={config.title || ''}
              onChange={e => handleConfigChange('title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              value={config.logoUrl || ''}
              onChange={e => handleConfigChange('logoUrl', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="titleStyle">Title Style (CSS)</Label>
            <Textarea
              id="titleStyle"
              value={JSON.stringify(config.titleStyle || {}, null, 2)}
              onChange={e => handleConfigChange('titleStyle', JSON.parse(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="showLogo"
              checked={config.showLogo}
              onCheckedChange={checked => handleConfigChange('showLogo', checked)}
            />
            <Label htmlFor="showLogo">Show Logo</Label>
          </div>
          <div>
            <Label htmlFor="theme">Theme</Label>
            <select
              id="theme"
              value={config.theme}
              onChange={e => handleConfigChange('theme', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <Label htmlFor="googleAnalytics">Google Analytics Code</Label>
            <Textarea
              id="googleAnalytics"
              value={config.googleAnalytics}
              onChange={e => handleConfigChange('googleAnalytics', e.target.value)}
              className="font-mono text-sm h-24"
            />
            <small className="text-gray-500">Paste your Google Analytics tracking code here.</small>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="space-y-2">
            <Label htmlFor="embed-code">Embed Code</Label>
            <Textarea
              id="embed-code"
              value={embedCode}
              readOnly
              className="font-mono text-sm h-64"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className={copied ? 'bg-green-50' : ''}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Code'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div className="border rounded-lg overflow-hidden">
            <iframe
              src={`/embed?config=${encodeURIComponent(JSON.stringify(config))}`}
              width="100%"
              height="800"
              frameBorder="0"
              title="Foster Allowance Calculator Preview"
              className="w-full"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Widget;