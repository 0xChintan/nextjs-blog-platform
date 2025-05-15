"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";

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

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // In a real app, you'd fetch from Supabase
        // const { data, error } = await supabase
        //   .from('posts')
        //   .select('*, author:profiles(*), category:categories(name)')
        //   .order('created_at', { ascending: false });
        
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
          },
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
        setFilteredPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [supabase]);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...posts];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter(post => post.category === categoryFilter);
    }
    
    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === "a-z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "z-a") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredPosts(result);
  }, [posts, searchQuery, categoryFilter, sortBy]);

  // Get unique categories for filter
  const categories = Array.from(new Set(posts.map(post => post.category)));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No posts found</h2>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <Button onClick={() => {
            setSearchQuery("");
            setCategoryFilter("all");
            setSortBy("newest");
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
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
      )}
    </div>
  );
}