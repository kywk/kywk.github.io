"use strict";(self.webpackChunkkywk_github_io=self.webpackChunkkywk_github_io||[]).push([[4353],{622:(n,e,o)=>{o.r(e),o.d(e,{assets:()=>t,contentTitle:()=>s,default:()=>a,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var i=o(85893),l=o(11151);const r={title:"Goroutine",description:"Goroutine",tags:["Go","Go/GoTour"],date:new Date("2022-04-20T07:45:04.000Z"),image:"https://lh3.googleusercontent.com/pw/AM-JKLWu8wVpy5iA1V-YEeQHafjhEuZiS8kFPaPu0pj_m6yi09YtCsVYFT8Z6LxtDL57sWDXa8rRZm6B_OsIhWjgBWupJ1ZopYhtDR5PMn-4q8ypuliQvh5KDBfdZmKAxOkIXb4FhRvkuQsRhKiyjB02tR6otw=w860-h480-no?authuser=0s"},s="[Go] Tour: Goroutine \u5fc3\u5f97\u7b46\u8a18",c={id:"golang/go-tour/go-tour_goroutine",title:"Goroutine",description:"Goroutine",source:"@site/moco/golang/go-tour/go-tour_goroutine.md",sourceDirName:"golang/go-tour",slug:"/golang/go-tour/go-tour_goroutine",permalink:"/moco/golang/go-tour/go-tour_goroutine",draft:!1,unlisted:!1,tags:[{label:"Go",permalink:"/moco/tags/go"},{label:"Go/GoTour",permalink:"/moco/tags/go-go-tour"}],version:"current",frontMatter:{title:"Goroutine",description:"Goroutine",tags:["Go","Go/GoTour"],date:"2022-04-20T07:45:04.000Z",image:"https://lh3.googleusercontent.com/pw/AM-JKLWu8wVpy5iA1V-YEeQHafjhEuZiS8kFPaPu0pj_m6yi09YtCsVYFT8Z6LxtDL57sWDXa8rRZm6B_OsIhWjgBWupJ1ZopYhtDR5PMn-4q8ypuliQvh5KDBfdZmKAxOkIXb4FhRvkuQsRhKiyjB02tR6otw=w860-h480-no?authuser=0s"},sidebar:"tutorialSidebar",previous:{title:"defar",permalink:"/moco/golang/go-tour/go-tour_defer"},next:{title:"Get Started",permalink:"/moco/golang/go_get-started"}},t={},d=[{value:"Threading",id:"threading",level:2},{value:"Goroutine \u4ecb\u7d39",id:"goroutine-\u4ecb\u7d39",level:2},{value:"LifeCycle",id:"lifecycle",level:2},{value:"\u7b49\u5019 Goroutine",id:"\u7b49\u5019-goroutine",level:2},{value:"sync.WaitGroup",id:"syncwaitgroup",level:3},{value:"channel",id:"channel",level:3},{value:"\u5171\u4eab\u8b8a\u6578",id:"\u5171\u4eab\u8b8a\u6578",level:2},{value:"sync.Mutex (\u4e92\u65a5\u9396)",id:"syncmutex-\u4e92\u65a5\u9396",level:3},{value:"\u85c9\u7531 Channel \u4fdd\u8b49\u8b8a\u6578\u7684\u5b89\u5168\u6027",id:"\u85c9\u7531-channel-\u4fdd\u8b49\u8b8a\u6578\u7684\u5b89\u5168\u6027",level:3},{value:"\u5c0f\u7d50",id:"\u5c0f\u7d50",level:2}];function h(n){const e={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"go-tour-goroutine-\u5fc3\u5f97\u7b46\u8a18",children:"[Go] Tour: Goroutine \u5fc3\u5f97\u7b46\u8a18"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsxs)(e.em,{children:["\u672c\u7bc7\u5927\u591a\u53c3\u8003\u65bc ",(0,i.jsx)(e.a,{href:"https://peterhpchen.github.io/2020/03/08/goroutine-and-channel.html",children:"Go \u7684\u4e26\u767c\uff1aGoroutine \u8207 Channel \u4ecb\u7d39 - Limitless Ping"}),",\n\u52a0\u4e0a\u4e00\u4e9b\u500b\u4eba\u7406\u89e3\u8207\u6574\u7406. \u5f37\u70c8\u5efa\u8b70\u53c3\u95b1\u539f\u6587, \u5716\u6587\u4e26\u8302, \u6558\u4e8b\u689d\u7406\u5206\u660e\u7684\u597d\u6587\u7ae0."]})}),"\n",(0,i.jsx)(e.h2,{id:"threading",children:"Threading"}),"\n",(0,i.jsxs)(e.p,{children:["\u5148\u4f86\u4e86\u89e3\u57f7\u884c\u7dd2.",(0,i.jsx)(e.br,{}),"\n\u55ae\u57f7\u884c\u7dd2\u60c5\u6cc1\u4e0b, \u7a0b\u5f0f\u78bc\u6703\u4f9d\u5e8f\u57f7\u884c."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:'func say(s string) {\n    for i := 0; i < 5; i++ {\n        time.Sleep(100 * time.Millisecond)\n        fmt.Println(s)\n    }\n}\n\nfunc main() {\n    begin := time.Now()\n    say("world")\n    say("hello")\n    diff := time.Now().Sub(begin)\n    fmt.Printf("spent %d ms", diff.Milliseconds())\n}\n'})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-shell",children:"world\nworld\nworld\nworld\nworld\nhello\nhello\nhello\nhello\nhello\nspent 1000 ms\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\u9019\u500b\u4f8b\u5b50\u4e2d, \u6703\u5148\u57f7\u884c\u5b8c ",(0,i.jsx)(e.code,{children:'say("world")'})," \u624d\u57f7\u884c ",(0,i.jsx)(e.code,{children:'say("hello")'}),"."]}),"\n",(0,i.jsx)(e.p,{children:"\u6709\u6642\u7a0b\u5f0f\u4e2d\u500b\u5225\u51fd\u5f0f\u4e4b\u9593\u4e26\u7121\u5148\u5f8c\u9806\u5e8f\u95dc\u4fc2, \u82e5\u53ef\u4ee5\u5584\u7528\u591a\u57f7\u884c\u7dd2\u57f7\u884c, \u5247\u53ef\u5927\u5e45\u63d0\u5347\u57f7\u884c\u6548\u7387.\n\u4e00\u822c\u4f86\u8aaa, Go \u591a\u57f7\u884c\u7dd2\u6700\u591a\u53ef\u4ee5\u540c\u6642\u57f7\u884c\u548c CPU \u6578\u91cf\u76f8\u7b49\u7684 Goroutine."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:'func say(s string) {\n    for i := 0; i < 5; i++ {\n        time.Sleep(100 * time.Millisecond)\n        fmt.Println(s)\n    }\n}\n\nfunc main() {\n    begin := time.Now()\n    go say("world")\n    say("hello")\n    diff := time.Now().Sub(begin)\n    fmt.Printf("spent %d ms", diff.Milliseconds())\n}\n'})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-shell",children:"world\nhello\nworld\nhello\nhello\nworld\nworld\nhello\nhello\nspent 500 ms\n"})}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:'say("world")'})," \u6703\u5728\u53e6\u4e00\u500b\u57f7\u884c\u7dd2 (Goroutine) \u4e0a, \u548c ",(0,i.jsx)(e.code,{children:"main"})," \u7a0b\u5e8f\u540c\u6642\u57f7\u884c."]}),"\n",(0,i.jsx)(e.h2,{id:"goroutine-\u4ecb\u7d39",children:"Goroutine \u4ecb\u7d39"}),"\n",(0,i.jsx)(e.p,{children:"Goroutine \u985e\u4f3c golang \u7684 thread, \u8b93 Go \u53ef\u4ee5\u591a\u5de5\u8655\u7406,\nmain function \u672c\u8eab\u5c31\u662f\u4e00\u500b Goroutine,\n\u5e38\u898b\u6703\u548c Channel \u642d\u914d\u5354\u540c\u5de5\u4f5c, \u53ef\u4ee5\u7c21\u5316 Goroutine \u64cd\u4f5c."}),"\n",(0,i.jsxs)(e.p,{children:["\u5efa\u7acb\u4e00\u500b Goroutine \u5c31\u7b49\u65bc\u5efa\u7acb\u4e00\u500b\u65b0\u57f7\u884c\u7dd2.\n\u5efa\u7acb Goroutine \u76f8\u7576\u7c21\u55ae, \u50c5\u9700\u5728\u51fd\u5f0f\u547c\u53eb\u524d\u52a0 ",(0,i.jsx)(e.code,{children:"go"})," \u524d\u7db4\u8072\u660e\u5373\u53ef."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:"go f(x, y, z)\n"})}),"\n",(0,i.jsx)(e.h2,{id:"lifecycle",children:"LifeCycle"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 golang \u4e2d, \u7576 main Goroutine \u7d50\u675f\u5f8c, \u5176\u4ed6 Goroutine \u90fd\u6703\u5f37\u5236\u7d50\u675f.\n\u56e0\u6b64 Goroutine \u751f\u547d\u9031\u671f\u5f9e\u88ab\u5efa\u7acb\u6642\u958b\u59cb, \u5230\u51fd\u5f0f\u57f7\u884c\u7d50\u675f\u8fd4\u56de\u6216 main Goroutine \u7d50\u675f\u6642\u4e00\u8d77\u7d50\u675f."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:'func say(s string) {\n    for i := 0; i < 5; i++ {\n        time.Sleep(100 * time.Millisecond)\n        fmt.Println(s)\n    }\n}\n\nfunc main() {\n    begin := time.Now()\n    go say("world")\n    go say("hello")\n    time.Sleep(200 * time.Millisecond)\n    diff := time.Now().Sub(begin)\n    fmt.Printf("spent %d ms", diff.Milliseconds())\n}\n'})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-shell",children:"world\nhello\nworld\nspent 200 ms\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\u9019\u6bb5\u7a0b\u5f0f\u5171\u6709 ",(0,i.jsx)(e.code,{children:"main"}),", ",(0,i.jsx)(e.code,{children:'say("world")'}),", ",(0,i.jsx)(e.code,{children:'say("hello")'})," \u4e09\u500b Goroutine.\nmain Goroutune \u50c5\u9700\u82b1\u8cbb 200ms, \u5c11\u65bc\u5176\u4ed6\u5169\u500b ",(0,i.jsx)(e.code,{children:"say"})," Goroutine,\n\u7576 main \u7d50\u675f\u6642, \u53e6\u5916\u5169\u500b Goroutine \u6703\u8ddf\u8457\u5f37\u5236\u505c\u6b62."]}),"\n",(0,i.jsxs)(e.p,{children:["\u7528 ",(0,i.jsx)(e.code,{children:"time.Sleep"})," \u96d6\u7136\u53ef\u4ee5\u5ef6\u5f8c main \u7d50\u675f\u6642\u9593, \u8b93\u5176\u4ed6 Goroutine \u6709\u6a5f\u6703\u57f7\u884c\u5b8c\u6210.\n\u4f46\u82e5 sleep \u6642\u9593\u592a\u77ed, \u4ecd\u7121\u6cd5\u8b93\u5176\u4ed6 Goroutine \u5b8c\u6210.\n\u800c\u5982\u679c sleep \u6642\u9593\u592a\u9577, \u5247\u6703\u5f71\u97ff\u7a0b\u5f0f\u6548\u7387.\n\u9664\u975e\u7a0b\u5f0f\u57f7\u884c\u6642\u9593\u6709\u6240\u9650\u5236, \u5426\u5247\u7528 ",(0,i.jsx)(e.code,{children:"time.Sleep"})," \u4f86\u7b49\u5019 Goroutine \u4e26\u975e\u597d\u65b9\u6cd5."]}),"\n",(0,i.jsx)(e.h2,{id:"\u7b49\u5019-goroutine",children:"\u7b49\u5019 Goroutine"}),"\n",(0,i.jsxs)(e.p,{children:["\u82e5\u7a0b\u5f0f\u5fc5\u9808\u7b49\u5019\u6240\u6709 Goroutine \u57f7\u884c\u5b8c\u7562, \u900f\u904e sleep \u7b49\u5019\u662f\u4e0d\u53ef\u9760\u7684.\nGo \u88e1\u9762\u7684\u5e38\u898b\u7b49\u5019\u65b9\u5f0f\u6709 ",(0,i.jsx)(e.code,{children:"sync.WaitGroup"})," \u6216 ",(0,i.jsx)(e.code,{children:"channel"}),"."]}),"\n",(0,i.jsx)(e.h3,{id:"syncwaitgroup",children:"sync.WaitGroup"}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsx)(e.p,{children:"Package sync provides basic synchronization primitives such as mutual exclusion locks. Other than the Once and WaitGroup types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication."}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["Go \u5167\u5efa ",(0,i.jsx)(e.code,{children:"sync"})," \u5957\u4ef6\u53ef\u4ee5\u7ba1\u7406\u591a\u500b Goroutine \u4e4b\u9593\u7684\u57f7\u884c\u72c0\u614b.",(0,i.jsx)(e.br,{}),"\n\u5728\u4e0a\u9762\u4f8b\u5b50\u4e2d, \u82e5\u7a0b\u5f0f\u9700\u7b49\u5019\u6240\u6709 Goroutine \u57f7\u884c\u7d50\u675f\u5f8c\u624d\u80fd\u7d50\u675f, \u53ef\u4f7f\u7528 ",(0,i.jsx)(e.code,{children:"sync.WaitGroup"}),"."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:'func say(s string, wg *sync.WaitGroup) {\n    defer wg.Done()\n\n    for i := 0; i < 5; i++ {\n        time.Sleep(100 * time.Millisecond)\n        fmt.Println(s)\n    }\n}\n\nfunc main() {\n    wg := new(sync.WaitGroup)\n    wg.Add(2)\n\n    go say("world", wg)\n    go say("hello", wg)\n\n    wg.Wait()\n}\n'})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5efa\u7acb\u548c\u9700\u8981\u7b49\u5019\u7684 Goroutine \u6578\u91cf\u76f8\u540c\u7684 ",(0,i.jsx)(e.code,{children:"WaitGroup"})," counter."]}),"\n",(0,i.jsxs)(e.li,{children:["\u5c07 ",(0,i.jsx)(e.code,{children:"WaitGroup"})," \u50b3\u5165 Goroutine \u4e2d, \u5728\u51fd\u5f0f\u57f7\u884c\u7d50\u675f\u6642\u547c\u53eb ",(0,i.jsx)(e.code,{children:"wg.Done()"})," \u5c07 counter \u6e1b\u4e00.",(0,i.jsx)(e.br,{}),"\n\u5e38\u898b\u6703\u5728\u51fd\u5f0f\u6700\u524d\u9762\u4f7f\u7528 ",(0,i.jsx)(e.code,{children:"defer wg.Done()"}),", \u4ee5\u78ba\u4fdd Goroutine \u7d50\u675f\u6642 ",(0,i.jsx)(e.code,{children:"wg.Done()"})," \u6703\u88ab\u57f7\u884c."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"wg.Wait()"})," \u6703\u7b49\u5019\u5230 counter \u70ba\u96f6\u70ba\u6b62."]}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"WaitGroup"})," \u4f7f\u7528\u4e0a\u76f8\u5c0d\u7c21\u55ae, \u4f46\u8981\u6ce8\u610f\u624b\u52d5\u914d\u7f6e\u6578\u91cf\u7b26\u5408\u7684 counter."]}),"\n",(0,i.jsx)(e.h3,{id:"channel",children:"channel"}),"\n",(0,i.jsx)(e.p,{children:"channel \u901a\u5e38\u62ff\u4f86\u505a Goroutine \u4e4b\u9593\u6e9d\u901a\u8a0a\u606f\u6642\u4f7f\u7528,\n\u4f46\u56e0\u5176\u963b\u585e\u7279\u6027, \u4ea6\u53ef\u62ff\u4f86\u7576\u4f5c\u7b49\u5019 Goroutine \u7684\u65b9\u6cd5."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:'func say(s string, c chan string) {\n    for i := 0; i < 5; i++ {\n        time.Sleep(100 * time.Millisecond)\n        fmt.Println(s)\n    }\n    c <- "FINISH"\n}\n\nfunc main() {\n    ch := make(chan string)\n\n    go say("world", ch)\n    go say("hello", ch)\n\n    <-ch\n    <-ch\n}\n'})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5efa\u7acb\u4e86\u4e00\u500b channel \u7528\u4ee5\u6e9d\u901a\u8a0a\u606f."}),"\n",(0,i.jsxs)(e.li,{children:["\u5efa\u7acb\u4e86 ",(0,i.jsx)(e.code,{children:"say()"})," Goroutine, \u50b3\u5165 channel."]}),"\n",(0,i.jsxs)(e.li,{children:["main \u51fd\u5f0f\u4e2d\u7b49\u5019 channel \u7684\u8cc7\u6599, \u6b64\u6642\u82e5 channel \u88e1\u9762\u6c92\u6709\u8cc7\u6599, \u6703\u963b\u585e\u7a0b\u5f0f\u57f7\u884c.\n\u76f4\u5230\u67d0\u500b Goroutine \u57f7\u884c\u5230 ",(0,i.jsx)(e.code,{children:'c <- "FINISH"'})," \u6642\u624d\u6703\u7e7c\u7e8c\u57f7\u884c."]}),"\n",(0,i.jsx)(e.li,{children:"\u672c\u4f8b\u4e2d\u5efa\u7acb\u4e86\u5169\u500b Goroutine, \u6240\u4ee5\u9700\u8981\u8b80\u53d6\u5169\u6b21 channel \u8cc7\u6599."}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"Channel \u963b\u585e\u7684\u65b9\u6cd5\u70ba Go \u8a9e\u8a00\u4e2d\u7b49\u5f85\u7684\u4e3b\u8981\u65b9\u5f0f."}),"\n",(0,i.jsx)(e.p,{children:"\u8981\u6ce8\u610f\u7684\u662f, Goroutine \u5e38\u6703\u548c Channel \u642d\u914d\u505a\u8a0a\u606f\u6e9d\u901a,\n\u82e5\u50b3\u5165\u7684 Channel \u6703\u62ff\u4f86\u6e9d\u901a\u8a0a\u606f, \u540c\u6642\u4e5f\u7576\u4f5c\u963b\u585e\u7b49\u5f85\u7684\u8a71, \u9700\u8981\u6ce8\u610f\u50b3\u56de\u503c\u7684\u5224\u65b7\u7b49."}),"\n",(0,i.jsx)(e.h2,{id:"\u5171\u4eab\u8b8a\u6578",children:"\u5171\u4eab\u8b8a\u6578"}),"\n",(0,i.jsx)(e.p,{children:"\u591a\u57f7\u884c\u7dd2\u4e0b\u4f7f\u7528\u76f8\u540c\u8b8a\u6578\u6642, \u8981\u7279\u5225\u6ce8\u610f\u7af6\u722d\u554f\u984c."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:"func main() {\n    total := 0\n    for i := 0; i < 1000; i++ {\n        go func() {\n            total++\n        }()\n    }\n    time.Sleep(time.Second)\n    fmt.Println(total)\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-Shell",children:"981\n"})}),"\n",(0,i.jsx)(e.p,{children:"\u5728 for \u8ff4\u5708\u4e2d\u5efa\u7acb\u7684\u9589\u5305\u53c3\u7167\u4e86\u540c\u4e00\u500b total \u8b8a\u6578.\n\u591a\u57f7\u884c\u7dd2\u60c5\u6cc1\u4e0b, \u53ef\u80fd\u5c0e\u81f4\u5be6\u969b\u904b\u884c\u72c0\u6cc1\u5982\u4e0b:"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:"\u5047\u8a2d\u6b64\u6642 total \u503c\u70ba 70"}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine1"})," \u8b80\u53d6 total (70), \u904b\u7b97 total++ = 71"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine2"})," \u8b80\u53d6 total (70), \u904b\u7b97 total++ = 71"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine2"})," \u5beb\u56de total \u503c 71"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine1"})," \u5beb\u56de total \u503c 71"]}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"goroutine1"})," \u548c ",(0,i.jsx)(e.code,{children:"goroutine2"})," \u540c\u6642\u9032\u884c\u52a0\u6cd5\u904b\u7b97, \u4e26\u5148\u5f8c\u5c07\u8a08\u7b97\u5f8c\u7684\u503c\u5beb\u56de\u8a18\u61b6\u904e, \u53ef\u80fd\u5c0e\u81f4\u904b\u7b97\u932f\u8aa4.\n\u5728\u591a\u500b goroutine \u88e1\u5c0d\u540c\u4e00\u500b\u8b8a\u6578 total \u505a\u52a0\u6cd5\u904b\u7b97, \u5728\u8ce6\u503c\u6642\u7121\u6cd5\u78ba\u4fdd\u5176\u70ba\u5b89\u5168\u7684\u800c\u5c0e\u81f4\u904b\u7b97\u932f\u8aa4,\n\u6b64\u554f\u984c\u7a31\u70ba ",(0,i.jsx)(e.strong,{children:"Race Condition"}),"."]}),"\n",(0,i.jsxs)(e.p,{children:["\u5728\u57f7\u884c\u7dd2\u9593\u4f7f\u7528\u540c\u6a23\u7684\u8b8a\u6578\u6642, \u6700\u91cd\u8981\u7684\u662f\u78ba\u4fdd\u8b8a\u6578\u5728\u7576\u524d\u7684\u6b63\u78ba\u6027.",(0,i.jsx)(e.br,{}),"\nGo \u88e1\u9762\u6709\u5e7e\u500b\u5e38\u898b\u65b9\u6cd5:"]}),"\n",(0,i.jsx)(e.h3,{id:"syncmutex-\u4e92\u65a5\u9396",children:"sync.Mutex (\u4e92\u65a5\u9396)"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"sync.Mutex"})," (\u4e92\u65a5\u9396) \u662f sync \u5957\u4ef6\u4e2d\u7528\u4ee5\u78ba\u4fdd critical section \u6b63\u78ba\u6027\u7684\u5de5\u5177\u7269\u4ef6.\n\u4e92\u65a5\u9396\u63d0\u4f9b\u5169\u500b\u65b9\u6cd5:"]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Lock"}),"\n",(0,i.jsx)(e.li,{children:"Unlock\n\u5728 Lock \u53ca Unlock \u4e2d\u9593, \u6703\u4f7f\u5176\u4ed6\u7684 Goroutine \u7b49\u5f85, \u78ba\u4fdd\u6b64\u5340\u584a\u4e2d\u7684\u8b8a\u6578\u5b89\u5168."}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"sync.Mutex"})," \u76f8\u7576\u7c21\u6613\u597d\u7528, \u5ba3\u544a\u8b8a\u6578\u5f8c, \u5728\u8981\u9700\u4fdd\u8b77\u7684\u7a0b\u5f0f\u5340\u6bb5\u524d\u5f8c\u5206\u5225\u52a0\u4e0a Lock / Unlock \u5373\u53ef.\n\u5982\u4e0b:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:"func main() {\n    total := 0\n    mux := sync.Mutex{}\n    for i := 0; i < 1000; i++ {\n        go func() {\n            mux.Lock()\n            total++\n            mux.Unlock()\n        }()\n    }\n    time.Sleep(time.Second)\n    mux.Lock()\n    fmt.Println(total)\n    mux.Unlock()\n}\n"})}),"\n",(0,i.jsx)(e.h3,{id:"\u85c9\u7531-channel-\u4fdd\u8b49\u8b8a\u6578\u7684\u5b89\u5168\u6027",children:"\u85c9\u7531 Channel \u4fdd\u8b49\u8b8a\u6578\u7684\u5b89\u5168\u6027"}),"\n",(0,i.jsx)(e.p,{children:"\u56e0\u70ba Channel \u63a8\u5165\u53ca\u62c9\u51fa\u6642\u963b\u585e\u8207\u7b49\u5f85\u7684\u7279\u6027, \u4e5f\u53ef\u4ee5\u628a\u5171\u4eab\u8b8a\u6578\u5b58\u5165 Channel \u4e4b\u4e2d,\n\u62c9\u51fa\u4f86\u505a\u8a08\u7b97\u7684\u503c\u6703\u4fdd\u8b49\u662f\u5b89\u5168\u7684."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:"func main() {\n    total := 0\n    ch := make(chan int, 1)\n    ch <- total\n    for i := 0; i < 1000; i++ {\n        go func() {\n            ch <- <-ch + 1\n        }()\n    }\n    time.Sleep(time.Second)\n    fmt.Println(<-ch)\n}\n"})}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:"\u5c07 total \u8cc7\u6599\u5beb\u5165 Channel \u4e4b\u4e2d."}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine1"})," \u5f9e Channel \u4e2d\u8b80\u53d6\u8cc7\u6599\u9032\u884c\u904b\u7b97."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine2"})," \u8981\u5f9e Channel \u8b80\u8cc7\u6599\u6642, \u56e0 Channel \u4e2d\u5df2\u7121\u8cc7\u6599, \u9700\u7b49\u5019."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine1"})," \u628a\u904b\u7b97\u7d50\u679c\u5beb\u56de Channel."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"goroutine2"})," \u7b49\u5230 Channel \u4e2d\u6709\u8cc7\u6599, \u62c9\u51fa\u5f8c\u7d50\u675f\u7b49\u5f85, \u7e7c\u7e8c\u505a\u904b\u7b97."]}),"\n",(0,i.jsx)(e.li,{children:"..."}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"Channel \u963b\u585e\u7684\u7279\u6027, \u642d\u914d Goroutine \u53ef\u4ee5\u7528\u4f86\u4f5c\u6d41\u7a0b\u7ba1\u63a7\u7b49\u529f\u80fd.\n\u4f46 Channel \u9084\u6709\u5176\u4ed6\u7279\u6027, \u62ff Channel \u7576\u4f5c\u6e9d\u901a\u8cc7\u6599\u4e4b\u5916\u7684\u7528\u9014\u6642, \u4ecd\u9700\u7279\u5225\u6ce8\u610f."}),"\n",(0,i.jsx)(e.h2,{id:"\u5c0f\u7d50",children:"\u5c0f\u7d50"}),"\n",(0,i.jsxs)(e.p,{children:["\u5584\u7528 Goroutine \u591a\u57f7\u884c\u7dd2\u7279\u6027\u53ef\u4ee5\u907f\u514d\u7b49\u5019, \u589e\u9032\u7a0b\u5f0f\u6548\u7387.\n\u9700\u8981\u7b49\u5019\u7684\u6642\u6a5f, \u4e5f\u53ef\u7528 ",(0,i.jsx)(e.code,{children:"time.Sleep"}),", ",(0,i.jsx)(e.code,{children:"sync.WaitGroup"})," \u6216 Channel \u7684\u65b9\u5f0f\u8655\u7406."]}),"\n",(0,i.jsxs)(e.p,{children:["\u800c\u5728\u591a\u57f7\u884c\u7dd2\u7a0b\u5f0f\u4e2d\u5e38\u8981\u6ce8\u610f\u7684 Race Condition,\n\u5728 Go \u88e1\u53ef\u4ee5\u5f88\u7c21\u55ae\u7684\u7528 ",(0,i.jsx)(e.code,{children:"sync.Mutex"})," \u548c Channel \u4f86\u7ba1\u7406."]}),"\n",(0,i.jsx)(e.p,{children:"\u76f8\u5c0d\u5176\u4ed6\u8a9e\u8a00, Go \u5728\u591a\u57f7\u884c\u7dd2\u4e0a\u7684\u5275\u5efa\u548c\u7ba1\u7406\u90fd\u76f8\u7576\u7c21\u55ae, \u5927\u5e45\u964d\u4f4e\u7a0b\u5f0f\u8907\u96dc\u5ea6.\n\u800c Channel \u7684\u963b\u585e\u7279\u6027, \u5728\u591a\u57f7\u884c\u7dd2\u4e2d\u767c\u63ee\u65b9\u4fbf\u5f37\u5927\u7684\u80fd\u529b, \u5f8c\u7bc7\u7e7c\u7e8c\u8a0e\u8ad6 Channel."}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:"/moco/golang/go-tour/go-tour_channel",children:(0,i.jsx)(e.em,{children:"\u7e8c: Go: Goroutine \u548c Channel \u5fc3\u5f97\u7b46\u8a18"})})})]})}function a(n={}){const{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(h,{...n})}):h(n)}},11151:(n,e,o)=>{o.d(e,{Z:()=>c,a:()=>s});var i=o(67294);const l={},r=i.createContext(l);function s(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:s(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);