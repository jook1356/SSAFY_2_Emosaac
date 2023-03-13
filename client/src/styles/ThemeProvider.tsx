/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import mainStore, { darkMode } from '@/jotai/atom';
import { atom, useAtom } from "jotai";


interface Theme {
    PrimaryColor: string;
    SubColor1: string;
    SubColor2: string;
    BackgroundColor1: string;
    BackgroundColor2: string;
}



// 폰트의 경우 _document.tsx 파일의 <Head></Head> 태그 사이에 link 태그를 삽입합니다.
export const Global = css`
    font-family: 'Sofia Sans Semi Condensed', sans-serif;
`



export const Common = {
    
}

export const LightTheme: Theme = {
    PrimaryColor: 'red',
    SubColor1: '',
    SubColor2: '',
    BackgroundColor1: '',
    BackgroundColor2: '',
}

export const DarkTheme: Theme = {
    PrimaryColor: 'blue',
    SubColor1: '',
    SubColor2: '',
    BackgroundColor1: '',
    BackgroundColor2: '',
}


// export const ThemeProvider = Object.assign(mainStore.get(darkMode) ? DarkTheme : LightTheme, Common)



