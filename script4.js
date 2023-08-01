const getstart=document.getElementById('getstartedbtn');
const header=document.getElementById('header');
const m=document.getElementById('m');
const body=document.getElementById('body');
const mailbox=document.getElementById('mailsection');
let lineChart=null;
const remove=document.getElementById('removeclass')
getstart.addEventListener('click',function(){
   header.style.display="block";
   m.style.display="flex";
   remove.style.display="none";
   body.style.backgroundImage="url('stockgraph2.jpg')";
   mailbox.style.display="flex";

})




const chartbtn=document.getElementById('chartbtn');
const btn = document.getElementById('search');
var changesearch=document.getElementById('searchstock');
var graphPrice;
var apiUrl; 
var urls5;
var mail;
var buymail;
var sellmailCount=1;
var buymailCount=1;
let intervalId = null;
var lastPrice;
var symbolToSearch;
var targetBuy;
var targetSell;
var i;
var sell;
var audio = document.getElementById("myAudio");
var audio2 = document.getElementById("myAudio2");
const infobox=document.getElementById('infobox');
var headstock=document.getElementById('stockname');
var previosPrice;
//var lastPrice;
var currentPrice;
var flag;
var index=document.getElementById('chooseindex');
var selectedindex;
var s;
var strings="Hello world";
console.log(strings.length);
index.addEventListener('change',function(){
  s="";
   selectedindex = index.options[index.selectedIndex].text;
    console.log(selectedindex);
    // var s=selectedindex;
// var selectedindex="";
var space=1;
for(var j=0;j<selectedindex.length;j++){
   if(selectedindex[j]==" "){
	space++;
	  if(space==3){
         s+='%20';
	  }
   }
   else if(space>=2){
	s+=selectedindex[j];
   }
}

console.log(s);
apiUrl="https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20"+s;
console.log(s.length)
})


