import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const C = {
  bg: "#f5f5f7", white: "#ffffff", border: "#e8e8ee", borderLight: "#f0f0f5",
  purple: "#6c5ce7", purpleHover: "#5a4bd1", purpleBg: "#f0eeff", purpleLight: "#a29bfe", purpleSoft: "rgba(108,92,231,0.08)",
  green: "#00b894", greenBg: "#e6f9f4", greenText: "#00875a",
  red: "#ff6b6b", redBg: "#fff0f0", redText: "#d63031",
  orange: "#f39c12", orangeBg: "#fff8eb",
  yellow: "#fdcb6e", yellowBg: "#fffde7", yellowText: "#b87900",
  text: "#1a1a2e", textSec: "#6c6c85", textTer: "#9e9eb8", textLight: "#b8b8cc",
  shadowMd: "0 4px 12px rgba(0,0,0,0.06)",
};

const AWARENESS = ["Unaware", "Problem Aware", "Solution Aware", "Product Aware", "Most Aware"];
const SOPHISTICATION = ["Level 1 - first to market", "Level 2 - bigger claims", "Level 3 - mechanism", "Level 4 - sophistication", "Level 5 - identity"];
const TYPES = ["Video", "Static", "Carousel", "UGC"];
const STATUSES = ["Concept", "In Production", "Ready for Launch", "Launched"];
const RESULTS = ["Winning Ad", "Losing Ad", "Data Awaiting"];
const ORIGINS = ["HOLY DOC", "SUPPLEMENT", "Creative & Feed Back Loop", "Competitor Inspo", "Trend/Cultural", "Customer Research"];

