import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

interface FileEsque extends Blob {
  name: string;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const entries: [string, FileEsque | FileEsque[]][] = Object.entries(formData);
  const homePageContent = await prisma.homePageContent.findMany({ select: { url: true, key: true }});
  homePageContent.forEach(async (item) => {
    let includes = false;
    entries.forEach(([key]) => {
      if (item.key === key) includes = true;
    })
    if (!includes) {
      await utapi.deleteFiles(item.key);
    }
  });

  entries.forEach(([key, value]) => {
    homePageContent.forEach(async (item) => {
      let includes = false;
      if (item.key === key) includes = true;
      if (!includes) {
        await utapi.uploadFiles(value);
      }
    });
  });


  // url: `https://uploadthing.com/f/${item.key}`,

  //formData.forEach((item) => {
  //  utapi.uploadFiles(item);
  //})

  //return NextResponse.json({ status: "OK", formData});
}
