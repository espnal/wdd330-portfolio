const ol = document.querySelector('ol');

const links = [{
        label: "Week1 work",
        url: "week1/index.html"
    },
    {
        label: "Week2 work",
        url: "week2/index.html"
    },
    {
        label: "Week3 work",
        url: "week3/index.html"
    },
    {
        label: "Week4 work",
        url: "week4/index.html"
    },
    {
        label: "Week5 work",
        url: "week5/index.html"
    },
    {
        label: "Code Challenge I - To Do App",
        url: "todoapp/index.html"
    },
    {
        label: "Week7 work",
        url: "week7/index.html"
    },
    {
        label: "Week8 work",
        url: "week8/index.html"
    },
    {
        label: "Week9 work",
        url: "week9/index.html"
    },
    {
        label: "Week10 work",
        url: "week10/index.html"
    },
    {
        label: "Authentication with JWT",
        url: "week11/index.html"
    },
    {
        label: "Code Challenge II - Pokedex",
        url: "Pokedex/index.html"
    }
];

links.forEach(function(element) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", element.url)
    let labelName = element.label
    a.innerHTML = labelName
    li.appendChild(a);
    ol.appendChild(li);
})