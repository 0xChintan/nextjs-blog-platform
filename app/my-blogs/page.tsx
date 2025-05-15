"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, PenSquare, Trash2, Eye } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  created_at: string;
  category: string;
  status: "published" | "draft";
  views: number;
}

export default function MyBlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }
      
      setUser(session.user);
      
      // Fetch user's posts
      try {
        // In a real app, you'd fetch from Supabase
        // const { data, error } = await supabase
        //   .from('posts')
        //   .select('*, category:categories(name)')
        //   .eq('author_id', session.user.id)
        //   .order('created_at', { ascending: false });
        
        // if (error) throw error;
        
        // Placeholder data until Supabase is connected
        const mockPosts = [
          {
            id: "1",
            title: "Getting Started with Next.js and Tailwind CSS",
            excerpt: "A comprehensive guide to setting up a new project with Next.js and Tailwind CSS.",
            featured_image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Programming",
            status: "published",
            views: 124
          },
          {
            id: "2",
            title: "Understanding React Hooks: A Deep Dive",
            excerpt: "Explore the power and flexibility of React Hooks with practical examples.",
            featured_image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            category: "React",
            status: "published",
            views: 89
          },
          {
            id: "3",
            title: "Building a Personal Portfolio with Modern Web Technologies",
            excerpt: "Step-by-step guide to creating an impressive portfolio website.",
            featured_image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Web Development",
            status: "draft",
            views: 0
          }
        ] as Post[];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast({
          title: "Error",
          description: "Failed to load your blog posts.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [supabase, router]);

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }
    
    try {
      // In a real app, you'd delete from Supabase
      // const { error } = await supabase
      //   .from('posts')
      //   .delete()
      //   .eq('id', postId)
      //   .eq('author_id', user.id);
      
      // if (error) throw error;
      
      // Update local state
      setPosts(posts.filter(post => post.id !== postId));
      
      toast({
        title: "Post deleted",
        description: "Your blog post has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Blog Posts</h1>
          <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-[200px] bg-muted"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Blog Posts</h1>
        <Link href="/create">
          <Button>
            <PenSquare className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card className="text-center p-12">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't created any blog posts yet. Start sharing your knowledge with the world!
            </p>
            <Link href="/create">
              <Button>
                <PenSquare className="mr-2 h-4 w-4" />
                Create Your First Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.status === "draft" && (
                          <Badge variant="outline">Draft</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl">{post.title}</h3>
                  </CardHeader>
                  <CardContent className="p-0 pb-4">
                    <p className="text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{post.views} views</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 flex justify-between items-center">
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm">
                        View Post
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/edit/${post.id}`}>
                            <PenSquare className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}