const samples = [
  { id:"b36cc1cfe", name:"Batch #1", date:"2025-12-24", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"I create this becuase its sitting right on the awarenss stage. perfect timing and iterate on competitor winning ad", script:"", status:"Launched", result:"Losing Ad", angle:"", brief:"Untitled document", desire:"take a full breath that hits the bottom of his lungs" },
  { id:"b9e92161f", name:"Batch #2", date:"2025-12-24", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"NEW \" cilla mechansim\" why ex smokers still cough up", script:"", status:"Launched", result:"Losing Ad", angle:"Targets the frustrated ex-smoker who expected a reward for quitting.", brief:"SOP", desire:"to stop the hacking and fianlly get cler lungs wiht out waiitng years" },
  { id:"be39614e7", name:"Batch #3", date:"2025-12-24", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"time line compettor winning ad", script:"", status:"Launched", result:"Winning Ad", angle:"What To Expect", brief:"timeline", desire:"Clear lungs in 10 days" },
  { id:"b40bbbcd8", name:"Batch #5", date:"2025-12-30", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"time line compettor winning ad", script:"", status:"Launched", result:"Losing Ad", angle:"What To Expect", brief:"Batch #5 ITeration | timeline", desire:"Clear lungs in 10 days" },
  { id:"ba9bccd3e", name:"Batch #6", date:"2025-01-01", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 5 - identity", beliefBefore:"", beliefAfter:"", hypothesis:"Everybody wants to reset every year i feel like it would be great angle that i can carry off.", script:"", status:"Launched", result:"Losing Ad", angle:"New year new lungs", brief:"New year angle New", desire:"Clear lungs new year resolution" },
  { id:"b7b34563c", name:"Batch #7", date:"2025-01-04", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This is a mass pain point that happen on mostly winter and other season over 37 millons people go through this problem", script:"", status:"Launched", result:"Data Awaiting", angle:"Soothe and help bronticti get of it", brief:"What Is Bronchitis", desire:"" },
  { id:"bed9ad062", name:"Batch #8", date:"2025-01-04", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Losing Ad", angle:"Shortenss of breath", brief:"2", desire:"Breath deep again" },
  { id:"b04b1c52c", name:"Batch #9", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"", brief:"", desire:"" },
  { id:"b66b381dc", name:"Batch #10", date:"", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Tiktok Shop Winning concept, trying our first listicle on this brand/", script:"", status:"In Production", result:"Data Awaiting", angle:"Anyone with lung/mucus issues  smoker, ex-smoker, non-smoker, bronchitis, allergies", brief:"Listicle | Format", desire:"to get rid of deep mucus inside thier lungs" },
  { id:"b30b30d78", name:"Batch #11", date:"2025-01-09", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"we have been targeting the wrong awareness market for the last batches the market is sitting at solution aware making ads that meet exatcly where is the customer is at is very important.", script:"", status:"In Production", result:"Data Awaiting", angle:"\"Why Nothing Worked", brief:"Alterantive", desire:"Finally find something that works and breath deep again" },
  { id:"bc3053112", name:"Batch #12", date:"2025-01-09", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"The hypothesis was that the very dark green isn't the real one because all using fillers, it's just a marketing scheme. It's just a marketing scheme, so we're using scientific claims to debunk that and actually convert customers to use the real product.", script:"", status:"Launched", result:"Winning Ad", angle:"Real mullein", brief:"Dark gray mullein.", desire:"To finally get the real money that actually works" },
  { id:"b017330c1", name:"Batch #13", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"The hypothesis about this ad will be that it will be a textile ad, where it will be a short ad just explained through text. This format works really well, and I've tried it multiple times. It does hit every single time, and we're going to try this format", script:"", status:"Launched", result:"Losing Ad", angle:"Shortness of breath", brief:"Breif #13", desire:".Finally take a full, deep breath that goes all the way down" },
  { id:"bcc1f69f2", name:"Batch #14", date:"2025-01-14", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This is an iteration on a winning ad that we're doubling down on. This ad is like a timeline: day 1-10. It's just kind of give it a timeline.", script:"", status:"Launched", result:"Data Awaiting", angle:"What To Expect", brief:"timeline", desire:"Clear lungs in 10 days" },
  { id:"bc5270e05", name:"Batch #15", date:"2025-01-15", type:"Video", isNew:"Iteration", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"We found a winning concept that says Timeline Ad. It's from this Forge brand. I think it will be a great iteration.", script:"", status:"Launched", result:"Losing Ad", angle:"What To Expect", brief:"Timeline.", desire:"Clear lungs in 10 days" },
  { id:"b3a36c2ab", name:"Batch #16", date:"2025-01-15", type:"Static", isNew:"Iteration", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Same winning concept that's a timeline, but now in a static.", script:"", status:"Launched", result:"Data Awaiting", angle:"What To Expect", brief:"timiline", desire:"Clear lungs in 10 days" },
  { id:"b8b2ca9c0", name:"Batch #17", date:"2025-01-18", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"Ranking-style Solution Aware ad that systematically destroys every competing lung solution, explains WHY each fails (mechanism), and positions Origin Drops Mullein as #1 - the only solution that actually clears decades of tar.", script:"", status:"Launched", result:"Winning Ad", angle:"Comparison, best option.", brief:"Breifs", desire:"Finally cough up the dark tar that's been stuck for decades and take a full breath that hits the bottom of their lungs." },
  { id:"b1197a975", name:"Batch #18", date:"", type:"Video", isNew:"Iteration", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"titeration with more proof and articles", script:"", status:"Launched", result:"Losing Ad", angle:"Real mullein", brief:"Dark gray mullein.", desire:"To finally get the real mullein that actually works" },
  { id:"b10ce4d81", name:"Batch #19", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"time line compettor winning ad", script:"", status:"Concept", result:"Data Awaiting", angle:"What To Expect", brief:"Ai| ad| stolen concept | TIMELINE", desire:"Clear lungs in 10 days" },
  { id:"b1ffd251e", name:"Batch #20", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"My hypothesis was to do intense research on. We have seen that women still buy for themselves, like we have found out. There is a woman that smokes, so we are making a different persona to see because women are very different to market to and they're kind of very easy. So yeah, we have gathered a bit of language bank, and we have decided that there is a woman audience that smokes, and we kind of tap into the avatar as well.", script:"", status:"Launched", result:"Losing Ad", angle:"Woman who recently quit smoking", brief:"Breifs- supplement.", desire:"inally get the \"reward\" for quitting - full breaths, no morning hack and a clear lung ." },
  { id:"beb9e5ee8", name:"Batch #21", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Finish a hypothesis on this avatar. This was an action plan by ad that has failed previously, showing us the breadth, fixing why it failed and better hooks, adding better reasons.", script:"", status:"Launched", result:"Losing Ad", angle:"\"Shortness of breath\"", brief:"Breifs- supplement.", desire:"finally breathe all the way down again..." },
  { id:"b2c8bc4d0", name:"Batch #26", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"Iteration on a winning angle, We're going to use an AI avatar and better voiceovers. It's going to be a UGC-style ad, It's going to be personal.", script:"", status:"Concept", result:"Data Awaiting", angle:"Fake Mullen, dark green ANGLE", brief:"Dark green mullein| NEW CONCEPT| Batch#26 Fake Chyophylll", desire:"To finally get the real mullein that actually works" },
  { id:"b2827527f", name:"Batch #25", date:"", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"negative marketing, listicle works great", script:"", status:"Launched", result:"Losing Ad", angle:"\" negative marketing\"", brief:"Breifs- supplement.  Batch#5 Negatve Marketing", desire:".Finally find a mullein that actually WORKS - that makes them cough up the dark shit they've been carrying for decades, that lifts the brick off their chest, that lets them take a full breath and sleep through the night without chokin" },
  { id:"b42bc4642", name:"Batch #27", date:"", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"titk is ripping this angl and this mechanism might as well give it try and trip as well we will unlock a tof winning that break this brand ceiling gap", script:"", status:"Launched", result:"Losing Ad", angle:"\"new mechanims \" avaolia", brief:"Breifs- supplement.", desire:"Realize their lungs are operating at a fraction of capacity - and they can reverse it." },
  { id:"b936805ef", name:"Batch #28", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 3 - mechanism", beliefBefore:"", beliefAfter:"", hypothesis:"This is basically an iteration on our winning ad (or ranking ad), and I decided to try a new concept on it. I feel like this will work. Our winning ad that's a ranking which is kind of how we rank it differently.", script:"", status:"Concept", result:"Data Awaiting", angle:"\" red flags\"", brief:"", desire:"Finally clear their lungs with mullein that actually works" },
  { id:"b40fdc4f6", name:"Batch #29", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"It's a rational winning ad, better reasoning, better voiceover, and better visuals. and new visuals", script:"", status:"Concept", result:"Data Awaiting", angle:"What To Expect", brief:"Breifs- supplement.", desire:"Clear lungs in 10 days" },
  { id:"b94c9f3e1", name:"Batch #30", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"", brief:"timeline", desire:"" },
  { id:"b22ce9422", name:"Batch #31", date:"", type:"Video", isNew:"Iteration", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Iteration and with the new top of funnel UGC-style of ad with the new concept I felt like this will print. We copied this from a TikTok version, and it's definitely this will definitely print.", script:"", status:"Launched", result:"Winning Ad", angle:"Real mullein", brief:"Dark gray mullein.", desire:"To finally get the real mullein that actually works" },
  { id:"b8a0dc709", name:"Batch #32", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This is a desire that people naturally want to get rid of smokers' cough. It is a big desire and a big pain point that the people that we overlooked. I feel like we went back to the basics. We found this desire caused millions of people want to get rid of desire and yeah. And we turned it into a listicle concept.", script:"", status:"Launched", result:"Losing Ad", angle:"Individuals who have smoker's cough.", brief:"“SmokerS coughs” LIstice  https://docs.google.com/document/d/1Wo6vejSrDiQt6PGUy4ul5mwcw16NadOQCuE1g_vttbk/edit?tab=t.azcde0m4mbtx", desire:"To stop the smoker's cough." },
  { id:"bfa2a237f", name:"Batch #33", date:"", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This is a winning concept that we did for Mullin. So now we're doing for Solution Aware Fail Products.", script:"", status:"Launched", result:"Winning Ad", angle:"Ranking failed soltuion", brief:"Ranking”  Breifs- supplement.", desire:"Understand why pharmacy products fail for SMOKERS specifically - and discover the #1 solution that actually clears deep lung buildup" },
  { id:"bfdff786e", name:"Batch #34", date:"", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Unaware", sophistication:"Level 1 - first to market", beliefBefore:"", beliefAfter:"", hypothesis:"first to market| this untapped market over 120 millon amercians are suffering from air pollution this is gonna cook", script:"", status:"Launched", result:"Losing Ad", angle:"Air pollutiins", brief:"air pulltion| first to market", desire:"get rid of dangrous toxins inside your lungs from air pollutuin and wildfire smoke" },
  { id:"b50660022", name:"Batch #39", date:"", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"untapped angle lil cmpetiton so far this is gonna cook i swear", script:"", status:"Launched", result:"Winning Ad", angle:"COPD", brief:"", desire:"------MISSINF INFO____" },
  { id:"b591ea3e4", name:"Batch #37", date:"", type:"Video", isNew:"Iteration", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This is basically ranking, auto, iteration, a winning concept that we have. Simple, we found this winning concept for a different band; we're just kinda ripping it, testing for this. I believe this is gonna scale hard.", script:"", status:"Launched", result:"Winning Ad", angle:"RANKING failed soltuion", brief:"Iteration | ranking New concept", desire:"Finally break down and cough out the deep tar buildup that's been hardening in their lungs for decades - the stuff Mucinex, inhalers, and every weak mullein product they've tried could never reach." },
  { id:"bfc3dcafd", name:"Batch #40", date:"2025-02-16", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 3 - mechanism", beliefBefore:"", beliefAfter:"", hypothesis:"So basically, we are debunking what people have been told by Promenologists and doctors about their lungs after they quit. They said that I'm saying, so we're going to debunk every lie and we're going to tell exactly what's going to happen. I thought this is a very good concept, a very top form of concept as well.", script:"", status:"Launched", result:"Data Awaiting", angle:"ex smokers who quit smoking", brief:"Breifs- supplement.", desire:"Show them it's not their fault. that they cleanse thier lungs after years of smoking" },
  { id:"b5edceda0", name:"Batch #41", date:"2025-02-18", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"New messaging, ugc type on winning iteration angle this will hit home.", script:"", status:"In Production", result:"Losing Ad", angle:"EXPOSING FAKE MULLEIN| Winning angle", brief:"Dark gray mullein.| mini vsl", desire:"To finally get the real mullein that actually works and cleanse thier lungs" },
  { id:"ba1a71737", name:"Batch #42", date:"2025-02-20", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"The COPD audience does really well, so we're kind of expanding out, testing different awareness levels here and there. I think this will definitely crack.", script:"", status:"Launched", result:"Losing Ad", angle:"They basically introduced a new mechanism why nothing has worked. And then showing them exactly why nothing has worked and introducing a new mechanism that they've never heard before", brief:"Breifs- supplement.", desire:"Finally understand WHY nothing worked  and experience what happens when the right ingredients actually reach their lungs for the first time. Cough up old dark buildup. Breathe deeper. Stop declining." },
  { id:"b8820c4a0", name:"Batch #43", date:"2025-02-21", type:"Video", isNew:"Ideation", origin:"Creative & Feed Back Loop", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"this new messaging, so we're trying this new market, the copd market. I feel like we're going to crush it, and this is definitely a concept that was winning in this ad account, and now we're using a whole different market. This is definitely gonna crush.", script:"", status:"Launched", result:"Losing Ad", angle:"What to expect using mullein for COPD", brief:"COPD| TIMELINE", desire:"Shortness of breahth, play with the grandkids." },
  { id:"bc95764f3", name:"Batch #44", date:"2025-02-24", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Unaware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Yeah, we're doing this concept. You want to crack unaware angles as well. We're going to speak to a lot of anglers with a lot of segments and really try to crack unaware. This format is working for other brands; you might as well try for this brand. I think this will cook 100%.", script:"", status:"Launched", result:"Losing Ad", angle:"lungs build up", brief:"Tof Speaking to large segment of auidecne Breifs- supplement.", desire:"To finally know the root cause and get rid of it." },
  { id:"b333506ad", name:"Batch #45", date:"2025-02-25", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"", brief:"BOF| OFFER", desire:"" },
  { id:"bb3e60b88", name:"Batch #46", date:"2025-02-26", type:"Video", isNew:"Iteration", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"our wining ad iteration with new concept we are ranking them in a lisitlce format this will crack.", script:"", status:"In Production", result:"Winning Ad", angle:"Smokers who know about mullein", brief:"listicle telling them why thier mullein is junk.", desire:"Understand exactly WHY his mullein failed  and find the one version that actually reaches his lungs and starts pulling the deep stuff out." },
  { id:"b90810b71", name:"Batch #47", date:"2025-02-27", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Viral content saw from organic reach, added new mechanims shipping it def will cook up inspo", script:"", status:"Launched", result:"Winning Ad", angle:"New mechanism explainning", brief:"Breifs- supplement.", desire:"Unclog his lungs so he can breathe full again." },
  { id:"b75884a26", name:"Batch #48", date:"2025-02-28", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Rankinf failed solution already winning concept redoing wwith new reason", script:"", status:"Launched", result:"Losing Ad", angle:"RANKING failed soltuion", brief:"Iteration | ranking New concept", desire:"Finally break down and cough out the deep tar buildup that's been hardening in their lungs for decades - the stuff Mucinex, inhalers, and every weak mullein product they've tried could never reach." },
  { id:"b9e698fd7", name:"Batch #49", date:"2025-03-02", type:"Video", isNew:"Iteration", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"time line compettor winning ad", script:"", status:"Launched", result:"Winning Ad", angle:"What To Expect", brief:"TIMILINE AI", desire:"Clear lungs in 10 days" },
  { id:"b3b0eb1f3", name:"Batch #50", date:"2025-03-03", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Unaware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"this is Unaware concept educated prospect that has no idea what mullein is, and then selling them the order benefits, all our new unique mechanisms in a very good fashion. I believe this would definitely covert", script:"", status:"Launched", result:"Losing Ad", angle:"Dont know what mullein is", brief:"Breifs- supplement.", desire:"Discover an ancient plant that clears what inhalers can't reach" },
  { id:"b8ee156a8", name:"Batch #51", date:"2025-03-04", type:"Video", isNew:"Iteration", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Rankinf failed solution already winning concept redoing with author doctor", script:"", status:"In Production", result:"Data Awaiting", angle:"| DOCTOR RANKING failed soltuion", brief:"Iteration | ranking New concept", desire:"Finally break down and cough out the deep tar buildup that's been hardening in their lungs for decades - the stuff Mucinex, inhalers, and every weak mullein product they've tried could never reach." },
  { id:"bad011aba", name:"Batch #52", date:"2025-03-04", type:"Video", isNew:"Iteration", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Doctor AI| Added 2 more new failed products and rating 1-10 same concept new visuals and new voicever this def gonna print", script:"", status:"Launched", result:"Winning Ad", angle:"| DOCTOR| Ranking failed solution", brief:"Iteration | Rankin", desire:"Finally break down and cough out the deep tar buildup that's been hardening in their lungs for decades - the stuff Mucinex, inhalers, and every weak mullein product they've tried could never reach.  and knon what product dont work and why they dont from A doctor perspective." },
  { id:"bf9d2b31a", name:"Batch #53", date:"2025-03-05", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Winning Ad", angle:"LINKING INGRE TO A PROBLEM", brief:"AI | Ingredients", desire:"" },
  { id:"ba0e6dc6b", name:"Batch #54", date:"2025-03-08", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Data Awaiting", angle:"", brief:"", desire:"" },
  { id:"b02eb1e91", name:"Batch #55", date:"2025-03-08", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"FIrst time this failed redoing with better hooks and direct reponse landing page", script:"", status:"Launched", result:"Data Awaiting", angle:"\" negative marketing\"", brief:"Breifs- supplement.  Batch#5 Negatve Marketing | REDO WITH NEW COPY", desire:"finally clear their lungs with something doctors won't tell them about" },
  { id:"b51e1fb85", name:"Batch #56", date:"2025-03-09", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This is a winning concept that we're gonna pass this on to a UGC creator, and we're gonna flip this concept around. We're gonna turn it into a yappers ad. this will make our angles last longer and ever green this angle alone might get me to 20k days spending its slef.", script:"", status:"In Production", result:"Data Awaiting", angle:"Real mullein", brief:"Dark gray mullein.", desire:"To finally get the real mullein that actually works" },
  { id:"bb0314945", name:"Batch #57", date:"2025-03-10", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"In Production", result:"Data Awaiting", angle:"", brief:"Ranking", desire:"" },
  { id:"b715fc3c6", name:"Batch #58", date:"2025-03-11", type:"Static", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"winning bof ad making tof, for smokers who tired other weak mullein finally get the real deal mullein.", script:"", status:"Launched", result:"Winning Ad", angle:"Stonger mullein", brief:"Static", desire:"Try stonger mullein and detox the junks their lungs" },
  { id:"b7ddebf27", name:"Batch #59", date:"2025-03-11", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"Most peole on the makret has thier ways of taking mullein and most gets confused how to tkae this is agreat concept will cook", script:"", status:"Launched", result:"Winning Ad", angle:"WRONG METHODS / RIGHT METHOD", brief:"WRONG METHODS / RIGHT METHODBreifs- supplement.", desire:".learn the only method that actually works" },
  { id:"bdf5e75c3", name:"Batch #60", date:"2025-03-15", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This concept is a very good concept. It is kind of right. We're building authorities with a doctor. This is 100% gonna convert, and a lot of good things are gonna convert. This is a good top funnel, how to explain why ex-smokers still struggle for me. It's a very audience that's not spoken to. Yeah, I have some type of tingling balls right now that I know this is gonna convert.", script:"", status:"Launched", result:"Losing Ad", angle:"Doctor explains why ex-smokers still struggle after quitting", brief:"Breifs- supplement.", desire:"Wake up without hacking. Breathe fully. Feel the reward they earned by quitting" },
  { id:"b6184b3bd", name:"Batch #62", date:"2025-03-17", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"This was a wining ad , We re did this ad for a female avatar", script:"", status:"Concept", result:"Data Awaiting", angle:"Timine| women", brief:"Breifs- supplement.", desire:"To finally be able to breathe and get rid of the junk in her lungs. Full breath. No morning hack. Walks upstairs without stopping." },
  { id:"be1efa123", name:"Batch #63", date:"2025-03-18", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"authory links  to a mullein i think this concpt will cook found in a Facebook orgianc format very TOF", script:"", status:"Launched", result:"Losing Ad", angle:"Authority links smoker symptoms to mullein.", brief:"Breifs- supplement.", desire:"Know exactly what's causing each symptom and that there's a specific natural fix for each one." },
  { id:"bfcf92c09", name:"Batch #65", date:"", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Losing Ad", angle:"Pharmacist.", brief:"", desire:"" },
  { id:"b35ece6b8", name:"Batch #67", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"Ranking", brief:"", desire:"" },
  { id:"b14082e48", name:"Batch #68", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"tof concept, 3 red flag inspo for oregano, highly think this might be a good ever green winner", script:"", status:"Concept", result:"Data Awaiting", angle:"Red Flag Listicle", brief:"Breifs- supplement.", desire:"Finally stop the lung fail, reverse the damage, and take the deepest breath they've had since their first cigarette." },
  { id:"b7c18e739", name:"Batch #69", date:"2025-03-22", type:"Static", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"question aksing if its fake mullein, iteraion on winning concept  will cook.", script:"", status:"Concept", result:"Data Awaiting", angle:"Comment “ ranking”", brief:"Breifs- supplement.", desire:"Finally understand exactly why the mullein they tried didn't work and find what works and help cough the buildup ." },
  { id:"bb287c857", name:"Batch #70", date:"2025-03-24", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"", brief:"", desire:"" },
  { id:"bf57892e6", name:"Batch #71", date:"2025-03-26", type:"Video", isNew:"Iteration", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"winning cheenses messagng i had trying with this monk raking all mullein will cook", script:"", status:"Launched", result:"Winning Ad", angle:"Chinese guy rating ranking Mullins man.", brief:"Breifs- supplement.", desire:"start clearing the deep buildup that none of those other products could reach." },
  { id:"b5f9268ff", name:"Batch #72", date:"2025-03-26", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"inspo from rize scam, using the same concept but to rank all mullein dgrade of all of em, and positon mine as the only concept def another banger here.", script:"", status:"Concept", result:"Data Awaiting", angle:"Mulleins scam", brief:"Breifs- supplement.", desire:"Finally stop getting scammed by fake mullein products, find the one real mullein that's actually pure and concentrated enough to reach the deep buildup, and start clearing their lungs before the damage gets worse." },
  { id:"b9cc55bf2", name:"Batch #73", date:"2025-03-28", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"Rating them on tier list", script:"", status:"Launched", result:"Losing Ad", angle:"Ranking mullein iteration", brief:"Ranking mullein iteration", desire:"Ranking mullein iteration" },
  { id:"b44d82574", name:"Batch #74", date:"2025-03-28", type:"Video", isNew:"Ideation", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Losing Ad", angle:"", brief:"", desire:"" },
  { id:"bd0e61442", name:"Batch #75", date:"2025-03-30", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"ex smokers | iteration | ingredits", brief:"", desire:"" },
  { id:"b29d19d6d", name:"Batch #76", date:"2025-03-30", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"", brief:"", desire:"" },
  { id:"b7016963e", name:"Batch #77", date:"2025-03-30", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"Insteading of saying if a smokers takes x ingreidnts we will say if a smokers mixes x and x this will have more infomatonal, better retation", script:"", status:"Concept", result:"Data Awaiting", angle:"LINKING INGRE TO A PROBLEM", brief:"", desire:"Learn for the first time that there's a specific herb for each symptom they deal with daily, realize all 8 are already inside one dropper, and try Origin Drops to start addressing every layer of the damage at once." },
  { id:"b7f3a498c", name:"Batch #88", date:"2025-03-02", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"Diffrent way of saying x herb is good with x symptoms | OUTCOME: more winning concept", script:"", status:"Launched", result:"Winning Ad", angle:"Linking INgredits to Problem V3", brief:"", desire:"Learn for the first time that there's a specific herb for each symptom they deal with daily, realize all 8 are already inside one dropper, and try Origin Drops to start addressing every layer of the damage at once." },
  { id:"ba6ce4e33", name:"Batch #90", date:"2025-04-04", type:"Video", isNew:"Iteration", origin:"SUPPLEMENT", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"Each ingrediants talk to camera in very weird fasc", script:"", status:"Launched", result:"Winning Ad", angle:"AI talking herbs", brief:"", desire:"Learn for the first time that there's a specific herb for each symptom smokers deal with and realize all 8 are already inside one dropper, and try Origin Drops to start addressing every layer of the damage at once." },
  { id:"ba136c51e", name:"Batch #91", date:"2025-04-06", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Losing Ad", angle:"STINGING NETTLE", brief:"", desire:"" },
  { id:"bffd6c758", name:"Batch #92", date:"2025-04-08", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"Ranking with a better mechanism", brief:"", desire:"" },
  { id:"be258e488", name:"Batch #93", date:"2025-04-09", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Most Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"More run rate, better cpa and roas , can hold up to 1k day spend as well more auidece that we reached", script:"", status:"Launched", result:"Data Awaiting", angle:"NEW BOF OFFER 42% OFF + FREE BOTTLE", brief:"New BOF offer for people that wants discounts since we scaled hard there is a lot more to capture", desire:"GET MULLEIN FOR STEAL DISCOUNT" },
  { id:"b2f0d2fe9", name:"Batch #94", date:"2025-04-09", type:"Static", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Losing Ad", angle:"Lung detox static", brief:"", desire:"Get the GUNK OUT" },
  { id:"b4edd42c4", name:"Batch #95", date:"2025-04-12", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Launched", result:"Losing Ad", angle:"Mucus stuck on throat", brief:"", desire:"" },
  { id:"bf5d77d8a", name:"Batch #96", date:"2025-04-13", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"In Production", result:"Data Awaiting", angle:"Mullein benifts", brief:"", desire:"" },
  { id:"b3abe5fc8", name:"Batch #97", date:"2025-04-14", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"Hypothesis : somebody's speaking at a summit. We're going to try to find a new mechanism and link it to how they can clean their lungs. I think this would definitely be a huge winner, and I'm not gonna lie, this might just become the biggest winner.", script:"", status:"In Production", result:"Losing Ad", angle:"smokers who want the clean thier lungs", brief:"Breifs- supplement.", desire:"Get the GUNK OUT" },
  { id:"b28f628c7", name:"Batch #98", date:"2025-04-14", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"this used to be a past winner ingreditants linked desires| we are going to crush with this one almost identical but its diffrent new format", script:"", status:"In Production", result:"Data Awaiting", angle:"Ingrediant linked to desire", brief:"Breifs- supplement.", desire:"The Promise: Cough the old tar up. Breathe all the way down again." },
  { id:"b4fb3a0d2", name:"Batch #99", date:"2025-04-15", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"we got this villain idea from a brand this will def cook | it poses as Cig villains explaning everything to smokers the pains it causes, the doctor vists , the quitting and it positons as  nothing can flush it out by the time the customer reached at the end ithere is solution that erdicates this problem.", script:"", status:"Launched", result:"Data Awaiting", angle:"Cig talking about what did to thier lungs", brief:"Breifs- supplement.", desire:"Remove gunk inside thier lungs" },
  { id:"b95b9fa38", name:"Batch #100", date:"2025-04-17", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"WE want tap in to a new avatar thats not being serveed to at all, weed smokers can go up to 44 and up wtih much old smokers , we can possible tap in that niche and scale.", script:"", status:"Concept", result:"Data Awaiting", angle:"BLACK MEN WHO SMOKE WEED TIMELINE AD", brief:"Breifs- supplement.", desire:"" },
  { id:"b1a05f7ed", name:"Batch #101", date:"2025-04-19", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"We want to see if they symptoms to ingredients can beat HERB TO MECHANSIM, i beleive this can targer a much larger audiouce be overal a massvie winner in the ad acounnt.", script:"", status:"Concept", result:"Data Awaiting", angle:"Symptom-to-Ingredient Matcher", brief:"Breifs- supplement.", desire:"Realize every single symptom they have maps to one root cause - decades of tar, resin, and stuck mucus hardened in their lungs" },
  { id:"bcfefff1b", name:"Batch #102", date:"2025-04-20", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"We believe positioning Origin Drops as a daily maintenance flush - not a quit tool, not a rescue - will unlock the largest segment of the smoking market that nobody is talking to: the active smoker who isn't quitting. Every lung health ad on the market speaks to people who quit or want to quit. That's maybe 30% of smokers. The other 70% are still smoking.", script:"", status:"Launched", result:"Data Awaiting", angle:"You dont have to quit just cleanse.", brief:"Breifs- supplement.", desire:"Just flush the junk out regularly so it doesn't pile up and seal your lungs shut." },
  { id:"b975b704e", name:"Batch #103", date:"2025-04-20", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Product Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"We believe this time, I'll be much different from any other time. Like, we made this one more like a podcast timeline that we took the idea from a winning ad. We believe this will create our dirty figure and make the things we say believable.", script:"", status:"Launched", result:"Data Awaiting", angle:"What To Expect", brief:"Timeline Ad", desire:"Clear lungs in 10 days" },
  { id:"beb2fae8e", name:"Batch #104", date:"2025-04-19", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"We believe this will create some type of emotion that the consumer will feel and say and act upon, victimized because their lungs are suffering", script:"", status:"Launched", result:"Data Awaiting", angle:"Lungs speaking into  victim-POV ad", brief:"victim-POV ad", desire:"Clear the junk and take care of thier lungs" },
  { id:"b41b878f3", name:"Batch #105", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Unaware", sophistication:"Level 3 - mechanism", beliefBefore:"", beliefAfter:"", hypothesis:"The reason we are testing construction workers is that we have found an angle where construction workers can use this as a precaution to clear the unwanted junk that they have accumulated over the years. We found an angle where, if construction workers breathe in junk, the X-ray may show fine but it can take 10 to 5 years to show up later. We also have statistics that support our claims. We found out that one in five construction workers develop respiratory issues, such as a lot of things. I feel like tapping into this angle is definitely untapped. It's an unaware angle, and the sophistication level is very low. It's very easy to make it work. I feel like this will be believable and might create new scale for us.", script:"", status:"In Production", result:"Data Awaiting", angle:"Construction worker | lungs", brief:"Breifs- supplement.", desire:"Flush the junk out after every shift while it's still soft. Keep your lungs clear year after year so the buildup never hardens" },
  { id:"bbf2ed849", name:"Batch #106", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 3 - mechanism", beliefBefore:"", beliefAfter:"", hypothesis:"We're testing a timeline ad of a construction worker using one and what would happen to them. This product is probably brand new to them, never have been marketed before. I feel like we can give them a heads up on what would happen inside their lungs if they use this on a timeline basis.", script:"", status:"In Production", result:"Data Awaiting", angle:"Construction worker | lungs| timeline", brief:"Breifs- supplement.", desire:"Clear the junk in thier lungs they have accumulated their shift" },
  { id:"b0b834a59", name:"Batch #107", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"we are testing if this Will this revive our winning angle and make it a top spinner again with a new freshen up creativew", script:"", status:"In Production", result:"Data Awaiting", angle:"Ranking angle| Prodcast style| AI", brief:"Breifs- supplement.", desire:"Finally understand exactly why the mullein they tried didn't work and find what works and help cough the buildup ." },
  { id:"b50d6712b", name:"Batch #108", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Problem Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"We're testing this Xsmokers angle. We have tested it in the past. They did not work well, so we are revisiting with a new format that may resonate with them, since Xsmokers do not like to be kind of tortured that they just quit, kind of sort of thing.", script:"", status:"In Production", result:"Data Awaiting", angle:"Ex smokers| AI", brief:"Breifs- supplement.", desire:"Make the quitting process a reward and actually get rid of these symptoms." },
  { id:"bc9396c15", name:"Batch #109", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"So we are testing failed solutions to COPD patients and kind of masking them.. We position it as all the failed solutions. We kind of degrade them to the point where our product is the last that makes sense for them.", script:"", status:"In Production", result:"Data Awaiting", angle:"COPD Patients Failed solutions | AI", brief:"Breifs- supplement.", desire:"Finally clear the deep hardened buildup that every prescription has been skating over for years. Breathe deeper. Sleep through the night without wheezing. Walk without shortness of breath." },
  { id:"b4c7d1b90", name:"Batch #110", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"We're testing to see if this new AI format will outperform the main winner that we had.", script:"", status:"In Production", result:"Data Awaiting", angle:"Ingrediant linked to desire| iteration| AI", brief:"", desire:"The Promise: Cough the old tar up. Breathe all the way down again." },
  { id:"bb897457c", name:"Batch #111", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"will authority figures on a podcast style. out perform our main ranking ads. That's what we're testing. You're going to see if this will create more authority figure, it will create more trustable.", script:"", status:"In Production", result:"Data Awaiting", angle:"Ranking angle| Prodcast style| Author figures | AI", brief:"Breifs- supplement.", desire:"Finally understand exactly why the mullein they tried didn't work and find what works and help cough the buildup ." },
  { id:"b99a71da0", name:"Batch #112", date:"", type:"Video", isNew:"Iteration", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"Solution Aware", sophistication:"Level 4 - sophistication", beliefBefore:"", beliefAfter:"", hypothesis:"We're testing a winning format on our winning angle. Will this format outperform our winning ranking angle? We'll see. I really feel like this will cook. This is a very, very good concept.", script:"", status:"In Production", result:"Data Awaiting", angle:"Ranking angle| AI characters", brief:"Breifs- supplement.", desire:"Finally understand exactly why the mullein they tried didn't work and find what works and help cough the buildup ." },
  { id:"b715bae66", name:"Batch #113", date:"", type:"Video", isNew:"Ideation", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"", brief:"", desire:"" },
];

const sampleLoops = [{"id": "fl36cc1cfe", "batchId": "b36cc1cfe", "videoLink": "https://www.facebook.com/reel/1132059775461308", "imageData": "", "hypothesisWhy": "* Hook is very cruisity driven \n* A good mechanism Timeline explaining each day what the product does\n* A Good Scrasity how each \u201c the plant\u201d is extract in small runs make it the product \u201c special \u201c waiting week to restoke creates scrarecity\n* Perfectly executed solution aware.", "actionPlan": "* Iterate on new whitelist pages \n* New visuals asap \n* New hooks test\n* New voiceovers", "completed": true, "createdAt": "2025-12-24"}, {"id": "fl9e92161f", "batchId": "b9e92161f", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-12-24"}, {"id": "fle39614e7", "batchId": "be39614e7", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-12-24"}, {"id": "fla9bccd3e", "batchId": "ba9bccd3e", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-01-01"}, {"id": "fl7b34563c", "batchId": "b7b34563c", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-01-04"}, {"id": "fled9ad062", "batchId": "bed9ad062", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-01-04"}, {"id": "flc5270e05", "batchId": "bc5270e05", "videoLink": "https://www.facebook.com/61585526673688/posts/122111045529184222/", "imageData": "", "hypothesisWhy": "We launched this brand a month ago this mof isnt ready\nFor this type of brand Very confusing concept.", "actionPlan": "Status: Killed \u2014 brand not ready", "completed": true, "createdAt": "2025-01-15"}, {"id": "fl2827527f", "batchId": "b2827527f", "videoLink": "https://www.facebook.com/reel/1614526286232570", "imageData": "", "hypothesisWhy": "- Hypothesis 1: The negative marketing frame (\"3 reasons I hate this\") attracts curiosity clickers, not buyers \u2014 high CTR but low purchase intent traffic, evidenced by the massive ATC-to-purchase drop (12 ATCs \u2192 1 purchase on Ad 3).\nHypothesis 2: The sarcastic tone creates a trust gap at checkout. The target demo (older smokers with real lung problems) may enjoy the content but not feel confident enough to buy from a brand that led with irony rather than sincerity.\nHypothesis 3: Ad-to-landing pa", "actionPlan": "Action 1: Let Ad \"2\" continue running at $40/day. It's the strongest performer at 1.80 ROAS. Give it $150\u2013200 more spend to confirm the signal holds with statistical significance. Monitor frequency \u2014 kill it if it hits 2.5+.\nAction 2: If Ad \"2\" stalls, build a direct response version: strip the negative angle, lead with a tight \"this mullein cleared my lungs\" transformation hook, and pair it with a dedicated mullein-specific LP that matches the message exactly \u2014 problem, mechanism, proof, offer,", "completed": true, "createdAt": ""}, {"id": "fl42bc4642", "batchId": "b42bc4642", "videoLink": "https://www.facebook.com/reel/830130550061289", "imageData": "", "hypothesisWhy": "-Weak UMP mechanism\nWeak overused mechanism everyone has heard it \nNew angle with no congruency lining page. This angle would have worked if maybe we had a direct grounding page with it. But still, the mechanism is so bad that it is saturated. I think we need to find a better mechanism.\nNot meeting the customers at the right time in the head, of course, after the hook you went straight for the mechanism. Nobody wants to hear their long lecture about how smoking damages their lungs is just insane", "actionPlan": "Very congruent direct response landing page.\nBefore running any mechanism, check if the mechanism meets certain metrics? Has her does the customer notice metric? Does the customer notice his mechanism? Have they heard her before? Is this really a good mechanism? Compared his mechanism to other", "completed": true, "createdAt": ""}, {"id": "fl22ce9422", "batchId": "b22ce9422", "videoLink": "https://www.facebook.com/61585526673688/posts/122113926507184222/", "imageData": "", "hypothesisWhy": "-Very pattern interrupt hook, telling people how to spot between the fakes and real. Very pattern interrupt curiosity, they want to know what's real, how to spot the real and how to spot the fakes.\n-iteraion on winning angle \u201c fake mullein\u201d\n- proof of study \u201c the author\u201d \n- exposing mechanism \nPersonal perspective exposing.", "actionPlan": "More hooks. We're going to test more hooks.\nMore concepts around this angle.", "completed": true, "createdAt": ""}, {"id": "flfa2a237f", "batchId": "bfa2a237f", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": ""}, {"id": "flfdff786e", "batchId": "bfdff786e", "videoLink": "https://www.facebook.com/reel/1614526286232570", "imageData": "", "hypothesisWhy": "- I believe they know that they're being advertised to. The second thing I believe is that they don't like watching news.Very good angle, but we can definitely do better. There's definitely a way to introduce this new angle. This is not a great way to introduce it. A new format will be better. I believe this angle failed because the way I mean maybe breaking news isn't something that we should have done. Overall CTR is completely garbage. People do not like this concept; they know that they're b", "actionPlan": "Testing new ways to describe this angle.\nMini ugc style \nStatic styles \nDefinitely not a news style.", "completed": true, "createdAt": ""}, {"id": "fl50660022", "batchId": "b50660022", "videoLink": "https://www.facebook.com/reel/1614526286232570", "imageData": "", "hypothesisWhy": "New Mechanism reframe \u2014 why everything else failed\nSpeaking the subgroup's language \u2014 naming their drugs, their side effects, their emotional reality\nThe dignity/independence fantasy \u2014 \"my doctor wanted to know what I was taking\" as a power reversal that channels anti-Big Pharma sentiment into aspiration rather than anger\nUSPs match real desires \u2014 modest, believable outcomes (spacing out flare-ups, breathing a bit easier)\nHook sourced from real proof \u2014 22% from an Amazon review gives it an authe", "actionPlan": "7 hook iterations \nNew format TOF PO", "completed": true, "createdAt": ""}, {"id": "fl591ea3e4", "batchId": "b591ea3e4", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": ""}, {"id": "fla1a71737", "batchId": "ba1a71737", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-02-20"}, {"id": "flb3e60b88", "batchId": "bb3e60b88", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-02-26"}, {"id": "fl90810b71", "batchId": "b90810b71", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "", "actionPlan": "New hooks \nNew concepts via monk", "completed": true, "createdAt": "2025-02-27"}, {"id": "fl9e698fd7", "batchId": "b9e698fd7", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-03-02"}, {"id": "fl3b0eb1f3", "batchId": "b3b0eb1f3", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "", "actionPlan": "we cut the \nbig phrama part \nwe make better statics \nwe cut the aggresive cta \n redo the ad", "completed": true, "createdAt": "2025-03-03"}, {"id": "fl8ee156a8", "batchId": "b8ee156a8", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "", "actionPlan": "What am I going to do differently as a result of this NEW information? (Ranked most confident to least", "completed": true, "createdAt": "2025-03-04"}, {"id": "flad011aba", "batchId": "bad011aba", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "", "actionPlan": "More hooks\nBetter reasoning \nNew possible lead", "completed": true, "createdAt": "2025-03-04"}, {"id": "flf9d2b31a", "batchId": "bf9d2b31a", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "", "actionPlan": "-Test more hooks \n- Possibly more New visuals", "completed": true, "createdAt": "2025-03-05"}, {"id": "fl715fc3c6", "batchId": "b715fc3c6", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a winning ad? (Ranked most confident to least  \n      * Prev winner it worked because of discount code we had in that static \n\n- mechanism war Are the monies in the market? You have to stand out by saying 20x stronger than the mechanism. Make it work. \n\n- Relatable message than anything you have tried. We acknowledge that they have tried other fake stuff and other diluted Mullein.", "actionPlan": "- same image- 3 diff new Relatable messaging.\n- Different pattern interrupt image- With the same messaging right now\nWhat am I going to do differently as a result of this NEW information? (Ranked most confident to least", "completed": true, "createdAt": "2025-03-11"}, {"id": "fl7ddebf27", "batchId": "b7ddebf27", "videoLink": "", "imageData": "", "hypothesisWhy": "", "actionPlan": "", "completed": true, "createdAt": "2025-03-11"}, {"id": "fldf5e75c3", "batchId": "bdf5e75c3", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a  losing ad? (Ranked most confident to least\n-boring mechanism ( they heard dozens of times) \n-Week hook ( the hook rates show is)\n- Introduce product too fast ( no connection whats so ever)", "actionPlan": "DEAD ANGLE NO ACTIONABLE STEPS \nMaybe a new mechansim i thkn idk fuck this angle.\nDr. Julian, ever since I stopped smoking, I get winded just walking to my car. I thought quitting was supposed to fix that. I get asked this every single day, and the answer is simple. Quitting stopped the damage, but it did not clear it. You see, you have a cleanup crew inside your lungs. Tiny hairs called cilia. Their only job, sweep the mucus out. every day on autopilot. And when you used to smoke, that cleanup ", "completed": true, "createdAt": "2025-03-15"}, {"id": "fle1efa123", "batchId": "be1efa123", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a losing ad? (Ranked most confident to least\n- Not calling out a direct avatar seems like this is abroad, this goes to everybody, rOnce you call out your avatar, you will filter out the rest.\n- skeptics about 1 ingredient doing all those things maybe tripel ingredients", "actionPlan": "Rewrite the ad using the new", "completed": true, "createdAt": "2025-03-18"}, {"id": "flfcf92c09", "batchId": "bfcf92c09", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a  losing ad? (Ranked most confident to least\nThis angle is a rinsed angle. I've used it more than 15 times in concepts. I feel like people are tired of it, and for this angle to win again, we need a dedicated landing page. I've rinsed this angle a lot of times.\n\n- This angle is like a pharmacist. Why is a pharmacist recommending a herbal?I mean, isn't he a part of the big pharma? It's kind of, I don't know, maybe a bit of an unbelievable story there. It's just, why would a pharmacis", "actionPlan": "- rinsed format \n- need new LP for these \nFired Pharmacist explains why CVS lung supplements will never clear your smoker's lungs. Mucinex, herbal cough syrups, put them right back on the shelf because these only thin the fresh mucus sitting on top. The deep tar that's been hardening in your lungs for 10, 20, 30 years. They were never designed to go that deep. You'll blow your nose for a day and nothing actually changes. In AC supplements, people grab these thinking it's a lung detox. It's an an", "completed": true, "createdAt": ""}, {"id": "flf57892e6", "batchId": "bf57892e6", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a winning ad? (Ranked most confident to least\n\n- winning message we had that was already a winner \n- iteration of winning ad ranking\nVery good author figure, ma", "actionPlan": "-Action 2: Produce the Next Iteration of the Competitive Teardown \n- More hooks", "completed": true, "createdAt": "2025-03-26"}, {"id": "fl44d82574", "batchId": "b44d82574", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a  Losing ad? (Ranked most confident to least\n            * Smoker being lectured ( smokers hate this ) they already know waht happen if they keep smoking\n- cruisty based ad that gets soft metrics but not real buyers", "actionPlan": "1. Write the first-person UGC", "completed": true, "createdAt": "2025-03-28"}, {"id": "fla6ce4e33", "batchId": "ba6ce4e33", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a winning ad  \n- Winning trending format\n- each ingredient links pain point \n- mechanism all in one dropper", "actionPlan": "More ai ingredients ads \nBetter ai speaking", "completed": true, "createdAt": "2025-04-04"}, {"id": "fl30b30d78", "batchId": "b30b30d78", "videoLink": "https://www.facebook.com/61585526673688/posts/122109303579184222/", "imageData": "", "hypothesisWhy": "-blue ocean angle ( Targeting a segment of audience where they have seen these types of chlorophyll mullein. Alright, and I failed at it. Telling them why I failed and what is real and fake.\n- A real research That backs up the claim that we're making.\n\n- The hook is very patterned, and it's just not something that you would expect. It's like, \"Whoa, what is the answer? I need to know what the did. Maybe I've tried that, maybe that's why it didn't work.\"It's just something that they need to know.", "actionPlan": "* 3-4 new hooks/ visual\n      * 1 new edit with new clips new voice", "completed": true, "createdAt": ""}, {"id": "fl8b2ca9c0", "batchId": "b8b2ca9c0", "videoLink": "", "imageData": "", "hypothesisWhy": ": First, a personalized, honest review about the mullein products\n- Meet the customer exactly at what awareness stage there at  .These are mof  for customers who know about Mullen.", "actionPlan": "New hooks, same body\n      * Same hook, new presenter\n      * Same", "completed": true, "createdAt": ""}, {"id": "fl7f3a498c", "batchId": "b7f3a498c", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "Why is this a  Losing ad? (Ranked most confident to least\n         * Claim structure instead of conditional structure \u2014 \"Best herb for smokers who want X\" triggers skepticism instantly. \"If a smoker took X, this would happen\" makes them feel it themselves. One is you selling. One is them discovering.\n         * No timelines \u2014 \"10 days\" \"one week\" \"two weeks\" made the outcome feel real and close. You removed every single one. Without a timeline it's just a vague promise.\n         * No mechanism \u2014", "actionPlan": "Test more avatars not for only smoklers \nIf someone with asthma took 2\nIf a someone with copd took _ _ \nBack to old strutcher", "completed": true, "createdAt": ""}, {"id": "fla136c51e", "batchId": "ba136c51e", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "-", "actionPlan": "", "completed": true, "createdAt": ""}, {"id": "fl2f0d2fe9", "batchId": "b2f0d2fe9", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "- \n  \n\n  \n               * \nHard dr copy no one says \u201c scary levels of lung crarity\u201d \n- customer voice not matched", "actionPlan": "Test new reviews instead , that customers say swap it out.", "completed": true, "createdAt": ""}, {"id": "fl4edd42c4", "batchId": "b4edd42c4", "videoLink": "https://www.facebook.com/61588589067153/posts/122100881859286302/", "imageData": "", "hypothesisWhy": "-there is no more initial thought behind this ad why it first worked why it became a winner that i copied so i just monkey see monkey do turns out to be miserable ad", "actionPlan": "No actions plan terrible ad", "completed": true, "createdAt": ""}];

const genId = () => "b" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);

/** Cursor canvas provides window.storage; Vite/browser uses localStorage fallback. */
if (typeof window !== "undefined") {
  const hasHostStorage =
    window.storage &&
    typeof window.storage.get === "function" &&
    typeof window.storage.set === "function";
  if (!hasHostStorage) {
    const prefix = "creative-ops:";
    window.storage = {
      async get(key) {
        try {
          let raw = localStorage.getItem(prefix + key);
          if (raw === null) raw = localStorage.getItem(key);
          if (raw === null) return undefined;
          return { value: raw };
        } catch {
          return undefined;
        }
      },
      async set(key, value) {
        try {
          localStorage.setItem(
            prefix + key,
            typeof value === "string" ? value : String(value)
          );
        } catch {}
      },
      async delete(key) {
        try {
          localStorage.removeItem(prefix + key);
        } catch {}
      },
    };
  }
}

/** Backend URL: set in frontend/src/appConfig.js (loaded via main.jsx → window.__CREATIVE_OPS_API__) */
const LS_TOKEN_KEY = "creative-ops-jwt";
function getCreativeOpsApiBase() {
  if (typeof window !== "undefined" && window.__CREATIVE_OPS_API__) {
    return String(window.__CREATIVE_OPS_API__).replace(/\/$/, "");
  }
  return "";
}

async function apiFetchPublic(base, path, options = {}) {
  const url = `${base}${path}`;
  const headers = { "Content-Type": "application/json", ...options.headers };
  const r = await fetch(url, { ...options, headers });
  const text = await r.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!r.ok) throw new Error(data?.error || data?.message || r.statusText || "Request failed");
  return data;
}

function normalizeBatch(b) {
  return {
    ...b,
    isNew: b.isNew === "New Messaging" ? "Ideation" : b.isNew,
    date:
      b.date && b.date.startsWith("2025-") && !b.date.startsWith("2025-12")
        ? b.date.replace("2025-", "2026-")
        : b.date,
  };
}

async function apiFetchAuth(base, token, path, options = {}) {
  if (!token) throw new Error("Not logged in");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  const url = `${base}${path}`;
  const r = await fetch(url, { ...options, headers });
  const text = await r.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (r.status === 401) {
    try {
      localStorage.removeItem(LS_TOKEN_KEY);
    } catch {}
    throw new Error("Session expired — log in again");
  }
  if (!r.ok) throw new Error(data?.error || data?.message || r.statusText || "Request failed");
  return data;
}

const getMediaType = (dataUrl, hint) => {
  if (!dataUrl) return "none";
  if (hint === "image") return "image";
  if (hint === "video") return "video";
  if (dataUrl.startsWith("data:image")) return "image";
  if (dataUrl.startsWith("data:video/mp4") || dataUrl.startsWith("data:video/webm") || dataUrl.startsWith("data:video/ogg")) return "video";
  if (dataUrl.startsWith("data:video")) return "unsupported_video";
  if (dataUrl.startsWith("blob:")) return "video";
  return "unknown";
};

/* ─── Tiny Components ─── */
function Pill({ text }) {
  const m = { "Winning Ad":{bg:C.greenBg,c:C.greenText,d:C.green}, "Losing Ad":{bg:C.redBg,c:C.redText,d:C.red}, "Data Awaiting":{bg:C.yellowBg,c:C.yellowText,d:C.yellow}, "Launched":{bg:C.greenBg,c:C.greenText}, "In Production":{bg:C.orangeBg,c:C.yellowText}, "Ready for Launch":{bg:C.purpleBg,c:C.purple}, "Concept":{bg:"#f0f0f5",c:C.textSec}, "Video":{bg:C.purpleBg,c:C.purple}, "Static":{bg:C.greenBg,c:C.greenText}, "Carousel":{bg:C.orangeBg,c:C.yellowText}, "UGC":{bg:"#f0f0f5",c:C.textSec}, "Ideation":{bg:C.purpleBg,c:C.purple}, "Iteration":{bg:C.greenBg,c:C.greenText}, "Variation":{bg:C.orangeBg,c:C.yellowText} };
  const s = m[text] || {bg:"#f0f0f5",c:C.textSec};
  return <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:500, background:s.bg, color:s.c, whiteSpace:"nowrap" }}>{s.d && <span style={{ width:6, height:6, borderRadius:"50%", background:s.d, flexShrink:0 }} />}{text}</span>;
}
function Media({ src, height, onClick, hint, style:sx }) {
  const [err, setErr] = useState(false);
  const type = getMediaType(src, hint);
  if (!src || type === "none") return <div style={{ height, background:"linear-gradient(135deg, #e8eaf6, #c5cae9)", display:"flex", alignItems:"center", justifyContent:"center", ...sx }}><span style={{ fontSize:28, opacity:0.3 }}>▶</span></div>;
  if (type === "image") return <img src={src} onClick={onClick} style={{ width:"100%", height, objectFit:"cover", cursor:onClick?"pointer":"default", display:"block", ...sx }} alt=""/>;
  if (type === "unsupported_video" || err) return (
    <div style={{ height, background:"linear-gradient(135deg, #1a1a2e, #2d2d44)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, cursor:onClick?"pointer":"default", ...sx }} onClick={onClick}>
      <span style={{ fontSize:11, color:"#fff", opacity:0.7, fontWeight:500 }}>Video format not supported in browser</span>
      <span style={{ fontSize:10, color:"#fff", opacity:0.4 }}>Re-upload as MP4</span>
    </div>
  );
  return <video src={src} onClick={onClick} muted loop autoPlay playsInline onError={()=>setErr(true)} style={{ width:"100%", height, objectFit:"cover", cursor:onClick?"pointer":"default", display:"block", ...sx }}/>;
}
function Card({ children, style:s }) { return <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, ...s }}>{children}</div>; }
function Inp({ label, value, onChange, ph, area, style:s }) {
  const b = { border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, fontFamily:"inherit", width:"100%", boxSizing:"border-box" };
  return <div style={{ display:"flex", flexDirection:"column", gap:5, ...s }}><label style={{ fontSize:12, fontWeight:600, color:C.textSec }}>{label}</label>{area ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{ ...b, resize:"vertical", minHeight:72 }} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=C.border} /> : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={b} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=C.border} />}</div>;
}
function Sel({ label, value, onChange, opts, style:s }) {
  return <div style={{ display:"flex", flexDirection:"column", gap:5, ...s }}><label style={{ fontSize:12, fontWeight:600, color:C.textSec }}>{label}</label><select value={value} onChange={e=>onChange(e.target.value)} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, appearance:"none", cursor:"pointer", backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239e9eb8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center" }}><option value="">Select...</option>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>;
}
function Chip({ label, active, onClick, color }) { return <button onClick={onClick} style={{ padding:"6px 16px", borderRadius:20, border:"none", cursor:"pointer", fontSize:13, fontWeight:500, transition:"all 0.15s", background:active?(color||C.purple):C.white, color:active?"#fff":C.textSec, boxShadow:active?"none":`inset 0 0 0 1px ${C.border}` }}>{label}</button>; }

/* ─── Brief Card View ─── */
function BriefCard({ b, onEdit, onSetResult, onSetStatus, resultPicker, setResultPicker, statusPicker, setStatusPicker, loops }) {
  const hasLoop = loops&&loops.some(l=>l.batchId===b.id&&l.completed);
  return (
    <Card style={{ padding:0, overflow:"hidden" }} >
      <div onClick={()=>onEdit(b)} style={{ padding:"24px 24px 0", cursor:"pointer" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:6, display:"flex", alignItems:"center", gap:6 }}>{b.name}{hasLoop&&<span style={{ width:16, height:16, borderRadius:"50%", background:C.purple, color:"#fff", fontSize:9, fontWeight:800, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>↻</span>}</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}><Pill text={b.type}/><Pill text={b.isNew}/></div>
          </div>
          <span style={{ fontSize:12, color:C.textTer }}>{b.date || ""}</span>
        </div>
        {/* Angle */}
        {b.angle && <div style={{ background:C.bg, borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13, fontWeight:600, color:C.text }}>Angle: {b.angle}</div>}
        {/* GET/WHO/TO/BY grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
          {[{label:"GET", color:"#e17055", val:b.get, sub:"The Person"}, {label:"WHO", color:C.orange, val:b.who, sub:"The Pain"}, {label:"TO", color:C.green, val:b.to, sub:"The Promise"}, {label:"BY", color:C.purple, val:b.by, sub:"The Proof"}].map(x=>(
            <div key={x.label} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
              <span style={{ fontSize:11, fontWeight:800, color:x.color, minWidth:28, paddingTop:2 }}>{x.label}</span>
              <div><div style={{ fontSize:12, fontWeight:600, color:C.text }}>{x.sub}</div><div style={{ fontSize:12, color:C.textSec, lineHeight:1.4 }}>{x.val || ""}</div></div>
            </div>
          ))}
        </div>
        {/* Hypothesis */}
        {b.hypothesis && <div style={{ background:C.purpleSoft, borderLeft:`3px solid ${C.purple}`, borderRadius:"0 8px 8px 0", padding:"10px 14px", fontSize:12, color:C.text, lineHeight:1.5 }}><span style={{ fontWeight:600 }}>Hypothesis: </span>{b.hypothesis}</div>}
      </div>
      {/* Status + Result bar at bottom */}
      <div style={{ padding:"12px 24px", borderTop:`1px solid ${C.borderLight}`, display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:12, position:"relative" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ position:"relative" }}>
            <div onClick={(e)=>{e.stopPropagation();setStatusPicker(statusPicker===b.id?null:b.id);setResultPicker(null);}} style={{ cursor:"pointer" }}>
              <Pill text={b.status}/>
            </div>
            {statusPicker===b.id&&(
              <div style={{ position:"absolute", bottom:"100%", left:0, zIndex:50, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:6, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:160, marginBottom:4 }}>
                {STATUSES.map(s=>(
                  <div key={s} onClick={(e)=>{e.stopPropagation();onSetStatus(b.id,s);}} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:6, cursor:"pointer", fontSize:13, background:b.status===s?C.purpleSoft:"transparent" }}
                    onMouseEnter={e=>e.currentTarget.style.background=b.status===s?C.purpleSoft:C.bg}
                    onMouseLeave={e=>e.currentTarget.style.background=b.status===s?C.purpleSoft:"transparent"}>
                    <Pill text={s}/>{b.status===s&&<span style={{ fontSize:14, color:C.purple }}>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ position:"relative" }}>
          <div onClick={(e)=>{e.stopPropagation();setResultPicker(resultPicker===b.id?null:b.id);setStatusPicker(null);}} style={{ cursor:"pointer" }}>
            <Pill text={b.result}/>
          </div>
          {resultPicker===b.id&&(
            <div style={{ position:"absolute", bottom:"100%", right:0, zIndex:50, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:6, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:160, marginBottom:4 }}>
              {RESULTS.map(r=>(
                <div key={r} onClick={(e)=>{e.stopPropagation();onSetResult(b.id,r);}} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:6, cursor:"pointer", fontSize:13, background:b.result===r?C.purpleSoft:"transparent" }}
                  onMouseEnter={e=>e.currentTarget.style.background=b.result===r?C.purpleSoft:C.bg}
                  onMouseLeave={e=>e.currentTarget.style.background=b.result===r?C.purpleSoft:"transparent"}>
                  <Pill text={r}/>{b.result===r&&<span style={{ fontSize:14, color:C.purple }}>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

const fbLookup = {
  1: {h:"* Mechanism too shitty \n   * Too slow the voiceiver is too slow\n   * No guarantee weak cta \n   * Long lecture could be faster and shorter \n   * Unbeleivebale UMS", a:"- test a short version \n- better hooks\n   * Short mechanism", l:"https://www.facebook.com/reel/1132059775461308"},
  11: {h:"-blue ocean angle ( Targeting a segment of audience where they have seen these types of chlorophyll mullein. Alright, and I failed at it. Telling them why I failed and what is real and fake.\n- A real research That backs up the claim that we're making.\n\n- The hook is very patterned, and it's just not something that you would expect. It's like, \"Whoa, what is the answer? I need to know what the ", a:"* 3-4 new hooks/ visual\n      * 1 new edit with new clips new voice", l:"https://www.facebook.com/61585526673688/posts/122109303579184222/"},
  17: {h:": First, a personalized, honest review about the mullein products\n- Meet the customer exactly at what awareness stage there at  .These are mof  for customers who know about Mullen.", a:"New hooks, same body\n      * Same hook, new presenter\n      * Same", l:""},
  15: {h:"We launched this brand a month ago this mof isnt ready\nFor this type of brand Very confusing concept.", a:"Status: Killed — brand not ready", l:"https://www.facebook.com/61585526673688/posts/122111045529184222/"},
  27: {h:"-Weak UMP mechanism\nWeak overused mechanism everyone has heard it \nNew angle with no congruency lining page. This angle would have worked if maybe we had a direct grounding page with it. But still, the mechanism is so bad that it is saturated. I think we need to find a better mechanism.\nNot meeting the customers at the right time in the head, of course, after the hook you went straight for the ", a:"Very congruent direct response landing page.\nBefore running any mechanism, check if the mechanism meets certain metrics? Has her does the customer notice metric? Does the customer notice his mechanism? Have they heard her before? Is this really a good mechanism? Compared his mechanism to other", l:"https://www.facebook.com/reel/830130550061289"},
  31: {h:"-Very pattern interrupt hook, telling people how to spot between the fakes and real. Very pattern interrupt curiosity, they want to know what's real, how to spot the real and how to spot the fakes.\n-iteraion on winning angle “ fake mullein”\n- proof of study “ the author” \n- exposing mechanism \nPersonal perspective exposing.", a:"More hooks. We're going to test more hooks.\nMore concepts around this angle.", l:"https://www.facebook.com/61585526673688/posts/122113926507184222/"},
  25: {h:"- Hypothesis 1: The negative marketing frame (\"3 reasons I hate this\") attracts curiosity clickers, not buyers — high CTR but low purchase intent traffic, evidenced by the massive ATC-to-purchase drop (12 ATCs → 1 purchase on Ad 3).\nHypothesis 2: The sarcastic tone creates a trust gap at checkout. The target demo (older smokers with real lung problems) may enjoy the content but not feel confide", a:"Action 1: Let Ad \"2\" continue running at $40/day. It's the strongest performer at 1.80 ROAS. Give it $150–200 more spend to confirm the signal holds with statistical significance. Monitor frequency — kill it if it hits 2.5+.\nAction 2: If Ad \"2\" stalls, build a direct response version: strip the negative angle, lead with a tight \"this mullein cleared my lungs\" transformation hook, and pair i", l:"https://www.facebook.com/reel/1614526286232570"},
  39: {h:"New Mechanism reframe — why everything else failed\nSpeaking the subgroup's language — naming their drugs, their side effects, their emotional reality\nThe dignity/independence fantasy — \"my doctor wanted to know what I was taking\" as a power reversal that channels anti-Big Pharma sentiment into aspiration rather than anger\nUSPs match real desires — modest, believable outcomes (spacing out flar", a:"7 hook iterations \nNew format TOF PO", l:"https://www.facebook.com/reel/1614526286232570"},
  34: {h:"- I believe they know that they're being advertised to. The second thing I believe is that they don't like watching news.Very good angle, but we can definitely do better. There's definitely a way to introduce this new angle. This is not a great way to introduce it. A new format will be better. I believe this angle failed because the way I mean maybe breaking news isn't something that we should hav", a:"Testing new ways to describe this angle.\nMini ugc style \nStatic styles \nDefinitely not a news style.", l:"https://www.facebook.com/reel/1614526286232570"},
  53: {h:"", a:"-Test more hooks \n- Possibly more New visuals", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  47: {h:"", a:"New hooks \nNew concepts via monk", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  52: {h:"", a:"More hooks\nBetter reasoning \nNew possible lead", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  51: {h:"", a:"What am I going to do differently as a result of this NEW information? (Ranked most confident to least", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  50: {h:"", a:"we cut the \nbig phrama part \nwe make better statics \nwe cut the aggresive cta \n redo the ad", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  61: {h:"", a:"-More Hooks", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  58: {h:"Why is this a winning ad? (Ranked most confident to least  \n      * Prev winner it worked because of discount code we had in that static \n\n- mechanism war Are the monies in the market? You have to stand out by saying 20x stronger than the mechanism. Make it work. \n\n- Relatable message than anything you have tried. We acknowledge that they have tried other fake stuff and other diluted Mullein.", a:"- same image- 3 diff new Relatable messaging.\n- Different pattern interrupt image- With the same messaging right now\nWhat am I going to do differently as a result of this NEW information? (Ranked most confident to least", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  63: {h:"Why is this a losing ad? (Ranked most confident to least\n- Not calling out a direct avatar seems like this is abroad, this goes to everybody, rOnce you call out your avatar, you will filter out the rest.\n- skeptics about 1 ingredient doing all those things maybe tripel ingredients", a:"Rewrite the ad using the new", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  60: {h:"Why is this a  losing ad? (Ranked most confident to least\n-boring mechanism ( they heard dozens of times) \n-Week hook ( the hook rates show is)\n- Introduce product too fast ( no connection whats so ever)", a:"DEAD ANGLE NO ACTIONABLE STEPS \nMaybe a new mechansim i thkn idk fuck this angle.\nDr. Julian, ever since I stopped smoking, I get winded just walking to my car. I thought quitting was supposed to fix that. I get asked this every single day, and the answer is simple. Quitting stopped the damage, but it did not clear it. You see, you have a cleanup crew inside your lungs. Tiny hairs called cilia. ", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  65: {h:"Why is this a  losing ad? (Ranked most confident to least\nThis angle is a rinsed angle. I've used it more than 15 times in concepts. I feel like people are tired of it, and for this angle to win again, we need a dedicated landing page. I've rinsed this angle a lot of times.\n\n- This angle is like a pharmacist. Why is a pharmacist recommending a herbal?I mean, isn't he a part of the big pharma? I", a:"- rinsed format \n- need new LP for these \nFired Pharmacist explains why CVS lung supplements will never clear your smoker's lungs. Mucinex, herbal cough syrups, put them right back on the shelf because these only thin the fresh mucus sitting on top. The deep tar that's been hardening in your lungs for 10, 20, 30 years. They were never designed to go that deep. You'll blow your nose for a day and", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  71: {h:"Why is this a winning ad? (Ranked most confident to least\n\n- winning message we had that was already a winner \n- iteration of winning ad ranking\nVery good author figure, ma", a:"-Action 2: Produce the Next Iteration of the Competitive Teardown \n- More hooks", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  88: {h:"Why is this a  Losing ad? (Ranked most confident to least\n         * Claim structure instead of conditional structure — \"Best herb for smokers who want X\" triggers skepticism instantly. \"If a smoker took X, this would happen\" makes them feel it themselves. One is you selling. One is them discovering.\n         * No timelines — \"10 days\" \"one week\" \"two weeks\" made the outcome feel real ", a:"Test more avatars not for only smoklers \nIf someone with asthma took 2\nIf a someone with copd took _ _ \nBack to old strutcher", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  74: {h:"Why is this a  Losing ad? (Ranked most confident to least\n            * Smoker being lectured ( smokers hate this ) they already know waht happen if they keep smoking\n- cruisty based ad that gets soft metrics but not real buyers", a:"1. Write the first-person UGC", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  90: {h:"Why is this a winning ad  \n- Winning trending format\n- each ingredient links pain point \n- mechanism all in one dropper", a:"More ai ingredients ads \nBetter ai speaking", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  91: {h:"-", a:"", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  94: {h:"- \n  \n\n  \n               * \nHard dr copy no one says “ scary levels of lung crarity” \n- customer voice not matched", a:"Test new reviews instead , that customers say swap it out.", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
  95: {h:"-there is no more initial thought behind this ad why it first worked why it became a winner that i copied so i just monkey see monkey do turns out to be miserable ad", a:"No actions plan terrible ad", l:"https://www.facebook.com/61588589067153/posts/122100881859286302/"},
};

/* ─── Main App ─── */
export default function App() {
  const [batches, setBatches] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [fS, setFS] = useState("All");
  const [fR, setFR] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const [detail, setDetail] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState(7);
  const [brands, setBrands] = useState(["OriginDrops"]);
  const [currentBrand, setCurrentBrand] = useState("OriginDrops");
  const [showBrandMenu, setShowBrandMenu] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [addingBrand, setAddingBrand] = useState(false);
  const [brandContext, setBrandContext] = useState(null);
  const [brandConfirm, setBrandConfirm] = useState(null);

  const apiBase = useMemo(() => getCreativeOpsApiBase(), []);
  const [apiToken, setApiToken] = useState(() => {
    try {
      return localStorage.getItem(LS_TOKEN_KEY) || "";
    } catch {
      return "";
    }
  });
  const apiTokenRef = useRef(apiToken);
  useEffect(() => {
    apiTokenRef.current = apiToken;
  }, [apiToken]);
  const [apiLoginEmail, setApiLoginEmail] = useState("");
  const [apiLoginPassword, setApiLoginPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiBusy, setApiBusy] = useState(false);
  const [apiSyncing, setApiSyncing] = useState(false);
  const [apiReachable, setApiReachable] = useState(null);
  const stateRef = useRef({ batches: [], loops: [], docs: [], ideas: [] });
  const snapshotRef = useRef({ batches: [], loops: [], docs: [], ideas: [] });
  const currentBrandRef = useRef(currentBrand);
  const syncTimerRef = useRef(null);
  const localSnapshotSeededRef = useRef(false);

  useEffect(() => {
    currentBrandRef.current = currentBrand;
  }, [currentBrand]);

  useEffect(() => {
    if (!apiBase) {
      setApiReachable(null);
      return;
    }
    let cancelled = false;
    fetch(apiBase + "/health")
      .then((r) => {
        if (!cancelled) setApiReachable(r.ok);
      })
      .catch(() => {
        if (!cancelled) setApiReachable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  useEffect(()=>{ (async()=>{ try { const g=await window.storage.get("creative-goal"); if(g?.value) setWeeklyGoal(parseInt(g.value)||7); } catch{} try { const br=await window.storage.get("creative-brands"); if(br?.value) { const d=JSON.parse(br.value); setBrands(d.list||["OriginDrops"]); setCurrentBrand(d.current||"OriginDrops"); } } catch{} })(); },[]);
  const [viewMode, setViewMode] = useState("table");
  const [selectedBatches, setSelectedBatches] = useState(new Set());
  const [lastSelected, setLastSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [drill, setDrill] = useState(null); // {field, value, label}
  const [resultPicker, setResultPicker] = useState(null);
  const [statusPicker, setStatusPicker] = useState(null);
  const [loops, setLoops] = useState([]);
  const [showLoop, setShowLoop] = useState(false);
  const [editLoop, setEditLoop] = useState(null);
  const emptyLoop = { batchId:"", videoLink:"", imageData:"", hypothesisWhy:"", actionPlan:"", completed:false, createdAt:"" };
  const [loopForm, setLoopForm] = useState({...emptyLoop});
  const [docs, setDocs] = useState([]);
  const [showDoc, setShowDoc] = useState(false);
  const [editDoc, setEditDoc] = useState(null);
  const [docForm, setDocForm] = useState({ title:"", content:"" });
  const [ideas, setIdeas] = useState([]);
  const [showIdea, setShowIdea] = useState(false);
  const [editIdeaId, setEditIdeaId] = useState(null);
  const [ideaForm, setIdeaForm] = useState({ date:"", idea:"", inspo:"", status:"Pending" });

  useEffect(() => {
    stateRef.current = { batches, loops, docs, ideas };
  });

  const ensureMongoBrandId = useCallback(
    async (brandName) => {
      const base = apiBase;
      const tok = apiTokenRef.current;
      if (!base || !tok) return null;
      const list = await apiFetchAuth(base, tok, "/api/brands");
      let row = list.find((x) => x.name === brandName);
      if (!row) {
        row = await apiFetchAuth(base, tok, "/api/brands", {
          method: "POST",
          body: JSON.stringify({ name: brandName }),
        });
      }
      return row.id;
    },
    [apiBase]
  );

  const loadFromLocalStorage = useCallback(async (brandName) => {
    const key = "brand-" + brandName;
    const mapB = (arr) =>
      arr.map((b) => ({
        ...b,
        isNew: b.isNew === "New Messaging" ? "Ideation" : b.isNew,
        date:
          b.date && b.date.startsWith("2025-") && !b.date.startsWith("2025-12")
            ? b.date.replace("2025-", "2026-")
            : b.date,
      }));
    let b = [];
    let l = [];
    let d = [];
    let i = [];
    try {
      const rb = await window.storage.get(key + "-batches");
      if (rb?.value) b = mapB(JSON.parse(rb.value));
      else if (brandName === "OriginDrops") b = mapB(samples);
    } catch {
      if (brandName === "OriginDrops") b = mapB(samples);
    }
    try {
      const rl = await window.storage.get(key + "-loops");
      if (rl?.value) l = JSON.parse(rl.value);
      else if (brandName === "OriginDrops" && typeof sampleLoops !== "undefined")
        l = sampleLoops;
    } catch {
      if (brandName === "OriginDrops" && typeof sampleLoops !== "undefined")
        l = sampleLoops;
    }
    try {
      const rd = await window.storage.get(key + "-docs");
      if (rd?.value) d = JSON.parse(rd.value);
    } catch {}
    try {
      const ri = await window.storage.get(key + "-ideas");
      if (ri?.value) i = JSON.parse(ri.value);
    } catch {}
    setBatches(b);
    setLoops(l);
    setDocs(d);
    setIdeas(i);
    return { batches: b.length, loops: l.length, docs: d.length, ideas: i.length };
  }, []);

  const hydrateFromApi = useCallback(async () => {
    const base = apiBase;
    const tok = apiTokenRef.current;
    if (!base || !tok) return null;
    setApiBusy(true);
    setApiError("");
    try {
      const bid = await ensureMongoBrandId(currentBrandRef.current);
      if (!bid) return null;
      const [b, l, d, i] = await Promise.all([
        apiFetchAuth(base, tok, `/api/brands/${bid}/batches`),
        apiFetchAuth(base, tok, `/api/brands/${bid}/loops`),
        apiFetchAuth(base, tok, `/api/brands/${bid}/docs`),
        apiFetchAuth(base, tok, `/api/brands/${bid}/ideas`),
      ]);
      const b2 = b.map(normalizeBatch);
      setBatches(b2);
      setLoops(l);
      setDocs(d);
      setIdeas(i);
      snapshotRef.current = {
        batches: b2.map((x) => ({ ...x })),
        loops: l.map((x) => ({ ...x })),
        docs: d.map((x) => ({ ...x })),
        ideas: i.map((x) => ({ ...x })),
      };
      localSnapshotSeededRef.current = true;
      const br = currentBrandRef.current;
      try {
        await window.storage.set("brand-" + br + "-batches", JSON.stringify(b2));
        await window.storage.set("brand-" + br + "-loops", JSON.stringify(l));
        await window.storage.set("brand-" + br + "-docs", JSON.stringify(d));
        await window.storage.set("brand-" + br + "-ideas", JSON.stringify(i));
      } catch {}
      return {
        batches: b2.length,
        loops: l.length,
        docs: d.length,
        ideas: i.length,
      };
    } catch (e) {
      setApiError(e.message || String(e));
      return null;
    } finally {
      setApiBusy(false);
    }
  }, [apiBase, ensureMongoBrandId]);

  const reloadBrandData = useCallback(async () => {
    if (apiBase && apiTokenRef.current) {
      const counts = await hydrateFromApi();
      if (counts && counts.batches > 0) return counts;
    }
    return loadFromLocalStorage(currentBrandRef.current);
  }, [apiBase, hydrateFromApi, loadFromLocalStorage]);

  const applyBackupToState = useCallback(
    async (data) => {
      const has = (k) => Object.prototype.hasOwnProperty.call(data, k);
      let bCount = batches.length;
      let lCount = loops.length;
      let dCount = docs.length;
      let iCount = ideas.length;

      if (has("batches") && (data.batches || []).length > 0) {
        const next = (data.batches || []).map(normalizeBatch);
        setBatches(next);
        bCount = next.length;
        try {
          await window.storage.set(
            "brand-" + currentBrand + "-batches",
            JSON.stringify(next)
          );
        } catch {}
      }
      if (has("loops")) {
        const next = data.loops || [];
        setLoops(next);
        lCount = next.length;
        try {
          await window.storage.set(
            "brand-" + currentBrand + "-loops",
            JSON.stringify(next)
          );
        } catch {}
      }
      if (has("docs")) {
        const next = data.docs || [];
        setDocs(next);
        dCount = next.length;
        try {
          await window.storage.set(
            "brand-" + currentBrand + "-docs",
            JSON.stringify(next)
          );
        } catch {}
      }
      if (has("ideas")) {
        const next = data.ideas || [];
        setIdeas(next);
        iCount = next.length;
        try {
          await window.storage.set(
            "brand-" + currentBrand + "-ideas",
            JSON.stringify(next)
          );
        } catch {}
      }

      return { bCount, lCount, dCount, iCount };
    },
    [batches.length, loops.length, docs.length, ideas.length, currentBrand]
  );

  const handleImportBackupFile = useCallback(
    async (file) => {
      if (!file) return;
      setApiBusy(true);
      setApiError("");
      try {
        const data = JSON.parse(await file.text());
        const { bCount, lCount, dCount, iCount } = await applyBackupToState(data);

        if (apiBase && apiTokenRef.current) {
          const bid = await ensureMongoBrandId(currentBrand);
          await apiFetchAuth(apiBase, apiTokenRef.current, `/api/import/json?brandId=${bid}`, {
            method: "POST",
            body: JSON.stringify(data),
          });
          const counts = await reloadBrandData();
          alert(
            "Backup imported and synced!\n\n" +
              (counts?.batches ?? 0) +
              " batches, " +
              (counts?.loops ?? 0) +
              " feedback loops, " +
              (counts?.docs ?? 0) +
              " docs, " +
              (counts?.ideas ?? 0) +
              " ideas.\n\nOpening Dashboard."
          );
        } else {
          let msg =
            "Backup restored!\n\n" +
            bCount +
            " batches, " +
            lCount +
            " feedback loops, " +
            dCount +
            " docs, " +
            iCount +
            " ideas.";
          if (bCount === 0 && lCount > 0) {
            msg +=
              "\n\nNote: This file has no batches. Use creative-ops-backup-2026-05-10.json or log in and click Load from server.";
          }
          alert(msg + "\n\nOpening Dashboard.");
        }
        setTab("dashboard");
      } catch (err) {
        alert("Error reading backup file: " + (err.message || err));
      } finally {
        setApiBusy(false);
      }
    },
    [
      apiBase,
      currentBrand,
      applyBackupToState,
      ensureMongoBrandId,
      reloadBrandData,
    ]
  );

  const restoreBundledBackup = useCallback(async () => {
    setApiBusy(true);
    setApiError("");
    try {
      const res = await fetch("/creative-ops-backup.json");
      if (!res.ok) throw new Error("Bundled backup file not found");
      const data = await res.json();
      await applyBackupToState(data);
      if (apiBase && apiTokenRef.current) {
        const bid = await ensureMongoBrandId(currentBrand);
        await apiFetchAuth(apiBase, apiTokenRef.current, `/api/import/json?brandId=${bid}`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const counts = await reloadBrandData();
        alert(
          "Full backup restored!\n\n" +
            (counts?.batches ?? 0) +
            " batches, " +
            (counts?.loops ?? 0) +
            " loops."
        );
      } else {
        alert(
          "Full backup restored locally!\n\n" +
            (data.batches?.length || 0) +
            " batches, " +
            (data.loops?.length || 0) +
            " loops.\n\nLog in to sync to MongoDB."
        );
      }
      setTab("dashboard");
    } catch (e) {
      alert("Restore failed: " + (e.message || e));
    } finally {
      setApiBusy(false);
    }
  }, [apiBase, applyBackupToState, ensureMongoBrandId, reloadBrandData, currentBrand]);

  const scheduleRemoteSync = useCallback(() => {
    const base = apiBase;
    const tok = apiTokenRef.current;
    if (!base || !tok || !localSnapshotSeededRef.current) return;
    clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(async () => {
      const { batches: B, loops: L, docs: D, ideas: I } = stateRef.current;
      const brand = currentBrandRef.current;
      setApiSyncing(true);
      setApiError("");
      try {
        const bid = await ensureMongoBrandId(brand);
        if (!bid) return;
        const prev = snapshotRef.current;
        const removedB = prev.batches.filter((x) => !B.some((y) => y.id === x.id)).map((x) => x.id);
        const removedL = prev.loops.filter((x) => !L.some((y) => y.id === x.id)).map((x) => x.id);
        const removedD = prev.docs.filter((x) => !D.some((y) => y.id === x.id)).map((x) => x.id);
        const removedI = prev.ideas.filter((x) => !I.some((y) => y.id === x.id)).map((x) => x.id);
        await Promise.all([
          ...removedB.map((id) =>
            apiFetchAuth(base, tok, `/api/brands/${bid}/batches/${id}`, { method: "DELETE" })
          ),
          ...removedL.map((id) =>
            apiFetchAuth(base, tok, `/api/brands/${bid}/loops/${id}`, { method: "DELETE" })
          ),
          ...removedD.map((id) =>
            apiFetchAuth(base, tok, `/api/brands/${bid}/docs/${id}`, { method: "DELETE" })
          ),
          ...removedI.map((id) =>
            apiFetchAuth(base, tok, `/api/brands/${bid}/ideas/${id}`, { method: "DELETE" })
          ),
        ]);
        await apiFetchAuth(base, tok, `/api/import/json?brandId=${bid}`, {
          method: "POST",
          body: JSON.stringify({
            batches: B,
            loops: L,
            docs: D,
            ideas: I,
            exportDate: new Date().toISOString(),
          }),
        });
        snapshotRef.current = {
          batches: B.map((x) => ({ ...x })),
          loops: L.map((x) => ({ ...x })),
          docs: D.map((x) => ({ ...x })),
          ideas: I.map((x) => ({ ...x })),
        };
        try {
          await window.storage.set("brand-" + brand + "-batches", JSON.stringify(B));
          await window.storage.set("brand-" + brand + "-loops", JSON.stringify(L));
          await window.storage.set("brand-" + brand + "-docs", JSON.stringify(D));
          await window.storage.set("brand-" + brand + "-ideas", JSON.stringify(I));
        } catch {}
      } catch (e) {
        setApiError(e.message || String(e));
      } finally {
        setApiSyncing(false);
      }
    }, 500);
  }, [apiBase, ensureMongoBrandId]);

  useEffect(() => () => clearTimeout(syncTimerRef.current), []);

  const empty = { name:"", date:"", type:"", isNew:"", origin:"", get:"", who:"", to:"", by:"", purchaseTrigger:"", awareness:"", sophistication:"", beliefBefore:"", beliefAfter:"", hypothesis:"", script:"", status:"Concept", result:"Data Awaiting", angle:"", parentId:"" };
  const [form, setForm] = useState({...empty});

  // Simple storage
  useEffect(()=>{ (async()=>{
    try { const g=await window.storage.get("creative-goal"); if(g?.value) setWeeklyGoal(parseInt(g.value)||7); } catch{}
    try { const br=await window.storage.get("creative-brands"); if(br?.value) { const d=JSON.parse(br.value); setBrands(d.list||["OriginDrops"]); setCurrentBrand(d.current||"OriginDrops"); } } catch{}
    // Load batches - try every possible key, fall back to samples
    let foundBatches = false;
    const batchKeys = ["brand-OriginDrops-batches","creative-ops-v9","creative-ops-v8","creative-ops-v7","creative-ops-v6","creative-ops-v5","creative-ops-v4","creative-ops-v3"];
    for(const k of batchKeys) { try { const r=await window.storage.get(k); if(r?.value) { const p=JSON.parse(r.value).map(b=>({...b, isNew:b.isNew==="New Messaging"?"Ideation":b.isNew, date:b.date&&b.date.startsWith("2025-")&&!b.date.startsWith("2025-12")?b.date.replace("2025-","2026-"):b.date})); if(p.length>0) { setBatches(p); foundBatches=true; break; } } } catch{} }
    if(!foundBatches) setBatches(samples);
    // Load loops
    let foundLoops = false;
    const loopKeys = ["brand-OriginDrops-loops","creative-loops-v6","creative-loops-v5","creative-loops-v4","creative-loops-v3","creative-loops-v2","creative-loops-v1"];
    for(const k of loopKeys) { try { const r=await window.storage.get(k); if(r?.value) { const p=JSON.parse(r.value); if(p.length>0) { setLoops(p); foundLoops=true; break; } } } catch{} }
    if(!foundLoops && typeof sampleLoops!=="undefined") setLoops(sampleLoops);
    // Load docs
    try { const d=await window.storage.get("brand-OriginDrops-docs"); if(d?.value) setDocs(JSON.parse(d.value)); } catch{}
    try { const d2=await window.storage.get("creative-docs-v1"); if(d2?.value) setDocs(JSON.parse(d2.value)); } catch{}
    try { const id=await window.storage.get("brand-"+currentBrand+"-ideas"); if(id?.value) setIdeas(JSON.parse(id.value)); else { const id2=await window.storage.get("creative-ideas-v1"); if(id2?.value) setIdeas(JSON.parse(id2.value)); } } catch{}
    setLoaded(true);
  })(); },[]);

  // Reload when switching brands
  useEffect(() => {
    if (!loaded) return;
    reloadBrandData();
  }, [currentBrand, loaded, reloadBrandData]);

  useEffect(() => {
    if (!loaded || !apiBase || !apiToken) return;
    reloadBrandData();
  }, [loaded, apiBase, apiToken, reloadBrandData]);

  const doApiLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!apiBase) return;
    setApiBusy(true);
    setApiError("");
    try {
      const data = await apiFetchPublic(apiBase, "/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: apiLoginEmail.trim(), password: apiLoginPassword }),
      });
      try {
        localStorage.setItem(LS_TOKEN_KEY, data.token);
      } catch {}
      apiTokenRef.current = data.token;
      setApiToken(data.token);
      setApiLoginPassword("");
      const counts = await hydrateFromApi();
      if (counts) {
        setTab("dashboard");
      }
    } catch (err) {
      setApiError(err.message || String(err));
    } finally {
      setApiBusy(false);
    }
  };

  const doApiLogout = () => {
    try {
      localStorage.removeItem(LS_TOKEN_KEY);
    } catch {}
    apiTokenRef.current = "";
    setApiToken("");
    localSnapshotSeededRef.current = false;
  };

  // Save always uses consistent keys (+ debounced sync to API when logged in)
  const save = useCallback(async(b)=>{ setBatches(b); try{ await window.storage.set("brand-"+currentBrand+"-batches",JSON.stringify(b)); }catch{} scheduleRemoteSync(); },[currentBrand, scheduleRemoteSync]);
  const saveLoops = useCallback(async(l)=>{ setLoops(l); try{ await window.storage.set("brand-"+currentBrand+"-loops",JSON.stringify(l)); }catch{} scheduleRemoteSync(); },[currentBrand, scheduleRemoteSync]);
  const saveDocs = useCallback(async(d)=>{ setDocs(d); try{ await window.storage.set("brand-"+currentBrand+"-docs",JSON.stringify(d)); }catch{} scheduleRemoteSync(); },[currentBrand, scheduleRemoteSync]);
  const saveIdeas = useCallback(async(i)=>{ setIdeas(i); try{ await window.storage.set("brand-"+currentBrand+"-ideas",JSON.stringify(i)); }catch{} scheduleRemoteSync(); },[currentBrand, scheduleRemoteSync]);

  // Migrate feedback loop content from Google Doc
  useEffect(()=>{
    if(!loaded||batches.length===0||loops.length===0) return;
    if(typeof fbLookup==="undefined") return;
    let changed=false;
    const updated=loops.map(l=>{
      if(l.hypothesisWhy&&l.hypothesisWhy.trim()) return l;
      const b=batches.find(x=>x.id===l.batchId);
      if(!b) return l;
      const m=b.name?.match(/#(\d+)/);
      if(!m) return l;
      const num=parseInt(m[1]);
      if(fbLookup[num]){
        changed=true;
        return {...l, hypothesisWhy:fbLookup[num].h, actionPlan:fbLookup[num].a, videoLink:l.videoLink||fbLookup[num].l, completed:true};
      }
      return l;
    });
    if(changed) saveLoops(updated);
  },[loaded, batches.length]);
  const submit = ()=>{ if(!form.name.trim()) return; if(editId) save(batches.map(b=>b.id===editId?{...form,id:editId}:b)); else save([{...form,id:genId()},...batches]); setForm({...empty}); setShowForm(false); setEditId(null); };
  const openEdit = (b)=>{ setForm({...empty,...b}); setEditId(b.id); setShowForm(true); setTab("batches"); setDetail(null); };
  const nextBatchNum = ()=>{ const nums=batches.map(b=>{const m=b.name.match(/#(\d+)/);return m?parseInt(m[1]):0;}); return Math.max(0,...nums)+1; };
  const duplicateBatch = (b)=>{ const num=nextBatchNum(); setForm({...empty,...b, id:"", name:`Batch #${num}`, date:new Date().toISOString().split("T")[0], result:"Data Awaiting", status:"Concept", isNew:"Iteration", parentId:b.id}); setEditId(null); setShowForm(true); setTab("batches"); };
  const toggleSort = (col)=>{ if(sortCol===col) setSortDir(sortDir==="asc"?"desc":"asc"); else { setSortCol(col); setSortDir("desc"); } };
  const drillInto = (field, value, label)=>{ setDrill({field,value,label}); setTab("batches"); setFS("All"); setFR("All"); setSearch(""); };
  const setResult = (id, result)=>{ save(batches.map(b=>b.id===id?{...b,result}:b)); setResultPicker(null); };
  const f = (k,v)=> setForm({...form,[k]:v});
  const lf = (k,v)=> setLoopForm({...loopForm,[k]:v});
  const submitLoop = ()=>{ if(!loopForm.batchId) return; if(editLoop) saveLoops(loops.map(l=>l.id===editLoop?{...loopForm,id:editLoop}:l)); else saveLoops([{...loopForm,id:genId(),createdAt:new Date().toISOString().split("T")[0]},...loops]); setLoopForm({...emptyLoop}); setShowLoop(false); setEditLoop(null); };
  const completeLoop = (id)=>{ saveLoops(loops.map(l=>l.id===id?{...l,completed:true}:l)); };
  const openEditLoop = (l)=>{ setLoopForm({...l}); setEditLoop(l.id); setShowLoop(true); };

  const st = useMemo(()=>{
    const withResult=batches.filter(b=>b.result==="Winning Ad"||b.result==="Losing Ad");
    const w=withResult.filter(b=>b.result==="Winning Ad").length;
    const l=withResult.filter(b=>b.result==="Losing Ad").length;
    const t=withResult.length;
    const waiting=batches.filter(b=>b.result==="Data Awaiting").length;
    return { hr:t>0?(w/t)*100:0, w, l, t, total:batches.length, newM:batches.filter(b=>b.isNew==="Ideation").length, iter:batches.filter(b=>b.isNew==="Iteration").length, vari:batches.filter(b=>b.isNew==="Variation").length, pipe:batches.filter(b=>["In Production","Ready for Launch","Concept"].includes(b.status)).length, mid:t-w-l, waiting };
  },[batches]);

  /* Weekly/Monthly stats */
  const periods = useMemo(()=>{
    const weeks={}, months={};
    batches.filter(b=>b.date).forEach(b=>{
      const d=new Date(b.date);
      const ws=new Date(d); ws.setDate(d.getDate()-d.getDay());
      const wk=ws.toISOString().split("T")[0];
      const mo=b.date.slice(0,7);
      if(!weeks[wk]) weeks[wk]={total:0,wins:0};
      weeks[wk].total++; if(b.result==="Winning Ad") weeks[wk].wins++;
      if(!months[mo]) months[mo]={total:0,wins:0};
      months[mo].total++; if(b.result==="Winning Ad") months[mo].wins++;
    });
    const wArr=Object.entries(weeks).sort((a,b)=>a[0].localeCompare(b[0]));
    const mArr=Object.entries(months).sort((a,b)=>a[0].localeCompare(b[0]));
    return {weeks:wArr, months:mArr};
  },[batches]);

  /* Winning angles */
  const winAngles = useMemo(()=>{
    const map={};
    batches.filter(b=>b.result==="Winning Ad"&&b.angle).forEach(b=>{
      const a=b.angle.trim();
      if(!map[a]) map[a]={count:0, batches:[]};
      map[a].count++; map[a].batches.push(b.name);
    });
    return Object.entries(map).sort((a,b)=>b[1].count-a[1].count);
  },[batches]);

  const filtered = useMemo(()=>{
    let f = batches.filter(b=>(fS==="All"||b.status===fS)&&(fR==="All"||b.result===fR));
    if(search.trim()) { const s=search.toLowerCase(); f=f.filter(b=>(b.name||"").toLowerCase().includes(s)||(b.angle||"").toLowerCase().includes(s)||(b.hypothesis||"").toLowerCase().includes(s)||(b.desire||"").toLowerCase().includes(s)||(b.brief||"").toLowerCase().includes(s)); }
    if(drill) { f=f.filter(b=>{ if(drill.field==="angle") return (b.angle||"").toLowerCase().includes(drill.value.toLowerCase()); return (b[drill.field]||"")===drill.value; }); }
    f.sort((a,b)=>{
      let va=a[sortCol]||"", vb=b[sortCol]||"";
      if(sortCol==="name"){const na=parseInt((a.name.match(/#(\d+)/)||[])[1])||0,nb=parseInt((b.name.match(/#(\d+)/)||[])[1])||0;return sortDir==="asc"?na-nb:nb-na;}
      if(sortDir==="asc") return va<vb?-1:va>vb?1:0;
      return va>vb?-1:va<vb?1:0;
    });
    return f;
  },[batches,fS,fR,search,sortCol,sortDir,drill]);
  const db = detail?batches.find(b=>b.id===detail):null;
  const waitingList = useMemo(()=>batches.filter(b=>b.result==="Data Awaiting"),[batches]);

  if(!loaded) return <div style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,sans-serif", color:C.textSec }}>Loading...</div>;

  const ringSize=140, ringR=(ringSize-10)/2, ringCirc=2*Math.PI*ringR;

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'Inter',-apple-system,sans-serif", color:C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* NAV */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:56, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:28, height:28, borderRadius:7, background:`linear-gradient(135deg,${C.purple},#8b7cf7)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <span style={{ fontSize:15, fontWeight:700, display:"block", lineHeight:1.2 }}>Creative Ops</span>
              <div style={{ position:"relative" }}>
                <button onClick={()=>setShowBrandMenu(!showBrandMenu)} style={{ background:"none", border:"none", padding:0, fontSize:12, color:C.purple, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:3 }}>
                  {currentBrand} <span style={{ fontSize:8, opacity:0.6 }}>▼</span>
                </button>
                {showBrandMenu&&(
                  <div style={{ position:"absolute", top:"100%", left:0, zIndex:200, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:6, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:180, marginTop:4 }}>
                    {brands.map(b=>(
                      <div key={b} style={{ position:"relative" }}>
                        <div onClick={async()=>{setCurrentBrand(b);setShowBrandMenu(false);setBrandContext(null);try{await window.storage.set("creative-brands",JSON.stringify({list:brands,current:b}));}catch{}}}
                          onContextMenu={(e)=>{if(b!=="OriginDrops"){e.preventDefault();setBrandContext(brandContext===b?null:b);setBrandConfirm(null);}}}
                          style={{ padding:"8px 12px", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:b===currentBrand?600:400, color:b===currentBrand?C.purple:C.text, background:b===currentBrand?C.purpleSoft:brandContext===b?"#fff3f0":"transparent" }}
                          onMouseEnter={e=>{if(b!==currentBrand&&brandContext!==b)e.currentTarget.style.background=C.bg}} onMouseLeave={e=>{if(b!==currentBrand&&brandContext!==b)e.currentTarget.style.background="transparent"}}>
                          {b}
                        </div>
                        {brandContext===b&&!brandConfirm&&(
                          <div style={{ position:"absolute", left:"100%", top:0, marginLeft:4, zIndex:210, background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:4, boxShadow:"0 4px 16px rgba(0,0,0,0.12)", minWidth:120 }}>
                            <div onClick={()=>setBrandConfirm(b)} style={{ padding:"8px 12px", borderRadius:6, cursor:"pointer", fontSize:13, color:C.redText, fontWeight:500 }}
                              onMouseEnter={e=>e.currentTarget.style.background=C.redBg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                              Delete Brand
                            </div>
                          </div>
                        )}
                        {brandConfirm===b&&(
                          <div style={{ position:"absolute", left:"100%", top:0, marginLeft:4, zIndex:210, background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:12, boxShadow:"0 4px 16px rgba(0,0,0,0.12)", minWidth:180 }}>
                            <div style={{ fontSize:13, fontWeight:600, marginBottom:8 }}>Delete "{b}"?</div>
                            <div style={{ fontSize:12, color:C.textSec, marginBottom:12 }}>All data for this brand will be lost.</div>
                            <div style={{ display:"flex", gap:6 }}>
                              <button onClick={async()=>{const nb=brands.filter(x=>x!==b);setBrands(nb);if(currentBrand===b)setCurrentBrand("OriginDrops");setShowBrandMenu(false);setBrandContext(null);setBrandConfirm(null);try{await window.storage.set("creative-brands",JSON.stringify({list:nb,current:currentBrand===b?"OriginDrops":currentBrand}));}catch{}}} style={{ background:C.redText, color:"#fff", border:"none", borderRadius:6, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}>Delete</button>
                              <button onClick={()=>{setBrandContext(null);setBrandConfirm(null);}} style={{ background:C.bg, color:C.textSec, border:"none", borderRadius:6, padding:"6px 14px", fontSize:12, cursor:"pointer" }}>Cancel</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div style={{ borderTop:`1px solid ${C.borderLight}`, marginTop:4, paddingTop:4 }}>
                      {addingBrand?(
                        <div style={{ display:"flex", gap:4, padding:"4px 6px" }}>
                          <input autoFocus value={newBrandName} onChange={e=>setNewBrandName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newBrandName.trim()){const nb=[...brands,newBrandName.trim()];setBrands(nb);setCurrentBrand(newBrandName.trim());setShowBrandMenu(false);setAddingBrand(false);setNewBrandName("");setBatches([]);setLoops([]);setDocs([]);window.storage.set("creative-brands",JSON.stringify({list:nb,current:newBrandName.trim()})).catch(()=>{});}}} placeholder="Brand name..." style={{ flex:1, border:`1px solid ${C.border}`, borderRadius:6, padding:"6px 8px", fontSize:13, outline:"none" }}/>
                          <button onClick={()=>{if(newBrandName.trim()){const nb=[...brands,newBrandName.trim()];setBrands(nb);setCurrentBrand(newBrandName.trim());setShowBrandMenu(false);setAddingBrand(false);setNewBrandName("");setBatches([]);setLoops([]);setDocs([]);window.storage.set("creative-brands",JSON.stringify({list:nb,current:newBrandName.trim()})).catch(()=>{});}}} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:6, padding:"6px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>Add</button>
                        </div>
                      ):(
                        <div onClick={()=>setAddingBrand(true)} style={{ padding:"8px 12px", borderRadius:6, cursor:"pointer", fontSize:13, color:C.purple, fontWeight:500 }}
                          onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          + Add Brand
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:2 }}>
            {["dashboard","batches","feedback","ideas","research","analytics"].map(t=>(
              <button key={t} onClick={()=>{setTab(t);setDetail(null);}} style={{ padding:"8px 16px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:500, background:tab===t?C.purpleSoft:"transparent", color:tab===t?C.purple:C.textSec }}>{t==="feedback"?"Feedback Loop":t==="research"?"Research":t==="ideas"?"Ideas":t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>
        <button onClick={()=>{setTab("batches");setShowForm(true);setEditId(null);setDetail(null);setForm({...empty,name:`Batch #${nextBatchNum()}`,date:new Date().toISOString().split("T")[0]});}} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>+ New Brief</button>
      </div>

      <div style={{ padding:"24px 32px", maxWidth:1360, margin:"0 auto" }}>

      {/* ════ DASHBOARD ════ */}
      {tab==="dashboard"&&!db&&(<div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {/* Overdue feedback reminder */}
        {(()=>{
          const today=new Date();
          const overdue=batches.filter(b=>{
            if(b.result!=="Data Awaiting"||!b.date) return false;
            const diff=(today-new Date(b.date))/(1000*60*60*24);
            return diff>=8;
          });
          if(overdue.length===0) return null;
          return (
            <div style={{ background:"#fff3e0", border:"1px solid #ffe0b2", borderRadius:10, padding:"14px 20px", display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:20 }}>⚠️</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#e65100" }}>Feedback needed on {overdue.length} ad{overdue.length>1?"s":""}</div>
                <div style={{ fontSize:12, color:"#bf360c", marginTop:2 }}>{overdue.slice(0,5).map(b=>b.name).join(", ")}{overdue.length>5?` and ${overdue.length-5} more`:""} - been on Data Awaiting for 8+ days</div>
              </div>
              <button onClick={()=>{setTab("feedback");}} style={{ background:"#e65100", color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>Do Feedback</button>
            </div>
          );
        })()}
        {/* Metrics */}
        <div style={{ display:"flex", gap:12 }}>
          {[
            {l:"Hit Rate",v:`${st.hr.toFixed(1)}%`,sub:`${st.w} wins / ${st.t} with results`},
            {l:"Total Concepts",v:st.total,sub:`${st.newM} ideation · ${st.iter} iteration · ${st.vari} variation`},
            {l:"Winners",v:st.w, pct:st.t>0?`+${Math.round((st.w/st.t)*100)}%`:null, pBg:C.greenBg, pC:C.greenText},
            {l:"Data Awaiting",v:st.waiting,sub:"awaiting feedback", pct:null, accent:true},
            {l:"In Pipeline",v:st.pipe,sub:"concept / production / ready"},
          ].map((m,i)=>(
            <Card key={i} style={{ flex:1, padding:"20px 24px" }}>
              <div style={{ fontSize:12, color:C.textSec, fontWeight:500, marginBottom:8 }}>{m.l}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                <span style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.02em", color:m.accent?C.yellowText:C.text }}>{m.v}</span>
                {m.pct&&<span style={{ fontSize:12, fontWeight:600, padding:"2px 8px", borderRadius:20, background:m.pBg||C.greenBg, color:m.pC||C.greenText }}>{m.pct}</span>}
              </div>
              {m.sub&&<div style={{ fontSize:11, color:C.textTer, marginTop:6 }}>{m.sub}</div>}
            </Card>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:14 }}>
          {/* Hit Rate Ring + Waiting */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <Card style={{ padding:24, display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.textSec, alignSelf:"flex-start" }}>Ad Hit Rate</div>
              <div style={{ position:"relative", width:ringSize, height:ringSize }}>
                <svg width={ringSize} height={ringSize} style={{ transform:"rotate(-90deg)" }}>
                  <circle cx={ringSize/2} cy={ringSize/2} r={ringR} fill="none" stroke={C.borderLight} strokeWidth={10}/>
                  <circle cx={ringSize/2} cy={ringSize/2} r={ringR} fill="none" stroke={C.purple} strokeWidth={10} strokeDasharray={ringCirc} strokeDashoffset={ringCirc*(1-st.hr/100)} strokeLinecap="round" style={{ transition:"stroke-dashoffset 0.8s" }}/>
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:26, fontWeight:700 }}>{st.hr.toFixed(1)}%</span>
                  <span style={{ fontSize:11, color:C.textTer }}>Hit Rate</span>
                </div>
              </div>
              <div style={{ width:"100%", display:"flex", gap:2, height:8, borderRadius:4, overflow:"hidden" }}>
                {st.t>0&&<><div style={{ width:`${(st.w/st.t)*100}%`, background:C.green }}/><div style={{ width:`${(st.mid/st.t)*100}%`, background:C.purpleLight }}/><div style={{ width:`${(st.l/st.t)*100}%`, background:C.red }}/></>}
              </div>
              <div style={{ display:"flex", gap:14, fontSize:11, color:C.textSec }}>
                <span>● <span style={{ color:C.green }}>Winners {st.w}</span></span>
                <span>● <span style={{ color:C.red }}>Losers {st.l}</span></span>
              </div>
            </Card>
            {/* Waiting List */}
            {waitingList.length>0&&(
              <Card style={{ padding:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:C.yellow }}/>
                  <span style={{ fontSize:13, fontWeight:600, color:C.textSec }}>Data Awaiting</span>
                  <span style={{ marginLeft:"auto", fontSize:12, fontWeight:600, color:C.yellowText, background:C.yellowBg, padding:"2px 8px", borderRadius:20 }}>{waitingList.length}</span>
                </div>
                {waitingList.slice(0,8).map(b=>(
                  <div key={b.id} onClick={()=>setDetail(b.id)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.borderLight}`, cursor:"pointer", fontSize:13 }}>
                    <div>
                      <div style={{ fontWeight:600 }}>{b.name}</div>
                      <div style={{ fontSize:11, color:C.textTer }}>{b.angle||b.hypothesis?((b.angle||b.hypothesis||"").slice(0,35)):""}</div>
                    </div>
                    <Pill text={b.result}/>
                  </div>
                ))}
                {waitingList.length>8&&(
                  <button onClick={()=>{setTab("batches");setFR("Data Awaiting");}} style={{ width:"100%", marginTop:10, padding:"8px 0", background:C.bg, border:"none", borderRadius:8, fontSize:12, fontWeight:500, color:C.purple, cursor:"pointer" }}>View all {waitingList.length} awaiting →</button>
                )}
              </Card>
            )}
          </div>

          {/* Creative Velocity */}
          <Card style={{ padding:24 }}>
            {(()=>{
              const today = new Date();
              const getMonday = (d) => { const dt=new Date(d); const day=dt.getDay(); const diff=dt.getDate()-day+(day===0?-6:1); dt.setDate(diff); dt.setHours(0,0,0,0); return dt; };
              const getSunday = (mon) => { const s=new Date(mon); s.setDate(s.getDate()+6); return s; };
              const thisMonday = getMonday(today);
              
              // Build ALL weeks from first batch to now
              const datedBatches = batches.filter(b=>b.date);
              const allWeeks = [];
              if(datedBatches.length>0){
                const dates = datedBatches.map(b=>b.date).sort();
                const firstMon = getMonday(new Date(dates[0]));
                let cur = new Date(firstMon);
                while(cur <= thisMonday){
                  const mon = new Date(cur);
                  const sun = getSunday(mon);
                  const monStr = mon.toISOString().split("T")[0];
                  const sunStr = sun.toISOString().split("T")[0];
                  const launched = datedBatches.filter(b=>b.date>=monStr&&b.date<=sunStr);
                  const wins = launched.filter(b=>b.result==="Winning Ad").length;
                  const losses = launched.filter(b=>b.result==="Losing Ad").length;
                  const rated = wins + losses;
                  const hr = rated > 0 ? ((wins/rated)*100).toFixed(0) : null;
                  const isThis = monStr===thisMonday.toISOString().split("T")[0];
                  allWeeks.push({ mon, monStr, sunStr, total:launched.length, wins, losses, rated, hr, isThis });
                  cur.setDate(cur.getDate()+7);
                }
              }
              
              const thisWeek = allWeeks.find(w=>w.isThis)||{total:0,wins:0,losses:0,rated:0,hr:null,monStr:"",sunStr:""};
              const weeksWithData = allWeeks.filter(w=>w.total>0);
              const pct = weeklyGoal>0?Math.min((thisWeek.total/weeklyGoal)*100,100):0;
              const ringSize=130, ringR=(ringSize-10)/2, ringCirc=2*Math.PI*ringR;
              const maxTotal = Math.max(...allWeeks.map(w=>w.total),1);
              
              return (<>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700 }}>Creative Velocity</div>
                    <div style={{ fontSize:12, color:C.textSec }}>{weeksWithData.length} active weeks - {datedBatches.length} creatives launched</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:12, color:C.textSec }}>Weekly Goal:</span>
                    <input type="number" value={weeklyGoal} onChange={async(e)=>{ const v=parseInt(e.target.value)||1; setWeeklyGoal(v); try{await window.storage.set("creative-goal",String(v));}catch{} }} style={{ width:50, border:`1px solid ${C.border}`, borderRadius:6, padding:"6px 8px", fontSize:14, fontWeight:700, textAlign:"center", color:C.purple, outline:"none" }}/>
                  </div>
                </div>
                
                <div style={{ display:"flex", gap:24, alignItems:"center", marginBottom:24 }}>
                  {/* This week ring */}
                  <div style={{ position:"relative", width:ringSize, height:ringSize, flexShrink:0 }}>
                    <svg width={ringSize} height={ringSize} style={{ transform:"rotate(-90deg)" }}>
                      <circle cx={ringSize/2} cy={ringSize/2} r={ringR} fill="none" stroke={C.borderLight} strokeWidth={10}/>
                      <circle cx={ringSize/2} cy={ringSize/2} r={ringR} fill="none" stroke={thisWeek.total>=weeklyGoal?C.green:C.purple} strokeWidth={10} strokeDasharray={ringCirc} strokeDashoffset={ringCirc*(1-pct/100)} strokeLinecap="round" style={{ transition:"stroke-dashoffset 0.8s" }}/>
                    </svg>
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:32, fontWeight:700, color:thisWeek.total>=weeklyGoal?C.greenText:C.text }}>{thisWeek.total}</span>
                      <span style={{ fontSize:11, color:C.textTer }}>/ {weeklyGoal} this week</span>
                    </div>
                  </div>
                  
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:16, marginBottom:12 }}>
                      <div><div style={{ fontSize:22, fontWeight:700 }}>{thisWeek.total}</div><div style={{ fontSize:11, color:C.textTer }}>This Week</div></div>
                      <div><div style={{ fontSize:22, fontWeight:700 }}>{weeklyGoal - thisWeek.total > 0 ? weeklyGoal - thisWeek.total : 0}</div><div style={{ fontSize:11, color:C.textTer }}>Remaining</div></div>
                      <div><div style={{ fontSize:22, fontWeight:700, color:C.purple }}>{datedBatches.length>0?(datedBatches.length/Math.max(weeksWithData.length,1)).toFixed(1):0}</div><div style={{ fontSize:11, color:C.textTer }}>Avg / Week</div></div>
                    </div>
                    {thisWeek.total>=weeklyGoal&&<div style={{ fontSize:12, fontWeight:600, color:C.greenText, background:C.greenBg, padding:"4px 12px", borderRadius:20, display:"inline-block" }}>✓ Goal hit!</div>}
                  </div>
                </div>
                
                {/* Weekly timeline bars */}
                <div style={{ fontSize:13, fontWeight:600, color:C.textSec, marginBottom:8 }}>Weekly Launch History</div>
                <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:120, marginBottom:4 }}>
                  {allWeeks.slice(-16).map((w,i,arr)=>{
                    const isLast = i===arr.length-1;
                    const isPrev = i===arr.length-2;
                    return (
                      <div key={w.monStr} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }} title={`${w.monStr}: ${w.total} launched, ${w.wins} wins`}>
                        {w.total>0&&<span style={{ fontSize:10, fontWeight:700, color:C.text }}>{w.total}</span>}
                        <div style={{ width:"100%", maxWidth:36, height:Math.max((w.total/maxTotal)*70,w.total>0?6:1), borderRadius:4, overflow:"hidden", position:"relative" }}>
                          <div style={{ position:"absolute", inset:0, background:w.total>=weeklyGoal?C.greenBg:w.total>0?"#d5d5e4":C.borderLight, borderRadius:4 }}/>
                          {w.wins>0&&<div style={{ position:"absolute", bottom:0, left:0, right:0, height:`${(w.wins/w.total)*100}%`, background:w.total>=weeklyGoal?C.green:C.purple, borderRadius:"0 0 4px 4px" }}/>}
                        </div>
                        {w.hr!==null&&w.total>0?<span style={{ fontSize:10, fontWeight:600, color:parseFloat(w.hr)>=40?C.greenText:C.textTer }}>{w.hr}%</span>:<span style={{ fontSize:10, color:"transparent" }}>-</span>}
                        {isLast?<span style={{ fontSize:9, color:C.purple, fontWeight:600 }}>This week</span>:isPrev?<span style={{ fontSize:9, color:C.textTer }}>Last week</span>:null}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display:"flex", gap:16, fontSize:11, color:C.textSec }}>
                  <span style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8, height:8, borderRadius:2, background:C.purple }}/>Winners</span>
                  <span style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8, height:8, borderRadius:2, background:"#d5d5e4" }}/>Launched</span>
                  <span style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8, height:8, borderRadius:2, background:C.green }}/>Goal hit</span>
                </div>
              </>);
            })()}
          </Card>
        </div>

        {/* Recent */}
        <Card style={{ padding:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:13, fontWeight:600, color:C.textSec }}>Recent Creatives</span>
            <button onClick={()=>{setTab("batches");setShowForm(false);}} style={{ background:"none", border:"none", color:C.purple, fontSize:13, cursor:"pointer", fontWeight:500 }}>View all →</button>
          </div>
          {batches.slice(0,5).map(b=>(
            <div key={b.id} onClick={()=>setDetail(b.id)} style={{ display:"grid", gridTemplateColumns:"110px 70px 110px 1fr 100px 100px", gap:10, padding:"10px 8px", borderRadius:8, cursor:"pointer", alignItems:"center", fontSize:13, transition:"background 0.12s" }} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <span style={{ fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>{b.name}{loops.some(l=>l.batchId===b.id&&l.completed)&&<span style={{ width:14, height:14, borderRadius:"50%", background:C.purple, color:"#fff", fontSize:8, fontWeight:800, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>↻</span>}</span>
              <Pill text={b.type}/>
              <span style={{ fontSize:12, color:C.textSec, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.angle||""}</span>
              <span style={{ color:C.textSec, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.hypothesis||""}</span>
              <Pill text={b.status}/>
              <Pill text={b.result}/>
            </div>
          ))}
        </Card>
      </div>)}

      {/* Detail */}
      {tab==="dashboard"&&db&&(
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <button onClick={()=>setDetail(null)} style={{ background:"none", border:"none", color:C.purple, fontSize:13, cursor:"pointer", fontWeight:500, padding:0, alignSelf:"flex-start" }}>← Back</button>
          <Card style={{ padding:32 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:22, fontWeight:700, margin:0 }}>{db.name}</h2>
                <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}><Pill text={db.type}/><Pill text={db.isNew}/><Pill text={db.status}/><Pill text={db.result}/></div>
              </div>
              <button onClick={()=>openEdit(db)} style={{ background:C.purpleSoft, color:C.purple, border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer", height:"fit-content" }}>Edit Brief</button>
            </div>
            {/* Iteration chain */}
            {(()=>{
              // Build full chain: ancestors + this + children
              const ancestors=[];
              let cur=db.parentId;
              while(cur&&ancestors.length<10){const p=batches.find(b=>b.id===cur);if(!p)break;ancestors.unshift(p);cur=p.parentId;}
              const children=batches.filter(b=>b.parentId===db.id);
              if(ancestors.length===0&&children.length===0) return null;
              return (
                <div style={{ background:C.purpleSoft, borderRadius:10, padding:"12px 16px", marginBottom:20 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:C.purple, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Iteration Chain</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", fontSize:13 }}>
                    {ancestors.map((a,i)=>(
                      <span key={a.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
                        {i>0&&<span style={{ color:C.textTer }}>→</span>}
                        <span onClick={()=>setDetail(a.id)} style={{ cursor:"pointer", color:C.purple, fontWeight:500, textDecoration:"underline" }}>{a.name}</span>
                        <Pill text={a.result}/>
                      </span>
                    ))}
                    {ancestors.length>0&&<span style={{ color:C.textTer }}>→</span>}
                    <span style={{ fontWeight:700, color:C.text }}>{db.name}</span><Pill text={db.result}/>
                    {children.map(c=>(
                      <span key={c.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <span style={{ color:C.textTer }}>→</span>
                        <span onClick={()=>setDetail(c.id)} style={{ cursor:"pointer", color:C.purple, fontWeight:500, textDecoration:"underline" }}>{c.name}</span>
                        <Pill text={c.result}/>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
            {/* Angle banner */}
            {db.angle&&<div style={{ background:C.bg, borderRadius:10, padding:"14px 18px", marginBottom:20 }}><span style={{ fontSize:11, fontWeight:600, color:C.textTer, textTransform:"uppercase", letterSpacing:"0.05em" }}>Angle</span><div style={{ fontSize:16, fontWeight:700, marginTop:4 }}>{db.angle}</div></div>}
            {/* GET/WHO/TO/BY */}
            <div style={{ border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden", marginBottom:20 }}>
              <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr", background:C.purple, color:"#fff", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                <span style={{ padding:"10px 14px" }}>Element</span><span style={{ padding:"10px 14px" }}>What It Is</span><span style={{ padding:"10px 14px" }}>Details</span>
              </div>
              {[{k:"GET",c:"#e17055",t:"The Person",v:db.get},{k:"WHO",c:C.orange,t:"The Pain",v:db.who},{k:"TO",c:C.green,t:"The Promise",v:db.to},{k:"BY",c:C.purple,t:"The Proof",v:db.by}].map(x=>(
                <div key={x.k} style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr", borderBottom:`1px solid ${C.borderLight}` }}>
                  <span style={{ padding:"12px 14px", fontWeight:800, color:x.c, fontSize:14 }}>{x.k}</span>
                  <span style={{ padding:"12px 14px", fontSize:13, fontWeight:600, color:C.text }}>{x.t}</span>
                  <span style={{ padding:"12px 14px", fontSize:13, color:C.textSec }}>{x.v||""}</span>
                </div>
              ))}
            </div>
            {/* Purchase Trigger */}
            {db.purchaseTrigger&&<div style={{ background:C.yellowBg, borderRadius:8, padding:"12px 16px", marginBottom:16, border:`1px solid #f0e6c0` }}><div style={{ fontSize:11, fontWeight:600, color:C.yellowText, marginBottom:4 }}>PURCHASE TRIGGER</div><div style={{ fontSize:14, color:C.text, fontStyle:"italic" }}>"{db.purchaseTrigger}"</div></div>}
            {/* Awareness + Sophistication */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
              <div style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 16px" }}><div style={{ fontSize:11, fontWeight:600, color:C.textTer, textTransform:"uppercase", marginBottom:4 }}>Awareness Level</div><div style={{ fontSize:14, fontWeight:500 }}>{db.awareness}</div></div>
              <div style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 16px" }}><div style={{ fontSize:11, fontWeight:600, color:C.textTer, textTransform:"uppercase", marginBottom:4 }}>Sophistication Level</div><div style={{ fontSize:14, fontWeight:500 }}>{db.sophistication}</div></div>
            </div>
            {/* Belief Shift */}
            {(db.beliefBefore||db.beliefAfter)&&(
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10 }}>The Belief Shift</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderRadius:8, overflow:"hidden", border:`1px solid ${C.border}` }}>
                  <div style={{ background:C.redBg, padding:"10px 14px" }}><div style={{ fontSize:11, fontWeight:700, color:C.redText, marginBottom:4 }}>✗ BEFORE AD</div><div style={{ fontSize:13, color:C.text }}>{db.beliefBefore||""}</div></div>
                  <div style={{ background:C.greenBg, padding:"10px 14px" }}><div style={{ fontSize:11, fontWeight:700, color:C.greenText, marginBottom:4 }}>✓ AFTER AD</div><div style={{ fontSize:13, color:C.text }}>{db.beliefAfter||""}</div></div>
                </div>
              </div>
            )}
            {/* Hypothesis */}
            {db.hypothesis&&<div style={{ background:C.purpleSoft, borderLeft:`3px solid ${C.purple}`, borderRadius:"0 8px 8px 0", padding:"14px 18px", marginBottom:16 }}><div style={{ fontSize:11, fontWeight:600, color:C.purple, marginBottom:4 }}>HYPOTHESIS</div><div style={{ fontSize:14, lineHeight:1.5 }}>{db.hypothesis}</div></div>}
            {/* Script */}
            {db.script&&<div style={{ background:C.bg, borderRadius:8, padding:"14px 18px" }}><div style={{ fontSize:11, fontWeight:600, color:C.textTer, marginBottom:4 }}>SCRIPT</div><div style={{ fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{db.script}</div></div>}
          </Card>
        </div>
      )}

      {/* ════ BATCHES ════ */}
      {tab==="batches"&&(<div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {showForm&&(
          <Card style={{ padding:28, boxShadow:C.shadowMd }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ fontSize:17, fontWeight:700, margin:0 }}>{editId?"Edit Creative Brief":"New Creative Brief"}</h3>
              <button onClick={()=>{setShowForm(false);setEditId(null);setForm({...empty});}} style={{ background:"none", border:"none", color:C.textTer, cursor:"pointer", fontSize:20 }}>×</button>
            </div>
            {/* Row 1 */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:12, marginBottom:12 }}>
              <Inp label="Batch Name" value={form.name} onChange={v=>f("name",v)} ph="Batch #..."/>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.textSec }}>Launch Date</label>
                <input type="date" value={form.date} onChange={e=>f("date",e.target.value)} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, cursor:"pointer" }}/>
              </div>
              <Sel label="Creative Type" value={form.type} onChange={v=>f("type",v)} opts={TYPES}/>
              <Sel label="Brief Type" value={form.isNew} onChange={v=>f("isNew",v)} opts={["Ideation","Iteration","Variation"]}/>
            </div>
            {/* Angle + Origin */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
              <Inp label="Angle" value={form.angle} onChange={v=>f("angle",v)} ph="The creative angle / hook name..."/>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.textSec }}>Origin</label>
                <select value={ORIGINS.includes(form.origin)?form.origin:""} onChange={e=>f("origin",e.target.value)} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, appearance:"none", cursor:"pointer", backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239e9eb8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center" }}>
                  <option value="">Select...</option>
                  {ORIGINS.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
                <input value={!ORIGINS.includes(form.origin)?form.origin:""} onChange={e=>f("origin",e.target.value)} placeholder="Or type custom origin..." style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px", fontSize:12, color:C.text, outline:"none", background:C.white }} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=C.border}/>
              </div>
            </div>
            {/* GET/WHO/TO/BY */}
            <div style={{ border:`1px solid ${C.border}`, borderRadius:10, padding:16, marginBottom:12, background:C.bg }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.textSec, marginBottom:10 }}>CREATIVE BRIEF - GET · WHO · TO · BY</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Inp label={<><span style={{ color:"#e17055", fontWeight:800 }}>GET</span> - The Person (audience segment)</>} value={form.get} onChange={v=>f("get",v)} ph="The specific audience segment you are targeting..." area/>
                <Inp label={<><span style={{ color:C.orange, fontWeight:800 }}>WHO</span> - The Pain (problem/symptom/emotion)</>} value={form.who} onChange={v=>f("who",v)} ph="The specific problem, symptom, or emotion they suffer from..." area/>
                <Inp label={<><span style={{ color:C.green, fontWeight:800 }}>TO</span> - The Promise (desire)</>} value={form.to} onChange={v=>f("to",v)} ph="The specific desire they want that we promised..." area/>
                <Inp label={<><span style={{ color:C.purple, fontWeight:800 }}>BY</span> - The Proof (mechanism/method)</>} value={form.by} onChange={v=>f("by",v)} ph="The unique mechanism or method your product uses..." area/>
              </div>
            </div>
            {/* Purchase Trigger */}
            <Inp label="Purchase Trigger" value={form.purchaseTrigger} onChange={v=>f("purchaseTrigger",v)} ph='"Quote them the exact purchase trigger"' style={{ marginBottom:12 }}/>
            {/* Awareness + Sophistication */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
              <Sel label="Awareness Level" value={form.awareness} onChange={v=>f("awareness",v)} opts={AWARENESS}/>
              <Sel label="Sophistication Level" value={form.sophistication} onChange={v=>f("sophistication",v)} opts={SOPHISTICATION}/>
            </div>
            {/* Belief Shift */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
              <Inp label="Belief BEFORE Ad" value={form.beliefBefore} onChange={v=>f("beliefBefore",v)} ph="Current belief the prospect holds..." area/>
              <Inp label="Belief AFTER Ad" value={form.beliefAfter} onChange={v=>f("beliefAfter",v)} ph="New belief the ad moves them to..." area/>
            </div>
            {/* Hypothesis */}
            <Inp label="Hypothesis" value={form.hypothesis} onChange={v=>f("hypothesis",v)} ph="What are you testing? Why do you believe this will work?" area style={{ marginBottom:12 }}/>
            {/* Script */}
            <Inp label="Script" value={form.script} onChange={v=>f("script",v)} ph="Ad script / copy..." area style={{ marginBottom:12 }}/>
            {/* Status + Parent Batch */}
            <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:12, marginBottom:20 }}>
              <Sel label="Status" value={form.status} onChange={v=>f("status",v)} opts={STATUSES}/>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.textSec }}>Iteration Of</label>
                <select value={form.parentId||""} onChange={e=>f("parentId",e.target.value)} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, appearance:"none", cursor:"pointer", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"100%" }}>
                  <option value="">None (original concept)</option>
                  {batches.filter(b=>b.id!==editId&&(b.result==="Winning Ad"||b.result==="Losing Ad")).map(b=><option key={b.id} value={b.id}>{b.name} - {(b.angle||"").slice(0,30)}</option>)}
                </select>
              </div>
            </div>
            {/* Iteration chain preview */}
            {form.parentId&&(()=>{
              const chain=[];
              let cur=form.parentId;
              while(cur&&chain.length<10){const p=batches.find(b=>b.id===cur);if(!p)break;chain.unshift(p);cur=p.parentId;}
              if(chain.length===0) return null;
              return <div style={{ marginBottom:16, padding:"10px 14px", background:C.purpleSoft, borderRadius:8, fontSize:12, color:C.purple, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                <span style={{ fontWeight:600 }}>Chain:</span>
                {chain.map((c,i)=><span key={c.id} style={{ display:"flex", alignItems:"center", gap:4 }}>{i>0&&<span style={{ color:C.textTer }}>→</span>}<span style={{ fontWeight:500 }}>{c.name}</span><Pill text={c.result}/></span>)}
                <span style={{ color:C.textTer }}>→</span><span style={{ fontWeight:600 }}>{form.name||"This batch"}</span>
              </div>;
            })()}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <button onClick={submit} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"10px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>{editId?"Update Brief":"Publish Brief"}</button>
              {editId&&<button onClick={()=>duplicateBatch(batches.find(b=>b.id===editId))} style={{ background:C.white, color:C.purple, border:`1px solid ${C.purple}`, borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Duplicate</button>}
              {editId&&<button onClick={()=>{
                setShowForm(false);
                setTab("feedback");
                setLoopForm({...emptyLoop, batchId:editId});
                setEditLoop(null);
                setShowLoop(true);
              }} style={{ background:C.white, color:"#e17055", border:"1px solid #e17055", borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Do Feedback Loop</button>}
              {editId&&<button onClick={()=>{save(batches.filter(b=>b.id!==editId));setShowForm(false);setEditId(null);setForm({...empty});}} style={{ background:C.redBg, color:C.redText, border:"none", borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Delete</button>}
            </div>
          </Card>
        )}

        {/* Drill-down banner */}
        {drill&&(
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", background:C.purpleSoft, borderRadius:10, border:`1px solid ${C.purpleBg}` }}>
            <span style={{ fontSize:13, color:C.purple, fontWeight:600 }}>Showing: {drill.label}</span>
            <span style={{ fontSize:12, color:C.textTer }}>{filtered.length} batches</span>
            <button onClick={()=>setDrill(null)} style={{ marginLeft:"auto", background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:"4px 12px", fontSize:12, color:C.textSec, cursor:"pointer" }}>Clear Filter ✕</button>
          </div>
        )}

        {/* Filters */}
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          {!showForm&&<button onClick={()=>{setShowForm(true);setEditId(null);setForm({...empty,name:`Batch #${nextBatchNum()}`,date:new Date().toISOString().split("T")[0]});}} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer" }}>+ New Brief</button>}
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search batches..." style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"7px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, width:180 }} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=C.border}/>
          <div style={{ width:1, height:24, background:C.border }}/>
          {["All",...STATUSES].map(x=><Chip key={x} label={x} active={fS===x} onClick={()=>setFS(x)}/>)}
          <div style={{ width:1, height:24, background:C.border }}/>
          <Chip label="All Results" active={fR==="All"} onClick={()=>setFR("All")}/>
          <Chip label="Winners" active={fR==="Winning Ad"} onClick={()=>setFR("Winning Ad")} color={C.green}/>
          <Chip label="Losers" active={fR==="Losing Ad"} onClick={()=>setFR("Losing Ad")} color={C.red}/>
          <Chip label="Awaiting" active={fR==="Data Awaiting"} onClick={()=>setFR("Data Awaiting")} color={C.yellow}/>
          <span style={{ marginLeft:"auto", fontSize:12, color:C.textTer }}>{filtered.length} batches</span>
          {/* View toggle */}
          <div style={{ display:"flex", gap:2, background:C.bg, borderRadius:8, padding:3 }}>
            {["table","cards"].map(v=><button key={v} onClick={()=>setViewMode(v)} style={{ padding:"5px 12px", borderRadius:6, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:viewMode===v?C.white:"transparent", color:viewMode===v?C.text:C.textTer, boxShadow:viewMode===v?C.shadowMd:"none" }}>{v==="table"?"Table":"Cards"}</button>)}
          </div>
        </div>

        {/* Selection action bar */}
        {selectedBatches.size>0&&(
          <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", background:C.purpleSoft, borderRadius:10, border:`1px solid ${C.purpleBg}` }}>
            <span style={{ fontSize:13, fontWeight:600, color:C.purple }}>{selectedBatches.size} selected</span>
            <button onClick={()=>{save(batches.filter(b=>!selectedBatches.has(b.id)));setSelectedBatches(new Set());}} style={{ background:C.redBg, color:C.redText, border:"none", borderRadius:8, padding:"6px 16px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Delete Selected</button>
            <button onClick={()=>setSelectedBatches(new Set())} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 16px", fontSize:13, color:C.textSec, cursor:"pointer" }}>Cancel</button>
          </div>
        )}

        {/* Table view */}
        {viewMode==="table"&&(
          <Card style={{ overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"32px 100px 68px 68px 100px 1fr 100px 100px 120px", gap:6, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, fontSize:11, color:C.textTer, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>
              <span></span>
              {[{k:"name",l:"Name"},{k:"date",l:"Date"},{k:"type",l:"Type"},{k:"isNew",l:"New/Iter"},{k:"angle",l:"Angle"},{k:"awareness",l:"Awareness"},{k:"status",l:"Status"},{k:"result",l:"Result"}].map(h=>(
                <span key={h.k} onClick={()=>toggleSort(h.k)} style={{ cursor:"pointer", userSelect:"none", display:"flex", alignItems:"center", gap:3 }}>
                  {h.l}{sortCol===h.k&&<span style={{ fontSize:9 }}>{sortDir==="asc"?"▲":"▼"}</span>}
                </span>
              ))}
            </div>
            <div style={{ maxHeight:520, overflowY:"auto" }}>
              {filtered.map((b,idx)=>{
                const isSelected = selectedBatches.has(b.id);
                return (
                <div key={b.id} style={{ display:"grid", gridTemplateColumns:"32px 100px 68px 68px 100px 1fr 100px 100px 120px", gap:6, padding:"10px 16px", alignItems:"center", fontSize:13, borderBottom:`1px solid ${C.borderLight}`, transition:"background 0.1s", background:isSelected?C.purpleSoft:"transparent" }} onMouseEnter={e=>{if(!isSelected)e.currentTarget.style.background=C.bg}} onMouseLeave={e=>{if(!isSelected)e.currentTarget.style.background=isSelected?C.purpleSoft:"transparent"}}>
                  {/* Checkbox */}
                  <div onClick={(e)=>{
                    const newSet = new Set(selectedBatches);
                    if(e.shiftKey && lastSelected!==null) {
                      const start = filtered.findIndex(x=>x.id===lastSelected);
                      const end = idx;
                      const [from,to] = start<end?[start,end]:[end,start];
                      for(let i=from;i<=to;i++) newSet.add(filtered[i].id);
                    } else {
                      if(newSet.has(b.id)) newSet.delete(b.id); else newSet.add(b.id);
                    }
                    setSelectedBatches(newSet);
                    setLastSelected(b.id);
                  }} style={{ width:18, height:18, borderRadius:4, border:`2px solid ${isSelected?C.purple:C.border}`, background:isSelected?C.purple:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {isSelected&&<span style={{ color:"#fff", fontSize:11, fontWeight:700 }}>✓</span>}
                  </div>
                  <span style={{ fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }} onClick={()=>openEdit(b)}>{b.name}{loops.some(l=>l.batchId===b.id&&l.completed)&&<span style={{ width:14, height:14, borderRadius:"50%", background:C.purple, color:"#fff", fontSize:8, fontWeight:800, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }} title="Feedback loop completed">↻</span>}</span>
                  <span style={{ fontSize:12, color:C.textTer }}>{b.date?b.date.slice(5):""}</span>
                  <Pill text={b.type}/><Pill text={b.isNew}/>
                  <span style={{ color:C.textSec, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", cursor:"pointer" }} onClick={()=>openEdit(b)}>{b.angle||""}</span>
                  <span style={{ fontSize:11, color:C.textSec }}>{b.awareness}</span>
                  {/* Inline Status Picker */}
                  <div style={{ position:"relative" }}>
                    <div onClick={(e)=>{e.stopPropagation();setStatusPicker(statusPicker===b.id?null:b.id);setResultPicker(null);}} style={{ cursor:"pointer" }}>
                      <Pill text={b.status}/>
                    </div>
                    {statusPicker===b.id&&(
                      <div style={{ position:"absolute", top:"100%", right:0, zIndex:50, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:6, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:160, marginTop:4 }}>
                        {STATUSES.map(s=>(
                          <div key={s} onClick={(e)=>{e.stopPropagation();save(batches.map(x=>x.id===b.id?{...x,status:s}:x));setStatusPicker(null);}} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:6, cursor:"pointer", fontSize:13, background:b.status===s?C.purpleSoft:"transparent" }}
                            onMouseEnter={e=>e.currentTarget.style.background=b.status===s?C.purpleSoft:C.bg}
                            onMouseLeave={e=>e.currentTarget.style.background=b.status===s?C.purpleSoft:"transparent"}>
                            <Pill text={s}/>{b.status===s&&<span style={{ fontSize:14, color:C.purple }}>✓</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Inline Result Picker */}
                  <div style={{ position:"relative" }}>
                    <div onClick={(e)=>{e.stopPropagation();setResultPicker(resultPicker===b.id?null:b.id);setStatusPicker(null);}} style={{ cursor:"pointer" }}>
                      <Pill text={b.result}/>
                    </div>
                    {resultPicker===b.id&&(
                      <div style={{ position:"absolute", top:"100%", right:0, zIndex:50, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:6, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:160, marginTop:4 }}>
                        {RESULTS.map(r=>(
                          <div key={r} onClick={(e)=>{e.stopPropagation();setResult(b.id,r);}} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:6, cursor:"pointer", fontSize:13, transition:"background 0.1s", background:b.result===r?C.purpleSoft:"transparent" }}
                            onMouseEnter={e=>e.currentTarget.style.background=b.result===r?C.purpleSoft:C.bg}
                            onMouseLeave={e=>e.currentTarget.style.background=b.result===r?C.purpleSoft:"transparent"}>
                            <Pill text={r}/>{b.result===r&&<span style={{ fontSize:14, color:C.purple }}>✓</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </Card>
        )}
        {/* Card view */}
        {viewMode==="cards"&&(
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {filtered.map(b=><BriefCard key={b.id} b={b} onEdit={openEdit} onSetResult={setResult} onSetStatus={(id,s)=>save(batches.map(x=>x.id===id?{...x,status:s}:x))} resultPicker={resultPicker} setResultPicker={setResultPicker} statusPicker={statusPicker} setStatusPicker={setStatusPicker} loops={loops}/>)}
          </div>
        )}
      </div>)}

      {/* ════ FEEDBACK LOOP ════ */}
      {tab==="feedback"&&(<div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, margin:0 }}>Feedback Loop</h2>
            <p style={{ fontSize:13, color:C.textSec, margin:"4px 0 0" }}>Process feedback loops to learn from the outcome of previous creatives.</p>
          </div>
          {!showLoop&&<button onClick={()=>{setShowLoop(true);setEditLoop(null);setLoopForm({...emptyLoop});}} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>+ New Feedback Loop</button>}
        </div>

        {/* Feedback Loop Form */}
        {showLoop&&(
          <Card style={{ padding:28, boxShadow:C.shadowMd }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ fontSize:17, fontWeight:700, margin:0 }}>{editLoop?"Edit Feedback Loop":"New Feedback Loop"}</h3>
              <button onClick={()=>{setShowLoop(false);setEditLoop(null);setLoopForm({...emptyLoop});}} style={{ background:"none", border:"none", color:C.textTer, cursor:"pointer", fontSize:20 }}>×</button>
            </div>

            {/* Select Batch */}
            {(()=>{
              const selBatch = loopForm.batchId ? batches.find(b=>b.id===loopForm.batchId) : null;
              const isStatic = selBatch && (selBatch.type==="Static"||selBatch.type==="Carousel");
              return (<>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:C.textSec, display:"block", marginBottom:5 }}>Select Batch</label>
                  <select value={loopForm.batchId} onChange={e=>lf("batchId",e.target.value)} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, appearance:"none", cursor:"pointer", boxSizing:"border-box" }}>
                    <option value="">Choose a batch...</option>
                    {batches.map(b=><option key={b.id} value={b.id}>{b.name} - {b.angle||b.hypothesis||"No angle"} ({b.result})</option>)}
                  </select>
                </div>

                {/* Ad creative - image upload for statics, link for videos */}
                {isStatic?(
                  <div style={{ marginBottom:16 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.textSec, display:"block", marginBottom:5 }}>Upload Static Creative</label>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <label style={{ flex:1, border:`1px dashed ${loopForm.imageData?C.purple:C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:loopForm.imageData?C.purple:C.textTer, cursor:"pointer", textAlign:"center", background:loopForm.imageData?C.purpleSoft:C.white, fontWeight:loopForm.imageData?600:400 }}>
                        {loopForm.imageData?"✓ Image uploaded - click to replace":"Choose image (JPG, PNG, WebP)"}
                        <input type="file" accept="image/*,.jpg,.jpeg,.png,.webp,.gif" style={{ display:"none" }} onChange={e=>{
                          const file=e.target.files?.[0];
                          if(!file||file.size>5*1024*1024) { if(file?.size>5*1024*1024) alert("Image must be under 5MB"); return; }
                          const reader=new FileReader();
                          reader.onload=()=>setLoopForm(prev=>({...prev, imageData:reader.result}));
                          reader.readAsDataURL(file);
                        }}/>
                      </label>
                      {loopForm.imageData&&<button onClick={()=>lf("imageData","")} style={{ background:C.redBg, color:C.redText, border:"none", borderRadius:6, padding:"8px 10px", fontSize:12, cursor:"pointer", fontWeight:600 }}>✕</button>}
                    </div>
                  </div>
                ):(
                  <Inp label="Facebook / Ad Link" value={loopForm.videoLink} onChange={v=>lf("videoLink",v)} ph="https://www.facebook.com/reel/..." style={{ marginBottom:16 }}/>
                )}

                {/* Image preview for statics */}
                {isStatic&&loopForm.imageData&&(
                  <div style={{ marginBottom:16, borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}`, display:"flex", justifyContent:"center", background:C.bg }}>
                    <img src={loopForm.imageData} style={{ maxHeight:300, maxWidth:"100%", objectFit:"contain", borderRadius:10 }} alt="Static creative"/>
                  </div>
                )}

                {/* Optional link for statics */}
                {isStatic&&<Inp label="Ad Link (optional)" value={loopForm.videoLink} onChange={v=>lf("videoLink",v)} ph="https://www.facebook.com/..." style={{ marginBottom:16 }}/>}

                {/* Link preview for videos */}
                {!isStatic&&loopForm.videoLink&&(
                  <a href={loopForm.videoLink} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:16, padding:"16px 20px", marginBottom:16, borderRadius:10, border:`1px solid ${C.border}`, background:C.bg, textDecoration:"none" }}>
                    <div style={{ width:48, height:48, borderRadius:10, background:`linear-gradient(135deg, ${C.purple}, #8b7cf7)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:20, color:"#fff" }}>▶</span>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:C.text }}>Watch Ad Creative</div>
                      <div style={{ fontSize:12, color:C.purple, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{loopForm.videoLink}</div>
                    </div>
                    <span style={{ fontSize:12, fontWeight:600, color:C.purple }}>Open ↗</span>
                  </a>
                )}
              </>);
            })()}

            {/* Show selected batch info */}
            {loopForm.batchId&&(()=>{
              const sb=batches.find(b=>b.id===loopForm.batchId);
              if(!sb) return null;
              return (
                <div style={{ background:C.bg, borderRadius:10, padding:16, marginBottom:16 }}>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>{sb.name} - {sb.angle}</div>
                  {/* Result - click to change */}
                  <div style={{ display:"flex", gap:6, marginBottom:12, position:"relative" }}>
                    <Pill text={sb.type}/><Pill text={sb.isNew}/>
                    <div style={{ position:"relative" }}>
                      <div onClick={()=>setResultPicker(resultPicker===sb.id?null:sb.id)} style={{ cursor:"pointer" }}><Pill text={sb.result}/></div>
                      {resultPicker===sb.id&&(
                        <div style={{ position:"absolute", top:"100%", left:0, zIndex:50, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:6, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", minWidth:160, marginTop:4 }}>
                          {["Winning Ad","Losing Ad","Data Awaiting"].map(r=>(
                            <div key={r} onClick={()=>{save(batches.map(b=>b.id===sb.id?{...b,result:r}:b));setResultPicker(null);}} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:6, cursor:"pointer", fontSize:13, background:sb.result===r?C.purpleSoft:"transparent" }}
                              onMouseEnter={e=>{if(sb.result!==r)e.currentTarget.style.background=C.bg}} onMouseLeave={e=>{if(sb.result!==r)e.currentTarget.style.background="transparent"}}>
                              <Pill text={r}/>{sb.result===r&&<span style={{ fontSize:14, color:C.purple }}>✓</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, fontSize:12 }}>
                    <div><span style={{ color:"#e17055", fontWeight:800 }}>GET</span> <span style={{ color:C.textSec }}>{sb.get||""}</span></div>
                    <div><span style={{ color:C.orange, fontWeight:800 }}>WHO</span> <span style={{ color:C.textSec }}>{sb.who||""}</span></div>
                    <div><span style={{ color:C.green, fontWeight:800 }}>TO</span> <span style={{ color:C.textSec }}>{sb.to||""}</span></div>
                    <div><span style={{ color:C.purple, fontWeight:800 }}>BY</span> <span style={{ color:C.textSec }}>{sb.by||""}</span></div>
                  </div>
                </div>
              );
            })()}

            {/* Step 1: Hypothesis */}
            <div style={{ border:`1px solid ${C.border}`, borderRadius:10, padding:20, marginBottom:16, background:C.white }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <span style={{ background:C.redBg, color:C.redText, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>Step 1</span>
                <span style={{ fontSize:15, fontWeight:700, color:C.redText }}>Hypothesis</span>
              </div>
              <div style={{ fontSize:13, color:C.textSec, marginBottom:12, fontWeight:500 }}>Why Do You Think This Worked / Or Failed? <span style={{ fontStyle:"italic", color:C.textTer }}>(Ranked most confident to least)</span></div>
              <textarea value={loopForm.hypothesisWhy} onChange={e=>lf("hypothesisWhy",e.target.value)} placeholder={"- Mechanism too weak\n- Voiceover too slow\n- No guarantee / weak CTA\n- Hook didn't stop scroll\n- Unbelievable UMS"} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 14px", fontSize:13, color:C.text, outline:"none", background:C.white, fontFamily:"inherit", width:"100%", boxSizing:"border-box", resize:"vertical", minHeight:120, lineHeight:1.6 }} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>

            {/* Step 2: Action */}
            <div style={{ border:`1px solid ${C.border}`, borderRadius:10, padding:20, marginBottom:16, background:C.white }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <span style={{ background:C.purpleBg, color:C.purple, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>Step 2</span>
                <span style={{ fontSize:15, fontWeight:700, color:C.purple }}>Action</span>
              </div>
              <div style={{ fontSize:13, color:C.textSec, marginBottom:12, fontWeight:500 }}>What am I going to do differently as a result of this NEW information? <span style={{ fontStyle:"italic", color:C.textTer }}>(Ranked most confident to least)</span></div>
              <textarea value={loopForm.actionPlan} onChange={e=>lf("actionPlan",e.target.value)} placeholder={"- Test a short version\n- Better hooks\n- Short mechanism\n- Stronger CTA with guarantee"} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 14px", fontSize:13, color:C.text, outline:"none", background:C.white, fontFamily:"inherit", width:"100%", boxSizing:"border-box", resize:"vertical", minHeight:120, lineHeight:1.6 }} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={submitLoop} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"10px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>{editLoop?"Update Feedback Loop":"Save Feedback Loop"}</button>
              {editLoop&&<button onClick={()=>{saveLoops(loops.filter(l=>l.id!==editLoop));setShowLoop(false);setEditLoop(null);setLoopForm({...emptyLoop});}} style={{ background:C.redBg, color:C.redText, border:"none", borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Delete</button>}
            </div>
          </Card>
        )}

        {/* Feedback Loops List */}
        {loops.length===0&&!showLoop&&(
          <Card style={{ padding:40, display:"flex", flexDirection:"column", alignItems:"center", gap:12, textAlign:"center" }}>
            <div style={{ width:48, height:48, borderRadius:12, background:C.purpleBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>↻</div>
            <div style={{ fontSize:15, fontWeight:600 }}>No feedback loops yet</div>
            <div style={{ fontSize:13, color:C.textSec }}>Create a feedback loop to learn from your winning and losing ads.</div>
          </Card>
        )}

        {loops.length>0&&(
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {/* In Progress */}
            {loops.filter(l=>!l.completed).length>0&&(
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:C.textSec, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>In Progress</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
                  {loops.filter(l=>!l.completed).sort((a,b)=>{const da=a.createdAt||"",db2=b.createdAt||"";return db2.localeCompare(da);}).map(l=>{
                    const sb=batches.find(b=>b.id===l.batchId);
                    const isWin=sb?.result==="Winning Ad";
                    const headerBg=isWin?"linear-gradient(135deg, #e8f5e9, #c8e6c9)":sb?.result==="Losing Ad"?"linear-gradient(135deg, #fce4ec, #f8bbd0)":"linear-gradient(135deg, #fff8e1, #ffecb3)";
                    return (
                      <Card key={l.id} style={{ overflow:"hidden", display:"flex", flexDirection:"column" }}>
                        {/* Ad Preview Header */}
                        <div style={{ position:"relative", overflow:"hidden" }}>
                          {l.imageData?(
                            <div style={{ position:"relative" }}>
                              <img src={l.imageData} style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} alt=""/>
                              <div style={{ position:"absolute", bottom:8, left:8, display:"flex", gap:4 }}>
                                {sb&&<span style={{ background:"rgba(0,0,0,0.6)", color:"#fff", padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:600 }}>{sb.type}</span>}
                                <span style={{ background:isWin?"rgba(0,184,148,0.9)":"rgba(255,107,107,0.9)", color:"#fff", padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:600 }}>{isWin?"Winner":"Loser"}</span>
                              </div>
                            </div>
                          ):l.videoLink?(
                            <a href={l.videoLink} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:headerBg, textDecoration:"none" }}>
                              <div style={{ width:44, height:44, borderRadius:8, background:`linear-gradient(135deg, ${C.purple}, #8b7cf7)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                <span style={{ fontSize:18, color:"#fff" }}>▶</span>
                              </div>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ fontSize:12, fontWeight:600, color:C.text }}>Watch Ad</div>
                                <div style={{ fontSize:11, color:C.purple, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.videoLink.replace("https://www.","").slice(0,40)}</div>
                              </div>
                              <div style={{ display:"flex", gap:4 }}>
                                {sb&&<span style={{ background:"rgba(0,0,0,0.1)", padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:600, color:C.text }}>{sb.type}</span>}
                                <span style={{ background:isWin?C.greenBg:C.redBg, padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:600, color:isWin?C.greenText:C.redText }}>{isWin?"Winner":"Loser"}</span>
                              </div>
                            </a>
                          ):(
                            <div style={{ background:headerBg, height:60, display:"flex", alignItems:"center", padding:"0 16px", gap:8 }}>
                              {sb&&<><span style={{ fontSize:11, fontWeight:600, color:C.text, opacity:0.7 }}>{sb.type}</span><span style={{ fontSize:11, fontWeight:600, color:isWin?C.greenText:C.redText }}>{isWin?"Winner":"Loser"}</span></>}
                            </div>
                          )}
                        </div>
                        {/* Body */}
                        <div style={{ padding:"16px 16px 12px", flex:1, display:"flex", flexDirection:"column" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:2 }}>
                            <div style={{ fontSize:15, fontWeight:700 }}>{sb?sb.name:"Unknown"}</div>
                            <span style={{ fontSize:11, color:C.textTer, whiteSpace:"nowrap" }}>{(()=>{
                              const d=l.createdAt||sb?.date;if(!d)return"";
                              const today=new Date().toISOString().split("T")[0];
                              const yest=new Date(Date.now()-86400000).toISOString().split("T")[0];
                              if(d===today)return"Today";if(d===yest)return"Yesterday";return d.slice(5);
                            })()}</span>
                          </div>
                          {sb?.angle&&<div style={{ fontSize:12, color:C.textSec, marginBottom:10 }}>{sb.angle}</div>}
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                            <span style={{ background:C.purpleBg, color:C.purple, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>Learnings {sb?sb.name:""}</span>
                          </div>
                          {/* Hypothesis preview */}
                          <div style={{ fontSize:12, color:C.textSec, marginBottom:6 }}>
                            <span style={{ fontWeight:600, color:C.redText }}>Why: </span>
                            <span style={{ lineHeight:1.5 }}>{l.hypothesisWhy?l.hypothesisWhy.split("\n").slice(0,2).join(", ").slice(0,80)+(l.hypothesisWhy.length>80?"...":""):""}</span>
                          </div>
                          <div style={{ fontSize:12, color:C.textSec, marginBottom:12 }}>
                            <span style={{ fontWeight:600, color:C.purple }}>Action: </span>
                            <span style={{ lineHeight:1.5 }}>{l.actionPlan?l.actionPlan.split("\n").slice(0,2).join(", ").slice(0,80)+(l.actionPlan.length>80?"...":""):""}</span>
                          </div>
                          <div style={{ marginTop:"auto", display:"flex", gap:8, borderTop:`1px solid ${C.borderLight}`, paddingTop:12 }}>
                            <button onClick={()=>openEditLoop(l)} style={{ flex:1, background:C.purpleSoft, color:C.purple, border:"none", borderRadius:8, padding:"8px 0", fontSize:12, fontWeight:600, cursor:"pointer" }}>Edit</button>
                            <button onClick={()=>completeLoop(l.id)} style={{ flex:1, background:C.green, color:"#fff", border:"none", borderRadius:8, padding:"8px 0", fontSize:12, fontWeight:600, cursor:"pointer" }}>✓ Complete</button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Completed */}
            {loops.filter(l=>l.completed).length>0&&(
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:C.textSec, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.05em" }}>Completed Feedback Loops</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
                  {loops.filter(l=>l.completed).sort((a,b)=>{const da=a.createdAt||"",db2=b.createdAt||"";return db2.localeCompare(da);}).map(l=>{
                    const sb=batches.find(b=>b.id===l.batchId);
                    return (
                      <Card key={l.id} style={{ overflow:"hidden", opacity:0.85 }}>
                        {/* Header */}
                        <div style={{ position:"relative", overflow:"hidden" }}>
                          {l.imageData?(
                            <div style={{ position:"relative" }}>
                              <img src={l.imageData} style={{ width:"100%", height:150, objectFit:"cover", display:"block", opacity:0.85 }} alt=""/>
                              <span style={{ position:"absolute", top:8, left:8, background:C.greenBg, color:C.greenText, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>✓ Done</span>
                            </div>
                          ):l.videoLink?(
                            <a href={l.videoLink} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"linear-gradient(135deg, #e8eaf6, #c5cae9)", textDecoration:"none" }}>
                              <div style={{ width:36, height:36, borderRadius:8, background:`linear-gradient(135deg, ${C.purple}, #8b7cf7)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                <span style={{ fontSize:14, color:"#fff" }}>▶</span>
                              </div>
                              <div style={{ flex:1 }}><div style={{ fontSize:11, fontWeight:600, color:C.text }}>Watch Ad</div></div>
                              <span style={{ background:C.greenBg, color:C.greenText, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>✓ Done</span>
                            </a>
                          ):(
                            <div style={{ background:"linear-gradient(135deg, #e8eaf6, #c5cae9)", height:48, display:"flex", alignItems:"center", padding:"0 16px", gap:10 }}>
                              <span style={{ background:C.greenBg, color:C.greenText, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>✓ Done</span>
                              {sb&&<span style={{ fontSize:11, color:C.textSec }}>{sb.type}</span>}
                            </div>
                          )}
                        </div>
                        <div style={{ padding:16 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:2 }}>
                            <div style={{ fontSize:15, fontWeight:700 }}>{sb?sb.name:"Unknown"}</div>
                            <span style={{ fontSize:11, color:C.textTer, whiteSpace:"nowrap" }}>{(()=>{
                              const d=l.createdAt||sb?.date;if(!d)return"";
                              const today=new Date().toISOString().split("T")[0];
                              const yest=new Date(Date.now()-86400000).toISOString().split("T")[0];
                              if(d===today)return"Today";if(d===yest)return"Yesterday";return d.slice(5);
                            })()}</span>
                          </div>
                          {sb?.angle&&<div style={{ fontSize:12, color:C.textSec, marginBottom:8 }}>{sb.angle}</div>}
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10, flexWrap:"wrap" }}>
                            {sb&&<Pill text={sb.result}/>}
                            <span style={{ background:C.purpleBg, color:C.purple, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>Learnings {sb?sb.name:""}</span>
                          </div>
                          <div style={{ fontSize:12, color:C.textSec, lineHeight:1.5 }}>
                            <span style={{ fontWeight:600 }}>Hypothesis: </span>{l.hypothesisWhy?l.hypothesisWhy.slice(0,100)+(l.hypothesisWhy.length>100?"...":""):""}
                          </div>
                          <div style={{ fontSize:12, color:C.textSec, lineHeight:1.5, marginTop:4 }}>
                            <span style={{ fontWeight:600 }}>Action: </span>{l.actionPlan?l.actionPlan.slice(0,100)+(l.actionPlan.length>100?"...":""):""}
                          </div>
                          <div style={{ borderTop:`1px solid ${C.borderLight}`, paddingTop:10, marginTop:10 }}>
                            <button onClick={()=>openEditLoop(l)} style={{ width:"100%", background:C.bg, color:C.textSec, border:"none", borderRadius:8, padding:"8px 0", fontSize:12, fontWeight:500, cursor:"pointer" }}>View Full Feedback</button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>)}

      {/* ════ IDEAS ════ */}
      {tab==="ideas"&&(<div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, margin:0 }}>Idea Tracker</h2>
            <p style={{ fontSize:13, color:C.textSec, margin:"4px 0 0" }}>Track your ideas, inspirations, and outcomes.</p>
          </div>
          {!showIdea&&<button onClick={()=>{setShowIdea(true);setEditIdeaId(null);setIdeaForm({date:new Date().toISOString().split("T")[0],idea:"",inspo:"",status:"Pending"});}} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>+ New Idea</button>}
        </div>

        {/* Idea Form */}
        {showIdea&&(
          <Card style={{ padding:24, boxShadow:C.shadowMd }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <h3 style={{ fontSize:17, fontWeight:700, margin:0 }}>{editIdeaId?"Edit Idea":"New Idea"}</h3>
              <button onClick={()=>{setShowIdea(false);setEditIdeaId(null);}} style={{ background:"none", border:"none", color:C.textTer, cursor:"pointer", fontSize:20 }}>x</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"140px 1fr", gap:12, marginBottom:12 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.textSec }}>Date</label>
                <input type="date" value={ideaForm.date} onChange={e=>setIdeaForm({...ideaForm,date:e.target.value})} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white }}/>
              </div>
              <Inp label="Idea" value={ideaForm.idea} onChange={v=>setIdeaForm({...ideaForm,idea:v})} ph="Your concept or idea..."/>
            </div>
            <Inp label="Inspo / Source" value={ideaForm.inspo} onChange={v=>setIdeaForm({...ideaForm,inspo:v})} ph="Where did this idea come from? Link, competitor, research..." style={{ marginBottom:16 }}/>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>{
                if(!ideaForm.idea.trim()) return;
                if(editIdeaId) saveIdeas(ideas.map(i=>i.id===editIdeaId?{...ideaForm,id:editIdeaId}:i));
                else saveIdeas([{...ideaForm,id:genId()},...ideas]);
                setShowIdea(false);setEditIdeaId(null);
              }} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"10px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>{editIdeaId?"Save Changes":"Add Idea"}</button>
              {editIdeaId&&<button onClick={()=>{saveIdeas(ideas.filter(i=>i.id!==editIdeaId));setShowIdea(false);setEditIdeaId(null);}} style={{ background:C.redBg, color:C.redText, border:"none", borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Delete</button>}
            </div>
          </Card>
        )}

        {/* Ideas Table */}
        {ideas.length>0?(
          <Card style={{ overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"90px 1fr 1fr 120px", gap:8, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, fontSize:11, color:C.textTer, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>
              <span>Date</span><span>Idea</span><span>Inspo</span><span>Status</span>
            </div>
            {ideas.map(idea=>(
              <div key={idea.id} style={{ display:"grid", gridTemplateColumns:"90px 1fr 1fr 120px", gap:8, padding:"12px 16px", alignItems:"center", fontSize:13, borderBottom:`1px solid ${C.borderLight}`, transition:"background 0.1s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{ fontSize:12, color:C.textTer, cursor:"pointer" }} onClick={()=>{setIdeaForm({date:idea.date,idea:idea.idea,inspo:idea.inspo,status:idea.status});setEditIdeaId(idea.id);setShowIdea(true);}}>{idea.date?idea.date.slice(5):""}</span>
                <span style={{ fontWeight:500, cursor:"pointer" }} onClick={()=>{setIdeaForm({date:idea.date,idea:idea.idea,inspo:idea.inspo,status:idea.status});setEditIdeaId(idea.id);setShowIdea(true);}}>{idea.idea}</span>
                <span style={{ fontSize:12, color:C.textSec, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{idea.inspo||""}</span>
                <div style={{ display:"flex", gap:4 }}>
                  {["Scaled","Failed","Pending"].map(s=>(
                    <button key={s} onClick={()=>saveIdeas(ideas.map(i=>i.id===idea.id?{...i,status:s}:i))} style={{
                      padding:"3px 8px", borderRadius:6, border:"none", cursor:"pointer", fontSize:11, fontWeight:600,
                      background:idea.status===s?(s==="Scaled"?C.greenBg:s==="Failed"?C.redBg:C.yellowBg):"transparent",
                      color:idea.status===s?(s==="Scaled"?C.greenText:s==="Failed"?C.redText:C.yellowText):C.textLight,
                    }}>{s==="Scaled"?"✓":s==="Failed"?"✗":"○"}</button>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        ):!showIdea&&(
          <Card style={{ padding:40, display:"flex", flexDirection:"column", alignItems:"center", gap:12, textAlign:"center" }}>
            <div style={{ width:48, height:48, borderRadius:12, background:C.purpleBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>✦</div>
            <div style={{ fontSize:15, fontWeight:600 }}>No ideas yet</div>
            <div style={{ fontSize:13, color:C.textSec }}>Track your ideas, inspirations, and see which ones scale.</div>
          </Card>
        )}
      </div>)}

      {/* ════ RESEARCH ════ */}
      {tab==="research"&&(<div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, margin:0 }}>Research</h2>
            <p style={{ fontSize:13, color:C.textSec, margin:"4px 0 0" }}>Personas, angles, customer research, holy docs, and everything else.</p>
          </div>
          {!showDoc&&<button onClick={()=>{setShowDoc(true);setEditDoc(null);setDocForm({title:"",content:""});}} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>+ New Doc</button>}
        </div>

        {/* Doc Editor */}
        {showDoc&&(
          <Card style={{ padding:28, boxShadow:C.shadowMd }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <h3 style={{ fontSize:17, fontWeight:700, margin:0 }}>{editDoc?"Edit Doc":"New Research Doc"}</h3>
              <button onClick={()=>{setShowDoc(false);setEditDoc(null);}} style={{ background:"none", border:"none", color:C.textTer, cursor:"pointer", fontSize:20 }}>x</button>
            </div>
            <Inp label="Document Title" value={docForm.title} onChange={v=>setDocForm({...docForm,title:v})} ph="e.g. Linda - The Hidden Smoker, New Angles Research, HOLY DOC..." style={{ marginBottom:12 }}/>
            <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:16 }}>
              <label style={{ fontSize:12, fontWeight:600, color:C.textSec }}>Content</label>
              <textarea value={docForm.content} onChange={e=>setDocForm({...docForm,content:e.target.value})} placeholder={"Write your research here...\n\nDEMOGRAPHIC\nName: Linda\nAge: 54\n\nCORE PROBLEM\nThe suffocating shame of being a female smoker...\n\nTOP 5 MOST POWERFUL EMOTIONS\n1. Crushing shame\n2. Disgust with her own body\n..."} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"14px 16px", fontSize:14, color:C.text, outline:"none", background:C.white, fontFamily:"inherit", width:"100%", boxSizing:"border-box", resize:"vertical", minHeight:400, lineHeight:1.7 }} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>{
                if(!docForm.title.trim()) return;
                if(editDoc) saveDocs(docs.map(d=>d.id===editDoc?{...d,title:docForm.title,content:docForm.content,updatedAt:new Date().toISOString().split("T")[0]}:d));
                else saveDocs([{id:genId(),title:docForm.title,content:docForm.content,createdAt:new Date().toISOString().split("T")[0],updatedAt:new Date().toISOString().split("T")[0]},...docs]);
                setShowDoc(false);setEditDoc(null);
              }} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"10px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>{editDoc?"Save Changes":"Create Doc"}</button>
              {editDoc&&<button onClick={()=>{saveDocs(docs.filter(d=>d.id!==editDoc));setShowDoc(false);setEditDoc(null);}} style={{ background:C.redBg, color:C.redText, border:"none", borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Delete</button>}
            </div>
          </Card>
        )}

        {/* Docs Grid */}
        {docs.length===0&&!showDoc&&(
          <Card style={{ padding:40, display:"flex", flexDirection:"column", alignItems:"center", gap:12, textAlign:"center" }}>
            <div style={{ width:48, height:48, borderRadius:12, background:C.purpleBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>&#128196;</div>
            <div style={{ fontSize:15, fontWeight:600 }}>No research docs yet</div>
            <div style={{ fontSize:13, color:C.textSec }}>Create docs for personas, angles, customer research, and more.</div>
          </Card>
        )}

        {docs.length>0&&!showDoc&&(
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
            {docs.map(d=>(
              <Card key={d.id} style={{ padding:0, cursor:"pointer", overflow:"hidden" }} >
                <div onClick={()=>{setDocForm({title:d.title,content:d.content});setEditDoc(d.id);setShowDoc(true);}}>
                  {/* Header */}
                  <div style={{ background:`linear-gradient(135deg, ${C.purpleBg}, #e8eaf6)`, padding:"20px 20px 16px" }}>
                    <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:4 }}>{d.title}</div>
                    <div style={{ fontSize:11, color:C.textTer }}>{d.updatedAt || d.createdAt}</div>
                  </div>
                  {/* Preview */}
                  <div style={{ padding:"14px 20px 20px" }}>
                    <div style={{ fontSize:12, color:C.textSec, lineHeight:1.6, maxHeight:100, overflow:"hidden", whiteSpace:"pre-wrap" }}>{d.content.slice(0,200)}{d.content.length>200?"...":""}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>)}

      {/* ════ ANALYTICS ════ */}
      {tab==="analytics"&&(<div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <h2 style={{ fontSize:20, fontWeight:700, margin:0 }}>Creative Analytics</h2>

        {/* Winning Angles */}
        <Card style={{ padding:24 }}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Winning Angles</div>
          <div style={{ fontSize:12, color:C.textSec, marginBottom:16 }}>Angles that produced winning ads - ranked by frequency</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {winAngles.map(([angle, data], i)=>(
              <div key={angle} onClick={()=>drillInto("angle",angle,`Winning Angle: ${angle}`)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:i===0?C.purpleSoft:C.bg, borderRadius:10, border:i===0?`1px solid ${C.purpleBg}`:`1px solid ${C.borderLight}`, cursor:"pointer", transition:"transform 0.1s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <span style={{ fontSize:20, fontWeight:800, color:i===0?C.purple:C.textTer, minWidth:28 }}>#{i+1}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{angle}</div>
                  <div style={{ fontSize:12, color:C.textSec }}>{data.batches.join(", ")}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:20, fontWeight:700, color:C.greenText }}>{data.count}</span>
                  <span style={{ fontSize:11, color:C.textTer }}>wins</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Dead Angles */}
        {(()=>{
          const angleMap={};
          batches.forEach(b=>{
            if(!b.angle) return;
            const a=b.angle.trim();
            if(!angleMap[a]) angleMap[a]={total:0,wins:0,losses:0,batches:[]};
            angleMap[a].total++;
            angleMap[a].batches.push(b.name);
            if(b.result==="Winning Ad") angleMap[a].wins++;
            if(b.result==="Losing Ad") angleMap[a].losses++;
          });
          const dead=Object.entries(angleMap).filter(([,d])=>d.total>=2&&d.wins===0&&d.losses>=2).sort((a,b)=>b[1].total-a[1].total);
          if(dead.length===0) return null;
          return (
            <Card style={{ padding:24 }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Dead Angles</div>
              <div style={{ fontSize:12, color:C.textSec, marginBottom:16 }}>Angles tested 2+ times with zero wins. Stop spending here.</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {dead.map(([angle,data],i)=>(
                  <div key={angle} onClick={()=>drillInto("angle",angle,`Dead Angle: ${angle}`)} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"#fff5f5", borderRadius:8, border:"1px solid #ffe0e0", cursor:"pointer", transition:"transform 0.1s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                    <span style={{ fontSize:16, fontWeight:700, color:C.redText }}>0%</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{angle}</div>
                      <div style={{ fontSize:11, color:C.textTer }}>{data.batches.slice(0,3).join(", ")}{data.batches.length>3?` +${data.batches.length-3}`:""}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:14, fontWeight:700, color:C.redText }}>{data.losses} losses</div>
                      <div style={{ fontSize:11, color:C.textTer }}>{data.total} tested</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })()}

        {/* Breakdowns */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
          {[
            {title:"Win Rate by Awareness", key:"awareness", data:AWARENESS},
            {title:"Win Rate by Origin", key:"origin", data:ORIGINS},
            {title:"By Sophistication Level", key:"sophistication", data:SOPHISTICATION},
          ].map(({title,key,data})=>(
            <Card key={title} style={{ padding:24 }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.textSec, marginBottom:14 }}>{title}</div>
              {data.map(item=>{
                const of_=batches.filter(b=>b[key]===item);
                if(!of_.length) return null;
                const l=of_.filter(b=>b.result==="Winning Ad"||b.result==="Losing Ad").length;
                const w=of_.filter(b=>b.result==="Winning Ad").length;
                const r=l>0?((w/l)*100).toFixed(0):"";
                return(
                  <div key={item} onClick={()=>drillInto(key,item,`${title.replace("Win Rate by ","").replace("By ","")} : ${item}`)} style={{ padding:"10px 0", borderBottom:`1px solid ${C.borderLight}`, display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", transition:"padding-left 0.1s" }} onMouseEnter={e=>e.currentTarget.style.paddingLeft="8px"} onMouseLeave={e=>e.currentTarget.style.paddingLeft="0"}>
                    <div><div style={{ fontSize:13, fontWeight:500 }}>{item}</div><div style={{ fontSize:11, color:C.textTer }}>{of_.length} ads · {w}/{l} wins</div></div>
                    <span style={{ fontSize:18, fontWeight:700, color:r===""?C.textTer:parseFloat(r)>=50?C.greenText:C.text }}>{r}{r!==""&&"%"}</span>
                  </div>
                );
              })}
            </Card>
          ))}
        </div>

        {/* Monthly Performance */}
        <Card style={{ padding:24 }}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Monthly Performance</div>
          <div style={{ fontSize:12, color:C.textSec, marginBottom:16 }}>Launched, winners, and improvement over time</div>
          <div style={{ display:"grid", gridTemplateColumns:"100px 100px 100px 100px 120px", gap:4 }}>
            {["Month","Launched","Winners","Hit Rate","vs Previous"].map(h=><span key={h} style={{ fontSize:11, fontWeight:600, color:C.textTer, textTransform:"uppercase", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>{h}</span>)}
            {periods.months.map(([mo,d],i)=>{
              const prev=i>0?periods.months[i-1][1]:null;
              const rate=d.total>0?((d.wins/d.total)*100).toFixed(0):"";
              const chgLaunch=prev&&prev.total>0?((d.total-prev.total)/prev.total*100).toFixed(0):null;
              return [
                <span key={mo+"m"} style={{ fontWeight:600, padding:"10px 0" }}>{mo}</span>,
                <span key={mo+"t"} style={{ padding:"10px 0" }}>{d.total}</span>,
                <span key={mo+"w"} style={{ padding:"10px 0", color:C.greenText, fontWeight:600 }}>{d.wins}</span>,
                <span key={mo+"r"} style={{ padding:"10px 0", fontWeight:600 }}>{rate}%</span>,
                <span key={mo+"c"} style={{ padding:"10px 0" }}>{chgLaunch!==null?<span style={{ fontSize:12, fontWeight:600, padding:"2px 8px", borderRadius:20, background:parseInt(chgLaunch)>=0?C.greenBg:C.redBg, color:parseInt(chgLaunch)>=0?C.greenText:C.redText }}>{parseInt(chgLaunch)>=0?"+":""}{chgLaunch}%</span>:""}</span>
              ];
            })}
          </div>
        </Card>

        {/* Reports & Exports */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <Card style={{ padding:24 }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Weekly Report</div>
            <div style={{ fontSize:12, color:C.textSec, marginBottom:12 }}>Select a week and download a full creative performance report.</div>
            {(()=>{
              const getMonday=(d)=>{const dt=new Date(d);const day=dt.getDay();const diff=dt.getDate()-day+(day===0?-6:1);dt.setDate(diff);dt.setHours(0,0,0,0);return dt;};
              const getSunday=(m)=>{const s=new Date(m);s.setDate(s.getDate()+6);return s;};
              const today=new Date();const thisMonday=getMonday(today);
              const datedB=batches.filter(b=>b.date).sort((a,b)=>a.date.localeCompare(b.date));
              const weeks=[];
              if(datedB.length>0){
                const firstMon=getMonday(new Date(datedB[0].date));
                let cur=new Date(firstMon);
                while(cur<=thisMonday){const mon=new Date(cur);const sun=getSunday(mon);const ms=mon.toISOString().split("T")[0];const ss=sun.toISOString().split("T")[0];const wb=batches.filter(b=>b.date&&b.date>=ms&&b.date<=ss);if(wb.length>0)weeks.push({monStr:ms,sunStr:ss,batches:wb});cur.setDate(cur.getDate()+7);}
              }
              return (<>
                <select id="weekSelect" defaultValue={weeks.length>0?weeks[weeks.length-1].monStr:""} style={{ border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, outline:"none", background:C.white, width:"100%", marginBottom:12, cursor:"pointer" }}>
                  {weeks.map(w=><option key={w.monStr} value={w.monStr}>{w.monStr} to {w.sunStr} ({w.batches.length} creatives)</option>).reverse()}
                </select>
                <button onClick={()=>{
                  const sel=document.getElementById("weekSelect").value;
                  const wk=weeks.find(w=>w.monStr===sel);
                  if(!wk) return;
                  const wb=wk.batches;
                  const wins=wb.filter(b=>b.result==="Winning Ad");
                  const losses=wb.filter(b=>b.result==="Losing Ad");
                  const awaiting=wb.filter(b=>b.result==="Data Awaiting");
                  const rated=wins.length+losses.length;
                  const hr=rated>0?((wins.length/rated)*100).toFixed(1):0;
                  let r=`WEEKLY CREATIVE REPORT\n`;
                  r+=`${"=".repeat(60)}\n`;
                  r+=`Week: ${wk.monStr} to ${wk.sunStr}\n`;
                  r+=`Generated: ${new Date().toISOString().split("T")[0]}\n`;
                  r+=`${"=".repeat(60)}\n\n`;
                  r+=`SUMMARY\n${"-".repeat(40)}\n`;
                  r+=`Total Creatives: ${wb.length}\n`;
                  r+=`Winners: ${wins.length}\n`;
                  r+=`Losers: ${losses.length}\n`;
                  r+=`Data Awaiting: ${awaiting.length}\n`;
                  r+=`Hit Rate: ${hr}%\n\n`;
                  if(wins.length>0){
                    r+=`WINNING ANGLES\n${"-".repeat(40)}\n`;
                    wins.forEach(b=>{r+=`  - ${b.angle||b.name}\n`;});
                    r+=`\n`;
                  }
                  r+=`\n${"=".repeat(60)}\n`;
                  r+=`FULL BRIEFS - ALL ADS LAUNCHED THIS WEEK\n`;
                  r+=`${"=".repeat(60)}\n\n`;
                  wb.forEach((b,i)=>{
                    r+=`${"*".repeat(60)}\n`;
                    r+=`${b.name} - ${b.result}\n`;
                    r+=`${"*".repeat(60)}\n`;
                    r+=`Date: ${b.date}\n`;
                    r+=`Type: ${b.type} | ${b.isNew}\n`;
                    r+=`Angle: ${b.angle||"N/A"}\n`;
                    r+=`Origin: ${b.origin||"N/A"}\n`;
                    r+=`Awareness: ${b.awareness||"N/A"}\n`;
                    r+=`Sophistication: ${b.sophistication||"N/A"}\n`;
                    r+=`Status: ${b.status}\n`;
                    r+=`Result: ${b.result}\n\n`;
                    r+=`CREATIVE BRIEF\n`;
                    if(b.get) r+=`  GET (Audience): ${b.get}\n`;
                    if(b.who) r+=`  WHO (Pain): ${b.who}\n`;
                    if(b.to) r+=`  TO (Promise): ${b.to}\n`;
                    if(b.by) r+=`  BY (Proof): ${b.by}\n`;
                    if(b.purchaseTrigger) r+=`  Purchase Trigger: ${b.purchaseTrigger}\n`;
                    if(b.beliefBefore) r+=`  Belief BEFORE: ${b.beliefBefore}\n`;
                    if(b.beliefAfter) r+=`  Belief AFTER: ${b.beliefAfter}\n`;
                    if(b.hypothesis) r+=`  Hypothesis: ${b.hypothesis}\n`;
                    if(b.desire) r+=`  Desire: ${b.desire}\n`;
                    if(b.script) r+=`\n  SCRIPT:\n  ${b.script.replace(/\n/g,"\n  ")}\n`;
                    // Find feedback loop for this batch
                    const fl=loops.find(l=>l.batchId===b.id);
                    if(fl){
                      r+=`\n  FEEDBACK LOOP ${fl.completed?"(Completed)":"(In Progress)"}\n`;
                      if(fl.hypothesisWhy) r+=`  Why it worked/failed:\n  ${fl.hypothesisWhy.replace(/\n/g,"\n  ")}\n`;
                      if(fl.actionPlan) r+=`  Action plan:\n  ${fl.actionPlan.replace(/\n/g,"\n  ")}\n`;
                    }
                    r+=`\n\n`;
                  });
                  r+=`${"=".repeat(60)}\n`;
                  r+=`OVERALL ACCOUNT STATS\n${"-".repeat(40)}\n`;
                  r+=`Total Concepts All Time: ${batches.length}\n`;
                  r+=`Overall Hit Rate: ${st.hr.toFixed(1)}% (${st.w} wins / ${st.t} with results)\n`;
                  r+=`${"=".repeat(60)}\n`;
                  const dataUrl="data:text/plain;charset=utf-8,"+encodeURIComponent(r);
                  const a=document.createElement("a");a.href=dataUrl;a.download=`weekly-report-${wk.monStr}.txt`;a.click();
                }} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  Download Full Report
                </button>
              </>);
            })()}
          </Card>

          <Card style={{ padding:24 }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Feedback Loop Export</div>
            <div style={{ fontSize:12, color:C.textSec, marginBottom:16 }}>Export all feedback loops as a clean text file for LLM input.</div>
            <button onClick={()=>{
              let txt="FEEDBACK LOOP LEARNINGS\nExported: "+new Date().toISOString().split("T")[0]+"\n"+"=".repeat(40)+"\n\n";
              loops.filter(lp=>lp.completed).forEach(lp=>{
                const sb=batches.find(b=>b.id===lp.batchId);
                txt+=`BATCH: ${sb?sb.name:"Unknown"}\n`;
                txt+=`ANGLE: ${sb?sb.angle:""}\n`;
                txt+=`RESULT: ${sb?sb.result:""}\n`;
                txt+=`TYPE: ${sb?sb.isNew:""}\n`;
                if(sb?.get) txt+=`GET: ${sb.get}\n`;
                if(sb?.who) txt+=`WHO: ${sb.who}\n`;
                if(sb?.to) txt+=`TO: ${sb.to}\n`;
                if(sb?.by) txt+=`BY: ${sb.by}\n`;
                txt+=`\nWHY IT WORKED/FAILED:\n${lp.hypothesisWhy||"Not filled"}\n`;
                txt+=`\nACTION TAKEN:\n${lp.actionPlan||"Not filled"}\n`;
                txt+="\n"+"-".repeat(40)+"\n\n";
              });
              txt+=`\nTOTAL FEEDBACK LOOPS: ${loops.filter(lp=>lp.completed).length}\n`;
              const dataUrl="data:text/plain;charset=utf-8,"+encodeURIComponent(txt);
              const a=document.createElement("a");a.href=dataUrl;a.download=`feedback-loops-export-${new Date().toISOString().split("T")[0]}.txt`;a.click();
            }} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
              Download Feedback Loops
            </button>
          </Card>
        </div>

        <div style={{ display:"flex", justifyContent:"flex-end" }}>
        <Card style={{ padding:20 }}>
          <div style={{ fontSize:13, fontWeight:600, color:C.textSec, marginBottom:12 }}>Data Management</div>
          {apiBase ? (
            <div style={{ marginBottom:14, padding:12, borderRadius:8, background: apiToken ? C.greenBg : C.orangeBg, border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.text, marginBottom:6 }}>Backend API</div>
              <div style={{ fontSize:11, color:C.textSec, marginBottom:8 }}>{apiBase}</div>
              {apiToken ? (
                <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <span style={{ fontSize:12, color:C.greenText, fontWeight:600 }}>Connected</span>
                  {apiSyncing && <span style={{ fontSize:11, color:C.textTer }}>Syncing…</span>}
                  <button type="button" onClick={()=>reloadBrandData()} disabled={apiBusy} style={{ background:C.purpleSoft, border:`1px solid ${C.purpleBg}`, borderRadius:6, padding:"6px 12px", fontSize:12, cursor:"pointer", color:C.purple, fontWeight:600 }}>Load from server</button>
                  <button type="button" onClick={doApiLogout} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:"6px 12px", fontSize:12, cursor:"pointer" }}>Log out</button>
                </div>
              ) : (
                <form onSubmit={doApiLogin} style={{ display:"flex", flexDirection:"column", gap:8, maxWidth:320 }}>
                  <input type="email" autoComplete="username" placeholder="Admin email" value={apiLoginEmail} onChange={(e)=>setApiLoginEmail(e.target.value)} style={{ border:`1px solid ${C.border}`, borderRadius:6, padding:"8px 10px", fontSize:13 }} />
                  <input type="password" autoComplete="current-password" placeholder="Password" value={apiLoginPassword} onChange={(e)=>setApiLoginPassword(e.target.value)} style={{ border:`1px solid ${C.border}`, borderRadius:6, padding:"8px 10px", fontSize:13 }} />
                  <button type="submit" disabled={apiBusy} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:6, padding:"8px 14px", fontSize:13, fontWeight:600, cursor:"pointer" }}>{apiBusy ? "…" : "Log in"}</button>
                </form>
              )}
              {apiError && <div style={{ fontSize:11, color:C.redText, marginTop:8 }}>{apiError}</div>}
            </div>
          ) : (
            <div style={{ fontSize:11, color:C.textTer, marginBottom:12 }}>Local-only mode. Set <code style={{ fontSize:10 }}>API_BASE_URL</code> in <code style={{ fontSize:10 }}>frontend/src/appConfig.js</code> to enable cloud sync.</div>
          )}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={()=>{
              const data = JSON.stringify({ batches, loops, docs, ideas, exportDate: new Date().toISOString() }, null, 2);
              const blob = new Blob([data], { type:"application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a"); a.href = url; a.download = `creative-ops-backup-${new Date().toISOString().split("T")[0]}.json`; a.click();
              URL.revokeObjectURL(url);
            }} style={{ background:C.purple, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
              Export Backup (JSON)
            </button>
            <label style={{ background:C.white, border:`1px solid ${C.purple}`, borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:600, color:C.purple, cursor:"pointer" }}>
              Import Backup
              <input type="file" accept=".json" style={{ display:"none" }} onChange={async(e)=>{
                const file = e.target.files?.[0];
                await handleImportBackupFile(file);
                e.target.value = "";
              }}/>
            </label>
            <button type="button" onClick={restoreBundledBackup} disabled={apiBusy} style={{ background:C.green, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Restore full backup (66 batches)</button>
            <button onClick={async()=>{try{await window.storage.delete("brand-"+currentBrand+"-batches");await window.storage.delete("brand-"+currentBrand+"-loops");}catch{}setBatches(currentBrand==="OriginDrops"?samples:[]);setLoops(currentBrand==="OriginDrops"&&typeof sampleLoops!=="undefined"?sampleLoops:[]);}} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 20px", color:C.textTer, fontSize:13, cursor:"pointer" }}>Reset to CSV data</button>
          </div>
          <div style={{ fontSize:11, color:C.textTer, marginTop:8 }}>Export regularly to back up your data. Import to restore from a backup file.</div>
        </Card>
        </div>
      </div>)}

      </div>

    </div>
  );
}
