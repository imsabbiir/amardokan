export const products=[
 {e:"🌀",name:"Wireless Mini Fan",cat:"Electronics",cost:650,price:990},
 {e:"🎧",name:"Bluetooth Earbuds",cat:"Electronics",cost:890,price:1350},
 {e:"👜",name:"Canvas Tote Bag",cat:"Fashion",cost:320,price:590},
 {e:"💄",name:"Matte Lip Set",cat:"Beauty",cost:280,price:550},
 {e:"💡",name:"LED Desk Lamp",cat:"Home",cost:720,price:1150},
 {e:"⌚",name:"Smart Watch",cat:"Trending",cost:1450,price:1990},
 {e:"🕯️",name:"Aroma Candle",cat:"Lifestyle",cost:240,price:490},
 {e:"🧴",name:"Face Serum",cat:"Beauty",cost:410,price:790},
];
export const categories=["All","Electronics","Fashion","Beauty","Home","Lifestyle","Trending"];

export const ranges={
 "7d":{label:"Last 7 days",labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  rev:[3800,4600,4100,5900,6400,7800,4300],profit:[1050,1280,1100,1620,1750,2150,900],
  kpi:{orders:28,revenue:36900,profit:9850,rate:92},delta:{orders:8.4,revenue:11.2,profit:9.7,rate:1.5}},
 "30d":{label:"Last 30 days",labels:["Sep 6","Sep 12","Sep 18","Sep 24","Sep 30","Oct 5"],
  rev:[14200,19800,22600,24100,26800,20950],profit:[3700,5300,6100,6700,7300,5100],
  kpi:{orders:99,revenue:128450,profit:34200,rate:88},delta:{orders:14.1,revenue:18.6,profit:16.3,rate:-0.8}},
} as const;

export const statusMix=[{k:"Delivered",n:87,c:"var(--ok)"},{k:"Shipped",n:3,c:"#3b82f6"},{k:"Packed",n:4,c:"var(--ac)"},{k:"Confirmed",n:5,c:"#f59e0b"}];
export const orders=[
 {id:"#1042",p:"Wireless Mini Fan",c:"Rafi H.",amt:990,profit:340,s:"Pending",d:"Today"},
 {id:"#1041",p:"Smart Watch",c:"Nusrat J.",amt:1990,profit:540,s:"Shipped",d:"Today"},
 {id:"#1040",p:"Bluetooth Earbuds",c:"Imran K.",amt:1350,profit:460,s:"Delivered",d:"Yesterday"},
 {id:"#1039",p:"LED Desk Lamp",c:"Tania A.",amt:1150,profit:430,s:"Delivered",d:"Yesterday"},
 {id:"#1038",p:"Face Serum",c:"Mitu S.",amt:790,profit:380,s:"Packed",d:"Oct 3"},
 {id:"#1037",p:"Canvas Tote Bag",c:"Sabbir R.",amt:590,profit:270,s:"Returned",d:"Oct 3"},
];
export const topProducts=[{e:"🌀",n:"Wireless Mini Fan",u:34,p:11560},{e:"⌚",n:"Smart Watch",u:15,p:8100},{e:"🧴",n:"Face Serum",u:21,p:7980},{e:"🎧",n:"Bluetooth Earbuds",u:12,p:5520}];
export const activity=[["Order #1041 handed to courier","12 min ago"],["Order #1042 awaiting confirmation","38 min ago"],["Payout of ৳15,000 sent to bKash","Yesterday"],["Order #1040 delivered","Yesterday"]];

export const faqs=[
 ["Do I need to buy inventory?","No. You only pay the supplier price when a customer order is placed."],
 ["How do I make profit?","You set your own selling price. The difference from our supplier price is your profit."],
 ["Who handles packaging?","Our fulfillment team picks, checks and packs every order."],
 ["Who delivers the order?","We hand your order to our courier partners for delivery to your customer."],
 ["Can I sell through Facebook?","Yes. Share products on pages, groups or messages and submit the orders here."],
 ["Can I connect my own website?","Yes. Integration details are a placeholder — confirm before launch."],
 ["How do I receive my profit?","Profit is credited to your wallet and can be withdrawn. Payout methods to be confirmed."],
 ["What happens if a customer returns an order?","Returns follow our Refund Policy. Placeholder — add your real return terms."],
 ["Do you provide product images and videos?","Yes, catalog products come with media you can use in your marketing."],
 ["Can I use my own brand name?","Branding options depend on your plan. Placeholder — update with real policy."],
];
