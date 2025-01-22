import Link from "next/link";
import { JSDOM } from "jsdom";

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

const extractMetaTags = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const metaTags: MetaTags = Array.from(
      document.querySelectorAll("meta")
    ).reduce((tags, meta) => {
      const name =
        meta.getAttribute("name") ||
        meta.getAttribute("property") ||
        meta.getAttribute("itemprop");
      const content =
        meta.getAttribute("content");

      if (name && content) {
        tags = { ...tags, [name]: content };
      }

      return tags;
    }, {});

    return {
      title:
        document.title ??
        metaTags["og:title"] ??
        metaTags["twitter:title"],
      description:
        metaTags.description ??
        metaTags["og:description"] ??
        metaTags["twitter:description"],
      image:
        metaTags.image ??
        metaTags["og:image"] ??
        metaTags["twitter:image"],
    };
  } catch (error) {
    console.error(
      "Error fetching Open Graph details",
      error,
      url
    );
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
  return (
    <Link
      href={url}
      target='_blank'
      className='w-full h-[200px] cursor-pointer flex items-center bg-secondary text-text gap-3 text-left border-text-lighter border-[2px]'
      style={{
        textDecoration: "none",
      }}
    >
      <div className='object-cover h-full'>
        <img
          src={data.image}
          alt='Link Preview'
          className='object-cover h-full w-[340px] m-0 object-left'
        />
      </div>
      <div className='p-4 w-[60%]'>
        <h3 className='font-bold text-base leading-[2rem] mb-2 line-clamp-2'>
          {data.title}
        </h3>
        <p className='text-base line-clamp-3 mb-2'>
          {data.description}
        </p>
        <span className='mt-3 text-text-lighter text-xs line-clamp-1'>
          &nbsp;{url}
        </span>
      </div>
    </Link>
  );
}
