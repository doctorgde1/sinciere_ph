import { getAuthSession } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  homeImages: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await getAuthSession();

      if (!session?.user) throw new Error("Unauthorized");
      if (session.user.role !== "ADMIN")
        throw new Error(
          "You don't have access to upload files. Login as ADMIN to have access"
        );

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
  portfolioImages: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await getAuthSession();

      if (!session?.user) throw new Error("Unauthorized");
      if (session.user.role !== "ADMIN")
        throw new Error(
          "You don't have access to upload files. Login as ADMIN to have access"
        );

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
  priceImages: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await getAuthSession();

      if (!session?.user) throw new Error("Unauthorized");
      if (session.user.role !== "ADMIN")
        throw new Error(
          "You don't have access to upload files. Login as ADMIN to have access"
        );

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
  profileImages: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await getAuthSession();

      if (!session?.user) throw new Error("Unauthorized");
      if (session.user.role !== "ADMIN")
        throw new Error(
          "You don't have access to upload files. Login as ADMIN to have access"
        );

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
