'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ImageIcon,
  Search,
  MapPin,
  Clock,
  Bell,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  Lock,
  Globe,
  Fingerprint,
  ArrowRight,
} from 'lucide-react';

const coreFeatures = [
  {
    icon: ImageIcon,
    title: 'CLIP Image Matching',
    description: 'State-of-the-art computer vision compares item photos across different angles, lighting conditions, and backgrounds with 94% accuracy.',
    badge: 'Core AI',
  },
  {
    icon: Search,
    title: 'Semantic Text Analysis',
    description: 'Sentence transformers understand meaning — matching "blue leather wallet" with "navy billfold" even when no words overlap.',
    badge: 'Core AI',
  },
  {
    icon: MapPin,
    title: 'Location Intelligence',
    description: 'PostGIS-powered geospatial analysis weights matches by proximity, prioritizing items found near the reported loss location.',
    badge: 'Core AI',
  },
  {
    icon: Clock,
    title: 'Temporal Proximity',
    description: 'Time-decay scoring ensures recent reports are prioritized, with configurable windows for different item categories.',
    badge: 'Core AI',
  },
];

const platformFeatures = [
  { icon: Bell, title: 'Real-Time Notifications', description: 'Instant push alerts when a match is found.' },
  { icon: MessageSquare, title: 'Secure Messaging', description: 'End-to-end communication between finders and owners.' },
  { icon: Shield, title: 'Identity Verification', description: 'Multi-factor verification for secure item handoffs.' },
  { icon: BarChart3, title: 'Match Analytics', description: 'Detailed score breakdowns showing why items matched.' },
  { icon: Lock, title: 'Privacy First', description: 'Personal data encrypted at rest and in transit.' },
  { icon: Globe, title: 'Multi-Location', description: 'Works across cities, campuses, and transit systems.' },
  { icon: Zap, title: 'Sub-Second Matching', description: 'FAISS vector search returns results in milliseconds.' },
  { icon: Fingerprint, title: 'Item Fingerprinting', description: 'Unique feature extraction creates a digital fingerprint for each item.' },
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Badge variant="secondary" className="mb-4">Technology</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              AI That Actually Works
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Four AI models work in concert to deliver the highest match accuracy in the industry.
            </p>
          </div>
        </section>

        {/* Core AI Features */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Core AI Engine</h2>
            <p className="mt-2 text-center text-muted-foreground">The four pillars of our matching technology.</p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="h-full">
                    <CardContent className="flex gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{feature.title}</h3>
                          <Badge variant="outline" className="text-[10px]">{feature.badge}</Badge>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Platform Features</h2>
            <p className="mt-2 text-center text-muted-foreground">Everything you need for a seamless recovery experience.</p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {platformFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="space-y-3 rounded-xl border bg-background p-5">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-semibold">{feature.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">See It In Action</h2>
            <p className="mt-3 text-muted-foreground">
              Report your first item and experience AI-powered matching in real time.
            </p>
            <Link href="/register" className={buttonVariants({ size: "lg", className: "mt-6" })}>
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
