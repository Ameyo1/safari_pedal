import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js bodyParser (so formidable can handle the stream)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), '/public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

async function parseForm(req: Request): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const { files } = await parseForm(req);
    const file = files.file?.[0] || files.file;

    if (!file || Array.isArray(file)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Rename file with userId for consistency
    const fileName = `${userId}-${Date.now()}${path.extname(file.originalFilename || '')}`;
    const newPath = path.join(uploadDir, fileName);

    fs.renameSync(file.filepath, newPath);

    // Public URL for accessing uploaded file
    const fileUrl = `/uploads/${fileName}`;

    // TODO: Update your DB (User.image) with fileUrl here

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
