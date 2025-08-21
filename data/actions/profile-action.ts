"use server";
import { z } from "zod";

import { getUserMeLoader } from "../services/get-user-me-loader";
import { mutateData } from "../services/mutate-data";
import { flattenAttributes } from "@/lib/utils";

import {
  fileDeleteService,
  fileUploadService,
} from "../services/file-service";
import { prisma } from "@/lib/prisma";


export async function updateProfileAction(
  userId: string,
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: rawFormData.name as string,

      },
    });

    return {
      ...prevState,
      message: "Profile Updated",
      data: updatedUser,
      strapiErrors: null,
    };
  } catch (error) {
    console.error("Update failed:", error);
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }
}


const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size > 0 && file?.name, "Please update or add new image.")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Accepted formats: .jpg, .jpeg, .png, .webp")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB."),
});

export async function uploadProfileImageAction(
  imageId: string,
  prevState: any,
  formData: FormData
) {
  const user = await getUserMeLoader();
  if (!user.ok) throw new Error("Unauthorized");

  const userId = user.data.id;
  const data = Object.fromEntries(formData);

  const validatedFields = imageSchema.safeParse({ image: data.image });
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      data: null,
      message: "Invalid Image",
    };
  }

  try {
    if (imageId) await fileDeleteService(imageId);
  } catch (error) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Failed to delete previous image.",
    };
  }

  const fileUploadResponse = await fileUploadService(data.image);
  if (!fileUploadResponse || fileUploadResponse.error) {
    return {
      ...prevState,
      strapiErrors: fileUploadResponse?.error ?? null,
      zodErrors: null,
      message: "Failed to upload file.",
    };
  }

  const imageUrl = fileUploadResponse[0].url; // or .path depending on your service

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { coverImage: imageUrl },
  });

  return {
    ...prevState,
    data: updatedUser,
    zodErrors: null,
    strapiErrors: null,
    message: "Image Uploaded",
  };
}
