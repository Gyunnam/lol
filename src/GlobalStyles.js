import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *{
    margin: 0;
    padding: 0;  
    }

    body {
        box-sizing: border - box;
        font-size : 12px;
        line-height : 1em
        color : color: #333;
    }
    a{
        text-decoration : none;
        color : inherit;
    }
    ul {
        list-style: none;
    }
`

export default GlobalStyle