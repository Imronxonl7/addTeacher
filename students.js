let content = document.getElementById("students-cards");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let studentBtn = document.getElementById("studentBtn");
let pagination = document.getElementById("pagination");
let selected = null;
let page = 1;
let allStudents = [];
let sortName = document.getElementById("sortName");
let sortNameValue = "";
let search = document.getElementById("search");
let searchValue = "";
let filterProfession = document.getElementById("filterProfession");
let professionValue = "all";

filterProfession.addEventListener("click", function (e) {
  professionValue = e.target.value;
  getStudentsData(content, page, sortNameValue, searchValue, professionValue);
});

search.addEventListener("input", function (e) {
  searchValue = e.target.value;
  getStudentsData(content, page, sortNameValue, searchValue, professionValue);
});
sortName.addEventListener("click", function (e) {
  sortNameValue = e.target.value;
  getStudentsData(content, page, sortNameValue, searchValue, professionValue);
});
// Format date helper
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function getStudentsData(
  content,
  page,
  sortNameValue,
  searchValue,
  professionValue
) {
  try {
    let res = await axios.get(
      `https://69243f273ad095fb84735a27.mockapi.io/students?page=${page}&limit=16${
        sortNameValue === "default" ? "" : `&sortBy=name&order=${sortNameValue}`
      }${searchValue ? `&search=${searchValue}` : ""}${
        professionValue === "all" ? "" : `&grade=${professionValue}`
      }`
    );

    let allRes = await axios.get(
      "https://69243f273ad095fb84735a27.mockapi.io/students"
    );
    let allStudents = allRes.data;
    let allProfession = allStudents.map((el) => el.grade);
    let professions = [...new Set(allProfession)];
    professions.map((el) => {
      filterProfession.innerHTML += `
      <option value="${el}">${el}</option>`;
    });
    let pages = Math.ceil(allRes.data.length / 16);

    // Build pagination
    pagination.innerHTML = "";
    pagination.innerHTML += `
                    <li>
                        <a href="javascript:void(0)"
                        data-page="${page - 1}"
                        class="page-link ${
                          page === 1 ? "hidden" : ""
                        } flex items-center justify-center text-body text-fg-brand rounded-l-md text-body bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9">
                                    Previous
                        </a>
                    </li>`;
    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `
                    <li>                    
                         <a href="javascript:void(0)"
                            data-page="${i}"
                            class="page-link ${
                              page === i ? "dark:bg-gray-900 bg-black-300" : ""
                            } flex items-center justify-center text-body text-fg-brand dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-neutral-tertiary-medium hover:text-heading text-sm w-10 h-9">
                                                                ${i}
                        </a>
                    </li>`;
    }
    pagination.innerHTML += `
                    <li>
                        <a href="javascript:void(0)"
                        data-page="${page + 1}"
                        class="page-link ${
                          page === pages ? "hidden" : ""
                        } flex items-center justify-center text-body text-fg-brand rounded-r-md text-body bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9">
                                                                Next
                        </a>
                    </li>`;

    // Build student cards
    content.innerHTML = "";
    res.data.forEach((el) => {
      content.innerHTML += `
        <div class="student-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 group" data-id="${
          el.id
        }">
            <div class="flex flex-col items-center text-center mb-4">
                <span data-slot="avatar" class="relative flex size-10 shrink-0 overflow-hidden rounded-full h-20 w-20 mb-3 ring-4 ring-purple-100 dark:ring-purple-900">
                    <img data-slot="avatar-image" class="aspect-square size-full object-cover"
                        alt="${el.name}"
                        src="${el.avatar}"
                        onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                          el.name
                        )}&background=6366f1&color=fff'">
                </span>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">${
                  el.name
                }</h3>
                <div class="flex items-center gap-2 mb-3">
                    <span data-slot="badge" class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-blue-500 text-blue-600 dark:text-blue-400">
                        Grade ${el.grade}
                    </span>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">${
                      el.age
                    } years old</span>
                </div>
                <div class="w-full space-y-2 mb-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">${
                              el.rating
                            }</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coins h-4 w-4 text-yellow-500">
                                <circle cx="8" cy="8" r="6"></circle>
                                <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                                <path d="M7 6h1v4"></path>
                                <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">${
                              el.coin
                            }</span>
                        </div>
                    </div>
                    <div class="bg-gray-200 dark:bg-gray-700 w-full overflow-hidden rounded-full h-2">
                        <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all" style="width: ${Math.min(
                          el.rating,
                          100
                        )}%;"></div>
                    </div>
                </div>
            </div>
            <div class="space-y-2 mb-4">
                <div
                                                        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="lucide lucide-phone h-4 w-4 flex-shrink-0 text-blue-500"
                                                            aria-hidden="true">
                                                            <path
                                                                d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384">
                                                            </path>
                                                        </svg><span class="truncate">${
                                                          el.createdAt
                                                        }</span></div>
                <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail h-4 w-4 flex-shrink-0 text-green-500">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span class="truncate">${el.yahoo}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send h-4 w-4 flex-shrink-0 text-blue-400">
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                        <path d="m21.854 2.147-10.94 10.939"></path>
                    </svg>
                    <span class="truncate">@${el.telegram}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin h-4 w-4 flex-shrink-0 text-blue-600">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span class="truncate">${el.linkedin}</span>
                </div>
            </div>
            <div class="flex gap-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button data-action="edit" data-id="${
                  el.id
                }" class="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium text-gray-800 dark:text-gray-200 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </button>
                <button data-action="delete" data-id="${
                  el.id
                }" class="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-300 text-sm font-medium transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </div>`;
    });
  } catch (err) {
    console.log(err);
  }
}

