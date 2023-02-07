/**
* Created by gordianknot on 7/13/2017.
*/


<template>
   <section class="layout-About">
      <section class="about-main">
         <section class="about-mainImage">
            <div class="about-text block-center">
               <h1> ABOUT </h1>
               <h3>CURTIS CHANG</h3>
               <svg viewBox="0 0 46.79 23.69">
                  <path d="M1.89 2.33l21.5 17.5 21.5-17.5" class="arrow"/>
               </svg>
            </div>
            <!--FIXME: 改為responsive background image-->
            <div class="about-image "> <!--<img src="../assets/refs/menu/about_main.png"/>--> </div>
         </section>
         <parallax :debug="false" :settings="settings.dec1" class="about-mainDescription literalText">
            <div slot="content" class="description-pos literalContent">
               <p class="twoColumn ">數年前當中途之家, 領養了一隻半身癱瘓旳流浪狗, 因而開始接觸寵物輪椅, 這件事開啟了自己想要把創造的動力放在改善生活的產品上,也因為這樣而開始留意生活的不便寫起應用程式,
               原本以為程式比產品好實現，但是當自己投注所有精力時，才發覺二者兼顧的二難，因為本質是設計，很難像工程師的思維這麼單一化，只管功能實作，而不會被使用操作及功能面拉走，當精力用完，很難再回到設計面，本來是每個做設計都明白的，只是當自己跳進了技術面以後, 反而變得看不清全貌。不過這也讓我體會到：</p>
               <h3 class="textCenter headline">
                  <br><span style="color:white;font-size:1rem">也許</span>
                  設計是一種整體觀，這種整體觀要能夠隨著部份的變動而産生彈性，不必然與職業有關，放到生命中是修行與哲學，放到療癒是完形，放到産品是工業設計。而人生最大的設計就是我這個人好不好用，有沒有效能，有沒有彈性，無論最終選擇去做的是什麼。 <br>
                  <br></h3>
               <p class="twoColumn ">
                  設計本來講求以人為本，但是往往難的不是以人為本的方法，而是人常常受限於文化的制約，人際的制約而很難真正做到以人為本，甚至是自我不安的制約，或者為了達到效率不得不把人事物標籤化以方便行事，這也是UX最難的地方，因為UX需要的是整體的文化均運作在以人為本的基楚上，而不是只有設計師本人，集體能不能夠為「非我」的部份工作，反而變的很重要。所以到頭來，自己設計做不好，還是得回到修養不好，太過疆化自我太多來處理，這也是為什麼後來開始學禪的原因。</p>
               <svg class="yesLogo about-yesLogo" viewBox="0 0 222.17 56.65">
                  <g>
                     <path
                           d="M222.14 20.59v5.86h-2.44v-5.54a5 5 0 0 0 0-.53 2.8 2.8 0 0 0-.12-.55.69.69 0 0 0-.42-.43 3.1 3.1 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.89 3.89 0 0 1 .4 2.09zM213.76 42.26v1.84h-2.23a2.73 2.73 0 0 1-2.11-.76 2.94 2.94 0 0 1-.73-2.1v-4.53H207v-1.83h1.7v-3.37h2.44v3.36h2.61v1.83h-2.61v3.74a2.23 2.23 0 0 0 .28 1.23 1.15 1.15 0 0 0 .75.5 8 8 0 0 0 1.35.09zM211.66 17.25v8.9a5 5 0 0 1-.35 2 2.65 2.65 0 0 1-1.13 1.25 4.44 4.44 0 0 1-2 .41h-4.79V28h4.35a1.28 1.28 0 0 0 1.47-1.44h-3.41a4.41 4.41 0 0 1-1-.28 3.94 3.94 0 0 1-2.07-2.26 5.64 5.64 0 0 1-.35-2 4.29 4.29 0 0 1 .9-3.13 5.94 5.94 0 0 1 1.47-1.13 4.3 4.3 0 0 1 1.12-.32q.56-.07.86-.08h.48zm-2.44 7.35v-5.35h-1.28a6.4 6.4 0 0 0-1.48.17 1.74 1.74 0 0 0-.93.52 2.25 2.25 0 0 0-.56 1.54V22a2.54 2.54 0 0 0 1 2.22 1.59 1.59 0 0 0 .73.31 6.63 6.63 0 0 0 1 .07h1.56zM203.2444 34.9082l2.52-.0105.0387 9.25-2.52.0105zM203.2303 31.5484l2.52-.0106.0096 2.3-2.52.0106zM201.18 38.3v5.86h-2.47v-5.54-.53a3.3 3.3 0 0 0-.12-.55.71.71 0 0 0-.42-.43 2.9 2.9 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.48 6.48 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.84 3.84 0 0 1 .43 2.09zM198.3307 17.319l2.52-.0106.0387 9.25-2.52.0105zM198.3166 13.9492l2.52-.0106.0096 2.3-2.52.0105zM196.6 23.51a3.43 3.43 0 0 1-.22 1.33 3.28 3.28 0 0 1-.44.82 2.93 2.93 0 0 1-.64.59 2 2 0 0 1-1.23.32h-6.26v-1.89h5.14c.87 0 1.3-.32 1.3-.94s-.44-.89-1.3-.89h-2.84c-.17 0-.43 0-.75-.09a2.21 2.21 0 0 1-.9-.35 1.68 1.68 0 0 1-.61-.8 3.52 3.52 0 0 1-.22-1.29q0-2.94 3.25-3h5.22v1.91h-4.75c-.74 0-1.15.21-1.24.62v.3c0 .52.39.77 1.16.76h2.23a4.6 4.6 0 0 1 1.22.14 2.9 2.9 0 0 1 1 .47 2.25 2.25 0 0 1 .66.82 2.62 2.62 0 0 1 .22 1.17zM188.0448 34.972l2.52-.0106.0387 9.25-2.52.0104zM188.0307 31.612l2.52-.0105.0096 2.3-2.52.0105zM186.84 35v1.84h-2.34v7.4H182v-7.4h-1.73V35H182v-1.14a5.94 5.94 0 0 1 .06-.73 1.89 1.89 0 0 1 .3-.81 1.42 1.42 0 0 1 .77-.51 4.25 4.25 0 0 1 1.4-.19h2.33v1.82h-1.02a1.55 1.55 0 0 0-1 .23c-.22.12-.33.38-.33.81V35zM186.36 24.69v1.91h-3.56a4.52 4.52 0 0 1-3.52-1.25 4.79 4.79 0 0 1-1.16-3.35 4.51 4.51 0 0 1 .88-3.1 3.94 3.94 0 0 1 1.79-1.26 6.81 6.81 0 0 1 2-.28h3.56v1.91h-3.23a4.94 4.94 0 0 0-1.25.13 1.21 1.21 0 0 0-.72.52 1.74 1.74 0 0 0-.31 1.12h5.51V23h-5.51a2 2 0 0 0 .26 1.1 1.28 1.28 0 0 0 .73.52 6.64 6.64 0 0 0 1.28.1zM179.1 38.39v5.86h-2.48v-5.54-.53a3 3 0 0 0-.12-.55.68.68 0 0 0-.42-.43 2.93 2.93 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.13.29 2.43 2.43 0 0 1 1.3 1 3.87 3.87 0 0 1 .43 2.09zM177.06 19.82v.77c0 2.21-.45 3.69-1.36 4.47a6.31 6.31 0 0 1-2.3 1.37 9.42 9.42 0 0 1-2.2.23h-5.8l-.05-12.61h5.75a7.21 7.21 0 0 1 3.21.61 3.9 3.9 0 0 1 1.78 1.61 9 9 0 0 1 .74 1.8 7 7 0 0 1 .23 1.75zm-2.87.53a11.27 11.27 0 0 0-.16-1.92 2.8 2.8 0 0 0-.61-1.4 1.78 1.78 0 0 0-.85-.62 4.59 4.59 0 0 0-.74-.13 6.82 6.82 0 0 0-.74 0H168v8.23h3.07a5.68 5.68 0 0 0 1.31-.13 1.88 1.88 0 0 0 .95-.57 2.92 2.92 0 0 0 .67-1.47 11.47 11.47 0 0 0 .18-1.99zM165.4213 31.7067l2.77-.0116.0528 12.61-2.77.0116zM158.86 34.24a12.36 12.36 0 0 1-.18 2.19 12.11 12.11 0 0 1-.73 2.35 5.77 5.77 0 0 1-1.87 2.38 8 8 0 0 1-3.15 1.44 17.11 17.11 0 0 1-4.33.47l-16.42.07v-5.27l15.44-.07a7.52 7.52 0 0 0 3.53-.69 2.63 2.63 0 0 0 1.23-2.55v-.62a3.11 3.11 0 0 0-.66-1.83 3.57 3.57 0 0 0-1.58-.81 9.33 9.33 0 0 0-2.14-.2h-7.28q-4.71 0-7.27-1.93c-1.7-1.31-2.57-3.49-2.58-6.57a10.65 10.65 0 0 1 .76-4.16 6.68 6.68 0 0 1 2.11-2.85 8.37 8.37 0 0 1 3.1-1.42 16.61 16.61 0 0 1 4.28-.46l16.21-.07v5.27l-15.2.09q-4.82 0-4.8 3.85a2.65 2.65 0 0 0 1.11 2.37 4.52 4.52 0 0 0 2.82.8h8.12a24.23 24.23 0 0 1 4.21.31 7.77 7.77 0 0 1 3.46 2q1.79 1.54 1.81 5.91zM127.18 38.05v5.11h-10.37a21.49 21.49 0 0 1-5-.49 10.89 10.89 0 0 1-7.71-7.13 19.43 19.43 0 0 1-1.1-6.42l.08-1.75a14.91 14.91 0 0 1 .31-3.11 22.64 22.64 0 0 1 .81-2.86 11.93 11.93 0 0 1 1.17-2.4 13.79 13.79 0 0 1 1.91-2.3 7.63 7.63 0 0 1 3.05-1.88 18.12 18.12 0 0 1 3.37-.81 24.19 24.19 0 0 1 3.17-.22h10.21v5.11h-10.13a7.13 7.13 0 0 0-5.12 1.76 6.77 6.77 0 0 0-1.79 5.13l17.07-.07v5.1l-17.07.07c0 2.46.46 4.18 1.37 5.17a5.25 5.25 0 0 0 2.59 1.78 14.11 14.11 0 0 0 3.09.26zM103.55 13.89L92.39 30.4l.05 12.9-6.25.03-.05-12.9L75 14.01l6.86-.03 7.32 11.24 7.26-11.3 7.11-.03M62.29 8a8.9 8.9 0 0 1 2.85 8.3c-.72 4.77-1.91 24.74-16.89 34.6-13.37 8.78-29.31 6.18-35.78.46 6.94 2.63 16.15 2.92 24-3.8 9.33-8 11.29-21.09 14.92-29.56 1.3-3 2.67-7.22 4.88-6.67S52.05 9.25 49.91 9s-7.76-.13-9.58 2.73-5.41 12-5.65 12.94-.94 2.06-2 2.06H25c-1.27 0-1.2-1.58-1-2.69s2.12-12.89 6.4-14.39c5.8-2-1.55-1.91-2.15-1.93a12 12 0 0 0-11.16 6.78A95.83 95.83 0 0 0 13 24.95c-1 2.86-.67 9.59 5 9.57l13-.06s-.2 13-13.2 13a16.92 16.92 0 0 1-11.27-4.77c-2.64-2.47-17.11-23.7 8-37.15S61.31 7.2 62.29 8z"/>
                  </g>
               </svg>
            </div>
         </parallax>
      </section>
      <parallax :debug="false" :settings="settings.temp" class="about-zen parallax bgImg">
         <div class="about-zenContent" slot="content">
            <div class="about-zenLogo bgImg"></div>
            <p class="literalText literalContent">
               禪者的初心，是一位日本禪師鈴木大佐所寫的書，當東方禪第一次有架構傳到西方，鈴木大佐這本書扮演很重要的角色，也為西方開啓了禪的視野，它有別於思辯式西方哲學，強調讓自己會到心最自然的狀態， 當我第一次讀到這本書，就像讀到設計來自生活到底是怎麼一回事，設計來自生活是一種現像，而這種現像背後的狀態是什麼，從來沒有人清楚的說明，只有禪講的很到位，多年以後Steve Jobs 去逝， 在一篇專欄裡讀到原來Steve Job 也很喜歡這本書，於是又把它拿起來讀了一遍。</p>
            <br><br><br>
         </div>
      </parallax>

      <section class="about-career">
         <section class="about-career-description">
            <p class="literalText literalContent">
               過去曾在林口沖壓廠擔任駐廠設計師，因為辦公室就在工廠裡，可以隨時和師博討論，也是在那個時候搞懂沖壓的制程限制，並讀了很多跟制程與表面處理有關的資料，也曾設計過工業電腦，一台雷腦有上百個零件，數十張工程圖，很考驗錙珠必較的能力，也設計過gaming kb mouse與presenter， 私下自己設計過音響,耳機, 手機架, 寵物糞便袋, 寵物推車與攜行籠. 實際生產與接觸的產品有 office mouse , gaming mouse, gaming keyboard, presenter, pen drive, 與IPC.
            </p>
            <svg class="yesLogo about-yesLogo" viewBox="0 0 222.17 56.65">
               <g>
                  <path
                        d="M222.14 20.59v5.86h-2.44v-5.54a5 5 0 0 0 0-.53 2.8 2.8 0 0 0-.12-.55.69.69 0 0 0-.42-.43 3.1 3.1 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.89 3.89 0 0 1 .4 2.09zM213.76 42.26v1.84h-2.23a2.73 2.73 0 0 1-2.11-.76 2.94 2.94 0 0 1-.73-2.1v-4.53H207v-1.83h1.7v-3.37h2.44v3.36h2.61v1.83h-2.61v3.74a2.23 2.23 0 0 0 .28 1.23 1.15 1.15 0 0 0 .75.5 8 8 0 0 0 1.35.09zM211.66 17.25v8.9a5 5 0 0 1-.35 2 2.65 2.65 0 0 1-1.13 1.25 4.44 4.44 0 0 1-2 .41h-4.79V28h4.35a1.28 1.28 0 0 0 1.47-1.44h-3.41a4.41 4.41 0 0 1-1-.28 3.94 3.94 0 0 1-2.07-2.26 5.64 5.64 0 0 1-.35-2 4.29 4.29 0 0 1 .9-3.13 5.94 5.94 0 0 1 1.47-1.13 4.3 4.3 0 0 1 1.12-.32q.56-.07.86-.08h.48zm-2.44 7.35v-5.35h-1.28a6.4 6.4 0 0 0-1.48.17 1.74 1.74 0 0 0-.93.52 2.25 2.25 0 0 0-.56 1.54V22a2.54 2.54 0 0 0 1 2.22 1.59 1.59 0 0 0 .73.31 6.63 6.63 0 0 0 1 .07h1.56zM203.2444 34.9082l2.52-.0105.0387 9.25-2.52.0105zM203.2303 31.5484l2.52-.0106.0096 2.3-2.52.0106zM201.18 38.3v5.86h-2.47v-5.54-.53a3.3 3.3 0 0 0-.12-.55.71.71 0 0 0-.42-.43 2.9 2.9 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.48 6.48 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.84 3.84 0 0 1 .43 2.09zM198.3307 17.319l2.52-.0106.0387 9.25-2.52.0105zM198.3166 13.9492l2.52-.0106.0096 2.3-2.52.0105zM196.6 23.51a3.43 3.43 0 0 1-.22 1.33 3.28 3.28 0 0 1-.44.82 2.93 2.93 0 0 1-.64.59 2 2 0 0 1-1.23.32h-6.26v-1.89h5.14c.87 0 1.3-.32 1.3-.94s-.44-.89-1.3-.89h-2.84c-.17 0-.43 0-.75-.09a2.21 2.21 0 0 1-.9-.35 1.68 1.68 0 0 1-.61-.8 3.52 3.52 0 0 1-.22-1.29q0-2.94 3.25-3h5.22v1.91h-4.75c-.74 0-1.15.21-1.24.62v.3c0 .52.39.77 1.16.76h2.23a4.6 4.6 0 0 1 1.22.14 2.9 2.9 0 0 1 1 .47 2.25 2.25 0 0 1 .66.82 2.62 2.62 0 0 1 .22 1.17zM188.0448 34.972l2.52-.0106.0387 9.25-2.52.0104zM188.0307 31.612l2.52-.0105.0096 2.3-2.52.0105zM186.84 35v1.84h-2.34v7.4H182v-7.4h-1.73V35H182v-1.14a5.94 5.94 0 0 1 .06-.73 1.89 1.89 0 0 1 .3-.81 1.42 1.42 0 0 1 .77-.51 4.25 4.25 0 0 1 1.4-.19h2.33v1.82h-1.02a1.55 1.55 0 0 0-1 .23c-.22.12-.33.38-.33.81V35zM186.36 24.69v1.91h-3.56a4.52 4.52 0 0 1-3.52-1.25 4.79 4.79 0 0 1-1.16-3.35 4.51 4.51 0 0 1 .88-3.1 3.94 3.94 0 0 1 1.79-1.26 6.81 6.81 0 0 1 2-.28h3.56v1.91h-3.23a4.94 4.94 0 0 0-1.25.13 1.21 1.21 0 0 0-.72.52 1.74 1.74 0 0 0-.31 1.12h5.51V23h-5.51a2 2 0 0 0 .26 1.1 1.28 1.28 0 0 0 .73.52 6.64 6.64 0 0 0 1.28.1zM179.1 38.39v5.86h-2.48v-5.54-.53a3 3 0 0 0-.12-.55.68.68 0 0 0-.42-.43 2.93 2.93 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.13.29 2.43 2.43 0 0 1 1.3 1 3.87 3.87 0 0 1 .43 2.09zM177.06 19.82v.77c0 2.21-.45 3.69-1.36 4.47a6.31 6.31 0 0 1-2.3 1.37 9.42 9.42 0 0 1-2.2.23h-5.8l-.05-12.61h5.75a7.21 7.21 0 0 1 3.21.61 3.9 3.9 0 0 1 1.78 1.61 9 9 0 0 1 .74 1.8 7 7 0 0 1 .23 1.75zm-2.87.53a11.27 11.27 0 0 0-.16-1.92 2.8 2.8 0 0 0-.61-1.4 1.78 1.78 0 0 0-.85-.62 4.59 4.59 0 0 0-.74-.13 6.82 6.82 0 0 0-.74 0H168v8.23h3.07a5.68 5.68 0 0 0 1.31-.13 1.88 1.88 0 0 0 .95-.57 2.92 2.92 0 0 0 .67-1.47 11.47 11.47 0 0 0 .18-1.99zM165.4213 31.7067l2.77-.0116.0528 12.61-2.77.0116zM158.86 34.24a12.36 12.36 0 0 1-.18 2.19 12.11 12.11 0 0 1-.73 2.35 5.77 5.77 0 0 1-1.87 2.38 8 8 0 0 1-3.15 1.44 17.11 17.11 0 0 1-4.33.47l-16.42.07v-5.27l15.44-.07a7.52 7.52 0 0 0 3.53-.69 2.63 2.63 0 0 0 1.23-2.55v-.62a3.11 3.11 0 0 0-.66-1.83 3.57 3.57 0 0 0-1.58-.81 9.33 9.33 0 0 0-2.14-.2h-7.28q-4.71 0-7.27-1.93c-1.7-1.31-2.57-3.49-2.58-6.57a10.65 10.65 0 0 1 .76-4.16 6.68 6.68 0 0 1 2.11-2.85 8.37 8.37 0 0 1 3.1-1.42 16.61 16.61 0 0 1 4.28-.46l16.21-.07v5.27l-15.2.09q-4.82 0-4.8 3.85a2.65 2.65 0 0 0 1.11 2.37 4.52 4.52 0 0 0 2.82.8h8.12a24.23 24.23 0 0 1 4.21.31 7.77 7.77 0 0 1 3.46 2q1.79 1.54 1.81 5.91zM127.18 38.05v5.11h-10.37a21.49 21.49 0 0 1-5-.49 10.89 10.89 0 0 1-7.71-7.13 19.43 19.43 0 0 1-1.1-6.42l.08-1.75a14.91 14.91 0 0 1 .31-3.11 22.64 22.64 0 0 1 .81-2.86 11.93 11.93 0 0 1 1.17-2.4 13.79 13.79 0 0 1 1.91-2.3 7.63 7.63 0 0 1 3.05-1.88 18.12 18.12 0 0 1 3.37-.81 24.19 24.19 0 0 1 3.17-.22h10.21v5.11h-10.13a7.13 7.13 0 0 0-5.12 1.76 6.77 6.77 0 0 0-1.79 5.13l17.07-.07v5.1l-17.07.07c0 2.46.46 4.18 1.37 5.17a5.25 5.25 0 0 0 2.59 1.78 14.11 14.11 0 0 0 3.09.26zM103.55 13.89L92.39 30.4l.05 12.9-6.25.03-.05-12.9L75 14.01l6.86-.03 7.32 11.24 7.26-11.3 7.11-.03M62.29 8a8.9 8.9 0 0 1 2.85 8.3c-.72 4.77-1.91 24.74-16.89 34.6-13.37 8.78-29.31 6.18-35.78.46 6.94 2.63 16.15 2.92 24-3.8 9.33-8 11.29-21.09 14.92-29.56 1.3-3 2.67-7.22 4.88-6.67S52.05 9.25 49.91 9s-7.76-.13-9.58 2.73-5.41 12-5.65 12.94-.94 2.06-2 2.06H25c-1.27 0-1.2-1.58-1-2.69s2.12-12.89 6.4-14.39c5.8-2-1.55-1.91-2.15-1.93a12 12 0 0 0-11.16 6.78A95.83 95.83 0 0 0 13 24.95c-1 2.86-.67 9.59 5 9.57l13-.06s-.2 13-13.2 13a16.92 16.92 0 0 1-11.27-4.77c-2.64-2.47-17.11-23.7 8-37.15S61.31 7.2 62.29 8z"/>
               </g>
            </svg>
         </section>
         <hr>
         <section class="about-usb">
            <parallax :debug="false" :settings="settings.careers[0][0]"
                      class="about-usb-pic about-contentPic bgImg">
            </parallax>
            <parallax :debug="false" :settings="settings.careers[0][1]" class="about-usb-content">
               <section slot="content">
                  <h3 class="headline">散熱片與隨身碟設計</h3>
                  <p class="literalText literalContent">
                     林口衝壓廠作品， 當年接觸很多衝壓、鋁擠、鋁抽、壓鑄一類的元件，也接觸到許多與金屬表面處理有關的産品，因為老闆及工廠師博就是我的機構，所以常常可以從他們那裡獲得一手資料
                  </p>
               </section>
            </parallax>
         </section>
         <hr>
         <section class="about-ipc">
            <parallax :debug="false" :settings="settings.careers[1][0]" class="about-ipc-pic about-contentPic bgImg"></parallax>
            <parallax :debug="false" :settings="settings.careers[1][1]" class="about-ipc-content">
               <section slot="content">
                  <h3 class="headline">IPC與PanelPC設計</h3>
                  <p class="literalText literalContent">
                     這是我第一份純機構設計工作， 一台電腦有近百個零件，光是把所有東西塞進去，組起來又無誤就己經把專案時間跑完了，不太可能有其他時間想些創新的東西，在不開模的前提下只能使用NCT跟現成五金零件，也是這份工作讓我徹底理解，當人過份鑽入細節跟技術面時，反而變得很難跳出來看全局，也讓我深刻的體會到，如何因為職業上的限制，使得機構設計與工業設計師産生觀點上的根本差異，産生差異的不單只是人，很多時候是環境與職業，在這種前提下，一個人的可塑性或者再塑性就變得很重要了，這也是禪的精要。IPC與PanelPC設計
                  </p>
               </section>
            </parallax>
         </section>
         <hr>
         <section class="about-gaming">
            <parallax :debug="false" :settings="settings.gaming" class="about-gaming-collection bgImg"></parallax>
            <parallax :debug="false" :settings="settings.careers[2][0]"
                      class="about-gaming-stack about-contentPic bgImg"></parallax>
            <svg class="yesLogo about-yesLogo" viewBox="0 0 222.17 56.65">
               <g>
