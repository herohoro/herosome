import blogConfig from "@/blog.config";
import { Tag } from "aws-sdk/clients/s3";

export const getTagList = (slugs: string[]) => {
  const tags = slugs.flatMap((slug) =>
    blogConfig.tags?.find((tag) => tag.id === slug)
  );
  console.log(slugs);
  return tags || [];
};
