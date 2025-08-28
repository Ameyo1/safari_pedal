import { prisma } from "@/lib/prisma";
import { Card, CardContent, Avatar, AvatarFallback, AvatarImage } from "@/components/ui/ui";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  // Fetch the post directly from Prisma
  const post = await prisma.blogPost.findFirst({
    where: { slug: { has: slug } }, // 'slug' is an array in your schema
    include: {
      author: true,
      images: true,
    },
  });

  if (!post) return notFound(); // 404 page

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 mt-20">
      {/* Cover Image */}
      <div className="mb-6">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-80 object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* Author and Date */}
      <div className="flex items-center gap-3 mb-8">
        <Avatar>
          <AvatarImage src={post.author.id} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{post.author.name}</p>
          <p className="text-xs text-gray-500">
            {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>

      {/* Content */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="prose prose-lg max-w-none p-6">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>

      {/* Additional Images */}
      {post.images.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4">
          {post.images.map((img) => (
            <div key={img.id}>
              <img
                src={img.url}
                alt={img.caption || "Blog image"}
                className="w-full h-48 object-cover rounded-lg"
              />
              {img.caption && <p className="text-sm text-gray-500 mt-1">{img.caption}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
