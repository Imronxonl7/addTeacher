let toggle = document.getElementById("darkToggle");
let teacherName = document.getElementById("teacherName")
let singleCards = document.getElementById("single-cards")
let path = new URLSearchParams(location.search);
let id = path.get("teacherId")

async function getData() {
    try{
        let res = await axios.get(`https://69243f273ad095fb84735a27.mockapi.io/teachers/${id}`)
        
        let single = res.data;
        teacherName.innerHTML = `
            <span class="cursor-pointer hover:text-blue-600"><a href="./index.html">Dashboard</a></span><span class="mx-1">/</span>
            <span class="cursor-pointer hover:text-blue-600"><a href="./teachers.html" class="cursor-pointer hover:text-blue-600">
                Teachers
            </a></span>
            <span class="mx-1">/</span>
            <span class="text-gray-900 dark:text-white font-medium">
                ${single.name || single.fullName || 'No Name'}
            </span>`
        console.log(single);
        singleCards.innerHTML = `
        <div id="card" class="[&amp;:last-child]:pb-6 p-6">
                                                <div class="flex flex-col items-center text-center"><span
                                                        data-slot="avatar"
                                                        class="relative flex size-10 shrink-0 overflow-hidden rounded-full h-32 w-32 mb-4 ring-4 ring-blue-100 dark:ring-blue-900"><img
                                                            data-slot="avatar-image" class="aspect-square size-full"
                                                            src="${single.avatar}"
                                                            alt="${single.name}"
                                                            /></span>
                                                    <h2 class="text-gray-900 dark:text-white mb-2">${single.name}
                                                    </h2><span data-slot="badge"
                                                        class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 mb-4">${single.profession}</span>
                                                    <div class="w-full space-y-4 mb-6">
                                                        <div class="flex items-center justify-between text-sm"><span
                                                                class="text-gray-600 dark:text-gray-400">Age</span><span
                                                                class="text-gray-900 dark:text-white">${single.age} years</span>
                                                        </div>
                                                        <div class="flex items-center justify-between text-sm"><span
                                                                class="text-gray-600 dark:text-gray-400">Experience</span><span
                                                                class="text-gray-900 dark:text-white">${single.experience} years</span>
                                                        </div>
                                                        <div class="flex items-center justify-between text-sm"><span
                                                                class="text-gray-600 dark:text-gray-400">Gender</span><span
                                                                class="text-gray-900 dark:text-white capitalize">${single.gender === true ? "Male" : "Female"}</span>
                                                        </div>
                                                        <div class="flex items-center justify-between text-sm"><span
                                                                class="text-gray-600 dark:text-gray-400">Rating</span>
                                                            <div class="flex items-center gap-1"><svg
                                                                    xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400"
                                                                    aria-hidden="true">
                                                                    <path
                                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                                    </path>
                                                                </svg><span
                                                                    class="text-gray-900 dark:text-white">${single.rating}</span>
                                                            </div>
                                                        </div>
                                                        <div aria-valuemax="100" aria-valuemin="0" role="progressbar"
                                                            data-state="indeterminate" data-max="100"
                                                            data-slot="progress"
                                                            class="bg-primary/20 relative w-full overflow-hidden rounded-full h-2">
                                                            <div data-state="indeterminate" data-max="100"
                                                                data-slot="progress-indicator"
                                                                class="bg-primary h-full w-full flex-1 transition-all"
                                                                style="transform: translateX(-${100 - single.rating}%);"></div>
                                                        </div>
                                                    </div><button
                                                    data-action="edit" data-id="${single.id}"
                                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full gap-2"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="lucide lucide-pencil h-4 w-4"
                                                            aria-hidden="true">
                                                            <path
                                                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                                                            </path>
                                                            <path d="m15 5 4 4"></path>
                                                        </svg>Edit Profile</button>
                                                </div>
                                            </div>
                                            <div data-slot="card"
                                                class="text-card-foreground flex flex-col gap-6 rounded-xl border lg:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                                <div dir="ltr" data-orientation="horizontal" data-slot="tabs"
                                                    class="flex flex-col gap-2 w-full">
                                                    <div data-slot="card-header"
                                                        class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                                                        <div role="tablist" aria-orientation="horizontal"
                                                            data-slot="tabs-list"
                                                            class="bg-muted text-muted-foreground h-9 items-center justify-center rounded-xl p-[3px] grid w-full grid-cols-2"
                                                            tabindex="0" data-orientation="horizontal"
                                                            style="outline: none;"><button type="button" role="tab"
                                                                aria-selected="true"
                                                                aria-controls="radix-:rr:-content-contact"
                                                                data-state="active" id="radix-:rr:-trigger-contact"
                                                                data-slot="tabs-trigger"
                                                                class="data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4"
                                                                tabindex="0" data-orientation="horizontal"
                                                                data-radix-collection-item="">Contact
                                                                Info</button><button type="button" role="tab"
                                                                aria-selected="false"
                                                                aria-controls="radix-:rr:-content-students"
                                                                data-state="inactive" id="radix-:rr:-trigger-students"
                                                                data-slot="tabs-trigger"
                                                                class="data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4"
                                                                tabindex="-1" data-orientation="horizontal"
                                                                data-radix-collection-item="">Assigned Students
                                                                (1)</button></div>
                                                    </div>
                                                    <div data-slot="card-content" class="px-6 [&amp;:last-child]:pb-6">
                                                        <div data-state="active" data-orientation="horizontal"
                                                            role="tabpanel" aria-labelledby="radix-:rr:-trigger-contact"
                                                            id="radix-:rr:-content-contact" tabindex="0"
                                                            data-slot="tabs-content"
                                                            class="flex-1 outline-none space-y-4">
                                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div
                                                                    class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                                                    <div class="flex items-center gap-3 mb-2">
                                                                        <div
                                                                            class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24" fill="none"
                                                                                stroke="currentColor" stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="lucide lucide-phone h-5 w-5 text-blue-600 dark:text-blue-400"
                                                                                aria-hidden="true">
                                                                                <path
                                                                                    d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384">
                                                                                </path>
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <p
                                                                                class="text-sm text-gray-600 dark:text-gray-400">
                                                                                Phone</p>
                                                                            <p class="text-gray-900 dark:text-white">
                                                                                ${single.createdAt || 'N/A'}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                                                    <div class="flex items-center gap-3 mb-2">
                                                                        <div
                                                                            class="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24" fill="none"
                                                                                stroke="currentColor" stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="lucide lucide-mail h-5 w-5 text-green-600 dark:text-green-400"
                                                                                aria-hidden="true">
                                                                                <path
                                                                                    d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7">
                                                                                </path>
                                                                                <rect x="2" y="4" width="20" height="16"
                                                                                    rx="2"></rect>
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <p
                                                                                class="text-sm text-gray-600 dark:text-gray-400">
                                                                                Email</p>
                                                                            <p
                                                                                class="text-gray-900 dark:text-white truncate">
                                                                                ${single.gmail}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                                                    <div class="flex items-center gap-3 mb-2">
                                                                        <div
                                                                            class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24" fill="none"
                                                                                stroke="currentColor" stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="lucide lucide-send h-5 w-5 text-blue-400"
                                                                                aria-hidden="true">
                                                                                <path
                                                                                    d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z">
                                                                                </path>
                                                                                <path d="m21.854 2.147-10.94 10.939">
                                                                                </path>
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <p
                                                                                class="text-sm text-gray-600 dark:text-gray-400">
                                                                                Telegram</p>
                                                                            <p class="text-gray-900 dark:text-white">
                                                                                @${single.science || 'N/A'}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                                                    <div class="flex items-center gap-3 mb-2">
                                                                        <div
                                                                            class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24" fill="none"
                                                                                stroke="currentColor" stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="lucide lucide-linkedin h-5 w-5 text-blue-600 dark:text-blue-400"
                                                                                aria-hidden="true">
                                                                                <path
                                                                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                                                                </path>
                                                                                <rect width="4" height="12" x="2" y="9">
                                                                                </rect>
                                                                                <circle cx="4" cy="4" r="2"></circle>
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <p
                                                                                class="text-sm text-gray-600 dark:text-gray-400">
                                                                                LinkedIn</p>
                                                                            <p
                                                                                class="text-gray-900 dark:text-white truncate">
                                                                                linkedin.com/in/${single.linkedin || 'N/A'}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div data-state="inactive" data-orientation="horizontal"
                                                            role="tabpanel"
                                                            aria-labelledby="radix-:rr:-trigger-students"
                                                            id="radix-:rr:-content-students" tabindex="0"
                                                            data-slot="tabs-content" class="flex-1 outline-none"
                                                            hidden=""></div>
                                                    </div>
                                                </div>
                                            </div>
`  

    }catch(err){
        console.log(err);
        
    }
}

getData()

// Event delegation for edit button
singleCards.addEventListener('click', function(e) {
    const button = e.target.closest('button[data-action="edit"]');
    if (!button) return;
    
    const teacherId = button.dataset.id;
    // Redirect to teachers page with edit mode or handle edit functionality
    window.location.href = `./teachers.html?edit=${teacherId}`;
});

// Dark mode toggle
toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}