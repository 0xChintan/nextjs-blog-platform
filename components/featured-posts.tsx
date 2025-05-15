"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  created_at: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

export function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        // This is a placeholder - in a real app, you'd fetch from Supabase
        // const { data, error } = await supabase
        //   .from('posts')
        //   .select('*, author:profiles(*)')
        //   .eq('is_featured', true)
        //   .limit(3);

        // if (error) throw error;
        
        // Placeholder data until Supabase is connected
        const mockPosts = [
          {
            id: "1",
            title: "The Future of Web Development in 2025",
            excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
            featured_image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Technology",
            author: {
              id: "a1",
              name: "Alex Johnson",
              avatar_url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          },
          {
            id: "2",
            title: "Mastering Productivity: A Guide for Busy Professionals",
            excerpt: "Practical strategies to enhance your productivity and achieve work-life balance.",
            featured_image: "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Productivity",
            author: {
              id: "a2",
              name: "Sarah Miller",
              avatar_url: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          },
          {
            id: "3",
            title: "The Art of Mindful Living in a Digital Age",
            excerpt: "How to stay present and mindful in an increasingly connected and distracted world.",
            featured_image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Wellness",
            author: {
              id: "a3",
              name: "David Chen",
              avatar_url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          }
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, [supabase]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container px-4">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[400px] animate-pulse">
                <div className="h-full bg-muted"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container px-4">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mt-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar_url} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{post.author.name}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}