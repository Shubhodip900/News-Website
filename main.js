const api_key="aeda1022899e4a31ab8b9200b2b59e2a";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

function reload() {
    window.location.reload();
}


async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${api_key}`);
    const data =await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const card=document.getElementById("card-container");
    const template=document.getElementById("news-card-template");

    card.innerHTML="";

    articles.forEach((article)=>{
      if(!article.urlToImage) return;
      const clone=template.content.cloneNode(true);
      fillData(clone,article);
      card.appendChild(clone);
    });
}

function fillData(clone , article){
    const newsImg=clone.querySelector('#news-img');
    const newsTitle=clone.querySelector('#news-title');
    const newsSource=clone.querySelector('#news-source');
    const newsText=clone.querySelector('#news-text');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsText.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
   
    newsSource.innerHTML=`${article.source.name}  ${date}`;
    
    clone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let selectedNav =null;
function onNave(id){
 fetchNews(id);

 const navItem = document.getElementById(id);
 selectedNav?.classList.remove("active");
 selectedNav = navItem;
 selectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    selectedNav?.classList.remove("active");
    selectedNav = null;
});