// Event delegation for student cards (edit/delete buttons)
content.addEventListener("click", function (e) {
  const button = e.target.closest("button[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "edit") {
    editStudent(id);
  } else if (action === "delete") {
    deleteStudent(id);
  }
});

// Event delegation for pagination
pagination.addEventListener("click", function (e) {
  const link = e.target.closest("a.page-link");
  if (!link) return;

  e.preventDefault();
  const pageNum = parseInt(link.dataset.page);
  if (pageNum >= 1) {
    changePage(pageNum);
  }
});

getStudentsData(content, page, sortNameValue, searchValue, professionValue);

function changePage(i) {
  if (i < 1) return;
  page = i;
  getStudentsData(content, i, sortNameValue, searchValue, professionValue);
}

async function addStudent(studentObj) {
  try {
    console.log("Attempting to save student:", studentObj);

    if (selected) {
      await axios.put(
        `https://69243f273ad095fb84735a27.mockapi.io/students/${selected}`,
        studentObj
      );
      console.log("Student updated successfully!");
    } else {
      await axios.post(
        "https://69243f273ad095fb84735a27.mockapi.io/students",
        studentObj
      );
      console.log("Student created successfully!");
      page = 1;
    }

    await getStudentsData(content, page);
    outerModal.classList.add("hidden");
    form.reset();
    selected = null;
  } catch (err) {
    console.error("Error saving student:", err);
    alert("Error saving student: " + (err.response?.data || err.message));
  }
}

studentBtn.addEventListener("click", function (e) {
  outerModal.classList.remove("hidden");
  form.reset();
  selected = null;
});

outerModal.addEventListener("click", function () {
  outerModal.classList.add("hidden");
  selected = null;
});

form.addEventListener("click", function (e) {
  e.stopPropagation();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let studentObj = {
    name: form.elements[0].value.trim(),
    grade: form.elements[1].value,
    linkedin: form.elements[2].value.trim(),
    yahoo: form.elements[3].value.trim(),
    age: form.elements[4].value,
    coin: form.elements[5].value,
    avatar: form.elements[6].value.trim(),
    telegram: form.elements[7].value.trim(),
    rating: form.elements[8].value,
    gender: form.elements[9].checked,
  };

  if (!studentObj.name || !studentObj.yahoo) {
    alert("Please fill in at least the Name and Email fields!");
    return;
  }

  addStudent(studentObj);
});

async function editStudent(id) {
  console.log("Editing student ID:", id);
  outerModal.classList.remove("hidden");
  selected = id;

  try {
    let res = await axios.get(
      `https://69243f273ad095fb84735a27.mockapi.io/students/${id}`
    );

    form.elements[0].value = res.data.name || "";
    form.elements[1].value = res.data.grade || "";
    form.elements[2].value = res.data.linkedin || "";
    form.elements[3].value = res.data.yahoo || "";
    form.elements[4].value = res.data.age || "";
    form.elements[5].value = res.data.coin || "";
    form.elements[6].value = res.data.avatar || "";
    form.elements[7].value = res.data.telegram || "";
    form.elements[8].value = res.data.rating || "";
    form.elements[9].checked = res.data.gender || false;
  } catch (err) {
    console.error("Error loading student:", err);
    alert("Error loading student: " + (err.response?.data || err.message));
    outerModal.classList.add("hidden");
    selected = null;
  }
}

async function deleteStudent(id) {
  console.log("Deleting student ID:", id);

  if (!confirm("Are you sure you want to delete this student?")) {
    return;
  }

  try {
    await axios.delete(
      `https://69243f273ad095fb84735a27.mockapi.io/students/${id}`
    );

    console.log("Student deleted successfully!");

    // Refresh data
    let allRes = await axios.get(
      "https://69243f273ad095fb84735a27.mockapi.io/students"
    );

    let totalPages = Math.ceil(allRes.data.length / 16);

    if (page > totalPages && totalPages > 0) {
      page = totalPages;
    } else if (totalPages === 0) {
      page = 1;
    }

    await getStudentsData(content, page);
  } catch (err) {
    console.error("Error deleting student:", err);
    alert("Error deleting student: " + (err.response?.data || err.message));
  }
}
