"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const postSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title must not be longer than 100 characters.",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters.",
  }).max(200, {
    message: "Excerpt must not be longer than 200 characters.",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  featured_image: z.string().url({
    message: "Please enter a valid URL for the featured image.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
});

type PostValues = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      featured_image: "",
      category: "",
    },
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }
      
      setUser(session.user);
      
      // Fetch categories
      try {
        // In a real app, you'd fetch from Supabase
        // const { data, error } = await supabase
        //   .from('categories')
        //   .select('*')
        //   .order('name');
        
        // if (error) throw error;
        
        // Placeholder data until Supabase is connected
        const mockCategories = [
          { id: "1", name: "Technology", slug: "technology" },
          { id: "2", name: "Programming", slug: "programming" },
          { id: "3", name: "Design", slug: "design" },
          { id: "4", name: "Productivity", slug: "productivity" },
          { id: "5", name: "Wellness", slug: "wellness" },
          { id: "6", name: "AI", slug: "ai" }
        ];
        
        setCategories(mockCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    checkUser();
  }, [supabase, router]);

  async function onSubmit(values: PostValues) {
    if (!user) return;
    
    setIsLoading(true);

    try {
      // In a real app, you'd insert into Supabase
      // const { data, error } = await supabase
      //   .from('posts')
      //   .insert({
      //     title: values.title,
      //     excerpt: values.excerpt,
      //     content: values.content,
      //     featured_image: values.featured_image,
      //     category_id: values.category,
      //     author_id: user.id,
      //   })
      //   .select();

      // if (error) throw error;
      
      // Simulate successful post creation
      setTimeout(() => {
        toast({
          title: "Post created",
          description: "Your blog post has been published successfully.",
        });
        
        router.push("/my-blogs");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Blog Post</CardTitle>
          <CardDescription>
            Share your knowledge and insights with the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a compelling title for your blog post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="A brief summary of your post (will appear in previews)" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      This will be displayed in post previews and search results.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      A high-quality image that represents your post (1200x630px recommended).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog post content here..." 
                        className="min-h-[300px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}