document.addEventListener("DOMContentLoaded", function (e) {
    var rackListElement = document.getElementsByTagName('rack-list');
    populate();
});

async function populate() {
    var responseData;
    try {
        const serverResponse = await fetch("/load/racks", { method: "POST", })
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

    var serverCount = 0;
    console.log("Rack: " + Object.keys(rack));

    document.getElementById("rack-list").appendChild(newRack);

    Object.keys(rack).forEach(server => {
        if (server != "name") {
            createNewServer(server, rackCount, serverCount);
            serverCount++;
        }
    });
}

async function createNewServer(server, rackCount, serverCount) {
    var newServer = document.createElement("div");
    newServer.setAttribute("id", "rack-" + rackCount + "-server-0" + serverCount);
    newServer.setAttribute("class", "server");
    document.getElementById("rack-" + rackCount).appendChild(newServer);

    for (let i = 0; i < 3; i++) {
        var newServerVentsParrent = document.createElement("div");
        newServerVentsParrent.setAttribute("class", "server-vents");
        newServer.appendChild(newServerVentsParrent);
        for (let j = 0; j < 3; j++) {
            var newServerVents = document.createElement("span");
            newServerVents.setAttribute("class", "vent");
            newServerVentsParrent.appendChild(newServerVents);
        }
    }

    var newServerStatusParrent = document.createElement("div");
    newServerStatusParrent.setAttribute("class", "status-light");
    newServer.appendChild(newServerStatusParrent);

    var statusOutter = document.createElement("span");
    statusOutter.setAttribute("class", "outer");
    newServerStatusParrent.appendChild(statusOutter);

    var statusInner = document.createElement("span");
    statusInner.setAttribute("class", "inner");
    statusOutter.appendChild(statusInner);
}