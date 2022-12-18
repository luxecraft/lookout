import { InstagramLogo, PinterestLogo, RedditLogo } from "phosphor-react";
import React from "react";

type Props = {
  source: string;
};

const SourceLogo = (props: Props) => {
  const { source } = props;

  if (source == "instagram")
    return <InstagramLogo size={24} color="#fcf8f8" weight="fill" />;
  else if (source == "pinterest")
    return <PinterestLogo size={24} color="#fcf8f8" weight="fill" />;
  else if (source.includes("reddit"))
    return <RedditLogo size={24} color="#fcf8f8" weight="fill" />;
  else return null;
};

export default SourceLogo;
