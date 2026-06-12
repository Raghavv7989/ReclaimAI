'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Radar,
  Search,
  MapPin,
  Bell,
  Shield,
  Zap,
  ImageIcon,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Package,
  TrendingUp,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const steps = [
  {
    step: '01',
    icon: Package,
    title: 'Report Your Item',
    description: 'Upload photos and describe your lost or found item. Our AI extracts key features automatically.',
  },
  {
    step: '02',
    icon: Radar,
    title: 'AI Matches Instantly',
    description: 'Our matching engine compares images, descriptions, locations, and timing to find potential matches.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Reclaim Securely',
    description: 'Connect with the finder through our verified messaging system and arrange a safe recovery.',
  },
];

const features = [
  {
    icon: ImageIcon,
    title: 'Visual AI Matching',
    description: 'CLIP-powered image recognition identifies items across angles, lighting, and backgrounds.',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Natural language understanding matches descriptions even when wording differs completely.',
  },
  {
    icon: MapPin,
    title: 'Location Proximity',
    description: 'Geospatial analysis prioritizes matches found near where you lost your item.',
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Instant notifications when a potential match is found for your reported item.',
  },
  {
    icon: Shield,
    title: 'Verified Recovery',
    description: 'Secure identity verification and safe exchange protocols protect both parties.',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Sub-second AI inference means matches appear within moments of an item being reported.',
  },
];

const stats = [
  { value: '12,847', label: 'Items Recovered', icon: Package },
  { value: '94.2%', label: 'Match Accuracy', icon: TrendingUp },
  { value: '47,000+', label: 'Active Users', icon: Users },
  { value: '<2min', label: 'Avg Match Time', icon: Zap },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'University Student',
    content: 'I lost my laptop bag on campus and had it back within 3 hours. The AI matched photos of my bag from a completely different angle. Incredible.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Daily Commuter',
    content: 'Left my AirPods on the subway. Someone found them and posted here — ReclaimAI matched them to my report instantly. Game changer.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Traveler',
    content: 'Lost my passport holder at the airport. The location proximity feature narrowed it down to the exact terminal. Recovered in under an hour.',
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Badge variant="secondary" className="mb-6 px-3 py-1 text-xs">
                  <Zap className="mr-1 h-3 w-3" />
                  AI-Powered Recovery Network
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              >
                Lost something?{' '}
                <span className="text-gradient">AI will find it.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
              >
                ReclaimAI uses computer vision, semantic analysis, and location
                intelligence to match lost items with found reports — automatically
                and in real time.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <Link href="/register" className={buttonVariants({ size: "lg" })}>
                  Report an Item
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <Link href="/explore" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Browse Found Items
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative gradient orbs */}
          <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-success/5 blur-3xl" />
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="border-t bg-muted/30 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-3 text-muted-foreground">
                Three simple steps to recover your belongings.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <Card className="relative h-full border-0 bg-background shadow-sm">
                    <CardContent className="p-8">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Step {step.step}
                      </span>
                      <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powered by Advanced AI
              </h2>
              <p className="mt-3 text-muted-foreground">
                Multiple AI models work together to maximize recovery rates.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Card className="group h-full transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mt-4 font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="border-y bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <stat.icon className="mx-auto h-6 w-6 text-primary-foreground/70" />
                  <p className="mt-2 text-3xl font-bold text-primary-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Loved by Thousands
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real stories from people who recovered their items.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-warning text-warning"
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="mt-4 border-t pt-4">
                        <p className="text-sm font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="border-t bg-muted/30 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to recover what&apos;s yours?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of users who have successfully recovered their lost
                belongings using AI.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/register" className={buttonVariants({ size: "lg" })}>
                  Get Started Free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <Link href="/features" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
