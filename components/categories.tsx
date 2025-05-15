"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // This is a placeholder - in a real app, you'd fetch from Supabase
        // const { data, error } = await supabase
        //   .from('categories')
        //   .select('*')
        //   .order('name');

        // if (error) throw error;
        
        // Placeholder data until Supabase is connected
        const mockCategories = [
          { id: "1", name: "Technology", slug: "technology", count: 24 },
          { id: "2", name: "Programming", slug: "programming", count: 18 },
          { id: "3", name: "Design", slug: "design", count: 15 },
          { id: "4", name: "Productivity", slug: "productivity", count: 12 },
          { id: "5", name: "Wellness", slug: "wellness", count: 9 },
          { id: "6", name: "AI", slug: "ai", count: 7 }
        ];
        
        setCategories(mockCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [supabase]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="animate-pulse">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link 
              href={`/category/${category.slug}`} 
              key={category.id}
              className="flex items-center justify-between py-2 hover:text-primary transition-colors"
            >
              <span>{category.name}</span>
              <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}