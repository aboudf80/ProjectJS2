"use strict";

// Get elements from the HTML
const contactList    = document.getElementById("contactList");
const searchInput    = document.getElementById("searchInput");
const addBtn         = document.getElementById("addBtn");
const clearAllBtn    = document.getElementById("clearAllBtn");
const showFavoritesBtn = document.getElementById("showFavoritesBtn");
const showAllBtn     = document.getElementById("showAllBtn");
const effectBtn      = document.getElementById("effectBtn");
const popup          = document.getElementById("popup");
const popupForm      = document.getElementById("popupForm");
const formTitle      = document.getElementById("formTitle");
const formName       = document.getElementById("formName");
const formPhone      = document.getElementById("formPhone");
const formEmail      = document.getElementById("formEmail");
const formAddress    = document.getElementById("formAddress");
const formAge        = document.getElementById("formAge");
const formNotes      = document.getElementById("formNotes");
const formImage      = document.getElementById("formImage");
const cancelBtn      = document.getElementById("cancelBtn");
const contactCounter = document.getElementById("contactCounter");
const noContactsMsg  = document.getElementById("noContactsMsg");
const nameRedBtn = document.getElementById("nameRedBtn");
const phoneBoldBtn = document.getElementById("phoneBoldBtn");
const btnHideUnder30       = document.getElementById("btnHideUnder30");
const btnResetHidden       = document.getElementById("btnResetHidden");
const nameBoldBtn     = document.getElementById("nameBoldBtn");
const btnClearImages    = document.getElementById("btnClearImages");
const btnDarkCardToggle    = document.getElementById("btnDarkCardToggle");

// Contact list data
let contacts = [
  {
    name: "Ahmad Aboud",
    phone: "0549535907",
    email: "ahmad@example.com",
    address: "Illut",
    age: "25",
    notes: "Coder",
    image: "pictures/Ahmad_Aboud.jpg",
    favorite: false
  },
  {
    name: "Zahra Halabi",
    phone: "0549535908",
    email: "zahra@example.com",
    address: "Daliyat",
    age: "28",
    notes: "Partner",
    image: "pictures/Zahra_Halabi.jpg",
    favorite: true
  }
];

let editIndex = null;
let showingFavorites = false;

// Count and display how many contacts
function updateCounter() {
  const allItems = contactList.getElementsByTagName("li");
  let count = 0;
  for (let i = 0; i < allItems.length; i++) {
    if (allItems[i].style.display !== "none") {
      count++;
    }
  }
  contactCounter.textContent = "Total: " + count + " contact" + (count !== 1 ? "s" : "");
  noContactsMsg.classList.toggle("hidden", count !== 0);
}

// Render contact list
function renderList() {
  contactList.innerHTML = "";

  let listToShow = contacts;
  if (showingFavorites) {
    listToShow = contacts.filter(c => c.favorite === true);
  }

  for (let i = 0; i < listToShow.length; i++) {
    const c = listToShow[i];
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = c.image || "pictures/default.jpg";
    img.alt = c.name;

    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = c.name;

    const phoneSpan = document.createElement("span");
    phoneSpan.className = "phone";
    phoneSpan.textContent = c.phone;

    const actions = document.createElement("span");
    actions.className = "actions";

  const editBtn = document.createElement("button");
editBtn.innerHTML = "&#x270F;"; // ✏️
editBtn.onclick = function () {
  openForm(false, i);
};

const viewBtn = document.createElement("button");
viewBtn.innerHTML = "&#x2139;"; // ℹ️
viewBtn.onclick = function () {
  openForm(true, i);
};

const deleteBtn = document.createElement("button");
deleteBtn.innerHTML = "&#x1F5D1;"; // 🗑️
deleteBtn.onclick = function () {
  if (confirm("Delete " + c.name + "?")) {
    contacts.splice(i, 1);
    renderList();
  }
};

const favBtn = document.createElement("button");
favBtn.innerHTML = c.favorite ? "★" : "☆"; // Star icons
favBtn.className = "favorite";
favBtn.onclick = function () {
  c.favorite = !c.favorite;
  renderList();
};

    actions.append(editBtn, viewBtn, deleteBtn, favBtn);
    li.append(img, nameSpan, phoneSpan, actions);
    contactList.appendChild(li);
  }
  updateCounter();
}

