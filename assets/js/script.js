"use strict";

// Hàm toggle lớp "active"
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// **Sidebar**
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Toggle sidebar cho thiết bị di động
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// **Testimonials và Modal**
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Hàm toggle modal
const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Thêm sự kiện mở modal cho mỗi testimonials
testimonialsItems.forEach((item) => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    toggleModal();
  });
});

// Đóng modal khi nhấn vào nút hoặc overlay
modalCloseBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

// **Chọn lọc**
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle chọn lọc
select.addEventListener("click", () => elementToggleFunc(select));

// Thêm sự kiện chọn cho từng mục
selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Hàm lọc
const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    if (selectedValue === "all" || item.dataset.category === selectedValue) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Xử lý sự kiện nút lọc
let lastClickedBtn = filterBtns[0];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

// **Form liên hệ**
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const successPopup = document.querySelector("[data-success-popup]");

// Kiểm tra trạng thái hợp lệ của form
form.addEventListener("input", () => {
  if (form.checkValidity()) {
    formBtn.removeAttribute("disabled");
    formBtn.setAttribute("aria-disabled", "false");
  } else {
    formBtn.setAttribute("disabled", "");
    formBtn.setAttribute("aria-disabled", "true");
  }
});

// Xử lý gửi form và hiển thị thông báo
form.addEventListener("submit", (event) => {
  event.preventDefault();
  successPopup.classList.add("active");
  setTimeout(() => {
    successPopup.classList.remove("active");
  }, 3000);
  form.reset();
  formBtn.setAttribute("disabled", "");
  formBtn.setAttribute("aria-disabled", "true");
});

// **Điều hướng trang**
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Thêm sự kiện điều hướng
navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetPage = link.dataset.navLink; // ✅ Lấy từ data-nav-link thay vì innerHTML

    pages.forEach((page) => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach((navLink) => {
      navLink.classList.toggle("active", navLink === link);
    });

    // Scroll về đầu trang
    window.scrollTo(0, 0);
  });
});