<path
      d="M222.14 20.59v5.86h-2.44v-5.54a5 5 0 0 0 0-.53 2.8 2.8 0 0 0-.12-.55.69.69 0 0 0-.42-.43 3.1 3.1 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.89 3.89 0 0 1 .4 2.09zM213.76 42.26v1.84h-2.23a2.73 2.73 0 0 1-2.11-.76 2.94 2.94 0 0 1-.73-2.1v-4.53H207v-1.83h1.7v-3.37h2.44v3.36h2.61v1.83h-2.61v3.74a2.23 2.23 0 0 0 .28 1.23 1.15 1.15 0 0 0 .75.5 8 8 0 0 0 1.35.09zM211.66 17.25v8.9a5 5 0 0 1-.35 2 2.65 2.65 0 0 1-1.13 1.25 4.44 4.44 0 0 1-2 .41h-4.79V28h4.35a1.28 1.28 0 0 0 1.47-1.44h-3.41a4.41 4.41 0 0 1-1-.28 3.94 3.94 0 0 1-2.07-2.26 5.64 5.64 0 0 1-.35-2 4.29 4.29 0 0 1 .9-3.13 5.94 5.94 0 0 1 1.47-1.13 4.3 4.3 0 0 1 1.12-.32q.56-.07.86-.08h.48zm-2.44 7.35v-5.35h-1.28a6.4 6.4 0 0 0-1.48.17 1.74 1.74 0 0 0-.93.52 2.25 2.25 0 0 0-.56 1.54V22a2.54 2.54 0 0 0 1 2.22 1.59 1.59 0 0 0 .73.31 6.63 6.63 0 0 0 1 .07h1.56zM203.2444 34.9082l2.52-.0105.0387 9.25-2.52.0105zM203.2303 31.5484l2.52-.0106.0096 2.3-2.52.0106zM201.18 38.3v5.86h-2.47v-5.54-.53a3.3 3.3 0 0 0-.12-.55.71.71 0 0 0-.42-.43 2.9 2.9 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.48 6.48 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.84 3.84 0 0 1 .43 2.09zM198.3307 17.319l2.52-.0106.0387 9.25-2.52.0105zM198.3166 13.9492l2.52-.0106.0096 2.3-2.52.0105zM196.6 23.51a3.43 3.43 0 0 1-.22 1.33 3.28 3.28 0 0 1-.44.82 2.93 2.93 0 0 1-.64.59 2 2 0 0 1-1.23.32h-6.26v-1.89h5.14c.87 0 1.3-.32 1.3-.94s-.44-.89-1.3-.89h-2.84c-.17 0-.43 0-.75-.09a2.21 2.21 0 0 1-.9-.35 1.68 1.68 0 0 1-.61-.8 3.52 3.52 0 0 1-.22-1.29q0-2.94 3.25-3h5.22v1.91h-4.75c-.74 0-1.15.21-1.24.62v.3c0 .52.39.77 1.16.76h2.23a4.6 4.6 0 0 1 1.22.14 2.9 2.9 0 0 1 1 .47 2.25 2.25 0 0 1 .66.82 2.62 2.62 0 0 1 .22 1.17zM188.0448 34.972l2.52-.0106.0387 9.25-2.52.0104zM188.0307 31.612l2.52-.0105.0096 2.3-2.52.0105zM186.84 35v1.84h-2.34v7.4H182v-7.4h-1.73V35H182v-1.14a5.94 5.94 0 0 1 .06-.73 1.89 1.89 0 0 1 .3-.81 1.42 1.42 0 0 1 .77-.51 4.25 4.25 0 0 1 1.4-.19h2.33v1.82h-1.02a1.55 1.55 0 0 0-1 .23c-.22.12-.33.38-.33.81V35zM186.36 24.69v1.91h-3.56a4.52 4.52 0 0 1-3.52-1.25 4.79 4.79 0 0 1-1.16-3.35 4.51 4.51 0 0 1 .88-3.1 3.94 3.94 0 0 1 1.79-1.26 6.81 6.81 0 0 1 2-.28h3.56v1.91h-3.23a4.94 4.94 0 0 0-1.25.13 1.21 1.21 0 0 0-.72.52 1.74 1.74 0 0 0-.31 1.12h5.51V23h-5.51a2 2 0 0 0 .26 1.1 1.28 1.28 0 0 0 .73.52 6.64 6.64 0 0 0 1.28.1zM179.1 38.39v5.86h-2.48v-5.54-.53a3 3 0 0 0-.12-.55.68.68 0 0 0-.42-.43 2.93 2.93 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.13.29 2.43 2.43 0 0 1 1.3 1 3.87 3.87 0 0 1 .43 2.09zM177.06 19.82v.77c0 2.21-.45 3.69-1.36 4.47a6.31 6.31 0 0 1-2.3 1.37 9.42 9.42 0 0 1-2.2.23h-5.8l-.05-12.61h5.75a7.21 7.21 0 0 1 3.21.61 3.9 3.9 0 0 1 1.78 1.61 9 9 0 0 1 .74 1.8 7 7 0 0 1 .23 1.75zm-2.87.53a11.27 11.27 0 0 0-.16-1.92 2.8 2.8 0 0 0-.61-1.4 1.78 1.78 0 0 0-.85-.62 4.59 4.59 0 0 0-.74-.13 6.82 6.82 0 0 0-.74 0H168v8.23h3.07a5.68 5.68 0 0 0 1.31-.13 1.88 1.88 0 0 0 .95-.57 2.92 2.92 0 0 0 .67-1.47 11.47 11.47 0 0 0 .18-1.99zM165.4213 31.7067l2.77-.0116.0528 12.61-2.77.0116zM158.86 34.24a12.36 12.36 0 0 1-.18 2.19 12.11 12.11 0 0 1-.73 2.35 5.77 5.77 0 0 1-1.87 2.38 8 8 0 0 1-3.15 1.44 17.11 17.11 0 0 1-4.33.47l-16.42.07v-5.27l15.44-.07a7.52 7.52 0 0 0 3.53-.69 2.63 2.63 0 0 0 1.23-2.55v-.62a3.11 3.11 0 0 0-.66-1.83 3.57 3.57 0 0 0-1.58-.81 9.33 9.33 0 0 0-2.14-.2h-7.28q-4.71 0-7.27-1.93c-1.7-1.31-2.57-3.49-2.58-6.57a10.65 10.65 0 0 1 .76-4.16 6.68 6.68 0 0 1 2.11-2.85 8.37 8.37 0 0 1 3.1-1.42 16.61 16.61 0 0 1 4.28-.46l16.21-.07v5.27l-15.2.09q-4.82 0-4.8 3.85a2.65 2.65 0 0 0 1.11 2.37 4.52 4.52 0 0 0 2.82.8h8.12a24.23 24.23 0 0 1 4.21.31 7.77 7.77 0 0 1 3.46 2q1.79 1.54 1.81 5.91zM127.18 38.05v5.11h-10.37a21.49 21.49 0 0 1-5-.49 10.89 10.89 0 0 1-7.71-7.13 19.43 19.43 0 0 1-1.1-6.42l.08-1.75a14.91 14.91 0 0 1 .31-3.11 22.64 22.64 0 0 1 .81-2.86 11.93 11.93 0 0 1 1.17-2.4 13.79 13.79 0 0 1 1.91-2.3 7.63 7.63 0 0 1 3.05-1.88 18.12 18.12 0 0 1 3.37-.81 24.19 24.19 0 0 1 3.17-.22h10.21v5.11h-10.13a7.13 7.13 0 0 0-5.12 1.76 6.77 6.77 0 0 0-1.79 5.13l17.07-.07v5.1l-17.07.07c0 2.46.46 4.18 1.37 5.17a5.25 5.25 0 0 0 2.59 1.78 14.11 14.11 0 0 0 3.09.26zM103.55 13.89L92.39 30.4l.05 12.9-6.25.03-.05-12.9L75 14.01l6.86-.03 7.32 11.24 7.26-11.3 7.11-.03M62.29 8a8.9 8.9 0 0 1 2.85 8.3c-.72 4.77-1.91 24.74-16.89 34.6-13.37 8.78-29.31 6.18-35.78.46 6.94 2.63 16.15 2.92 24-3.8 9.33-8 11.29-21.09 14.92-29.56 1.3-3 2.67-7.22 4.88-6.67S52.05 9.25 49.91 9s-7.76-.13-9.58 2.73-5.41 12-5.65 12.94-.94 2.06-2 2.06H25c-1.27 0-1.2-1.58-1-2.69s2.12-12.89 6.4-14.39c5.8-2-1.55-1.91-2.15-1.93a12 12 0 0 0-11.16 6.78A95.83 95.83 0 0 0 13 24.95c-1 2.86-.67 9.59 5 9.57l13-.06s-.2 13-13.2 13a16.92 16.92 0 0 1-11.27-4.77c-2.64-2.47-17.11-23.7 8-37.15S61.31 7.2 62.29 8z"/>
               </g>
            </svg>
            <section>
               <h3 class="headline">電競週邊設計</h3>
               <p class="literalText literalContent"> 電競産品外觀設計，包括 office mouse, gaming mouse, gaming keyboard, and presenter </p>
            </section>
         </section>
         <hr>
         <section class="about-web">
            <parallax :debug="false" :settings="settings.careers[3][0]" class="about-web-pic bgImg"></parallax>
            <section>
               <h3 class="headline">網頁設計</h3>
               <p class="literalText literalContent"> 在從事工業設計以前，花了很大的精力在網頁設計上，當年flash時代還很流行時便一頭鑽，從AS1學到AS3，一直到近幾年HTML5 Nodejs 的出現


               <p class="literalText literalContent">
                  <b>使用過以下程式語言：</b> <br>Booscript, Python,  Cython, Nimrod, Javascript(Nodejs) <br>
                  <b>web framework使用過：</b> <br>Web2py, Bottlepy, Vue, VueX, Expressjs, ReactJS, QuasarFramework （mobile） <br>
                  <b>CSS framework:</b> <br> Jeet, Stylus, PostCSS, ElementQuery </p>
            </section>
         </section>
         <hr>
         <section class="about-music">
            <player class="about-music-bt"></player>
            <h3 class="headline">多媒體電子音樂創作</h3>
            <p class="literalText literalContent">
               收錄了從高中到大四的電子音樂作品集及游戲配樂 </p>
         </section>
         <br><br><br><br><br><br>
      </section>

      <section class="about-book">
         <parallax :debug="false" :settings="settings.book" class="about-bookMain literalText">
            <div slot="content" class="description-pos literalContent">
               <p class="twoColumn ">在這之前，花很多時間做原生家庭的自我和解，學禪及各種跟自我療瘉有關的功課，從高二到大學畢業後一年，花了大半時間做電子音樂，本來覺得這輩子大概就做音樂了，可是後來發覺，這是內在壓抑情緒無法舒解，所以轉而投注在音樂的世界裡，當父親過逝後，專注在音樂上的理由似乎消失了，動力是似乎不再，反而因為接解禪的關係比較想貢獻自己，開始想做些對他人有意義的事，這段時間除了閱讀大量的心理治療，自己也從學催眠開始進入禪的世界，最後開始接觸占星並翻譯一些自己喜歡的書。
