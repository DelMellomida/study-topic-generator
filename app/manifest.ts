import type {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Study Topic Generator",
    short_name: "Study Topics",
    description:
      "Draw balanced study prompts, track your topic pool, and run focused learning sessions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7efe7",
    theme_color: "#171312",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
