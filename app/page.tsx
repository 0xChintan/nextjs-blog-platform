import { FeaturedPosts } from '@/components/featured-posts';
import { Hero } from '@/components/hero';
import { RecentPosts } from '@/components/recent-posts';
import { Categories } from '@/components/categories';
import { Newsletter } from '@/components/newsletter';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        <div className="lg:col-span-2">
          <RecentPosts />
        </div>
        <div className="space-y-8">
          <Categories />
          <Newsletter />
        </div>
      </div>
    </div>
  );
}