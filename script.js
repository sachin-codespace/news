const API_KEY = "949042188ca14c0abefb3b5b772477de";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", fetchNews("India latest News"));

function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    const res=await
     fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data =await res.json();
    console.log(data);
    if (data && data.articles) {
        bindData(data.articles);
    } else {
        console.log("Error: No articles found in the response");
    }

}

function bindData(articles) {
    const cardsContainer = document.querySelector('.cards-container');
    const newsCardTemplate = document.querySelector('#template-news-cards');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} : ${date}`;
    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank");
    })
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
    document.querySelector('input').value=null;
}

const searchButton=document.querySelector('button');
const searchText=document.querySelector('input');

searchButton.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
})