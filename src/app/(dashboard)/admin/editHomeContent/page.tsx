import EditHomeContentForm from "@/components/(forms)/editHomeContentForm";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { utapi } from "uploadthing/server";

const EditHomeContent = async () => {
  const session = await getAuthSession();
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const homePageContent = await prisma.homePageContent.findMany({select: {url: true, key: true }});

  return (
    <div className="container pt-20 mx-auto">
      <EditHomeContentForm existingImages={homePageContent} />
    </div>
  );
};

export default EditHomeContent;
