const closeButton = document.querySelector("dialog button");
const dialog = document.querySelector("dialog");

document.addEventListener("DOMContentLoaded", function (e) {
    populate();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

async function populate() {
    var responseData;
    try {
        await fetch("/load/racks", { method: "POST", })
            .then((response) => response.json())
            .then((json) => responseData = json);

        console.log(responseData);
        var index = 0;

        responseData.forEach((rack) => {
            createNewRack(rack, index)
            index++;
        });

    } catch (error) {
        console.error(error);
    }
}

async function createNewRack(rack, rackCount) {
    var newRack = document.createElement("div");
    newRack.setAttribute("id", "rack-" + rackCount)
    newRack.setAttribute("class", "rack");

    document.getElementById("rack-list").appendChild(newRack);

    var serverCount = 0;
    Object.keys(rack).forEach(server => {
        if (rack[server] == "empty"){
            createNewEmptySlot(server, rackCount, serverCount);
        }
        else if (server != "name") {
            createNewServer(rack[server], rackCount, serverCount);
            serverCount++;
        }
    });
}

async function createNewEmptySlot(server, rackCount, serverCount){
    var newServer = document.createElement("div");
    newServer.setAttribute("class", "empty-server");
    document.getElementById("rack-" + rackCount).appendChild(newServer);
}

async function createNewServer(server, rackCount, serverCount) {
    var newServer = document.createElement("div");
    newServer.setAttribute("id", "server-" + serverCount);
    newServer.setAttribute("class", "server");
    document.getElementById("rack-" + rackCount).appendChild(newServer);

    newServer.addEventListener('click', async function (event) {
        var mousePos = {};
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;

        const dialogWidth = dialog.offsetWidth;  // Get the width of the dialog
        const dialogHeight = dialog.offsetHeight; // Get the height of the dialog
        const screenWidth = window.innerWidth / 2   // Get the width of the screen
        const screenHeight = window.innerHeight / 2; // Get the height of the screen

        dialog.style.left = (mousePos.x - screenWidth - dialogWidth) + 'px';
        dialog.style.top = (mousePos.y - screenHeight - dialogHeight) + 'px';


        var responseDataServer;
        await fetch("/load/server", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hostname: server }),
        })
            .then(response => response.json())
            .then((json) => {
                responseDataServer = json;
            });

        console.log(responseDataServer);

        document.getElementById("dialog-hostname").innerHTML = "Hostname: " + responseDataServer.hostname;
        document.getElementById("dialog-ip").innerHTML = "IP: " + responseDataServer.ip;
        document.getElementById("dialog-location").innerHTML = "Location: " + responseDataServer.location;
        document.getElementById("dialog-owner").innerHTML = "Lwner: " + responseDataServer.owner;
        document.getElementById("dialog-os").innerHTML = "OS: " + responseDataServer.OS;

        dialog.showModal();
    });

    var newServerItemBox = document.createElement("div");
    newServerItemBox.setAttribute("class", "serverItemBox");
    newServer.appendChild(newServerItemBox);

    var newServerNameBox = document.createElement("div");
    newServerNameBox.setAttribute("class", "serverNameBox");
    newServer.appendChild(newServerNameBox);

    newServerNameBox.insertAdjacentHTML("afterbegin", "<p>" + server + "</p>")

    for (let i = 0; i < 3; i++) {
        var newServerVentsParrent = document.createElement("div");
        newServerVentsParrent.setAttribute("class", "server-vents");
        newServerItemBox.appendChild(newServerVentsParrent);
        for (let j = 0; j < 3; j++) {
            var newServerVents = document.createElement("span");
            newServerVents.setAttribute("class", "vent");
            newServerVentsParrent.appendChild(newServerVents);
        }
    }

    var newServerStatusParrent = document.createElement("div");
    newServerStatusParrent.setAttribute("class", "status-light");
    newServerStatusParrent.setAttribute("id", "status-light");
    newServerItemBox.appendChild(newServerStatusParrent);

    var statusOutter = document.createElement("span");
    statusOutter.setAttribute("class", "outer-offline");
    statusOutter.setAttribute("id", "status-" + rackCount + "-" + serverCount);
    newServerStatusParrent.appendChild(statusOutter);

    var statusInner = document.createElement("span");
    statusInner.setAttribute("class", "inner");
    statusOutter.appendChild(statusInner);
}