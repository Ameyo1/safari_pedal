import Link from "next/link";
import { Card, CardContent, Avatar, AvatarImage, AvatarFallback } from "@/components/ui/ui";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";

// Helper to strip HTML tags for previews
function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

// Fetch all blog posts directly from Prisma
async function getPosts() {
  return prisma.blogPost.findMany({
    include: {
      author: true,
      images: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-6 mt-20">
      {posts.map((post) => (
        <Link href={`/blog/${post.slug[0]}`} key={post.id}>
          <Card className="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-3">
                {stripHtml(post.content).slice(0, 120)}...
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Avatar className="h-7 w-7">
                  {/* <AvatarImage src={post.author.avatar} alt={post.author.name} /> */}
                  <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
                <span>•</span>
                <span>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
