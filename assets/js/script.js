//script.js
"use strict";

// Hàm toggle lớp "active"
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// **Sidebar**
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Toggle sidebar cho thiết bị di động
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

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
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

// Thêm sự kiện mở modal cho mỗi testimonials
testimonialsItems.forEach((item) => {
  item.addEventListener("click", () => {
    const avatar = item.querySelector("[data-testimonials-avatar]");
    const title = item.querySelector("[data-testimonials-title]");
    const text = item.querySelector("[data-testimonials-text]");
    
    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle && title) {
      modalTitle.innerHTML = title.innerHTML;
    }
    if (modalText && text) {
      modalText.innerHTML = text.innerHTML;
    }
    toggleModal();
  });
});

// Đóng modal khi nhấn vào nút hoặc overlay
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", toggleModal);
}
if (overlay) {
  overlay.addEventListener("click", toggleModal);
}

// **Chọn lọc**
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // Lưu ý: có typo trong HTML (selecct thay vì select)
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Map các giá trị category (không phụ thuộc vào ngôn ngữ)
const CATEGORY_MAP = {
  'all': ['all', 'tất cả', 'tous', 'alle', 'todos', 'все'],
  'data': ['data', 'dữ liệu', 'données', 'daten', 'datos', 'данные'],
  'Web & Mobile Applications': ['web & ứng dụng di động', 'Web & Mobile Applications'],
  'machine learning': ['machine learning', 'học máy', 'apprentissage automatique', 'máy học'],
  'business': ['business', 'kinh doanh', 'affaires', 'geschäft', 'negocio', 'бизнес']
};

// Hàm chuẩn hóa giá trị category
const normalizeCategory = (text) => {
  const normalizedText = text.toLowerCase().trim();
  
  // Tìm category tương ứng
  for (const [category, variations] of Object.entries(CATEGORY_MAP)) {
    if (variations.some(v => v.toLowerCase() === normalizedText)) {
      return category;
    }
  }
  
  // Nếu không tìm thấy trong map, trả về text gốc đã chuẩn hóa
  return normalizedText;
};

// Toggle chọn lọc
if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

// Thêm sự kiện chọn cho từng mục select
selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Sử dụng data attribute thay vì text content
    let selectedValue = item.dataset.filterValue || normalizeCategory(item.innerText);
    
    // Cập nhật text hiển thị
    if (selectValue) {
      selectValue.innerText = item.innerText;
    }
    
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Hàm lọc
const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    const itemCategory = item.dataset.category;
    
    if (selectedValue === "all" || itemCategory === selectedValue) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Xử lý sự kiện nút lọc
let lastClickedBtn = filterBtns[0];

filterBtns.forEach((btn) => {
  // Thêm data attribute cho button nếu chưa có
  if (!btn.dataset.filterValue) {
    const btnText = btn.innerText.toLowerCase().trim();
    btn.dataset.filterValue = normalizeCategory(btnText);
  }
  
  btn.addEventListener("click", () => {
    // Sử dụng data attribute thay vì text content
    const selectedValue = btn.dataset.filterValue || normalizeCategory(btn.innerText);
    
    // Cập nhật text hiển thị
    if (selectValue) {
      selectValue.innerText = btn.innerText;
    }
    
    filterFunc(selectedValue);
    
    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
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
if (form) {
  form.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn?.removeAttribute("disabled");
      formBtn?.setAttribute("aria-disabled", "false");
    } else {
      formBtn?.setAttribute("disabled", "");
      formBtn?.setAttribute("aria-disabled", "true");
    }
  });
  
  // Xử lý gửi form và hiển thị thông báo
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    if (successPopup) {
      successPopup.classList.add("active");
      setTimeout(() => {
        successPopup.classList.remove("active");
      }, 3000);
    }
    
    form.reset();
    formBtn?.setAttribute("disabled", "");
    formBtn?.setAttribute("aria-disabled", "true");
  });
}

// **Điều hướng trang**
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Thêm sự kiện điều hướng
navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetPage = link.dataset.navLink;
    
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

// **Xử lý Google Translate**
// Thêm MutationObserver để phát hiện khi Google Translate thay đổi DOM
const observeTranslateChanges = () => {
  const observer = new MutationObserver((mutations) => {
    // Cập nhật lại data attributes khi phát hiện thay đổi
    filterBtns.forEach((btn) => {
      if (!btn.dataset.filterValue) {
        const btnText = btn.innerText.toLowerCase().trim();
        btn.dataset.filterValue = normalizeCategory(btnText);
      }
    });
    
    selectItems.forEach((item) => {
      if (!item.dataset.filterValue) {
        const itemText = item.innerText.toLowerCase().trim();
        item.dataset.filterValue = normalizeCategory(itemText);
      }
    });
  });
  
  // Theo dõi thay đổi trong body
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
};

// Khởi động observer sau khi DOM đã sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeTranslateChanges);
} else {
  observeTranslateChanges();
}
