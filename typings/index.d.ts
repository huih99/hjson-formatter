/*
 * @Author: TanHui
 * @Date: 2021-02-23 11:44:01
 * @LastEditors: TanHui
 * @LastEditTime: 2021-02-23 14:36:59
 * @Description:
 */
declare module "hjson" {
    interface HJSON {
        rt: {
            parse: (text: string, options?: object) => any,
            stringify: (source: any, options?: object) => string
        }
    }
    const hjson: HJSON;
    export = hjson;
}