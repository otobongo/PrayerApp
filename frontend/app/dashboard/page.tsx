'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  H1,
  H2,
  Text,
  Badge,
  Avatar,
} from '@/design-system';
import { LogOut, Settings, Bell, User, Heart, Users, Zap, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error('No session found:', sessionError);
        router.push('/auth/login');
        return;
      }

      setUser(session.user);
      console.log('User authenticated:', session.user);

      // Try to fetch profile
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!profileError && profileData) {
          setProfile(profileData);
        }
      } catch (err) {
        console.log('Profile table not set up yet, using basic user info');
      }
    } catch (err: any) {
      console.error('Auth check error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Logout error: ' + error.message);
    } else {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <Text variant="body">Loading dashboard...</Text>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Text variant="h3" color="error">Authentication Error</Text>
          <Text color="muted">{error || 'Not authenticated'}</Text>
          <Button onClick={() => router.push('/auth/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const userName = profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || 'No email';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <Container size="7xl" padding="lg">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold">
                P
              </div>
              <span className="text-xl font-semibold">PrayerApp</span>
            </div>

            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Settings className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container size="7xl" padding="lg" className="py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <H1>Welcome back, {userName}!</H1>
              <Text color="muted" variant="body-lg">
                Your spiritual journey continues here. Start a new goal or continue your progress.
              </Text>
            </div>
            <Avatar fallback={userName} size="lg" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card variant="outlined">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">0</div>
                <Text variant="caption" color="muted">Active Goals</Text>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">0</div>
                <Text variant="caption" color="muted">Current Streak</Text>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">0</div>
                <Text variant="caption" color="muted">Group Members</Text>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
                <Text variant="caption" color="muted">Completed</Text>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="mb-12">
          <H2 className="mb-6">Get Started</H2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Browse Goals */}
            <Card variant="elevated" interactive>
              <Link href="/goals" className="block">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Heart className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <CardTitle>Browse Goals</CardTitle>
                  </div>
                  <CardDescription>
                    Explore our collection of guided prayer goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="body-sm" color="muted">
                    Choose from spiritual growth, daily prayers, meditation, and more.
                  </Text>
                </CardContent>
              </Link>
            </Card>

            {/* Join Groups */}
            <Card variant="elevated" interactive>
              <Link href="/groups" className="block">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <CardTitle>Join Groups</CardTitle>
                  </div>
                  <CardDescription>
                    Connect with others on their spiritual journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="body-sm" color="muted">
                    Find or create prayer groups to grow together.
                  </Text>
                </CardContent>
              </Link>
            </Card>

            {/* My Profile */}
            <Card variant="elevated" interactive>
              <Link href="/profile" className="block">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <User className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                    </div>
                    <CardTitle>My Profile</CardTitle>
                  </div>
                  <CardDescription>
                    View and edit your spiritual profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="body-sm" color="muted">
                    Manage your information and preferences.
                  </Text>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-12">
          <H2 className="mb-6">Resources</H2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="outlined">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle>Design System</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Text variant="body-sm" color="muted" className="mb-4">
                  Explore our design system and UI components.
                </Text>
              </CardContent>
              <CardFooter>
                <Link href="/design-system">
                  <Button size="sm" variant="outline">View System</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle>Auth Debug</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Text variant="body-sm" color="muted" className="mb-4">
                  Check authentication status and debug issues.
                </Text>
              </CardContent>
              <CardFooter>
                <Link href="/auth-test">
                  <Button size="sm" variant="outline">Debug Auth</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* User Info Section */}
        <Card variant="ghost">
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <Text variant="label">Email:</Text>
                <Text variant="body-sm" className="font-mono">{userEmail}</Text>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <Text variant="label">Status:</Text>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <Text variant="label">User ID:</Text>
                <Text variant="body-sm" className="font-mono text-xs">{user?.id?.slice(0, 8)}...</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}