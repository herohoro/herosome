import blogConfig from "@/blog.config";

export const getTagList = (slugs: string[]) => {
  const tags = slugs.flatMap((slug) =>
    blogConfig.tags?.find((tag) => tag.id === slug)
  );
  return tags || [];
};
