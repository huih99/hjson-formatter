/*
 * @Author: TanHui
 * @Date: 2021-02-23 11:44:01
 * @LastEditors: TanHui
 * @LastEditTime: 2021-04-26 14:31:52
 * @Description:
 */
declare interface HjsonOptions {
    condense?: number;
    bracesSameLine?: boolean;
    emitRootBraces?: boolean;
    quotes?: 'min' | 'keys' | 'strings' | 'all';
    multiline?: "std" | "no-tabs" | "off";
    separator?: boolean;
    space?: number | string;
    eol?: string;
    colors?: boolean;
    serializeDeterministically?: boolean
}

declare module "hjson" {
    interface HJSON {
        setEndOfLine: (eol: string) => void;
        rt: {
            parse: (text: string, options?: object) => any,
            stringify: (source: any, options?: object) => string
        }
    }
    const hjson: HJSON;
    export = hjson;
}