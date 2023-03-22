/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getListByTagName } from "../../api/search";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import BookCardSearch from "@/components/UI/BookCard/BookCardSearch";

interface Book {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  score: number;
}

const tagName = ({ data }: any) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  return (
    <>
      {data.map((book: Book) => (
        <BookCardSearch
          key={book.bookId}
          bookData={book}
          showPlatform={false}
          width={"200px"}
          height={"300px"}
          minWidth={"200px"}
          minHeight={"300px"}
        />
      ))}
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const type = context.query.type;
  const tagName = context.query.query;
  const [prevId, prevScore, size] = [20493, 10, 10];
  if (typeof type == "string" && typeof tagName == "string") {
    const data = await getListByTagName(
      type,
      tagName,
      prevId,
      prevScore,
      size
    ).then((res) => {
      return res;
    });
    return await {
      props: {
        data,
      },
    };
  } else {
    return { props: {} };
  }
};

export default tagName;
