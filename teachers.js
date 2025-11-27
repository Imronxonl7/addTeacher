let teachersCards = document.getElementById("teachers-cards");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let teacherBtn = document.getElementById("teacherBtn");
let selected = null;
let pagination = document.getElementById("pagination");
let page = 1;
async function getTeachersData(content , page) {
  try {
    let res = await axios.get(
      `https://69243f273ad095fb84735a27.mockapi.io/teachers?page=${page}&limit=8`
    );

    let allRes = await axios.get(
      "https://69243f273ad095fb84735a27.mockapi.io/teachers"
    );
    let pages = Math.ceil(allRes.data.length / 10);


    pagination.innerHTML = ""
    pagination.innerHTML +=`
                    <li>
                        <a href="#"
                        onClick="changePage(${page - 1})"
                                class=" ${page === 1 ? "hidden" : ""} flex items-center justify-center text-body text-fg-brand rounded-l-md      text-body bg-white  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9">
                                    Previous
                        </a>
                    </li>`;
    for(let i = 1 ; i<= pages ; i++){
        pagination.innerHTML += `
                    <li>                    
                         <a href="#"
                            onClick="changePage(${i})"
                                class="${page === i ? "dark:bg-gray-900 bg-black-300" : ""} flex items-center justify-center text-body text-fg-brand dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-neutral-tertiary-medium hover:text-heading text-sm w-10 h-9">
                                                                ${i}
                        </a>
                    </li>`
    }
    pagination.innerHTML +=`
                    <li>
                        <a href="#"
                        onClick="changePage(${page + 1})"
                                class="${page === pages ? "hidden" : ""} flex items-center justify-center text-body text-fg-brand rounded-r-md text-body bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9">
                                                                Next
                        </a>
                    </li>`
    content.innerHTML = "   ";
    res.data.map((el) => {
      content.innerHTML += `
        <div id="teachers-card"
                                                class="text-card-foreground flex flex-col gap-6 rounded-xl border p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 group">
                                                <div class="flex flex-col items-center text-center mb-4"><span
                                                        data-slot="avatar"
                                                        class="relative flex size-10 shrink-0 overflow-hidden rounded-full h-20 w-20 mb-3 ring-4 ring-blue-100 dark:ring-blue-900"><img
                                                            data-slot="avatar-image" class="aspect-square size-full"
                                                            alt="Alicia Moen"
                                                            src=${el.avatar}></span>
                                                    <h3 class="text-gray-900 dark:text-white mb-1">${el.name}</h3><span
                                                        data-slot="badge"
                                                        class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:text-white aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 mb-2">${el.profession}</span>
                                                    <div
                                                        class="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-3">
                                                        <span class="flex items-center gap-1"><svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="lucide lucide-briefcase h-4 w-4"
                                                                aria-hidden="true">
                                                                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16">
                                                                </path>
                                                                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                                                            </svg>${el.experience}y</span><span class="flex items-center gap-1"><svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="lucide lucide-users h-4 w-4" aria-hidden="true">
                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2">
                                                                </path>
                                                                <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                                <circle cx="9" cy="7" r="4"></circle>
                                                            </svg>${el.age}y</span></div>
                                                    <div class="flex items-center gap-1 mb-4"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400"
                                                            aria-hidden="true">
                                                            <path
                                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                            </path>
                                                        </svg><span class="text-gray-900 dark:text-white">${el.rating}</span>
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
                                                        </svg><span class="truncate">${el.createdAt}</span></div>
                                                    <div
                                                        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="lucide lucide-mail h-4 w-4 flex-shrink-0 text-green-500"
                                                            aria-hidden="true">
                                                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                                        </svg><span class="truncate">${el.gmail}</span>
                                                    </div>
                                                    <div
                                                        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="lucide lucide-send h-4 w-4 flex-shrink-0 text-blue-400"
                                                            aria-hidden="true">
                                                            <path
                                                                d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z">
                                                            </path>
                                                            <path d="m21.854 2.147-10.94 10.939"></path>
                                                        </svg><span class="truncate">@${el.science}</span></div>
                                                    <div
                                                        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="lucide lucide-linkedin h-4 w-4 flex-shrink-0 text-blue-600"
                                                            aria-hidden="true">
                                                            <path
                                                                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                                            </path>
                                                            <rect width="4" height="12" x="2" y="9"></rect>
                                                            <circle cx="4" cy="4" r="2"></circle>
                                                        </svg><span class="truncate">linkedin.com/in/${el.linkedin}</span>
                                                    </div>
                                               <div class="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <button
    onClick="editTeacher(${el.id})"
    class="flex-1 flex items-center justify-center gap-2 h-10 rounded-md 
           bg-gray-100 hover:bg-gray-200 
           dark:bg-gray-700 dark:hover:bg-gray-600 
           text-sm font-medium text-gray-800 dark:text-gray-200 transition">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    </svg>
    Edit
  </button>

  
  <button
   onClick="deleteTeacher(${el.id})"
    class="flex-1 flex items-center justify-center gap-2 h-10 rounded-md 
           bg-red-100 hover:bg-red-200 text-red-600
           dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-300
           text-sm font-medium transition">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
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
getTeachersData(teachersCards , page);
function changePage(i){
    getTeachersData(teachersCards , i);
}
async function addTeacher(teacherObj) {
  try {
    if (selected) {
      await axios.put(
        `https://69243f273ad095fb84735a27.mockapi.io/teachers/${selected}`,
        teacherObj
      );
    } else {
      await axios.post(
        "https://69243f273ad095fb84735a27.mockapi.io/teachers",
        teacherObj
      );
    }
    outerModal.classList.add("hidden");
    selected = null;
    getTeachersData(teachersCards);
  } catch (err) {
    console.log(err);
  }
}

