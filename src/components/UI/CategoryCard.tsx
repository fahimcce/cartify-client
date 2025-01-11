/* eslint-disable react/jsx-sort-props */
"use client";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Tcategory } from "@/src/types";
import { deleteCategory } from "@/src/services/Category Services/CategoryServices";

interface CategoryCardProps {
  category: Tcategory;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onDelete }) => {
  const { id, name, categoryImage } = category;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await deleteCategory(id);

      if (response) {
        toast.success("Deleted Category Successfully");
        onDelete(id);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border p-4  shadow-md hover:shadow-lg ">
      <div className="flex justify-center mb-4">
        <Image
          src={
            categoryImage ||
            "https://cdn.pixabay.com/photo/2021/05/27/18/55/woman-6289052_1280.png"
          }
          alt={name}
          width={150}
          height={250}
          className="rounded-md object-cover w-64 h-40"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
      <div className="flex justify-center bottom-0">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2"
        >
          Delete
        </button>
        <button
          onClick={() => router.push(`/admin/category/${category.id}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
