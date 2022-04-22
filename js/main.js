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