btn.addEventListener('click', function() {
  infobox.style.display="block";
 
  chartbtn.style.display="block"
  // infobox.style.flexDirection="colum";

    if (intervalId) {
        clearInterval(intervalId);
      }
    

   
   symbolToSearch = document.getElementById('searchstock').value.toUpperCase();
   urls5 = "https://real-time-web-search.p.rapidapi.com/search?q="+ symbolToSearch +"%20Price%20Chart&limit=100";
   async function getChart(){
    try {
      const response = await fetch(urls5, optionS);
      const result = await response.json();
      const answer=result.data[0].url;
      // console.log(symbolToSearch);
      console.log(urls5);
      // console.log('ok');
      const fundlink=document.getElementById('fundlink');
      console.log(answer);
      fundlink.href=answer;
    
    } catch (error) {
      console.error(error);
    }
    }
    getChart();


 
   headstock.innerHTML=symbolToSearch;
  console.log(symbolToSearch);
//   symbolToSearch="TCS";
  fetchData(symbolToSearch); // Fetch data for the first time
  
  // Set up interval to fetch data every 5 seconds
  
    intervalId =  setInterval(() => {
      fetchData(symbolToSearch);
      console.log('running set interval ')
     }, 1000);

   function fetchData(symbol) {
      if(previosPrice!=currentPrice){
        if(previosPrice<currentPrice){
          flag=true;
        }
        else{
          flag=false;
        }
      }
        console.log('In fetchData');
        
    fetch(apiUrl, {
      headers: {
        'x-rapidapi-key': '68bac77240msh23ebf5aad2c162bp169123jsn0addebad93e8',
        'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        var apiResponses = data;
        var slicedResponse=apiResponses.slice(0,7);
        //console.log(apiResponses);
        var k=1;
        slicedResponse.forEach(element => {
           // console.log(`Symbol: ${element.symbol}, LTP: ${element.lastPrice}`);
           if(k===1){
            k++;
              console.log(element.symbol);
              console.log(element.lastPrice);
               var pr1=document.getElementById('peer1');
               const maindiv=document.getElementById('peers');
               var prices1=document.getElementById('mprice1');
               var hereprice=element.lastPrice;
               console.log('here proce',hereprice);
               console.log(prices1.textContent);
               pr1.innerHTML=element.symbol;
              prices1.innerHTML=hereprice;
              prices1.style.color="red";
              console.log(prices1.textContent);
               
           }
          else if(k===2){
            k++;
            var pr2=document.getElementById('peer2');
            var prices2=document.getElementById('price2');
            pr2.innerHTML=element.symbol;
           prices2.innerHTML=element.lastPrice;
           console.log(prices2.textContent);
            
           }
          else if(k===3){
            k++;
            var pr3=document.getElementById('peer3');
            var prices3=document.getElementById('price3');
            pr3.innerHTML=element.symbol;
           prices3.innerHTML=element.lastPrice;
           console.log(prices3.textContent);
            
           }
           else if(k===4){
            k++;
            var pr4=document.getElementById('peer4');
            var prices4=document.getElementById('price4');
            pr4.innerHTML=element.symbol;
           prices4.innerHTML=element.lastPrice;
           console.log(prices4.textContent);
            
           }
          else if(k===5){
            k++;
            var pr5=document.getElementById('peer5');
            var prices5=document.getElementById('price5');
            pr5.innerHTML=element.symbol;
           prices5.innerHTML=element.lastPrice;
           console.log(prices5.textContent);
            
           }
         

        });
        var tcsData = apiResponses.find(data => data.symbol === symbol);
        
        // ...
        // Update the UI with the fetched data
        previosPrice=currentPrice;
         lastPrice=tcsData.lastPrice;
         currentPrice=lastPrice;
         if(lastPrice<=targetBuy && i===0){
          console.log('Time to Buy');
          audio.play();
          alert(symbolToSearch + ' buying price is Triggered!');
          i++;
          if(buymailCount===2){
            buymailCount=1;
            sendMailsbuy();
          }
        }

        if(lastPrice>=targetSell && sell===0){
          console.log('time to sell');
          audio2.play();
          alert(symbolToSearch+' selling price is Triggered!');
          sell++;
            if(sellmailCount===2){
              sellmailCount=1;
              sendMailssell();
            }
        }
       
        console.log("LTP:",lastPrice);
        // ...
        if (tcsData) {
          
              
  
          var ltp=tcsData.lastPrice;
          graphPrice=ltp;
          var changeLTP=document.getElementById('LTP');
          changeLTP.innerHTML=ltp;

          var identifier = tcsData.identifier;
          var openPrice = tcsData.open;
          var dayhigh=tcsData.dayHigh;
          var daylow=tcsData.dayLow;
          var ltp=tcsData.lastPrice;
          var pclose =tcsData.previousClose;
          var pchange=tcsData.pChange;
          var yhigh =tcsData.yearHigh;
          var ylow =tcsData.yearLow;
          var ychange=tcsData.perChange365d;
    var changeidentifier=document.getElementById('identifier');
           var changeOpenPrice=document.getElementById('Open-Price');
           var changeDayHigh=document.getElementById('Day-High');
           var changeDayLow=document.getElementById('Day-Low');
          var changeLTP=document.getElementById('LTP');

          if(flag){
               
             changeLTP.style.color='green';
               
          }

          else if(!flag){
            changeLTP.style.color='red';
          }
           var changePreviousClose=document.getElementById('Previous-Close');
           var changePercentChange=document.getElementById('Percent-Change');
           var changeYearHigh=document.getElementById('Year-High');
           var changeYearLow=document.getElementById('Year-Low');
           var changeYearChange=document.getElementById('1-Year-%-Change');
           
           changeidentifier.innerHTML=identifier;
           changeOpenPrice.innerHTML=openPrice
           changeDayHigh.innerHTML=dayhigh
           changeDayLow.innerHTML=daylow
           changeLTP.innerHTML=ltp
           changePreviousClose.innerHTML=pclose
           changePercentChange.innerHTML=pchange
           changeYearHigh.innerHTML=yhigh
           changeYearLow.innerHTML=ylow
           changeYearChange.innerHTML=ychange



          //  addRandomDataPoint();
        }
      })


      
      
   
      .catch(error => {
        console.error('Error:', error);
        // Handle the error, e.g., display an error message or take appropriate action.
      });
   
  
     
  
  }

  const urls2 = "https://g-search.p.rapidapi.com/search?q="+symbolToSearch+"%20NSE&location_name=LONDON&location_parameters_auto=true";
  console.log(urls2); 
  console.log('reached');

      fetch(urls2,{
        headers:{
       'X-RapidAPI-Key': '68bac77240msh23ebf5aad2c162bp169123jsn0addebad93e8',
       'X-RapidAPI-Host': 'g-search.p.rapidapi.com'
        }	
     })
      .then(response=>response.json())
      .then(data=>{
        console.log('reached2');
       var apiresponse=data;
         var description= apiresponse.data.knowledge_graph.description;
         var website=apiresponse.data.knowledge_graph.website;
         var web=document.getElementById('web');
         if(website){
          console.log('reached3');
          web.style.display="block";
          web.href=apiresponse.data.knowledge_graph.website;
          web.innerHTML=apiresponse.data.knowledge_graph.website;
         }
         
         else{
          web.style.display="none";
         }
         console.log('reached4');
         console.log(description);
         console.log('Visit: ',apiresponse.data.knowledge_graph.website);
         var changeinfotext=document.getElementById('infotext');
         changeinfotext.innerHTML=description;
         
      })
           
});


const hitBuy =document.getElementById('hitBuy');

hitBuy.addEventListener('click',function(){
 targetBuy=document.getElementById('BuyPrice').value;
  console.log(targetBuy);
  i=0;
})

const hitSell =document.getElementById('hitSell');

hitSell.addEventListener('click',function(){
 targetSell=document.getElementById('sellPrice').value;
  console.log(targetSell);
  sell=0;
})

function dragToSearch(){
  var peeer=document.getElementById('peer1').innerHTML;
  console.log(peeer);
  changesearch.value=peeer;

}

function dragToSearch2(){
  var peeer=document.getElementById('peer2').innerHTML;
  console.log(peeer);
  changesearch.value=peeer;

}



function dragToSearch3(){
  var peeer=document.getElementById('peer3').innerHTML;
  console.log(peeer);
  changesearch.value=peeer;

}



function dragToSearch4(){
  var peeer=document.getElementById('peer4').innerHTML;
  console.log(peeer);
  changesearch.value=peeer;

}



function dragToSearch5(){
  var peeer=document.getElementById('peer5').innerHTML;
  console.log(peeer);
  changesearch.value=peeer;

}


document.addEventListener("DOMContentLoaded", function() {
  var infoIcon = document.getElementById("infobtn");
  var tooltip = document.getElementById("infotext");

  infoIcon.addEventListener("mouseover", function() {
    tooltip.style.display = "table";
  });

  infoIcon.addEventListener("mouseout", function() {
    tooltip.style.display = "none";
  });
});

const url4 = 'https://real-time-news-data.p.rapidapi.com/search?query=NSE%20stock&country=US&lang=en';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '68bac77240msh23ebf5aad2c162bp169123jsn0addebad93e8',
		'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
	}
};
async function getNews(){
	var k=1;
try {
	const response = await fetch(url4, options);
	const result = await response.json();
  var news=result.data.slice(0,11);
  news.forEach(element => {
	console.log(element.title);
  console.log(element.link);
  if(k===1){
   
	const p1=document.getElementById('scroll1');
	const link1=document.getElementById('scroll1link');
	p1.innerHTML=element.title;
	p1.style.color="#06f606";
	link1.href=element.link;
  }

  if(k===2){
	const p2=document.getElementById('scroll2');
	const link2=document.getElementById('scroll2link');
	p2.innerHTML=element.title;
	p2.style.color="#fb0000";
	link2.href=element.link;
  }

  if(k===3){
	const p3=document.getElementById('scroll3');
	const link3=document.getElementById('scroll3link');
	p3.innerHTML=element.title;
	p3.style.color="#06f606";
	link3.href=element.link;
  }

  if(k===4){
	const p4=document.getElementById('scroll4');
	const link4=document.getElementById('scroll4link');
	p4.innerHTML=element.title;
	p4.style.color="#fb0000";
	link4.href=element.link;
  }

  if(k===5){
	const p5=document.getElementById('scroll5');
	const link5=document.getElementById('scroll5link');
	p5.innerHTML=element.title;
	p5.style.color="#06f606";
	link5.href=element.link;
  }
  if(k===6){
	const p6=document.getElementById('scroll6');
	const link6=document.getElementById('scroll6link');
	p6.innerHTML=element.title;
	p6.style.color="#fb0000";
	link6.href=element.link;
  }
  
  if(k===7){
	const p7=document.getElementById('scroll7');
	const link7=document.getElementById('scroll7link');
	p7.innerHTML=element.title;
	p7.style.color="#06f606";
	link7.href=element.link;
  }
  if(k===8){
	const p8=document.getElementById('scroll8');
	const link8=document.getElementById('scroll8link');
	p8.innerHTML=element.title;
	p8.style.color="#fb0000";
	link8.href=element.link;
  }
  if(k===9){
	const p9=document.getElementById('scroll9');
	const link9=document.getElementById('scroll9link');
	p9.innerHTML=element.title;
	p9.style.color="#06f606";
	link9.href=element.link;
  }
  if(k===10){
	const p10=document.getElementById('scroll10');
	const link10=document.getElementById('scroll10link');
	p10.innerHTML=element.title;
	p10.style.color="#fb0000";
	link10.href=element.link;
  }
  if(k===11){
	const p11=document.getElementById('scroll11');
	const link11=document.getElementById('scroll11link');
	p11.innerHTML=element.title;
	p11.style.color="#06f606";
	link11.href=element.link;
  }
  k++;
  });
} catch (error) {
	console.error(error);
}
}
// var fundsymbol=document.getElementById('searchstock').value;
//  urls5 = "https://real-time-web-search.p.rapidapi.com/search?q="+ symbolToSearch +"%20Price%20Chart&limit=100";
const optionS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '68bac77240msh23ebf5aad2c162bp169123jsn0addebad93e8',
		'X-RapidAPI-Host': 'real-time-web-search.p.rapidapi.com'
	}
};
// async function getChart(){
// try {
// 	const response = await fetch(urls5, optionS);
// 	const result = await response.json();
//   const answer=result.data[0].url;
//   // console.log(symbolToSearch);
//   console.log(urls5);
// 	// console.log('ok');
//   const fundlink=document.getElementById('fundlink');
// 	console.log(answer);
//   fundlink.href=answer;

