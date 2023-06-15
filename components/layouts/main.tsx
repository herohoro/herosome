import blogConfig from "@/blog.config";

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="main">
      {children}
      <style jsx>
        {`
          .main {
            flex: 1;
            margin-right: 80px;
            word-break: break-all;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              margin-right: 0;
            }
          }
        `}
      </style>
    </div>
  );
};
