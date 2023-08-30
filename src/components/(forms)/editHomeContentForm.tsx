"use client";
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
import { checkFileType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  ArrowLeftRight,
  FileImage,
  Loader,
  RotateCcw,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Control, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

export interface IEditHomeContentForm {
  existingImages: { key: string; url: string }[];
}


const formSchema = z.object({
  homePageImages: z.array(
    z.any().refine((file: File) => file?.size !== 0, { message: "Зображення обов'язкове" })
      .refine((file) => file.size < 4 * 1000000, { message: "Максимальний розмір зображення 4 MB" })
      .refine((file) => checkFileType(file, ["jpg", "png", "webp"]), { message: "Підтримуються лише зображення в форматі .jpg, .png або .webp" })
  )
});


const PreviewImage = ({ control, index }: { control: Control<z.infer<typeof formSchema>>, index: number }) => {
  const [res, setRes] = useState<string | undefined>(undefined);
  const file = useWatch({
    control,
    name: `homePageImages.${index}`,
    defaultValue: new File([""], "filename")
  });
  const register = new FileReader();
  register.onload = () => {
    setRes(register.result as string)
  }
  register.readAsDataURL(file);
  return (
    <>
      {res ? <Image
        className="p-1 text-transparent rounded-md bg-neutral-900 dark:bg-neutral-50"
        fill
        quality={50}
        src={res}
        alt={"Home page image"}
      /> :
        <Loader
          className="mx-auto animate-[spin_3s_linear_infinite]"
          size={40}
        />}
    </>);
}

const EditHomeContentForm: React.FC<IEditHomeContentForm> = ({
  existingImages
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      return {
        homePageImages: await Promise.all(existingImages.map(async (url) => {
          const response = await axios({ url: url.url, method: "GET", responseType: "blob" });
          return new File([response.data], url.key);
        }))
      }
    },
  });

  const { fields, append, swap, remove, update } = useFieldArray({
    control: form.control,
    name: "homePageImages",
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    data
  ): Promise<void> => {
    const formData = new FormData();
    data.homePageImages.forEach((image: File) => {
      formData.append(image.name, image);
    })
    axios({ url: "/api/handleUpload", method: "POST", data: formData })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-4 rounded bg-neutral-100 dark:bg-neutral-900"
      >
        <div className="flex flex-col flex-wrap gap-4 justify-center items-center md:flex-row">
          {fields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`homePageImages.${index}` as const}
              render={({ field }) => {
                return (
                  <>
                    <FormItem className="transition-all flex relative justify-center items-center w-40 sm:w-72 aspect-square group">
                      <PreviewImage control={form.control} index={index} />
                      <FormLabel className="flex absolute top-0 left-0 justify-center items-center ml-2 mt-2 w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800">
                        <span className="sr-only">Завантажити фото</span>
                        <span>{index + 1}</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="absolute left-0 -top-2 z-10 w-full h-full text-transparent bg-transparent transition-colors dark:bg-transparent group-hover:bg-opacity-20 focus:bg-opacity-20 peer file:text-transparent group-hover:bg-neutral-400 focus:bg-neutral-400"
                          type="file"
                          name={field.name}
                          title={field.value?.name || ""}
                          onChange={(e) => {
                            const file = e.target.files?.[0] as File;
                            update(index, file);
                          }}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      </FormControl>
                      <span className="pointer-events-none absolute rounded opacity-0 transition-opacity group-hover:opacity-100 peer-focus:opacity-100 peer-focus-visible:opacity-100 z-[15] bg-neutral-50 dark:bg-neutral-900">
                        <FileImage size={40} className="p-2" />
                      </span>
                      <FormDescription className="sr-only">
                        Фото які будуть відображатись на головній сторінці
                      </FormDescription>
                      <FormMessage className="absolute z-50 top-0 p-4 text-red-400 w-fit bg-neutral-200 dark:bg-neutral-800" />
                      {form.formState.isSubmitting && (
                        <Loader
                          className="mx-auto animate-[spin_3s_linear_infinite]"
                          size={40}
                        />
                      )}
                    </FormItem>
                    <div className="flex gap-2 md:flex-col">
                      {index < fields.length - 1 ? (
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          onClick={() => swap(index, index + 1)}
                        >
                          <span className="sr-only">Поміняти місцями зображення номер {index} і {index + 1}</span>
                          <ArrowLeftRight />
                        </Button>
                      ) : null}
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => remove(index)}
                      >
                        <span className="sr-only">Видалити зображення номер {index}</span>
                        <Trash />
                      </Button>
                    </div>
                  </>
                );
              }}
            />
          ))}
        </div>
        <Button
          className="font-medium tracking-widest uppercase"
          type="button"
          onClick={() =>
            append(new File([""], ""))
          }
        >
          Додати фото
        </Button>
        <Button className="font-medium tracking-widest uppercase" type="submit">
          Зберегти
        </Button>
        <Button
          type="button"
          className="flex gap-2 font-medium tracking-widest uppercase"
          onClick={() => form.reset()}
        >
          Відновити форму
          <RotateCcw />
        </Button>
      </form>
    </Form>
  );
};

export default EditHomeContentForm;