// } catch (error) {
// 	console.error(error);
// }
// }

// chartbtn.addEventListener('click',function(){
//   // console.log();
//   getChart();
// })
getNews();

// document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
//   anchor.addEventListener('click',function (e){
//     e.preventDefault();
//     document.querySelector(this.getAttribute('href')).scrollIntoView({
//       behaviour:'smooth'
//     });
//   });
// });


// function scrollToAbout() {
//   // Get the id of the about section
//   // var aboutId = "about";

//   // Get the scroll position of the about section
//   var aboutOffset = document.getElementById('aboutsection').offsetBottom;

//   // Scroll to the about section
//   window.scrollTo(0, aboutOffset);
// }

// // Add the click event listener to the "About" link
// document.getElementById("about").addEventListener("click", scrollToAbout());



// 

const mailbtn=document.getElementById('submitmail');
mailbtn.addEventListener('click',function(){
  mail=document.getElementById('email').value;
  console.log(mail);
   
  sellmailCount=2;
})

function sendMailssell(){
  var params={
    email:mail,
    message:'Selling Price Triggered',
  };

  const serviceID="service_c66qlcf";
const templateID="template_hk2qec8";
emailjs.send(serviceID,templateID,params)
.then(
  res=>{
    document.getElementById('email').value="";
    alert('Price Triggered');
    console.log(res);
  }
)


}


const buymailbtn=document.getElementById('submitmailbuy');
buymailbtn.addEventListener('click',function(){
  buymail=document.getElementById('emailbuy').value;
  console.log(buymail);
   
  buymailCount=2;
})

function sendMailsbuy(){
  var params={
    email:mail,
    message:'Buying Price Triggered',
  };

  const serviceID="service_c66qlcf";
const templateID="template_hk2qec8";
emailjs.send(serviceID,templateID,params)
.then(
  res=>{
    document.getElementById('email').value="";
    alert('Price Triggered');
    console.log(res);
  }
)


}


