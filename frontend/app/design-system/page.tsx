'use client';

import React, { useState } from 'react';
import {
  // Atoms
  Button,
  Text,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Badge,
  Avatar,
  AvatarGroup,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  Label,
  Caption,
  Lead,
  StatusBadge,
  CountBadge,
  // Molecules
  FormField,
  FormGroup,
  FormSection,
  FeatureCard,
  FeatureGrid,
  // Tokens
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '@/design-system';
import {
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Info,
  Search,
  Mail,
  Lock,
  User,
  Settings,
  Home,
  ChevronRight,
} from 'lucide-react';

/**
 * Design System Documentation Page
 * View and test all components in one place
 *
 * Access this page at: http://localhost:3003/design-system
 */

export default function DesignSystemPage() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black py-20">
        <Container size="6xl">
          <div className="text-center space-y-4">
            <Badge variant="secondary" size="lg">Dynamic Design System</Badge>
            <H1>PrayerApp Design System</H1>
            <Lead>
              A comprehensive, dynamic design system with automatic propagation.
              Changes to any component here will instantly update throughout the entire application.
            </Lead>
          </div>
        </Container>
      </div>

      <Container size="6xl" padding="lg" className="py-12 space-y-24">

        {/* Typography Section */}
        <section className="space-y-8">
          <div>
            <H2>Typography</H2>
            <Text color="muted">Consistent text styles using the Text component</Text>
          </div>

          <Card padding="lg">
            <CardContent className="space-y-4">
              <H1>Heading 1 - Bold and impactful</H1>
              <H2>Heading 2 - Section headers</H2>
              <H3>Heading 3 - Subsection headers</H3>
              <H4>Heading 4 - Card titles</H4>
              <H5>Heading 5 - Small headers</H5>
              <H6>Heading 6 - Smallest headers</H6>
              <Lead>Lead text for introductions and highlights</Lead>
              <Body>Regular body text for main content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Body>
              <Caption>Caption text for descriptions and metadata</Caption>
              <Label>Label text for form fields</Label>
              <Text variant="code">const code = "inline code style";</Text>
              <Text variant="overline">Overline text</Text>
            </CardContent>
          </Card>
        </section>

        {/* Colors Section */}
        <section className="space-y-8">
          <div>
            <H2>Color Palette</H2>
            <Text color="muted">Vercel/Stripe inspired monochromatic palette</Text>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gray Scale */}
            {Object.entries(colors.gray).map(([shade, value]) => (
              <Card key={shade} variant="outlined" padding="sm">
                <div
                  className="h-20 rounded mb-2"
                  style={{ backgroundColor: value }}
                />
                <Caption>Gray {shade}</Caption>
                <Text variant="code">{value}</Text>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Status Colors */}
            {['success', 'warning', 'destructive', 'info'].map((color) => (
              <Card key={color} variant="outlined" padding="sm">
                <div
                  className="h-20 rounded mb-2"
                  style={{ backgroundColor: colors[color as keyof typeof colors].DEFAULT }}
                />
                <Caption className="capitalize">{color}</Caption>
              </Card>
            ))}
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-8">
          <div>
            <H2>Buttons</H2>
            <Text color="muted">Interactive button components with multiple variants and sizes</Text>
          </div>

          <Card padding="lg">
            <CardContent className="space-y-8">
              {/* Button Variants */}
              <div>
                <H4 className="mb-4">Variants</H4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <H4 className="mb-4">Sizes</H4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              {/* Button States */}
              <div>
                <H4 className="mb-4">States & Icons</H4>
                <div className="flex flex-wrap gap-3">
                  <Button loading={buttonLoading} onClick={handleButtonClick}>
                    Click to Load
                  </Button>
                  <Button disabled>Disabled</Button>
                  <Button leftIcon={<Mail className="h-4 w-4" />}>
                    With Left Icon
                  </Button>
                  <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                    With Right Icon
                  </Button>
                  <Button size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Full Width */}
              <div>
                <H4 className="mb-4">Full Width</H4>
                <Button fullWidth>Full Width Button</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Forms Section */}
        <section className="space-y-8">
          <div>
            <H2>Form Components</H2>
            <Text color="muted">Input fields and form organization components</Text>
          </div>

          <Card padding="lg">
            <CardContent>
              <FormSection
                title="Contact Information"
                description="Enter your contact details below"
              >
                <FormGroup>
                  <FormField
                    type="input"
                    label="Email Address"
                    labelFor="email"
                    required
                    helperText="We'll never share your email"
                    inputProps={{
                      type: 'email',
                      placeholder: 'you@example.com',
                      leftIcon: <Mail className="h-4 w-4" />,
                      value: inputValue,
                      onChange: (e) => setInputValue(e.target.value),
                    }}
                  />

                  <FormField
                    type="input"
                    label="Password"
                    labelFor="password"
                    required
                    error={inputValue.length > 0 && inputValue.length < 8 ? 'Password must be at least 8 characters' : ''}
                    inputProps={{
                      type: 'password',
                      placeholder: '••••••••',
                      leftIcon: <Lock className="h-4 w-4" />,
                    }}
                  />

                  <FormField
                    type="textarea"
                    label="Message"
                    labelFor="message"
                    helperText="Maximum 500 characters"
                    textareaProps={{
                      placeholder: 'Enter your message here...',
                      value: textareaValue,
                      onChange: (e) => setTextareaValue(e.target.value),
                      rows: 4,
                    }}
                  />
                </FormGroup>
              </FormSection>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-8">
          <div>
            <H2>Cards</H2>
            <Text color="muted">Versatile card components for content organization</Text>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>
                  Default card with shadow elevation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Card content goes here with proper spacing and structure.</Text>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>
                  Card with border instead of shadow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Alternative card style for subtle separation.</Text>
              </CardContent>
            </Card>

            <Card variant="ghost" interactive>
              <CardHeader>
                <CardTitle>Ghost Interactive Card</CardTitle>
                <CardDescription>
                  Hover to see the effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This card responds to hover and click interactions.</Text>
              </CardContent>
            </Card>

            <Card variant="filled">
              <CardHeader>
                <CardTitle>Filled Card</CardTitle>
                <CardDescription>
                  Card with filled background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Useful for highlighting content sections.</Text>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="space-y-8">
          <div>
            <H2>Feature Cards</H2>
            <Text color="muted">Complex cards for showcasing features and content</Text>
          </div>

          <FeatureGrid columns={3}>
            <FeatureCard
              title="Daily Prayers"
              description="Start your spiritual journey with guided daily prayers designed to deepen your faith."
              image={{
                src: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop&q=80",
                alt: "Prayer"
              }}
              badge={{ text: "Popular", variant: "success" }}
              tags={["Spiritual", "Daily", "Guided"]}
              footer={{
                text: "5 min read",
                actionText: "Start",
                onAction: () => console.log('Start prayers'),
              }}
              interactive
            />

            <FeatureCard
              title="Community Groups"
              description="Join prayer groups and connect with like-minded individuals on your spiritual path."
              image={{
                src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop&q=80",
                alt: "Community"
              }}
              tags={["Community", "Groups", "Support"]}
              footer={{
                text: "50+ members",
                actionText: "Join",
              }}
              variant="default"
            />

            <FeatureCard
              title="Track Progress"
              description="Monitor your spiritual growth with detailed insights and achievement tracking."
              badge={{ text: "New", variant: "info" }}
              tags={["Analytics", "Progress", "Insights"]}
              footer={{
                text: "Updated daily",
                actionText: "View",
              }}
              variant="compact"
            />
          </FeatureGrid>
        </section>

        {/* Badges Section */}
        <section className="space-y-8">
          <div>
            <H2>Badges</H2>
            <Text color="muted">Small labels for status and counts</Text>
          </div>

          <Card padding="lg">
            <CardContent className="space-y-8">
              {/* Badge Variants */}
              <div>
                <H4 className="mb-4">Variants</H4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="ghost">Ghost</Badge>
                </div>
              </div>

              {/* Badge Sizes */}
              <div>
                <H4 className="mb-4">Sizes</H4>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="xs">Extra Small</Badge>
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>

              {/* Special Badges */}
              <div>
                <H4 className="mb-4">Special Types</H4>
                <div className="flex flex-wrap gap-3">
                  <CountBadge count={5} variant="error" />
                  <CountBadge count={99} variant="info" />
                  <CountBadge count={150} variant="success" />
                  <StatusBadge status="online" />
                  <StatusBadge status="away" />
                  <StatusBadge status="busy" />
                  <StatusBadge status="offline" />
                  <Badge dot variant="error" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Avatars Section */}
        <section className="space-y-8">
          <div>
            <H2>Avatars</H2>
            <Text color="muted">User avatars with various states and configurations</Text>
          </div>

          <Card padding="lg">
            <CardContent className="space-y-8">
              {/* Avatar Sizes */}
              <div>
                <H4 className="mb-4">Sizes</H4>
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar size="xs" fallback="XS" />
                  <Avatar size="sm" fallback="SM" />
                  <Avatar size="md" fallback="MD" />
                  <Avatar size="lg" fallback="LG" />
                  <Avatar size="xl" fallback="XL" />
                  <Avatar size="2xl" fallback="2XL" />
                  <Avatar size="3xl" fallback="3XL" />
                </div>
              </div>

              {/* Avatar with Images */}
              <div>
                <H4 className="mb-4">With Images</H4>
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80"
                    alt="User"
                    size="md"
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80"
                    alt="User"
                    size="md"
                    status="online"
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80"
                    alt="User"
                    size="md"
                    status="away"
                  />
                  <Avatar
                    fallback="John Doe"
                    size="md"
                    status="busy"
                  />
                </div>
              </div>

              {/* Avatar Groups */}
              <div>
                <H4 className="mb-4">Avatar Groups</H4>
                <AvatarGroup max={4}>
                  <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80" />
                  <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80" />
                  <Avatar src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80" />
                  <Avatar fallback="JD" />
                  <Avatar fallback="AB" />
                  <Avatar fallback="CD" />
                </AvatarGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dynamic Demo Section */}
        <section className="space-y-8">
          <div>
            <H2>Dynamic Component Demo</H2>
            <Text color="muted">
              Try editing any component in the design-system folder and watch changes propagate instantly!
            </Text>
          </div>

          <Card variant="filled" padding="lg">
            <CardContent className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                <H3>🎨 How It Works</H3>
                <div className="mt-4 space-y-2">
                  <Text>1. All components are defined in <Text variant="code">/design-system</Text></Text>
                  <Text>2. Components import tokens for consistent styling</Text>
                  <Text>3. Pages import from the design system</Text>
                  <Text>4. Changes to any component automatically update everywhere</Text>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <H5>Try Editing:</H5>
                  <Text variant="code">/design-system/components/atoms/Button.tsx</Text>
                  <Caption>Change button colors, sizes, or add new variants</Caption>
                </div>
                <div className="space-y-2">
                  <H5>Or Update Tokens:</H5>
                  <Text variant="code">/design-system/tokens/colors.ts</Text>
                  <Caption>Modify the color palette globally</Caption>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t pt-12 pb-8">
          <div className="text-center space-y-4">
            <Text color="muted">
              PrayerApp Design System • Built with React, TypeScript, and Tailwind CSS
            </Text>
            <Text variant="caption" color="muted">
              Access this page at: <Text variant="code">http://localhost:3003/design-system</Text>
            </Text>
          </div>
        </footer>

      </Container>
    </main>
  );
}