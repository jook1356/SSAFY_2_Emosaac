import Image from "next/image";
import profileimage from "../../assets/profileexample.jpg";
export default function PutUserInfo() {
  return (
    <>
      <section>
        <form action="">
          <div>회원정보수정</div>
          <div>
            <Image src={profileimage} alt="프로필 이미지" />
          </div>
          <div>
            <input type="file" placeholder="사진 수정하기"/>
          </div>
          <div>
            <input type="text" placeholder="닉네임"/>
          </div>
          <div>
            <div>
                <button>남</button>
                <button>여</button>
            </div>
          </div>
          <div>
            <input type="text" placeholder="연령대를 고르는 곳입니다."/>
          </div>
        </form>
      </section>
    </>
  );
}
