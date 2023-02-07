/* eslint-disable */

declare type TAnimeInst = {
   update: Function,
   begin: Function,
   run: Function,
   complete: Function,
   
   duration: number,
   offset: number,
   delay: number,
   paused: boolean,
   currentTime: number,
   begain: boolean,
   completed: boolean,
   reversed: boolean,
   direction: 'alternate' | 'normal',
   autoplay: boolean,
   finished: any,
   children: any[],
   animations: any[],
   
   add: (p: TAnimeParam) => TAnimeInst,
   tick: (t: number) => void,
   seek: (t: number) => void,
   pause: () => void,
   play: () => void,
   reset: () => void,
   reverse: () => void,
   restart: () => void
}
declare type TAnimeStyle = { value?: number, proportion?: number }[] | number[] | number
declare type TAnimeParam = {|
   targets?: string | HTMLElement | HTMLElement[],
   direction?: 'normal' | 'alternate',
   loop?: number,
   autoplay?: boolean,
   easing?: string,
   elasticity?: number,
   round?: number,
   translateX?: TAnimeStyle,
   translateY?: TAnimeStyle,
   translateZ?: TAnimeStyle,
   rotate?: TAnimeStyle,
   rotateX?: TAnimeStyle,
   rotateY?: TAnimeStyle,
   rotateZ?: TAnimeStyle,
   scale?: TAnimeStyle,
   scaleX?: TAnimeStyle,
   scaleY?: TAnimeStyle,
   scaleZ?: TAnimeStyle,
   skewX?: TAnimeStyle,
   skewY?: TAnimeStyle,
   update?: (anime: TAnimeInst) => void,
   begin?: (anime: TAnimeInst) => void,
   complete?: (anime: TAnimeInst) => void,
   offset?: number | Function,
   duration?: number | Function,
   delay?: number | Function,
   //NOTE: custom modification
   proportion?: number | () => number,
   earlier?: number | () => number,
   wait?: number | () => number
|}

declare module 'animejs' {
   declare type AnimeClass = {
      (p: TAnimeParam): TAnimeInst,
      version: string,
      speed: number,
      running: TAnimeInst[],
      remove: Function,
      getValue: Function,
      path: (path: string | HTMLElement, percent: number) => Function,
      setDashoffset: (el: HTMLElement) => number,
      bezier: (x1: number, y1: number, x2: number, y2: number) => number,
      easings: string,
      random: (min: number, max: number) => number,
      timeline (p: TAnimeParam): TAnimeInst,
      TParam: TAnimeParam,
      TStyle: TAnimeStyle,
      TInstance: TAnimeInst
   }
   
   declare var exports: AnimeClass;
}