teacherBtn.addEventListener("click", function (e) {
  outerModal.classList.remove("hidden");
  for (let el of form) {
    if (el.type === "checkbox") {
      el.checked = false;
    } else {
      el.value = "";
    }
  }
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
  let teacherObj = {};
  teacherObj.name = form[0].value;
  teacherObj.profession = form[1].value;
  teacherObj.linkedin = form[2].value;
  teacherObj.gmail = form[3].value;
  teacherObj.age = form[4].value;
  teacherObj.experience = form[5].value;
  teacherObj.avatar = form[6].value;
  teacherObj.science = form[7].value;
  teacherObj.rating = form[8].value;
  teacherObj.gender = form[9].checked;
  // console.log(form[0].value);
  // console.log(form[1].value);
  // console.log(form[2].value);
  // console.log(form[3].value);
  // console.log(form[4].value);
  // console.log(form[5].value);
  // console.log(form[6].value);
  // console.log(form[7].value);
  // console.log(form[8].value);
  // console.log(form[9].checked);
  // console.log(teacherObj);

  addTeacher(teacherObj);
  selected = null;
});
async function editTeacher(id) {
  outerModal.classList.remove("hidden");
  selected = id;
  try {
    let res = await axios.get(
      `https://69243f273ad095fb84735a27.mockapi.io/teachers/${id}`
    );
    form[0].value = res.data.name;
    form[1].value = res.data.profession;
    form[2].value = res.data.linkedin;
    form[3].value = res.data.gmail;
    form[4].value = res.data.age;
    form[5].value = res.data.experience;
    form[6].value = res.data.avatar;
    form[7].value = res.data.science;
    form[8].value = res.data.rating;
    form[9].checked = res.data.gender;
  } catch (err) {
    console.log(err);
  }
}
async function deleteTeacher(id) {
  try {
    await axios.delete(
      `https://69243f273ad095fb84735a27.mockapi.io/teachers/${id}`
    );
    getTeachersData(teachersCards);
  } catch (err) {
    console.log(err);
  }
}
