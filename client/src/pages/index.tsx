/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { getBookData } from "@/api/book";

export default function Home() {

  const test = async () => {
    const data = await getBookData(2)
    .then((res) => {
      return res
    })
    await console.log(data)
  }
  
  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}

