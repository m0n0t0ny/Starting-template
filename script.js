function funcLoadImages(searchKeyword) {
  fetch(`https://api.pexels.com/v1/search?query=${searchKeyword}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer zilYFy4tUGgCZj1EAKQ7i6rKXiMIshbnJmVeKQB1hGU7oQGIYokoAxzx"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      const photos = data.photos;
      console.log(" -----------------------------");
      console.log("arrayOfPhotos:", photos);
      console.log(" -----------------------------");

      const row = document.getElementById("row");

      photos.forEach((photo) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        row.appendChild(col);

        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm h-100";
        col.appendChild(card);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        if (photo.src.large) {
          const img = document.createElement("img");
          img.className = "card-img-top";
          img.src = photo.src.large;
          img.alt = photo.alt;
          img.style.objectFit = "cover";
          img.style.width = "100%";
          img.style.height = "300px";
          card.appendChild(img);
        }

        if (photo.photographer) {
          const title = document.createElement("h6");
          title.className = "card-title";
          title.textContent = `Photographer: ${photo.photographer}`;
          cardBody.appendChild(title);
        }

        card.appendChild(cardBody);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const loadImages = document.getElementById("load-images");
loadImages.addEventListener("click", () => {
  funcLoadImages("tree");
});

const loadSecondaryImages = document.getElementById("load-secondary-images");
loadSecondaryImages.addEventListener("click", () => {
  funcLoadImages("cats");
});
