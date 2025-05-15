import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Blogify</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Blogify is a modern platform designed for writers, thinkers, and creators to share their ideas with the world. 
            Our mission is to provide a beautiful, distraction-free environment where quality content can shine.
          </p>
          
          <h2>Our Story</h2>
          <p>
            Founded in 2025, Blogify was born from a simple observation: while social media platforms excel at quick, ephemeral content, 
            there was still a need for a dedicated space where longer-form, thoughtful writing could find its audience.
          </p>
          <p>
            We built Blogify with a focus on clean design, powerful features, and a respect for both writers and readers. 
            Our platform emphasizes readability, discoverability, and community engagement.
          </p>
          
          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Quality over quantity</strong> - We believe in the power of well-crafted content that provides genuine value.
            </li>
            <li>
              <strong>Inclusive community</strong> - We welcome diverse voices and perspectives from around the world.
            </li>
            <li>
              <strong>Reader-focused experience</strong> - We design with readers in mind, creating a distraction-free environment.
            </li>
            <li>
              <strong>Creator empowerment</strong> - We provide tools that help writers connect with their audience and grow their reach.
            </li>
          </ul>
          
          <h2>The Team</h2>
          <p>
            Blogify is built by a small, passionate team of designers, developers, and writers who believe in the power of great content. 
            We're constantly working to improve the platform based on user feedback and emerging best practices.
          </p>
          
          <h2>Join Us</h2>
          <p>
            Whether you're an experienced writer looking for a new home for your content, or someone who's just starting their writing journey, 
            we'd love to have you as part of our community.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Create an Account</Button>
          </Link>
          <Link href="/blogs">
            <Button variant="outline" size="lg">Explore Blogs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}