// Filter contacts
searchInput.oninput = function () {
  const term = searchInput.value.toLowerCase();
  const items = contactList.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    const nameText = items[i].getElementsByClassName("name")[0].textContent.toLowerCase();
    items[i].style.display = nameText.includes(term) ? "" : "none";
  }
  updateCounter();
};

// Open popup form
function openForm(readOnly, index) {
  popup.classList.remove("hidden");
  popupForm.reset();

  if (index !== null) {
    formTitle.textContent = readOnly ? "View Contact" : "Edit Contact";
    const c = contacts[index];
    formName.value = c.name;
    formPhone.value = c.phone;
    formEmail.value = c.email;
    formAddress.value = c.address;
    formAge.value = c.age;
    formNotes.value = c.notes;
    formImage.value = c.image;

    editIndex = index;

    let fields = popupForm.querySelectorAll("input, textarea");
    for (let i = 0; i < fields.length; i++) {
      if (readOnly) {
        if (!fields[i].value) {
          fields[i].style.display = "none";
        } else {
          fields[i].style.display = "";
        }
        fields[i].disabled = true;
      } else {
        fields[i].style.display = "";
        fields[i].disabled = false;
      }
    }

    popupForm.querySelector("button[type=submit]").style.display = readOnly ? "none" : "";
  } else {
    formTitle.textContent = "Add Contact";
    editIndex = null;
  }
}

// Close popup
cancelBtn.onclick = function () {
  popup.classList.add("hidden");
};

// Submit popup form
popupForm.onsubmit = function (e) {
  e.preventDefault();

  const name = formName.value.trim();
  const phone = formPhone.value.trim();
  const email = formEmail.value.trim();
  const address = formAddress.value.trim();
  const age = formAge.value.trim();
  const notes = formNotes.value.trim();
  const image = formImage.value.trim() || "pictures/default.jpg";

  if (!name || !phone) {
    alert("Name and phone are required.");
    return;
  }

  if (isNaN(phone) || phone.length !== 10) {
    alert("Phone must be 10 digits.");
    return;
  }

  if (age && (isNaN(age) || age <= 0 || age > 120)) {
    alert("Age must be between 1 and 120.");
    return;
  }

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === name && i !== editIndex) {
      alert("Duplicate name.");
      return;
    }
  }

  const newContact = {
    name: name,
    phone: phone,
    email: email,
    address: address,
    age: age,
    notes: notes,
    image: image,
    favorite: false
  };

  if (editIndex !== null) {
    contacts[editIndex] = newContact;
  } else {
    contacts.push(newContact);
  }

  popup.classList.add("hidden");
  renderList();
};

// Button events
addBtn.onclick = function () {
  openForm(false, null);
};

clearAllBtn.onclick = function () {
  if (confirm("Clear all contacts?")) {
    contacts = [];
    renderList();
  }
};

showFavoritesBtn.onclick = function () {
  showingFavorites = true;
  renderList();
};
nameRedBtn.onclick = function () {
  const names = document.getElementsByClassName("name");
  for (let i = 0; i < names.length; i++) {
    names[i].style.color = "red";
  }
};

phoneBoldBtn.onclick = function () {
  const phones = document.getElementsByClassName("phone");
  for (let i = 0; i < phones.length; i++) {
    phones[i].style.fontWeight = "bold";
  }
};

showAllBtn.onclick = function () {
  showingFavorites = false;
  renderList();
};

effectBtn.onclick = function () {
  document.body.classList.toggle("fancy-effect");
};

nameBoldBtn.onclick = () => {
  const namesElements =  document.querySelectorAll(".contact-list .name");
  namesElements.forEach(name => {
    name.style.fontWeight = "bold";
  });
};


btnClearImages.onclick = function () {
  for (let i = 0; i < contacts.length; i++) {
    contacts[i].image = "";
  }
  renderList();
};

btnHideUnder30.onclick = function () {
  const items = contactList.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    const nameEl = items[i].querySelector(".name");
    const contact = contacts.find(c => c.name === nameEl.textContent);
    if (contact && contact.age < 30) {
      items[i].style.display = "none";
    }
  }
  
  updateCounter();
};
// the same as showAll but in other way.
btnResetHidden.onclick = function () {
  const items = contactList.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "";
  }
  updateCounter();
};

btnDarkCardToggle.onclick = function () {
  const items = contactList.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.toggle("dark-card");
  }
};

// Start
renderList();