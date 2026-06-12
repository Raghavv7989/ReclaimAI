'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'support@reclaim.ai', href: 'mailto:support@reclaim.ai' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Office', value: 'San Francisco, CA', href: '#' },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success('Message sent!', {
      description: "We'll get back to you within 24 hours.",
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Badge variant="secondary" className="mb-4">Contact</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question or need help? We&apos;re here for you.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="space-y-4 lg:col-span-2">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <p className="text-sm text-muted-foreground">
                  Reach out through any of these channels and we&apos;ll respond within 24 hours.
                </p>
                <div className="space-y-3 pt-2">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Form */}
              <Card className="lg:col-span-3">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Name</Label>
                        <Input id="contact-name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input id="contact-subject" placeholder="How can we help?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us more about your question..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
