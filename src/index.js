let dropArea = document.getElementById("drop-area");

let filesDone = 0;
let filesToDo = 0;
let progressBar = document.getElementById("progress-bar");

let fileElement = document.getElementById("fileElement");

let formData;

let preventDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

let handleDrop = e => {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
};

let handleFiles = files => {
  files = [...files];
  initializeProgress(files.length);
  files.forEach(uploadFile);
  files.forEach(previewFile);
  setTimeout(() => (progressBar.hidden = true), 500);
};

let uploadFile = file => {
  formData = new FormData();
  formData.append("file", file);
  progressDone();

  // let url = 'some/url';
  // fetch(url, {
  //   method: 'POST',
  //   body: formData
  // })
  //   .then(() => { })
  //   .catch(() => { })
};

let highlight = () => {
  dropArea.classList.add("highlight");
};

let unhighlight = () => {
  dropArea.classList.remove("highlight");
};

let updateImgList = (img, file) => {
  let imageList = document.getElementById("imageList");
  let imgItem = document.querySelector(".imageInfo").cloneNode(true);
  imageList.appendChild(imgItem);
  imgItem.hidden = false;
  imgItem.querySelector(".imageTitle").textContent = file.name;
  imgItem.querySelector(".js_deleteImg").dataset.file = file.name;
  imgItem.querySelector(".js_deleteImg").onclick = e => {
    e.target.parentNode.remove();
    formData.delete("file", file);
    img.remove();
  };
};

let previewFile = file => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    let img = document.createElement("img");
    img.src = reader.result;
    img.dataset.src = file.name;
    document.getElementById("gallery").appendChild(img);
    updateImgList(img, file);
  };
};

let initializeProgress = numfiles => {
  progressBar.hidden = false;
  progressBar.value = 0;
  filesDone = 0;
  filesToDo = numfiles;
};

let progressDone = () => {
  filesDone++;
  progressBar.value = (filesDone / filesToDo) * 100;
};

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener("drop", handleDrop, false);

fileElement.addEventListener(
  "change",
  () => handleFiles(fileElement.files),
  false
);
