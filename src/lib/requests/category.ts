"use server";
const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Category = {
  id: number;
  image: string;
  created_at: string;
  name: string;
  pinned: boolean;
  uuid: string;
  updated_at: string;
};

export async function getCategories() {
  try {
    const request = await fetch(`${endpoint}/api/v1/category`);
    const response = await request.json();
    if (response?.success) {
      return response.data.categories as Category[];
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
