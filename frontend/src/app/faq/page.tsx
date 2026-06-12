'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const faqCategories = {
  general: [
    {
      q: 'What is ReclaimAI?',
      a: 'ReclaimAI is an AI-powered lost item recovery platform. When you report a lost or found item, our AI engine automatically matches it against all other reports using image recognition, text analysis, location proximity, and timing.',
    },
    {
      q: 'How does the AI matching work?',
      a: 'We use four AI models working together: CLIP for image similarity, Sentence Transformers for text understanding, PostGIS for location proximity, and temporal scoring for time relevance. Each produces a score, and the weighted composite determines the final match confidence.',
    },
    {
      q: 'Is ReclaimAI free to use?',
      a: 'Yes, reporting items and receiving AI matches is completely free. We may introduce premium features in the future, but core matching will always be free.',
    },
    {
      q: 'How accurate is the matching?',
      a: 'Our AI achieves 94.2% accuracy on benchmark tests. Real-world performance varies by item category, photo quality, and description detail. We continuously improve our models.',
    },
  ],
  account: [
    {
      q: 'How do I create an account?',
      a: 'Click "Get Started" and fill in your name, email, and password. You\'ll receive a verification email to confirm your account. You can also sign up with Google or GitHub.',
    },
    {
      q: 'Can I delete my account?',
      a: 'Yes, go to Settings > Account and select "Delete Account." This will permanently remove your data, active reports, and conversation history after a 30-day grace period.',
    },
    {
      q: 'How do I reset my password?',
      a: 'Click "Forgot Password" on the login page, enter your email, and follow the link in the reset email. Links expire after 1 hour for security.',
    },
  ],
  matching: [
    {
      q: 'What should I include when reporting an item?',
      a: 'For best results: upload multiple clear photos from different angles, write a detailed description including brand/color/size, mark the exact location on the map, and note the precise date and time.',
    },
    {
      q: 'How quickly do matches appear?',
      a: 'AI processing takes under 2 seconds. You\'ll receive a notification within minutes if a match is found. If no match exists yet, you\'ll be notified as soon as a matching report is submitted.',
    },
    {
      q: 'Can I reject a match?',
      a: 'Yes. If the AI suggests a match that isn\'t your item, click "Reject" and provide a brief reason. This feedback improves our matching algorithms.',
    },
    {
      q: 'What happens after I accept a match?',
      a: 'A secure conversation is created between you and the other party. You can coordinate the item return through our messaging system. We recommend meeting in public, well-lit locations.',
    },
  ],
  privacy: [
    {
      q: 'Who can see my reports?',
      a: 'Your item details are visible to authenticated users browsing the explore feed. Personal information (email, phone) is never shown publicly. Only matched users gain messaging access.',
    },
    {
      q: 'Is my data encrypted?',
      a: 'Yes, all data is encrypted at rest (AES-256) and in transit (TLS 1.3). Image embeddings are stored as mathematical vectors — the original images cannot be reconstructed from them.',
    },
    {
      q: 'How long is my data stored?',
      a: 'Active reports are stored until resolved or manually closed. Resolved reports are anonymized after 90 days. You can request full data deletion at any time under GDPR/CCPA.',
    },
  ],
};

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Badge variant="secondary" className="mb-4">Support</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about ReclaimAI.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Tabs defaultValue="general">
              <TabsList className="mb-8 w-full justify-start overflow-x-auto">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="matching">Matching</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              {Object.entries(faqCategories).map(([category, faqs]) => (
                <TabsContent key={category} value={category}>
                  <Accordion className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category}-${index}`}>
                        <AccordionTrigger className="text-left text-sm font-medium">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
