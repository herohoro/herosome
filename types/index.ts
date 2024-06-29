export type ArticleData = {
  title: string;
  date: string;
  category: string;
  writtenBy: string;
  tags?: Tag[];
  thumbnail?: string;
  description?: string;
  original?: boolean;
  hideThumbnail?: boolean;
  status?: "open" | "draft" | "close";
};

export type Tag = {
  filter(arg0: (tag: any) => any): unknown;
  id: string;
  title: string;
};

export type Article = {
  writtenBy(writtenBy: any): unknown;
  content?: string;
  data: ArticleData;
  permalink: string;
  slug?: string;
  id: string;
  excerpt: string;
  related: string[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
};