<br><br><br>雖然人生的路上由於精力過份分散
，興趣太多，但是當我開始深層的進入自我覺察後，發覺自己之所以到處學東學西是因為，內在有一部份的自己始終覺得不足，每找一次工業設計的工作，就弄一次網頁，究其原因，想透過網頁譁眾取寵變向補償找設計工作不好找這件事，有點變向證明自己「我不差」，回過頭來發覺浪費了很多時間，但為什麼最終很是想做設計，除了喜歡動手做以外，與其說想用創意解決問題，不如說介由創意工作的過程，能夠讓自己不再掉入大眾文化的思維模式。
               </p>
               <svg class="yesLogo about-yesLogo" viewBox="0 0 222.17 56.65">
                  <g>
                     <path
                           d="M222.14 20.59v5.86h-2.44v-5.54a5 5 0 0 0 0-.53 2.8 2.8 0 0 0-.12-.55.69.69 0 0 0-.42-.43 3.1 3.1 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.89 3.89 0 0 1 .4 2.09zM213.76 42.26v1.84h-2.23a2.73 2.73 0 0 1-2.11-.76 2.94 2.94 0 0 1-.73-2.1v-4.53H207v-1.83h1.7v-3.37h2.44v3.36h2.61v1.83h-2.61v3.74a2.23 2.23 0 0 0 .28 1.23 1.15 1.15 0 0 0 .75.5 8 8 0 0 0 1.35.09zM211.66 17.25v8.9a5 5 0 0 1-.35 2 2.65 2.65 0 0 1-1.13 1.25 4.44 4.44 0 0 1-2 .41h-4.79V28h4.35a1.28 1.28 0 0 0 1.47-1.44h-3.41a4.41 4.41 0 0 1-1-.28 3.94 3.94 0 0 1-2.07-2.26 5.64 5.64 0 0 1-.35-2 4.29 4.29 0 0 1 .9-3.13 5.94 5.94 0 0 1 1.47-1.13 4.3 4.3 0 0 1 1.12-.32q.56-.07.86-.08h.48zm-2.44 7.35v-5.35h-1.28a6.4 6.4 0 0 0-1.48.17 1.74 1.74 0 0 0-.93.52 2.25 2.25 0 0 0-.56 1.54V22a2.54 2.54 0 0 0 1 2.22 1.59 1.59 0 0 0 .73.31 6.63 6.63 0 0 0 1 .07h1.56zM203.2444 34.9082l2.52-.0105.0387 9.25-2.52.0105zM203.2303 31.5484l2.52-.0106.0096 2.3-2.52.0106zM201.18 38.3v5.86h-2.47v-5.54-.53a3.3 3.3 0 0 0-.12-.55.71.71 0 0 0-.42-.43 2.9 2.9 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.48 6.48 0 0 1 2.12.29 2.43 2.43 0 0 1 1.3 1 3.84 3.84 0 0 1 .43 2.09zM198.3307 17.319l2.52-.0106.0387 9.25-2.52.0105zM198.3166 13.9492l2.52-.0106.0096 2.3-2.52.0105zM196.6 23.51a3.43 3.43 0 0 1-.22 1.33 3.28 3.28 0 0 1-.44.82 2.93 2.93 0 0 1-.64.59 2 2 0 0 1-1.23.32h-6.26v-1.89h5.14c.87 0 1.3-.32 1.3-.94s-.44-.89-1.3-.89h-2.84c-.17 0-.43 0-.75-.09a2.21 2.21 0 0 1-.9-.35 1.68 1.68 0 0 1-.61-.8 3.52 3.52 0 0 1-.22-1.29q0-2.94 3.25-3h5.22v1.91h-4.75c-.74 0-1.15.21-1.24.62v.3c0 .52.39.77 1.16.76h2.23a4.6 4.6 0 0 1 1.22.14 2.9 2.9 0 0 1 1 .47 2.25 2.25 0 0 1 .66.82 2.62 2.62 0 0 1 .22 1.17zM188.0448 34.972l2.52-.0106.0387 9.25-2.52.0104zM188.0307 31.612l2.52-.0105.0096 2.3-2.52.0105zM186.84 35v1.84h-2.34v7.4H182v-7.4h-1.73V35H182v-1.14a5.94 5.94 0 0 1 .06-.73 1.89 1.89 0 0 1 .3-.81 1.42 1.42 0 0 1 .77-.51 4.25 4.25 0 0 1 1.4-.19h2.33v1.82h-1.02a1.55 1.55 0 0 0-1 .23c-.22.12-.33.38-.33.81V35zM186.36 24.69v1.91h-3.56a4.52 4.52 0 0 1-3.52-1.25 4.79 4.79 0 0 1-1.16-3.35 4.51 4.51 0 0 1 .88-3.1 3.94 3.94 0 0 1 1.79-1.26 6.81 6.81 0 0 1 2-.28h3.56v1.91h-3.23a4.94 4.94 0 0 0-1.25.13 1.21 1.21 0 0 0-.72.52 1.74 1.74 0 0 0-.31 1.12h5.51V23h-5.51a2 2 0 0 0 .26 1.1 1.28 1.28 0 0 0 .73.52 6.64 6.64 0 0 0 1.28.1zM179.1 38.39v5.86h-2.48v-5.54-.53a3 3 0 0 0-.12-.55.68.68 0 0 0-.42-.43 2.93 2.93 0 0 0-1-.13h-2v7.19h-2.42v-9.25h4.58a6.49 6.49 0 0 1 2.13.29 2.43 2.43 0 0 1 1.3 1 3.87 3.87 0 0 1 .43 2.09zM177.06 19.82v.77c0 2.21-.45 3.69-1.36 4.47a6.31 6.31 0 0 1-2.3 1.37 9.42 9.42 0 0 1-2.2.23h-5.8l-.05-12.61h5.75a7.21 7.21 0 0 1 3.21.61 3.9 3.9 0 0 1 1.78 1.61 9 9 0 0 1 .74 1.8 7 7 0 0 1 .23 1.75zm-2.87.53a11.27 11.27 0 0 0-.16-1.92 2.8 2.8 0 0 0-.61-1.4 1.78 1.78 0 0 0-.85-.62 4.59 4.59 0 0 0-.74-.13 6.82 6.82 0 0 0-.74 0H168v8.23h3.07a5.68 5.68 0 0 0 1.31-.13 1.88 1.88 0 0 0 .95-.57 2.92 2.92 0 0 0 .67-1.47 11.47 11.47 0 0 0 .18-1.99zM165.4213 31.7067l2.77-.0116.0528 12.61-2.77.0116zM158.86 34.24a12.36 12.36 0 0 1-.18 2.19 12.11 12.11 0 0 1-.73 2.35 5.77 5.77 0 0 1-1.87 2.38 8 8 0 0 1-3.15 1.44 17.11 17.11 0 0 1-4.33.47l-16.42.07v-5.27l15.44-.07a7.52 7.52 0 0 0 3.53-.69 2.63 2.63 0 0 0 1.23-2.55v-.62a3.11 3.11 0 0 0-.66-1.83 3.57 3.57 0 0 0-1.58-.81 9.33 9.33 0 0 0-2.14-.2h-7.28q-4.71 0-7.27-1.93c-1.7-1.31-2.57-3.49-2.58-6.57a10.65 10.65 0 0 1 .76-4.16 6.68 6.68 0 0 1 2.11-2.85 8.37 8.37 0 0 1 3.1-1.42 16.61 16.61 0 0 1 4.28-.46l16.21-.07v5.27l-15.2.09q-4.82 0-4.8 3.85a2.65 2.65 0 0 0 1.11 2.37 4.52 4.52 0 0 0 2.82.8h8.12a24.23 24.23 0 0 1 4.21.31 7.77 7.77 0 0 1 3.46 2q1.79 1.54 1.81 5.91zM127.18 38.05v5.11h-10.37a21.49 21.49 0 0 1-5-.49 10.89 10.89 0 0 1-7.71-7.13 19.43 19.43 0 0 1-1.1-6.42l.08-1.75a14.91 14.91 0 0 1 .31-3.11 22.64 22.64 0 0 1 .81-2.86 11.93 11.93 0 0 1 1.17-2.4 13.79 13.79 0 0 1 1.91-2.3 7.63 7.63 0 0 1 3.05-1.88 18.12 18.12 0 0 1 3.37-.81 24.19 24.19 0 0 1 3.17-.22h10.21v5.11h-10.13a7.13 7.13 0 0 0-5.12 1.76 6.77 6.77 0 0 0-1.79 5.13l17.07-.07v5.1l-17.07.07c0 2.46.46 4.18 1.37 5.17a5.25 5.25 0 0 0 2.59 1.78 14.11 14.11 0 0 0 3.09.26zM103.55 13.89L92.39 30.4l.05 12.9-6.25.03-.05-12.9L75 14.01l6.86-.03 7.32 11.24 7.26-11.3 7.11-.03M62.29 8a8.9 8.9 0 0 1 2.85 8.3c-.72 4.77-1.91 24.74-16.89 34.6-13.37 8.78-29.31 6.18-35.78.46 6.94 2.63 16.15 2.92 24-3.8 9.33-8 11.29-21.09 14.92-29.56 1.3-3 2.67-7.22 4.88-6.67S52.05 9.25 49.91 9s-7.76-.13-9.58 2.73-5.41 12-5.65 12.94-.94 2.06-2 2.06H25c-1.27 0-1.2-1.58-1-2.69s2.12-12.89 6.4-14.39c5.8-2-1.55-1.91-2.15-1.93a12 12 0 0 0-11.16 6.78A95.83 95.83 0 0 0 13 24.95c-1 2.86-.67 9.59 5 9.57l13-.06s-.2 13-13.2 13a16.92 16.92 0 0 1-11.27-4.77c-2.64-2.47-17.11-23.7 8-37.15S61.31 7.2 62.29 8z"/>
                  </g>
               </svg>
            </div>
            <br><br><br><br><br><br>
         </parallax>

         <div class="about-bookHD bgImg"></div>
         <h3 class="headline">Human design and astrology</h3>
         <p class="literalText literalContent">
            當我開始學禪處理原生家庭的議題時，發覺，禪對於自我覺察與穩定自己，安定自己有極大的幫助，但卻少了一塊對人性脈落的理解，於是開始接觸占星，占星並不是算命的工具，而是以原型像徵作為自我成長的修身方式，而人類圖由易經占星與卡巴拉生命樹發展而來，除了延續占星與易經的原型象徵，還加入了一些靈性的知識，更把內觀帶進來， 當我學了一年多以後，發覺透過原型像徵這可以彌補覺察力的不足，因此開始想翻譯相關的文章介紹給其他人，這也是我豐富自己的一種方式。
         </p>
         <div class="about-bookGK bgImg"></div>
         <h3 class="headline">Genekeys     -     Unfolding Now</h3>
         <p class="literalText literalContent">
            走了數年的自我療瘉，在這條路上讀了不少的好書，發，有些書有中文版，偏偏有些就是沒有，因此便開始將一些英文類的好書翻成中文，上面二本書是我目前正在翻譯的書，即便進度只有1/5，但因為是自主翻譯所以自己做的很開心。
         </p>
         <br><br><br><br><br><br>
      </section>
      <section class="contactContainer">

         <h4>聯絡方式</h4>
         <a href="mailto:gordianknot.data@gmail.com"><p><email></email>gordianknot.data@gmail.com</p></a><br>
         <a href="http://genekeysNAlmaas.blogspot.com.tw"><p><blogger></blogger>http://genekeysNAlmaas.blogspot.com.tw</p></a>
         <hr>
         <br><br>
         <h4>留言</h4>
         <contact></contact>
      </section>
   </section>
