/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
import Image from "next/image";
import { TCategory } from "@/src/services/Category Services/CategoryServices";

interface CategoryCardProps {
  category: TCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { name, categoryImage } = category;

  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition">
      <div className="flex justify-center mb-4">
        {/* Use the Next.js Image component */}
        <Image
          src={categoryImage || "/default-category.jpg"} // Fallback image
          alt={name}
          width={150}
          height={150}
          className="rounded-md object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
    </div>
  );
};

export default CategoryCard;
