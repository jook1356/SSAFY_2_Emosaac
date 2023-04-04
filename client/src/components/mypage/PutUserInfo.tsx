/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getToken } from "@/api/instance";
import getIsNickname from "@/api/user/getIsNickname";
import { putMyInfo } from "@/api/user/putMyInfo";
import { useState } from "react";
import { useEffect } from "react";
import getMyInfo from "@/api/user/getMyInfo";
import Router from "next/router";
import { useRouter } from "next/router";
const PutUserInfo = ({ myInfo }: any) => {
  const router = useRouter();
  const defaultProfileImage = "/assets/default_image.png";
  const token = getToken();
  const [nickname, setNickname] = useState("");
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [nicknameValidityMessage, setNicknameValidityMessage] = useState("");
  const [nicknameLenghValidityMessage, setNicknameLenghValidityMessage] =
    useState("");
  const [gender, setGender] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(
    localStorage.getItem("age")
      ? parseInt(localStorage.getItem("age") as string)
      : null
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [image, setImage] = useState<string | undefined>(myInfo?.imageUrl);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  // 프로필 사진 변경
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(myInfo?.imageUrl);
    }
  };

  // 넣으면 바로 프로필 사진이 바뀌게 하는 useEffect
  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(profileImage);
    } else {
      setImage(myInfo?.imageUrl);
    }
  }, [profileImage, myInfo?.imageUrl]);
  const onClickGender = (newGender: number) => {
    setGender(newGender);
  };
  // nickname, age, 성별 수정시 localstorage변경
  // useEffect(() => {}, [age, nickname]);

  // 정보 수정 제출 함수
  const onClickSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ageFromLocalStorage = localStorage.getItem("age")
      ? parseInt(localStorage.getItem("age") as string)
      : null;
    const isFirstTime =
      localStorage.getItem("nickName") === "" ||
      localStorage.getItem("age") === "" ||
      localStorage.getItem("gender") === "";
    // console.log(isFirstTime);
    // 닉네임 최소 2자 ~ 10자
    // console.log(!nickname, gender, age);
    // if (isFirstTime && (!nickname || !gender || !age)) {
    //   alert("모든 항목을 입력해주세요.");
    //   return;
    // }
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!isNicknameDuplicate) {
      alert("닉네임 중복확인을 해주세요");
      return;
    }
    if (!age) {
      alert("연령대를 선택해주세요.");
      return;
    }
    if (gender) {
      alert("성별을 선택해주세요.");
      return;
    }

    const myInfo = {
      file: profileImage,
      gender,
      age: ageFromLocalStorage,
      nickName: nickname,
    };
    try {
      localStorage.setItem("age", age?.toString() || "");
      localStorage.setItem("nickname", nickname?.toString());
      localStorage.setItem("gender", gender?.toString() || "");
      const response = await putMyInfo(myInfo);
      // console.log(response);

      alert("수정되었어요");
      router.push("/mypage");
    } catch (error) {
      console.log(error);
    }
  };
  // 닉네임 input 함수
  const handleNicknameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    // if (nickname.length < 2 || nickname.length <= 10) {
    //   alert("닉네임은 2자에서 10자 사이만 가능해요");
    //   setNickname("");
    //   return;
    // }
    // console.log(nickname);
  };
  // 중복 검사 함수
  const onClickCheckDuplicateNickname = () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요!");
      return;
    }
    getIsNickname(nickname, token).then((res) => {
      // console.log(res);
      if (res === false) {
        setNicknameValidityMessage("사용 가능한 닉네임이에요");
        // 중복확인을 했다는 flag
        setIsNicknameDuplicate(true);
      } else {
        setNicknameValidityMessage("사용이 불가능한 닉네임이에요");
        setIsNicknameDuplicate(false);
      }
    });
  };
  // 연령대 클릭 함수
  const handleClickAge = (selectedAge: number | null) => {
    setAge(selectedAge);
    setSelectedAge(selectedAge);
    setDropdownVisible(false);
  };

  // 초기 렌더링에 nickname이 있으면 기본값으로 넣어두는 함수
  useEffect(() => {
    getMyInfo().then((res) => {
      const data = res;
      // console.log(data);
      if (data !== null) {
        setNickname(data.nickname);
        if (data.gender === 0) {
          setGender(0);
        } else {
          setGender(1);
        }
        if (data.age) {
          setSelectedAge(data.age);
        }
      }
      // console.log(myInfo);
    });
  }, []);
  return (
    <>
      <section>
        <form action="" css={formCSS} onSubmit={onClickSubmit}>
          <article css={textwrapCSS}>
            <h2>회원정보수정</h2>
          </article>
          <div>
            <div css={imagewrapCSS}>
              <label htmlFor="profileImage">
                <img
                  css={imageCSS}
                  src={image || defaultProfileImage}
                  alt="프로필 이미지"
                />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
          <div css={nicknamewrapCSS}>
            <label htmlFor="" css={nicknameCSS}>
              <h3>닉네임</h3>
              <div css={nicknameexplainCSS}>
                2글자 ~ 10글자 사이로 입력해주세요
              </div>
            </label>
            <input
              css={inputwrapCSS}
              type="text"
              placeholder={nickname ? nickname : "닉네임을 입력해주세요"}
              value={nickname}
              onChange={handleNicknameInput}
            />
            <button
              css={nicknameconfirmCSS}
              onClick={onClickCheckDuplicateNickname}
              type="button"
            >
              중복확인
            </button>
          </div>
          {!isNicknameDuplicate ? (
            <div>{nicknameValidityMessage}</div>
          ) : (
            <div>{nicknameValidityMessage}</div>
          )}
          <div css={genderwrapCSS}>
            <h3 css={genderCSS}>성별</h3>
            <button
              onClick={(event) => {
                event.preventDefault();
                onClickGender(0);
              }}
              css={genderbuttonCSS(0, gender)}
            >
              남성
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                onClickGender(1);
              }}
              css={genderbuttonCSS(1, gender)}
            >
              여성
            </button>
          </div>
          <div css={agewrapCSS}>
            <h3 css={ageCSS}>연령대</h3>
            <div css={explainCSS}>연령대에 맞게 추천을 해드려요!</div>
          </div>
          <div css={dropdownContainerCSS}>
            <button
              css={dropdownButtonCSS}
              onClick={(event) => {
                setDropdownVisible(!dropdownVisible), event.preventDefault();
              }}
            >
              <div>
                {selectedAge ? `${selectedAge}대` : "연령대를 선택해주세요"}
              </div>
            </button>
            <div css={dropdownContentCSS(dropdownVisible)}>
              <div onClick={() => handleClickAge(null)} css={dropdownItemCSS}>
                연령대를 선택해주세요
              </div>
              <div onClick={() => handleClickAge(10)} css={dropdownItemCSS}>
                10대
              </div>
              <div onClick={() => handleClickAge(20)} css={dropdownItemCSS}>
                20대
              </div>
              <div onClick={() => handleClickAge(30)} css={dropdownItemCSS}>
                30대
              </div>
              <div onClick={() => handleClickAge(40)} css={dropdownItemCSS}>
                40대
              </div>
              <div onClick={() => handleClickAge(50)} css={dropdownItemCSS}>
                50대
              </div>
              <div onClick={() => handleClickAge(60)} css={dropdownItemCSS}>
                60대 이상
              </div>
            </div>
          </div>

          <div css={submitwrapCSS}>
            <button type="submit" css={submitCSS}>
              정보 수정
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

