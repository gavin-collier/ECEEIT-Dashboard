document.addEventListener("DOMContentLoaded", function (e) {
    var rackListElement = document.getElementsByTagName('rack-list');
});

async function populate() {
    try {
        const response = await fetch('/serverData/load/racks');
        const responseData = await response.json();
        var racks = JSON.parse(responseData);

    } catch (error) {
        console.error(error);
    }
}
