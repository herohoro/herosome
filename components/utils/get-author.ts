import blogConfig from "@/blog.config";

export const getAuthor = (writtenBy: string) => {
  const author = blogConfig.writers.find((c) => c.id === writtenBy);
  if (!author) {
    return null;
  }
  return author;
};