const formCSS = css`
  color: var(--text-color);
  display: flex;
  min-height: 400px; // 변경된 부분
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  padding: 45px;
  border-radius: 5px;
  margin: 20px auto;
  border: 1px solid var(--border-color);
`;
const textwrapCSS = css`
  text-align: left;
  margin-bottom: 70px;
`;

const nicknamewrapCSS = css`
  position: relative;
  margin-top: 30px;
`;

const nicknameCSS = css`
  display: flex;
`;
const nicknameexplainCSS = css`
  margin-left: 2px;
  margin-top: 10px;
  font-size: 10px;
`;
const nicknameconfirmCSS = css`
  position: absolute;
  cursor: pointer;
  color: var(--main-color);
  border: 1px solid var(--border-color);
  background-color: var(--back-color);
  border-radius: 5px;
  padding: 3px 3px;
  /* color :  */
  border: none;
  bottom: 5px;
  right: 0px;
`;
const imagewrapCSS = css`
  width: 150px;
  height: 150px;
  /* img태그 위에 auto를 주어야 바뀜 */
  margin: 0 auto;
`;
const imageCSS = css`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  cursor: pointer;
`;
const inputwrapCSS = css`
  border: none;
  border-bottom: 3px solid var(--main-color);
  margin-top: 10px;
  width: 100%;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--text-color);
    font-weight: bold;
  }
  background-color: var(--back-color);
  color: var(--text-color);
`;

const dropdownContainerCSS = css`
  position: relative;
  display: inline-block;
`;

const dropdownButtonCSS = css`
  background-color: var(--back-color);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  height: auto; /* height를 auto로 설정하여 내용물에 따라 높이가 자동 조절되도록 합니다. */
  white-space: nowrap; /* 글자가 한 줄로 표시되도록 합니다. */
`;

const dropdownContentCSS = (dropdownVisible: boolean) => css`
  position: absolute;
  background-color: var(--back-color);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
  transition: opacity 0.3s ease, transform 0.5s ease; /* 애니메이션 추가 */
  opacity: ${dropdownVisible ? 1 : 0};
  visibility: ${dropdownVisible ? "visible" : "hidden"};
  transform: translateY(${dropdownVisible ? 0 : -10}px);
  width: 55%;
  color: var(--text-color);
`;

const dropdownItemCSS = css`
  padding: 5px;
  cursor: pointer;
  color: var(--text-color);
  &:hover {
    background-color: var(--back-color);
  }
`;
const genderwrapCSS = css`
  margin-top: 20px;
`;

const genderCSS = css`
  border: none;
  /* border-bottom: 3px solid var(--main-color); */
  padding-bottom: 1px;
`;
const genderbuttonCSS = (
  selectedGender: number,
  currentGender: number | null
) => css`
  cursor: pointer;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 3px;
  background-color: ${selectedGender === currentGender
    ? "var(--main-color)"
    : "var(--back-color)"};
  color: var(--text-color);
`;
const agewrapCSS = css`
  margin-top: 20px;
`;

const ageCSS = css`
  border: none;
  /* border-bottom: 3px solid var(--main-color); */
  padding-bottom: 1px;
`;

const explainCSS = css`
  margin-left: 2px;
  margin-top: 6px;
  font-size: 10px;
`;

const submitwrapCSS = css`
  height: 30px;
`;

const submitCSS = css`
  cursor: pointer;
  margin-top: 25px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: var(--main-color);
`;
export default PutUserInfo;
