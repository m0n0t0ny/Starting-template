function funcLoadImages(searchKeyword) {
  fetch(`https://api.pexels.com/v1/search?query=${searchKeyword}`, {
    method: "GET",
    headers: {
      Authorization: "zilYFy4tUGgCZj1EAKQ7i6rKXiMIshbnJmVeKQB1hGU7oQGIYokoAxzx"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      const photos = data.photos;
      console.log(" -----------------------------");
      console.log("arrayOfPhotos:", photos);
      console.log(" -----------------------------");

      const row = document.getElementById("row");
      row.innerHTML = "";

      photos.forEach((photo) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        row.appendChild(col);

        const card = document.createElement("div");
        card.className = "card m-1 shadow-sm";
        col.appendChild(card);

        const imgContainer = document.createElement("div");
        imgContainer.style.position = "relative";

        const img = document.createElement("img");
        img.className = "card-img-top";
        img.alt = photo.alt;
        img.style.objectFit = "cover";
        img.style.width = "100%";
        img.style.height = "300px";
        img.src = photo.src.original;
        img.onload = () => hideSpinner(spinner);

        const spinner = document.createElement("div");
        spinner.className = "spinner-border";
        spinner.style.width = "3rem";
        spinner.style.height = "3rem";
        spinner.style.position = "absolute";
        spinner.style.top = "calc(50% - 1.25rem)";
        spinner.style.left = "calc(50% - 1.25rem)";

        imgContainer.appendChild(img);
        imgContainer.appendChild(spinner);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        if (photo.photographer) {
          const title = document.createElement("h6");
          title.className = "card-title";
          title.textContent = `Photographer: ${photo.photographer}`;
          cardBody.appendChild(title);
        }

        card.appendChild(imgContainer);
        card.appendChild(cardBody);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const loadImages = document.getElementById("load-images");
loadImages.addEventListener("click", () => {
  funcLoadImages("dog");
});

const loadSecondaryImages = document.getElementById("load-secondary-images");
loadSecondaryImages.addEventListener("click", () => {
  funcLoadImages("cat");
});

function hideSpinner(spinner) {
  spinner.style.display = "none";
}
