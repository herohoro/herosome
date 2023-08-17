import { BlogConfig } from "./types/config";

const blogConfig: BlogConfig = {
  use: "notion", // mdx or notion
  siteLogo: {
    url: "/images/logo.svg",
    width: 201,
    height: 39,
  },
  siteName: "HERO",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  title: "HERO",
  description: "好きなこと・キレイなことをとことん集めて強くなるための勉強記録",
  googleAnalyticsCode: "", // G-**********
  googleAdsenseCode: "", // ca-pub-****************
  notFoundPage: {
    title: "404",
    subtitle: "The page you were looking for was not found.",
    image: "/images/not-found.jpeg",
    description: `The page you were looking for was not found due to reasons such as
    "already deleted" or "URL is different".`,
  },
  topPage: {
    title: "NEW POSTS",
    readMoreLabel: "Read More",
  },
  categoryPage: {
    title: "NEW POSTS",
    readMoreLabel: "Read More",
  },
  articlePage: {
    afterContentAd: "",
  },
  widgets: {
    categoryList: {
      title: "CATEGORY",
    },
    tagList: {
      title: "TAG",
    },
    share: {
      title: "Share",
      socials: ["twitter", "facebook", "instagram"],
    },
    fixedSidebar: {
      ad: "",
    },
  },
  styles: {
    containerMaxWidth: "1280px",
    colors: {
      primary: "#ff8e8e",
      primaryLighter: "#EFF7F3",
      primaryGradient: "linear-gradient(to right, #d9797b, #ffb461)",
      base: "#F2F4F3",
      border: "",
      bg: "#F7F7F7",
      text: "#2C2C2C",
      grayLighter: "#A0A0A0",
    },
    breakPoints: {
      huge: "1440px",
      large: "1170px",
      medium: "768px",
      small: "450px",
    },
  },
  hero: {
    title: "Potential ? ME : ME ;",
    image: "/images/plane.jpeg",
    description: "like this !!",
  },
  footer: {
    title: "powered by AWESOME",
  },
  article: {
    defaultThumbnail: "/images/plane.jpeg",
    articlesPerPage: 6,
  },
  navigation: [
    {
      name: "Yoom",
      url: `/yoom`,
    },
    {
      name: "ヲタけん",
      url: `/wotaken`,
    },
    {
      name: "Rie",
      url: `/rie`,
    },
    {
      name: "horomi",
      url: `/horomi`,
    },
  ],
  subNavigation: [
    {
      name: "terms",
      url: "/about/terms",
    },
    {
      name: "privacy",
      url: "/about/privacy",
    },
    {
      name: "GitHub",
      url: "https://github.com/steelydylan/Awesome",
    },
  ],
  account: {
    name: "horomi & Rie",
    description:
      "Notionサポーターで活動してたら、ちょっと好きなことを探したくなった２人",
    image: `/images/horo-rie_profile.png`,
    social: {
      twitter: "https://twitter.com/otaneshikenkyu",
      instagram: "https://www.instagram.com/otameshikenkyu",
      github: "https://github.com/herohoro/herosome",
    },
  },
  writers: [
    {
      id: "horomi",
      name: "horomi",
      description:
        "Notionサポーターで活動してるけど、独学が生きがいな引きこもりさん",
      image: "/images/profile_500x500.PNG",
    },
    {
      id: "steelydylan",
      name: "steelydylan",
      description: "profile here profile here profile here profile here",
      image: "/images/me.jpeg",
    },
  ],
  categories: [
    {
      id: "yoom",
      title: "Yoom",
      imagePath: "/images/paraglider.jpg",
      description: "Look at my awesome Yoom magic !!!!",
    },
    {
      id: "wotaken",
      title: "ヲタけん",
      imagePath: "/images/black.cat.jpg",
      description: "Look at my awesome ヲタ magic !!!!",
    },
    {
      id: "rie",
      title: "Rie",
      imagePath: "/images/camp.jpeg",
      description: "Look at my awesome Rie life",
    },
    {
      id: "horomi",
      title: "horomi",
      imagePath: "/images/cuba.jpeg",
      description: "Look at my awesome horomi life",
    },
    {
      id: "about",
      title: "About",
      imagePath: "/images/sky.jpeg",
      description: "",
    },
    {
      id: "sample",
      title: "Sample",
      imagePath: "/images/alaska.jpeg",
      description: "Look at our awesome's sample ",
    },
  ],
  tags: [
    {
      id: "london",
      title: "London",
    },
    {
      id: "boston",
      title: "Boston",
    },
    {
      id: "paris",
      title: "Paris",
    },
    {
      id: "fire",
      title: "Fire",
    },
    {
      id: "sky",
      title: "Sky",
    },
  ],
};

export default blogConfig;
