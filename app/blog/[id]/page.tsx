"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Heart, Share2, Bookmark, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
interface Post {
  id: string;
  title: string;
  content: string;
  featured_image: string;
  created_at: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar_url: string;
    bio: string;
  };
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);

      try {
        // In a real app, you'd fetch from Supabase
        // const { data, error } = await supabase
        //   .from('posts')
        //   .select('*, author:profiles(*), category:categories(name)')
        //   .eq('id', params.id)
        //   .single();

        // if (error) throw error;

        // Placeholder data until Supabase is connected
        const mockPost = {
          id: params.id as string,
          title: "The Future of Web Development in 2025",
          content: `
            <p>The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we look ahead to 2025, several key trends are shaping the future of how we build and interact with web applications.</p>
            
            <h2>1. AI-Driven Development</h2>
            <p>Artificial intelligence is revolutionizing how developers work. From code completion and bug detection to automated testing and optimization, AI tools are becoming indispensable in the development workflow. By 2025, we expect to see AI assistants that can generate entire components or features based on natural language descriptions, significantly accelerating development cycles.</p>
            
            <h2>2. WebAssembly Goes Mainstream</h2>
            <p>WebAssembly (Wasm) has been gaining traction as a way to run high-performance code in browsers. By 2025, we anticipate Wasm will be a standard part of web development, enabling complex applications that were previously only possible in native environments to run efficiently on the web. This includes advanced graphics processing, scientific computing, and even AAA gaming experiences.</p>
            
            <h2>3. Edge Computing Transforms Architecture</h2>
            <p>The rise of edge computing is changing how we architect web applications. Instead of centralizing processing in cloud data centers, computation is moving closer to users, reducing latency and improving performance. By 2025, we'll see more frameworks and platforms designed specifically for edge-first development, with seamless integration between edge functions, CDNs, and traditional backend services.</p>
            
            <h2>4. Micro-Frontends for Complex Applications</h2>
            <p>As web applications grow in complexity, the micro-frontend architecture pattern is gaining popularity. This approach allows teams to build and deploy parts of a frontend independently, using different frameworks if necessary. By 2025, we expect to see mature tooling and standardized patterns for implementing micro-frontends, making it easier for large organizations to scale their development efforts.</p>
            
            <h2>5. Real-Time Collaboration Everywhere</h2>
            <p>Real-time collaborative features, once limited to specialized applications like Google Docs, are becoming expected functionality across all types of web applications. By 2025, we'll see more frameworks and libraries that make implementing real-time collaboration straightforward, with built-in conflict resolution, presence indicators, and synchronization mechanisms.</p>
            
            <h2>Conclusion</h2>
            <p>The future of web development is exciting, with technologies that enable more powerful, performant, and collaborative experiences. Developers who stay ahead of these trends will be well-positioned to create the next generation of web applications that delight users and solve complex problems in innovative ways.</p>
          `,
          featured_image:
            "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          created_at: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          category: "Technology",
          author: {
            id: "a1",
            name: "Alex Johnson",
            avatar_url:
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            bio: "Senior web developer and tech enthusiast. Writing about the latest in web technologies and software development.",
          },
        };

        setPost(mockPost);

        // Fetch comments
        // const { data: commentsData, error: commentsError } = await supabase
        //   .from('comments')
        //   .select('*, author:profiles(*)')
        //   .eq('post_id', params.id)
        //   .order('created_at', { ascending: false });

        // if (commentsError) throw commentsError;

        // Placeholder comments data
        const mockComments = [
          {
            id: "c1",
            content:
              "Great insights! I'm particularly excited about the potential of WebAssembly to bring more complex applications to the web.",
            created_at: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
            author: {
              id: "u1",
              name: "Sarah Miller",
              avatar_url:
                "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          },
          {
            id: "c2",
            content:
              "I've been experimenting with edge functions lately, and the performance improvements are substantial. Definitely agree this will be a major trend going forward.",
            created_at: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            author: {
              id: "u2",
              name: "David Chen",
              avatar_url:
                "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          },
        ];

        setComments(mockComments);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast({
          title: "Error",
          description: "Failed to load the blog post.",
          variant: "destructive",
        });
        router.push("/blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, params.id, router]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to leave a comment.",
        variant: "destructive",
      });
      return;
    }

    if (!commentText.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you'd insert into Supabase
      // const { data, error } = await supabase
      //   .from('comments')
      //   .insert({
      //     content: commentText,
      //     post_id: post?.id,
      //     author_id: user.id,
      //   })
      //   .select('*, author:profiles(*)');

      // if (error) throw error;

      // Simulate successful comment creation
      const newComment = {
        id: `c${Date.now()}`,
        content: commentText,
        created_at: new Date().toISOString(),
        author: {
          id: user.id,
          name: user.user_metadata?.name || "User",
          avatar_url: user.user_metadata?.avatar_url || "",
        },
      };

      setComments([newComment, ...comments]);
      setCommentText("");

      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post comment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-6">
          The blog post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/blogs">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <Link
        href="/blogs"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all blogs
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar_url} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.created_at), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
        <Badge>{post.category}</Badge>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
        <imag
          src={post.featured_image}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">About the Author</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={post.author.avatar_url}
                  alt={post.author.name}
                />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{post.author.name}</h3>
                <p className="text-muted-foreground mt-1">{post.author.bio}</p>
                <Button variant="outline" size="sm" className="mt-4">
                  View Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        </div>

        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user?.user_metadata?.avatar_url || ""}
                alt={user?.user_metadata?.name || "User"}
              />
              <AvatarFallback>
                {user?.user_metadata?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                rows={3}
                placeholder={
                  user ? "Add a comment..." : "Sign in to leave a comment"
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!user || isSubmitting}
              ></textarea>
              <div className="flex justify-end mt-2">
                <Button type="submit" disabled={!user || isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={comment.author.avatar_url}
                    alt={comment.author.name}
                  />
                  <AvatarFallback>
                    {comment.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{comment.author.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {format(
                          new Date(comment.created_at),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <button className="hover:text-foreground">Like</button>
                    <span className="mx-2">•</span>
                    <button className="hover:text-foreground">Reply</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
