getStatusUpdate();

async function getStatusUpdate(){
    var responseData;
    await fetch("/ping", { method: "POST", })
    .then((response) => response.json())
    .then((json) => responseData = json);

    console.log(responseData);
    updateLightColor(responseData);

    setTimeout(getStatusUpdate, 5000);
}

async function updateLightColor(racks){
    racks.forEach((rack, index) => {
        console.log("updating rack " + index);
        var currentRack = document.getElementById("rack-" + index);
        Object.keys(rack).forEach((server, indexj) => {
            if (server != "name") {
                var statusLight = document.getElementById("status-" + index + "-" + indexj);

                if (rack[server]){
                    statusLight.className = "outer-online";
                } else {
                    statusLight.className = "outer-offline";
                }
            }
        });
    });
}