/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { Global } from "@/styles/ThemeProvider"

interface Props {
    children: any
}

const Layout = (props: Props) => {

    return (
        <div css={Global}>
            {props.children}
        </div>
    )
}

export default Layout