import { ReactNode } from "react";

const Container = ({
  children,
  className,
  sectionClass,
}: {
  sectionClass?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={sectionClass}>
      <div className={`${className} container mx-auto px-3 md:px-0`}>
        {children}
      </div>
    </section>
  );
};

export default Container;
