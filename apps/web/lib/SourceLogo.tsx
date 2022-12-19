import { InstagramLogo, PinterestLogo, RedditLogo } from "phosphor-react";
import React from "react";

type Props = {
  source: string;
};

const SourceLogo = (props: Props) => {
  const { source } = props;

  if (source == "instagram")
    return <img className="social-logo" src="/vectors/instagram.svg" />;
  else if (source == "pinterest")
    return <img className="social-logo" src="/vectors/pinterest.svg" />;
  else if (source.includes("reddit"))
    return <img className="social-logo" src="/vectors/reddit.svg" />;
  else return <img className="social-logo rounded-md" src={source} />;
};

export default SourceLogo;
