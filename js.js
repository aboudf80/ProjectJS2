  "use strict";

  // Get references to HTML elements
  const contactList    = document.getElementById("contactList");
  const searchInput    = document.getElementById("searchInput");
  const addBtn         = document.getElementById("addBtn");
  const clearAllBtn    = document.getElementById("clearAllBtn");
  const effectBtn      = document.getElementById("effectBtn");
  const popup          = document.getElementById("popup");
  const popupForm      = document.getElementById("popupForm");
  const formTitle      = document.getElementById("formTitle");
  const formName       = document.getElementById("formName");
  const formPhone      = document.getElementById("formPhone");
  const formAddress    = document.getElementById("formAddress");
  const formEmail      = document.getElementById("formEmail");
  const formAge        = document.getElementById("formAge");
  const formNotes      = document.getElementById("formNotes");
  const formImage      = document.getElementById("formImage");
  const cancelBtn      = document.getElementById("cancelBtn");
  const contactCounter = document.getElementById("contactCounter");
  const noContactsMsg  = document.getElementById("noContactsMsg");
  const showFavouritesBtn = document.getElementById("showFavouritesBtn");
  const showAllBtn        = document.getElementById("showAllBtn");
  const redNamesBtn       = document.getElementById("redNamesBtn");
  const phoneBoldBtn       = document.getElementById("phoneBoldBtn");
  const btnHideUnder30       = document.getElementById("btnHideUnder30");
  const btnResetHidden       = document.getElementById("btnResetHidden");
  const nameBoldBtn     = document.getElementById("nameBoldBtn");
  const btnClearImages    = document.getElementById("btnClearImages");
  const btnDarkCardToggle    = document.getElementById("btnDarkCardToggle");
  const btnSortByNameAZ    = document.getElementById("btnSortByNameAZ");
  const btnSortByAgeDesc    = document.getElementById("btnSortByAgeDesc");
  const btnCountFavorites   = document.getElementById("btnCountFavorites");
  const btnAverageAge    = document.getElementById("btnAverageAge");

  const defaultImage = "pictures/default.jpg";
  let editIndex = null;

  // Initial contacts
  const contacts = [
    {
      name: "Ahmad Aboud", phone: "0549535907",
      address: "IL ILLUT 16970", email: "ahmad.aboud576@gmail.com",
      age: "20", notes: "Professional coder",
      image: "pictures/Ahmad_Aboud.jpg", favourite: false
    },
    {
      name: "Nizar Jarayse", phone: "0526579472",
      address: "IL, Ma'alot-Tarshiha, 2101803", email: "jarayse@gmail.com",
      age: "30", notes: "CEO", image: "pictures/Nizar_Jarayse.jpg", favourite: false
    },
    {
      name: "Zahra Halabi", phone: "0546146092",
      address: "IL, Daliyat al-Karmel, 3005600", email: "zahra_halabi92@gmail.com",
      age: "28", notes: "Partner", image: "pictures/Zahra_Halabi.jpg", favourite: false
    },
    {
      name: "Aiman Khashan", phone: "0543564203",
      address: "IL, Shefa-Amr, 202001", email: "aaimn98@gmail.com",
      age: "24", notes: "Partner", image: "pictures/Aiman_Khashan.jpg", favourite: false
    },
    {
      name: "Ammar Mansour", phone: "0548150032",
      address: "IL, Isfiya, 3009000", email: "amar.mns.95@gmail.com",
      age: "25", notes: "Partner", image: "pictures/Ammar_Mansour.jpg", favourite: true
    }
  ];

  // Hover effect
  const attachHover = li => {
    li.addEventListener("mouseover", () => li.classList.add("hovered"));
    li.addEventListener("mouseout", () => li.classList.remove("hovered"));
  };

  // Update counter
  const updateCounter = () => {
    const lis = contactList.querySelectorAll("li");
    let visible = 0;
    lis.forEach(li => {
      if (li.style.display !== "none") visible++;
    });
    contactCounter.textContent = `Total: ${visible} contact${visible !== 1 ? "s" : ""}`;
    noContactsMsg.classList.toggle("hidden", visible !== 0);
  };

  // Render contacts
  const renderList = () => {
    
    contactList.innerHTML = "";

    contacts.forEach((c, i) => {
      const li = document.createElement("li");
      li.dataset.address = c.address;
      li.dataset.email = c.email;
      li.dataset.age = c.age;
      li.dataset.notes = c.notes;

      const img = document.createElement("img");
      img.src = c.image || defaultImage;
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
      editBtn.innerHTML = "&#x270F;&#xFE0F;";
      editBtn.onclick = () => showPopup(li, false);

      const viewBtn = document.createElement("button");
      viewBtn.innerHTML = "&#x2139;&#xFE0F;";
      viewBtn.onclick = () => showPopup(li, true);

      const delBtn = document.createElement("button");
      delBtn.innerHTML = "&#x1F5D1;&#xFE0F;";
      delBtn.onclick = () => {
        if (confirm(`Are you sure you want to delete “${c.name}”?`)) {
          contacts.splice(i, 1);
          renderList();
        }
      };

      const favBtn = document.createElement("button");
      favBtn.className = "favourite";
      favBtn.innerHTML = c.favourite ? "★" : "☆";
      if (c.favourite) favBtn.classList.add("active");
      favBtn.onclick = () => {
        c.favourite = !c.favourite;
        renderList();
      };

      actions.append(editBtn, viewBtn, delBtn, favBtn);
      li.append(img, nameSpan, phoneSpan, actions);
      attachHover(li);
      contactList.appendChild(li);
    });

    updateCounter();
  };

  // Search filter
  const filterList = () => {
    const term = searchInput.value.toLowerCase();
    contactList.querySelectorAll("li").forEach(li => {
      const name = li.querySelector(".name").textContent.toLowerCase();
      li.style.display = name.includes(term) ? "" : "none";
    });
    updateCounter();
  };

  // Show popup
  const showPopup = (li = null, readonly = false) => {
    popup.classList.remove("hidden");

    if (li) {
      formTitle.textContent = readonly ? "View Contact" : "Edit Contact";
      formName.value = li.querySelector(".name").textContent;
      formPhone.value = li.querySelector(".phone").textContent;
      formAddress.value = li.dataset.address;
      formEmail.value = li.dataset.email;
      formAge.value = li.dataset.age;
      formNotes.value = li.dataset.notes;
      formImage.value = li.querySelector("img").src;

      const all = Array.from(contactList.children);
      editIndex = all.indexOf(li);
    } else {
      formTitle.textContent = "Add Contact";
      popupForm.reset();
      editIndex = null;
    }

    popupForm.querySelectorAll("input, textarea").forEach(field => {
      field.disabled = readonly;
      field.style.display = readonly && !field.value.trim() ? "none" : "";
    });

    popupForm.querySelector("button[type=submit]").style.display = readonly ? "none" : "";
  };

  // Hide popup
  const hidePopup = () => {
    popup.classList.add("hidden");
    popupForm.reset();
    editIndex = null;
  };

  // Form submit
  popupForm.addEventListener("submit", e => {
    e.preventDefault();

    const name    = formName.value.trim();
    const phone   = formPhone.value.trim();
    const address = formAddress.value.trim();
    const email   = formEmail.value.trim();
    const age     = formAge.value.trim();
    const notes   = formNotes.value.trim();
    const image   = formImage.value.trim() || defaultImage;

    // ✅ Phone: only 10 digits
    let isAllDigits = true;
    for (let i = 0; i < phone.length; i++) {
      const ch = phone[i];
      if (ch < '0' || ch > '9') {
        isAllDigits = false;
        break;
      }
    }
    if (!isAllDigits || phone.length !== 10) {
      alert("Phone number must be exactly 10 digits and contain only numbers.");
      return;
    }

    // ✅ Age: must be number between 1 and 120
    if (age === "" || isNaN(age) || Number(age) <= 0 || Number(age) > 120) {
      alert("Age must be a number between 1 and 120.");
      return;
    }

    // ✅ Email: basic check (must include @ and .)
    if (email && (!email.includes("@") || !email.includes("."))) {
      alert("Invalid email address. It must contain '@' and '.'");
      return;
    }

    if (!name || !phone) {
      alert("Name and Phone are required.");
      return;
    }

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name === name && i !== editIndex) {
        alert("Name already exists. Cannot save duplicate.");
        return;
      }
    }

    const entry = {
      name, phone, address, email, age, notes, image,
      favourite: (editIndex !== null) ? contacts[editIndex].favourite : false
    };

    if (editIndex !== null) contacts[editIndex] = entry;
    else contacts.push(entry);

    hidePopup();
    renderList();
    showAllBtn.click();

  });

  // Button handlers
  addBtn.onclick = () => showPopup();
  cancelBtn.onclick = hidePopup;
  clearAllBtn.onclick = () => {
    if (confirm("Are you sure you want to delete ALL contacts?")) {
      contacts.length = 0;
      renderList();
    }
  };
  searchInput.oninput = filterList;
  effectBtn.onclick = () => document.body.classList.toggle("fancy-effect");

  showFavouritesBtn.onclick = () => {
    contactList.querySelectorAll("li").forEach((li, index) => {
      li.style.display = contacts[index].favourite ? "" : "none";
    });
    updateCounter();
  };





  showAllBtn.onclick = () => {
    contactList.querySelectorAll("li").forEach(li => {
      li.style.display = "";
    });
    updateCounter();
  };

  // ✅ Red Names button
  redNamesBtn.onclick = () => {
    const nameElements = document.querySelectorAll(".contact-list .name");
    nameElements.forEach(name => {
      name.style.color = "red";
    });
  };
  phoneBoldBtn.onclick = () => {
    const phoneElements =  document.querySelectorAll(".contact-list .phone");
    phoneElements.forEach(phone => {
      phone.style.fontWeight = "bold";
    });
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

  btnSortByNameAZ.onclick = function () {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    renderList();
  };


 btnSortByAgeDesc.onclick = function () {

  // Convert age to number before sorting
  contacts.sort((a, b) => Number(b.age) - Number(a.age));

  renderList();
};




  btnCountFavorites.onclick = function () {
    const count = contacts.filter(c => c.favourite).length;
    alert("Favorites count: " + count);
  };

  btnAverageAge.onclick = function () {
    const withAge = contacts.filter(c => c.age);
    const avg = withAge.reduce((sum, c) => sum + Number(c.age), 0) / withAge.length;
    alert("Average age: " + Math.round(avg));
  };

  // Initial render
  document.addEventListener("DOMContentLoaded", renderList);
