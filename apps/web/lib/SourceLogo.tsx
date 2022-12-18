import { InstagramLogo, PinterestLogo, RedditLogo } from "phosphor-react";
import React from "react";

type Props = {
  source: string;
};

const SourceLogo = (props: Props) => {
  const { source } = props;

  if (source == "instagram")
    return <img height={34} width={34} src="/vectors/instagram.svg" />;
  else if (source == "pinterest")
    return <img height={34} width={34} src="/vectors/pinterest.svg" />;
  else if (source.includes("reddit"))
    return <img height={34} width={34} src="/vectors/reddit.svg" />;
  else return null;
};

export default SourceLogo;
