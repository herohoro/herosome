import { BlogConfig } from "./types/config";

const blogConfig: BlogConfig = {
  use: ["notion", "mdx"], // mdx or notion
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
      name: "日記",
      url: `/horomi`,
    },
    {
      name: "アプリ",
      url: `/wotaken`,
    },
    {
      name: "Yoom",
      url: `/yoom`,
    },
  ],
  subNavigation: [
    {
      name: "About",
      url: "/about/member",
    },
    {
      name: "本家",
      url: "https://github.com/steelydylan/Awesome",
    },
  ],
  account: {
    name: "steelydylan",
    description: "profile here profile here profile here profile here",
    image: `/images/me.jpeg`,
    social: {
      twitter: "https://twitter.com/steelydylan",
      github: "https://github.com/steelydylan",
    },
  },
  writers: [
    {
      id: "148bfa26-a10a-4673-86c7-539868890a5c",
      name: "horomi",
      description: "書く事がとにかく好き。独学が生きがい",
      image: "/images/profile_500x500.PNG",
      social: {
        twitter: "https://twitter.com/mineral_30",
        instagram: "https://www.instagram.com/horomi_design/",
        github: "https://github.com/herohoro",
      },
    },
    {
      id: "steelydylan",
      name: "steelydylan",
      description: "profile here profile here profile here profile here",
      image: "/images/me.jpeg",
      social: {
        twitter: "https://twitter.com/steelydylan",
        github: "https://github.com/steelydylan",
      },
    },
    {
      id: "awesome",
      name: "Mr. AWESOME",
      description: "profile here profile here profile here profile here",
      image: "/images/me.jpeg",
      social: {
        twitter: "https://twitter.com/steelydylan",
        github: "https://github.com/steelydylan",
      },
    },
    // {
    //   id: "39b08876-4d5c-4a17-8773-1539c69302ca",
    //   name: "Rie",
    //   description: "Notionサポーターを主催してるけど、人もツールも推し活大好き",
    //   image: "/images/tamura.jpg",
    //   social: {
    //     twitter: "https://twitter.com/RieTamura36",
    //     instagram: "https://www.instagram.com/notionobasan",
    //   },
    // },
  ],
  categories: [
    {
      id: "horomi",
      title: "日記",
      imagePath: "/images/cuba.jpeg",
      description: "Look at my awesome horomi life",
    },
    {
      id: "wotaken",
      title: "アプリ",
      imagePath: "/images/black-cat.jpg",
      description: "Look at my awesome ヲタ magic !!!!",
    },
    {
      id: "yoom",
      title: "Yoom",
      imagePath: "/images/paraglider.jpg",
      description: "Look at my awesome Yoom magic !!!!",
    },
    // {
    //   id: "rie",
    //   title: "Rie",
    //   imagePath: "/images/camp.jpeg",
    //   description: "Look at my awesome Rie life",
    // },
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
    {
      id: "camp",
      title: "Camp",
      imagePath: "/images/camp.jpeg",
      description: "Look at my awesome camp life",
    },
    {
      id: "travel",
      title: "Travel",
      imagePath: "/images/london.jpeg",
      description: "Look at my awesome travel life",
    },
  ],
  tags: [
    {
      id: "handcrafts",
      title: "手芸",
    },
    {
      id: "cooking",
      title: "食・料理",
    },
    {
      id: "walking",
      title: "散歩",
    },
    {
      id: "cleaning",
      title: "掃除",
    },
    {
      id: "pdca",
      title: "PDCA",
    },
    {
      id: "studying",
      title: "勉強",
    },
    {
      id: "techo",
      title: "手帳",
    },
    {
      id: "animal",
      title: "生き物",
    },
    {
      id: "useful",
      title: "便利アイテム",
    },
  ],
};

export default blogConfig;
