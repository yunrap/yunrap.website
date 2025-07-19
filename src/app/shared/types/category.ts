type CategoryItem = {
  _id: string;
  label: string;
  desc: string;
};

type CategoryType = {
  _id: string;
  id: string;
  label: string;
  child: CategoryItem[];
};

export type { CategoryItem, CategoryType };
