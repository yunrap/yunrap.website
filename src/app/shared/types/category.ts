type CategoryItem = {
  _id: string;
  label: string;
  desc: string;
};

type Category = {
  _id: string;
  id: string;
  label: string;
  child: CategoryItem[];
};

export type { CategoryItem, Category };
