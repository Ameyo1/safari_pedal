import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/blogs
export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      include: {
        author: true,   // include author info
        images: true,  // include all images related to the post
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
