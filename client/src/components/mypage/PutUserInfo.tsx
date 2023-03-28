/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getToken } from "@/api/instance";
import getIsNickname from "@/api/user/getIsNickname";
import { putMyInfo } from "@/api/user/putMyInfo";
import { useState } from "react";
import { useEffect } from "react";
const PutUserInfo = () => {
  const defaultProfileImage = "/assets/default_image.png";
  const token = getToken();
  const [nickname, setNickname] = useState("");
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [nicknameValidityMessage, setNicknameValidityMessage] = useState("");
  const [gender, setGender] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [image, setImage] = useState<string | undefined>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const onClickProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(profileImage);
    }
  }, [profileImage]);
  const onClickGender = (newGender: number) => {
    setGender(newGender);
  };
  const onclickAge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(Number(event.target.value));
  };
  const onClickSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nickname && gender !== null && age !== null) {
      const myInfo = {
        file: profileImage,
        gender,
        age,
        nickName: nickname,
      };
      try {
        const response = await putMyInfo(myInfo);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("모든 필수 입력 항목을 입력해주세요.");
    }
  };
  const handleNicknameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    console.log(nickname);
  };

  const onClickCheckDuplicateNickname = () => {
    if (!nickname) {
    }
    getIsNickname(nickname, token).then((res) => {
      console.log(res);
      if (res === false) {
        setNicknameValidityMessage("사용 가능한 닉네임이에요");
      } else {
        setNicknameValidityMessage("사용이 불가능한 닉네임이에요");
      }
    });
  };
  const handleClickAge = (selectedAge: number) => {
    setAge(selectedAge);
    setDropdownVisible(false);
  };
  // const onClickIsButton = () => {
  //   setIsClicked(!isClicked);
  // };
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
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onClickProfileImageChange}
            />
          </div>
          <div css={nicknamewrapCSS}>
            <label htmlFor="">
              <h3>닉네임</h3>
            </label>
            <input
              css={inputwrapCSS}
              type="text"
              placeholder="닉네임을 입력해주세요"
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
              <div>연령대를 선택해주세요</div>
            </button>
            <div css={dropdownContentCSS(dropdownVisible)}>
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
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  height: auto; /* height를 auto로 설정하여 내용물에 따라 높이가 자동 조절되도록 합니다. */
  white-space: nowrap; /* 글자가 한 줄로 표시되도록 합니다. */
`;

const dropdownContentCSS = (dropdownVisible: boolean) => css`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
  transition: opacity 0.3s ease, transform 0.5s ease; /* 애니메이션 추가 */
  opacity: ${dropdownVisible ? 1 : 0};
  visibility: ${dropdownVisible ? "visible" : "hidden"};
  transform: translateY(${dropdownVisible ? 0 : -10}px);
  width: 47%;
`;

const dropdownItemCSS = css`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
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
    : ""};
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
  margin-top: 5px;
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