</template>

<script>
   import {_} from '../lodash_addon'
   import {dSETTING, TInstance, TSettings} from '../types'
   import mixin from "../vueMixin_addon"
   //import Parallax from './parallaxComp.vue'
   //import contact from './ContactForm.vue'
   //import musicPlaylist from './musicPlaylist.vue'
   import {TConsole, eCOLORS} from "../console_addon"
   import {
      getClassRule, getCssClasses, parseUnit, computedStyle,
      isPortrait, convertRemToPixels
   }  from '../Utils'


   const Log = TConsole.getLogger('parallaxComp')
   Log.suppressLevel([eCOLORS.info, eCOLORS.log])
   Log.setFontColor('current')
   function convertScnUnit(valueUnitPair, targetUnit) {
      // NOTE: convert all units to screen then back to it's target
      let vxToSreen = (size) => valueUnitPair[0] = valueUnitPair[0] * size / 100
      let scnToVx = (size) => valueUnitPair[0] = 100 * valueUnitPair[0] / size
      switch (valueUnitPair[1]) {
         case 'px':
            break
         case 'vh':
            vxToSreen(window.innerHeight);
            break
         case 'vw':
            vxToSreen(window.innerWidth);
            break
         case '%' :
            throw new Error('% mode not implemented yet')
      }
      switch (targetUnit) {
         case 'px':
            break
         case 'vh':
            scnToVx(window.innerHeight);
            break
         case 'vw':
            scnToVx(window.innerWidth);
            break
         case '%' :
            throw new Error('% mode not implemented yet')
      }
      valueUnitPair[1] = targetUnit
      return valueUnitPair
   }

   function onTopWithin() {
      let bgPositionY                  = Math.round((this.el.offsetTop - window.scrollY) * 0.08)
      this.el.style.backgroundPosition = `center ${bgPositionY}px`
   }
   function getAnimLength(data, prop, cssClass, span = (80 - 20)) {
      let a = parseUnit(data.topWithin[0][prop][1])[0] - parseUnit(data.topWithin[0][prop][0])[0],
          b = parseUnit(data.compass[0][prop][1])[0] - parseUnit(data.compass[0][prop][0])[0],
          c = parseUnit(data.bottomWithin[0][prop][1])[0] - parseUnit(data.bottomWithin[0][prop][0])[0],
          h = parseUnit(getClassRule(cssClass).height)[0]
      return span * 2 - (a + b + c) + (h - span)
   }

   export default {
      components: {
         parallax: Parallax,
         player  : musicPlaylist,
         contact : contact
      },
      mixins    : [mixin],
      data () {
         return {
            name: 'about',
         }
      },
      computed  : {


         settings(){
            const setRange                      = (orig, prop, increments) => {
               let unit     = orig[1]
               let stages   = ['topWithin', 'compass', 'bottomWithin'], ret = {}
               let getValue = (_orig, i) => [_orig + unit, _orig + increments[i] + unit]
               orig         = orig[0]
               for (let i = 0; i < 3; i++) {
                  ret[stages[i]] = [{[prop]: getValue(orig, i)}]
                  orig           = orig + increments[i]
               }
               return ret
            }
            const getFlagSpan                   = (x) => parseUnit(x.trigger.leave.posy)[0] - parseUnit(x.trigger.enter.posy)[0]
            const descriptionSetting: TSettings = _.cloneDeep(dSETTING)
            const zenBgSetting: TSettings       = _.cloneDeep(dSETTING)
            const gamingSetting: TSettings      = _.cloneDeep(dSETTING)
            const bookSetting: TSettings        = _.cloneDeep(dSETTING)
            let origProp, propIncrements, elHeight
            // NOTE: description                         :
            //            propIncrements                      = [40, 30, 20]
            //            origProp                            = parseUnit(getClassRule('about-mainDescription')['margin-top'] || '0vh')
            //            descriptionSetting.anime            = setRange(origProp, 'marginTop', propIncrements)
            //            descriptionSetting.trigger.show = false

            elHeight = 100 * convertRemToPixels(58) / window.innerHeight
            let desc = this.commonSetting(elHeight, [20, 80], 3, {enableMargin: true})


            // NOTE: zen setting                         :
            propIncrements                   = isPortrait() ? [-6, -6, -6] : [-3, -3, -3]
            origProp                         = parseUnit(getClassRule('about-zen')['background-position-y'])
            zenBgSetting.trigger.enter.posy  = '4%'
            zenBgSetting.anime               = setRange(origProp, 'backgroundPositionY', propIncrements)
            zenBgSetting.trigger.show        = false
            // NOTE: gamming setting                      :
            propIncrements                   = isPortrait() ? [-22, -11, 0] : [-22, -11, 0]
            origProp                         = [0, 'vw'] //parseUnit(getClassRule('about-gaming-collection')['background-position-y'])
            gamingSetting.trigger.enter.posy = '40%'
            gamingSetting.trigger.enter.name = 'gaming'
            gamingSetting.trigger.leave.name = 'gaming'
            gamingSetting.anime              = setRange(origProp, 'backgroundPositionY', propIncrements)
            gamingSetting.trigger.show       = false
            // NOTE: book setting                         :
            propIncrements                   = isPortrait() ? [10, 2, 2] : [20, 4, 2]
            origProp                         = parseUnit(getClassRule('about-bookMain')['margin-top'])
            bookSetting.trigger.enter.posy   = '35%'
            bookSetting.trigger.leave.posy   = '95%'
            bookSetting.trigger.enter.name   = 'book'
            bookSetting.trigger.leave.name   = 'book'
            bookSetting.anime                = setRange(origProp, 'marginTop', propIncrements)
            bookSetting.trigger.show         = false

            //
            //            paraSetting.length             = getAnimLength(19, 0.1, 21.9, getClassRule('about-zen').height, getSpan(paraSetting))

            const lowprofile_anim = (data, i, _orig) => {
               let setting: TSettings     = _.cloneDeep(dSETTING)
               setting.trigger.enter.posy = '60%'
               setting.trigger.leave.posy = '95%'
               propIncrements             = [-15, -3, -11] //NOTE: no comppass state = > element高度太低
               setting.anime              = setRange([[0, 'vh'], [10, 'vh']][i], 'marginTop', propIncrements)
               setting.anime.callbacks    = {
                  topWithin   : {
                     update(animator, process, name) {
                        animator.seek(process, name);
                        return false
                     }
                  },
                  compass     : {update(){return false}}, //NOTE: disable
                  bottomWithin: {update(){return false}}  //NOTE: disable
               }
               setting.trigger.show       = false
               data[i]                    = setting
            }
            let setting_careers   = [new Array(2), new Array(2), new Array(2), new Array(2)]
            for (let i = 0; i < 2; i++) {
               lowprofile_anim(setting_careers[0], i)
               lowprofile_anim(setting_careers[1], i)
               lowprofile_anim(setting_careers[2], i)
               lowprofile_anim(setting_careers[3], i)
            }
            Log.l('[aboutComp] Settings:', {
               dec1  : descriptionSetting, temp: zenBgSetting, careers: setting_careers,
               gaming: gamingSetting
            })
            return {dec1: desc, temp: zenBgSetting, careers: setting_careers, gaming: gamingSetting, book: bookSetting}
         }
      },
      methods   : {
         commonSetting(h, range, ratio, extra){
            let l                 = range[0] + 'vh',
                r                 = range[1] + 'vh',
                start             = ratio * -3,
                end = start, span = h - start,
                ret               = this.baseSetting({
                   elHeight: h, L: l, R: r, end: end, start: start, span: span, enableMargin: extra.enableMargin || false
                })
            Log.l(ret)
            return ret
         },
         baseSetting(params: {}, mode = 'h'){
            const defaults                                        = {
               L       : '-10vh', R: '20vh', className: '', propName: 'transform',
               elHeight: 100, shiftment: 3, span: 40, start: 11, end: 11, marginRatio: 1, enableMargin: true
            }
            const prefixes   = {
               topWithin   : ['translateY', ''],
               compass     : ['translateY', ''],
               bottomWithin: ['translateY', '']
            }
            const data                                            = _.cloneDeep(dSETTING)
            params                                                = _.extend(defaults, params)
            const setRange                                        = function (orig, prop, increments,
                                                 prefix = {topWithin: [''], compass: [''], bottomWithin: ['']}) {
               let unit     = orig[1]
               let stages   = ['topWithin', 'compass', 'bottomWithin'], ret = {}
               let getValue = (_orig, i, r) => [_orig + unit, _orig + ( increments[i] * r) + unit]
               let value    = []
               let _orig    = orig[0]
               orig         = orig[0]
               for (let i = 0; i < 3; i++) {
                  ret[stages[i]] = params.enableMargin ? [{
                     [prop]      : getValue(orig, i, 1),
                     marginBottom: getValue(_orig, i, params.marginRatio)
                  }] : [{[prop]: getValue(orig, i, 1)}]
                  orig           = orig + increments[i]
                  _orig          = _orig + increments[i] * params.marginRatio
               }
               ret.prefix = prefix
               return ret
            }
            let origProp, propIncrements,
                  heighten, elHeight = params.elHeight, shiftment = params.shiftment

            data.trigger.enter.posy = params.L
            data.trigger.leave.posy = params.R
            data.trigger.enter.name = 'unveil_E'
            data.trigger.leave.name = 'unveil_L'
            data.trigger.show       = false

            origProp       = params.className ? parseUnit(getClassRule(params.className)[params.propName] || '0vh') : [0, 'vh']
            propIncrements = isPortrait() ? [params.start, elHeight - params.span - shiftment, params.end]
               : [params.start, elHeight - params.span - shiftment, params.end]
            Log.l('setRange:', origProp, propIncrements, data.anime)
            data.anime = setRange(origProp, 'transform', propIncrements, prefixes)
            return data
         },
         posRearrange(){
            Log.l('this:', this, 'this.el:', this.el)
            let shift                   = (el, percent) => {
               let pair = parseUnit(computedStyle(el, 'height'))
               convertScnUnit(pair, 'vh')
               return pair[0] * percent / 100 + pair[1]
            }
            let aboutMain               = this.el.querySelector('.about-main')
            let aboutZen                = this.el.querySelector('.about-zen')
            let aboutCareer             = this.el.querySelector('.about-career')
            aboutZen.style.marginTop    = shift(aboutMain, -4)
            aboutCareer.style.marginTop = shift(aboutZen, -6)
         },
         eventsInit(){
            this.addEventListener(window, 'resize', this.posRearrange)
         }
      },
      mounted(){
         Log.l('aboutComp mounted, this.$el:', this.$el)
         console.log(this.$el, this.el)
         document.querySelector('meta[name]').setAttribute('content', '#9CACAF')
         this.el = this.$el
         this.eventsInit()
         _.scheduleOnce(this.posRearrange.bind(this), 200)

      }
   }
</script>


<style lang="styl">
   @import "../themes/comp.layout_about.styl";
</style>
