import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            surface: string,
            default: string,
            muted: string,
            surface5: string,
            surface3: string,
            disabled: string,
            disabledbtn: string,
            blue110: string,
            blue100: string,
            blue070: string,
            blue060: string,
            blue050: string,
            red: string,
            red050: string,
            violet: string,
        },
        device: {
            mobile: string,
            tablet: string,
            dasktop: string,
        },
    }
}
