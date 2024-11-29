"use strict";(self.webpackChunkkywk_me=self.webpackChunkkywk_me||[]).push([["81351"],{18010:function(e,t,i){function a(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}i.d(t,{A:function(){return a}}),(0,i(74146).eW)(a,"populateCommonDb")},79198:function(e,t,i){i.d(t,{diagram:function(){return W}});var a=i(18010),l=i(68394),r=i(89356),n=i(74146),s=i(3194),c=i(27818),o=n.vZ.pie,p={sections:new Map,showData:!1,config:o},d=p.sections,u=p.showData,g=structuredClone(o),f=(0,n.eW)(()=>structuredClone(g),"getConfig"),h=(0,n.eW)(()=>{d=new Map,u=p.showData,(0,n.ZH)()},"clear"),m=(0,n.eW)(({label:e,value:t})=>{!d.has(e)&&(d.set(e,t),n.cM.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),x=(0,n.eW)(()=>d,"getSections"),w=(0,n.eW)(e=>{u=e},"setShowData"),y=(0,n.eW)(()=>u,"getShowData"),S={getConfig:f,clear:h,setDiagramTitle:n.g2,getDiagramTitle:n.Kr,setAccTitle:n.GN,getAccTitle:n.eu,setAccDescription:n.U$,getAccDescription:n.Mx,addSection:m,getSections:x,setShowData:w,getShowData:y},T=(0,n.eW)((e,t)=>{(0,a.A)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),$={parse:(0,n.eW)(async e=>{let t=await (0,s.Qc)("pie",e);n.cM.debug(t),T(t,S)},"parse")},D=(0,n.eW)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),k=(0,n.eW)(e=>{let t=[...e.entries()].map(e=>({label:e[0],value:e[1]})).sort((e,t)=>t.value-e.value);return(0,c.ve8)().value(e=>e.value)(t)},"createPieArcs"),C=(0,n.eW)((e,t,i,a)=>{n.cM.debug("rendering pie chart\n"+e);let s=a.db,o=(0,n.nV)(),p=(0,l.Rb)(s.getConfig(),o.pie),d=(0,r.P)(t),u=d.append("g");u.attr("transform","translate(225,225)");let{themeVariables:g}=o,[f]=(0,l.VG)(g.pieOuterStrokeWidth);f??=2;let h=p.textPosition,m=185,x=(0,c.Nb1)().innerRadius(0).outerRadius(m),w=(0,c.Nb1)().innerRadius(m*h).outerRadius(m*h);u.append("circle").attr("cx",0).attr("cy",0).attr("r",m+f/2).attr("class","pieOuterCircle");let y=s.getSections(),S=k(y),T=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],$=(0,c.PKp)(T);u.selectAll("mySlices").data(S).enter().append("path").attr("d",x).attr("fill",e=>$(e.data.label)).attr("class","pieCircle");let D=0;y.forEach(e=>{D+=e}),u.selectAll("mySlices").data(S).enter().append("text").text(e=>(e.data.value/D*100).toFixed(0)+"%").attr("transform",e=>"translate("+w.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");let C=u.selectAll(".legend").data($.domain()).enter().append("g").attr("class","legend").attr("transform",(e,t)=>{let i=22,a=22*$.domain().length/2;return"translate(216,"+(t*i-a)+")"});C.append("rect").attr("width",18).attr("height",18).style("fill",$).style("stroke",$),C.data(S).append("text").attr("x",22).attr("y",14).text(e=>{let{label:t,value:i}=e.data;return s.getShowData()?`${t} [${i}]`:t});let W=512+Math.max(...C.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0));d.attr("viewBox",`0 0 ${W} 450`),(0,n.v2)(d,450,W,p.useMaxWidth)},"draw"),W={parser:$,db:S,renderer:{draw:C},styles:D}}}]);