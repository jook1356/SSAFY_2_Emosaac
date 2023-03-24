/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";


export default function Home() {
  const test = async () => {
    const data = await getBooksByGenre({ genreCode: 10, typeCode: 0 }).then(
      (res) => {
        return res;
      }
    );
    await console.log(data);
  };

  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}
