export {createHeader};


function createHeader(title) {
    header = document.querySelector("#header");
    header.innerHTML = `<div id="logo">
                            <div>${title}</div>
                            <img src="images/icons8-katana-50.png" id="sword">
                        </div>`;
    return header;
}




