"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        // This is a placeholder - in a real app, you'd fetch from Supabase
        // const { data, error } = await supabase
        //   .from('posts')
        //   .select('*, author:profiles(*)')
        //   .order('created_at', { ascending: false })
        //   .limit(5);

        // if (error) throw error;
        
        // Placeholder data until Supabase is connected
        const mockPosts = [
          {
            id: "4",
            title: "10 Essential JavaScript Concepts Every Developer Should Know",
            excerpt: "Master these fundamental JavaScript concepts to level up your development skills.",
            featured_image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Programming",
            author: {
              id: "a4",
              name: "Michael Brown",
              avatar_url: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          },
          {
            id: "5",
            title: "The Psychology of Color in Web Design",
            excerpt: "How color choices influence user perception and behavior on your website.",
            featured_image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Design",
            author: {
              id: "a5",
              name: "Emily Wilson",
              avatar_url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          },
          {
            id: "6",
            title: "Building Scalable APIs with Node.js and Express",
            excerpt: "A comprehensive guide to creating robust and scalable backend services.",
            featured_image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Backend",
            author: {
              id: "a6",
              name: "James Lee",
              avatar_url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          },
          {
            id: "7",
            title: "The Rise of Artificial Intelligence in Content Creation",
            excerpt: "How AI is transforming the way we create and consume digital content.",
            featured_image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            category: "AI",
            author: {
              id: "a7",
              name: "Sophia Garcia",
              avatar_url: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          },
          {
            id: "8",
            title: "Responsive Web Design Best Practices for 2025",
            excerpt: "Stay ahead of the curve with these modern responsive design techniques.",
            featured_image: "https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Design",
            author: {
              id: "a8",
              name: "Daniel Kim",
              avatar_url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          }
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, [supabase]);

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-[200px] bg-muted"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
        <Link href="/blogs">
          <Button variant="outline">View All</Button>
        </Link>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <Card className="overflow-hidden hover:shadow-md transition-all">
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-0">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar_url} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author.name}</span>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}