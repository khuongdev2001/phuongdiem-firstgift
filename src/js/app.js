const images = [
    {
        src: "1.jpg",
        x: 10,
        y: 10
    },
    {
        src: "2.jpg",
        x: 200,
        y: 40
    },
    {
        src: "2.jpg",
        x: 100,
        y: 300
    },
    {
        src: "1.jpg",
        x: 500,
        y: 10
    },
    {
        src: "1.jpg",
        x: 500,
        y: 300
    },
];


const two = new Two({
    fullscreen: true,
    type: Two.Types.canvas
})

const heartClicked = [];
const colors = ["#2ecc71", "#e74c3c", "#f1c40f", "#fd79a8", "#e84393"];

two.appendTo(document.body);

let index = 1;
let is_run = true;

two.bind("update", function () {
    heartClicked.forEach(({ velocity, element }) => {
        element.position.x += velocity.x;
        element.position.y += velocity.y;
    });
})

function handleClickHeart(x, y) {
    const TWO_PI = 2 * Math.PI;
    let length = 0;
    const color = randomColors();
    for (let i = 0; i < TWO_PI; i += 0.2) {
        length++;
        const r = 0.3;
        heartClicked.push({
            velocity: {
                x: r * 10 * Math.pow(Math.sin(i), 3),
                y: -r * (7 * Math.cos(i) - 4 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i))
            },
            element: drawCircle(x, y, color)
        });
    }
    removeHeartClicked(length);
}

function drawCircle(x, y, color) {
    const circle = two.makeCircle(0, 0, 100);
    circle.fill = color;
    // const image = two.makeImageSequence(objectImage.src, 0, 0);
    // image.scale = objectImage.size;
    const particle = two.makeGroup(circle);
    particle.position.set(x, y);
    particle.scale = 0.1;
    particle.border = 10;
    particle.linewidth = 5;
    return particle;
}

function removeHeartClicked(length) {
    setTimeout(() => {
        for (let i = 0; i < length; i++) {
            if (typeof heartClicked[i] != 'undefined') {
                // console.log(heartClicked[i]);
                heartClicked[i].element.remove();
            }
        }
        heartClicked.splice(0, length);
    }, 700);
}


function randomColors() {
    return colors[Math.floor(Math.random() * colors.length)];
}

two.play();

function play() {
    const audio = document.querySelector("audio");
    if (audio.paused) {
        audio.play();
    }
}
// two.makeSprite("src/images/bear.gif", 100, 100,);


const boxGift = document.querySelector(".box-gift");
const giftContent = document.querySelector(".gift-content");
const headTitle = giftContent.querySelector("h3");
const headContent = giftContent.querySelector("p");
const date = new Date();
window.onclick = function () {
    play();
    boxGift.remove();
    giftContent.style.display = "block";
    runText("Diễm Ơi!", 100, function (data) {
        headTitle.textContent = data;
    }, function () {
        runText(`Chúc Em ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} Tràn đầy năng lượng, dễ thương xinh đẹp đáng yêu hơn ngày hôm qua`, 100, function (data) {
            headContent.textContent = data;
        }, function () {
            setInterval(() => {
                handleClickHeart(Math.floor(Math.random() * window.screen.width), Math.floor(Math.random() * window.screen.height));
            }, 100);
        })
    })
    window.onclick = null;
}

function runText(message, delay, callback = function () { }, afterDone = function () { }) {
    const data = message.split("");
    let text = "";
    let index = 0;
    const timmerId = setInterval(() => {
        if (index == data.length) {
            clearInterval(timmerId);
            afterDone();
            return true;
        }
        text += data[index];
        callback(text);
        index++;
    }, delay);
}
