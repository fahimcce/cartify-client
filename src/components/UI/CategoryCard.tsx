/* eslint-disable react/jsx-sort-props */
import Image from "next/image";
import { toast } from "sonner";

import { Tcategory } from "@/src/types";
import { deleteCategory } from "@/src/services/Category Services/CategoryServices";

interface CategoryCardProps {
  category: Tcategory;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onDelete }) => {
  const { id, name, categoryImage } = category;

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
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition">
      <div className="flex justify-center mb-4">
        <Image
          src={
            categoryImage ||
            "https://cdn.pixabay.com/photo/2021/05/27/18/55/woman-6289052_1280.png"
          }
          alt={name}
          width={150}
          height={150}
          className="rounded-md object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default CategoryCard;
