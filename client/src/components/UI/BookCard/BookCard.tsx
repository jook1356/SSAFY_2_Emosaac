/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

interface Props {
  title: string;
  img: string;
  platform: string;
  showPlatform: boolean;
  width: string;
  height: string;
}

const BookCard = ({
  title,
  img,
  platform,
  showPlatform,
  width,
  height,
}: Props) => {
  return <div css={cardWrapper({ width: "200px", height: "200px" })}></div>;
};

interface CardWrapperProps {
  width: string;
  height: string;
}

const cardWrapper = ({ width, height }: CardWrapperProps) => {
  return css`
    width: ${width};
    height: ${height};
  `;
};

export default BookCard;
