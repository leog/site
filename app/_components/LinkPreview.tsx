import Link from "next/link";

type MetaTags = {
  "og:title"?: string;
  "twitter:title"?: string;
  "og:description"?: string;
  "twitter:description"?: string;
  description?: string;
  image?: string;
  "og:image"?: string;
  "twitter:image"?: string;
};

const extractTagContent = (html: string, pattern: RegExp) => {
  const match = html.match(pattern);
  return match?.[1]?.trim();
};

const decodeHtmlEntities = (value?: string) => {
  if (!value) {
    return value;
  }
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};

const extractMetaTags = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const html = await response.text();
    const title = decodeHtmlEntities(
      extractTagContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    );
    const findMeta = (name: string) =>
      decodeHtmlEntities(
        extractTagContent(
          html,
          new RegExp(
            `<meta[^>]+(?:name|property|itemprop)=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`,
            "i",
          ),
        ),
      );
    const metaTags: MetaTags = {
      "og:title": findMeta("og:title"),
      "twitter:title": findMeta("twitter:title"),
      "og:description": findMeta("og:description"),
      "twitter:description": findMeta("twitter:description"),
      description: findMeta("description"),
      image: findMeta("image"),
      "og:image": findMeta("og:image"),
      "twitter:image": findMeta("twitter:image"),
    };

    return {
      title: title ?? metaTags["og:title"] ?? metaTags["twitter:title"],
      description:
        metaTags.description ??
        metaTags["og:description"] ??
        metaTags["twitter:description"],
      image:
        metaTags.image ?? metaTags["og:image"] ?? metaTags["twitter:image"],
    };
  } catch (error) {
    console.error("Error fetching Open Graph details", error, url);
  }
};

export async function LinkPreview({
  url,
}: Readonly<{
  url: string;
}>) {
  //here calling the function
  const data = await extractMetaTags(url);

  if (!data) {
    return <p>Failed to fetch link preview.</p>;
  }

  const imageUrl = data.image ?? "https://placehold.co/340x200?text=No+Preview";
  return (
    <Link
      href={url}
      target="_blank"
      className="w-full h-[200px] cursor-pointer flex items-center bg-secondary text-text gap-3 text-left border-text-lighter border-[2px]"
      style={{
        textDecoration: "none",
      }}
    >
      <div className="object-cover h-full">
        <img
          src={imageUrl}
          alt="Link Preview"
          className="object-cover h-full w-[340px] m-0 object-left"
        />
      </div>
      <div className="p-4 w-[60%]">
        <h3 className="font-bold text-base leading-8 mb-2 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-base line-clamp-3 mb-2">{data.description}</p>
        <span className="mt-3 text-text-lighter text-xs line-clamp-1">
          &nbsp;{url}
        </span>
      </div>
    </Link>
  );
}
