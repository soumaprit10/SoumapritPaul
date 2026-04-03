function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
    document.getElementById("navRight").classList.toggle("active");
  }


  // Dark and Light Mode
  // DARK LIGHT MODE
  const toggle = document.getElementById("themeToggle");

  // load saved
  if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    toggle.innerHTML="☀️";
  }

  toggle.onclick = () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
      toggle.innerHTML="☀️";
      localStorage.setItem("theme","light");
    }else{
      toggle.innerHTML="🌙";
      localStorage.setItem("theme","dark");
    }

  };


  const data = [
        {
        img:"blog4.webp",
        title:"How Algorithmic Trading Systems Work",
        desc:"In India, the popularity of online trading has helped transform the financial landscape. This has led to over 20% of all trading is now done via mobile...",
        link: "blog4.html"
        },
        {
        img:"blog1.png",
        title:"Build an Email Validator with HTML, CSS, and JavaScript",
        desc:"Learn how to create a responsive Email Validator using HTML, CSS, and JavaScript. This step-by-step guide walks you through integrating the Email....",
        link: "blog1.html"
        },
        {
        img:"blog2.webp",
        title:"How to Check if Keys Exist in JavaScript Objects",
        desc:"Learn how to check if keys exist in JavaScript objects using two popular methods: the 'in' operator and the hasOwnProperty() method.....",
        link: "blog2.html"
        },
        {
        img:"blog3.webp",
        title:"How to Open the Terminal in Visual Studio Code",
        desc:"Learn how to open the terminal in Visual Studio Code (VS Code) using various methods, such as the menu bar, keyboard shortcuts, command palette,...",
        link: "blog3.html"
        },
    ]

  const container = document.getElementById("bloges");

  data.forEach(c=>{
  const div=document.createElement("div");
  div.className="blog";

  div.innerHTML=`

  <img src="${c.img}">

  <div class="content">

  <h3>${c.title}</h3>

  <p>${c.desc}</p>


  <a href="${c.link || '#'}">
    <button class="btn">Read More</button>
  </a>

  </div>
  `;

  container.appendChild(div);

  });



  // ----------------- Search -------------------------


// ১. আপনার সব ডেটা (Courses, Blog, Notes)
const myData = [
    // Course --------------------------------------------->
    { title: "Smart MS Word Advanced Course",
      type: "Course",
      desc: "Learn Ms Word Zero to Advanced", 
      link: "word-course.html" 
    },
    { title: "Advanced MS Excel Expert Course", 
      type: "Course", 
      desc: "Learn Ms Excel Zero to Advanced", 
      link: "excel-course.html" 
    },
    { 
      title: "Advanced MS Power Point Expert Course",
       type: "Course", 
       desc: "Learn Ms Power Point Zero to Advanced", 
       link: "point-course.html" 
    },
    { 
      title: "Complete HTML Course For Beginners",
       type: "Course", 
       desc: "Learn HTML Zero to Advanced", 
       link: "html-course.html" 
    },
    { 
      title: "Advanced CSS for Modern Web Design Course",
       type: "Course", 
       desc: "Learn CSS Zero to Advanced", 
       link: "css-course.html" 
    },
    { 
      title: "Complete Website Design with HTML & CSS",
       type: "Course", 
       desc: "Creat Project with HTML CSS", 
       link: "htmlcssproject.html" 
    },
    { 
      title: "Core JavaScript Traning Program",
       type: "Course", 
       desc: "Learn JavaScript Zero to Advanced", 
       link: "js-course.html" 
    },
    { 
      title: "Complete Website Design with HTML, CSS & JS",
       type: "Course", 
       desc: "Creat Project with HTML CSS JS", 
       link: "htmlcssjsproject.html" 
    },
    { 
      title: "Complete Backend with PHP",
       type: "Course", 
       desc: "Learn PHP Zero to Advanced", 
       link: "php-course.html" 
    },
    { 
      title: "Complete Website Design with HTML, CSS, JS & PHP",
       type: "Course", 
       desc: "Creat Project with HTML CSS JS PHP", 
       link: "completproject.html" 
    },
    { 
      title: "Complete Website Design with HTML, CSS, JS, PHP & AI",
       type: "Course", 
       desc: "Creat Project with HTML CSS JS PHP and AI", 
       link: "completprojectai.html" 
    },
    { 
      title: "Python Programing Traning",
       type: "Course", 
       desc: "Learn Python Programing", 
       link: "python-course.html" 
    },
    // Course End ------------------------------------------>


    // Notes Start ------------------------------------------>
    { 
      title: "Python Notes",
       type: "Notes", 
       desc: "Download Python Programing Note", 
       link: "notes.html" 
    },
    { 
      title: "C Notes",
       type: "Notes", 
       desc: "Download C Programing Note", 
       link: "notes.html" 
    },
    { 
      title: "HTML Notes",
       type: "Notes", 
       desc: "Download HTML Note", 
       link: "notes.html" 
    },
    { 
      title: "SQL Notes",
       type: "Notes", 
       desc: "Download SQL Note", 
       link: "notes.html" 
    },
    { 
      title: "CSS Notes",
       type: "Notes", 
       desc: "Download CSS Note", 
       link: "notes.html" 
    },
    { 
      title: "JavaScript Notes",
       type: "Notes", 
       desc: "Download JavaScript Note", 
       link: "notes.html" 
    },
    { 
      title: "MongoDB Notes",
       type: "Notes", 
       desc: "Download MongoDB Note", 
       link: "notes.html" 
    },
    { 
      title: "Ms Office Notes",
       type: "Notes", 
       desc: "Download Ms Office Note", 
       link: "notes.html" 
    },
    // /Note End ----------------------------->

    // Blog Start ---------------------------->
    { 
      title: "Build an Email Validator with HTML, CSS, and JavaScript",
       type: "Blog", 
       desc: "Learn how to create a responsive Email Validator using HTML, CSS, and JavaScript. This step-by-step guide walks you through integrating the Email....", 
       link: "blog1.html" 
    },
    { 
      title: "How to Check if Keys Exist in JavaScript Objects",
       type: "Blog", 
       desc: "Learn how to check if keys exist in JavaScript objects using two popular methods: the 'in' operator and the hasOwnProperty() method.....", 
       link: "blog2.html" 
    },
    { 
      title: "How to Open the Terminal in Visual Studio Code",
       type: "Blog", 
       desc: "Learn how to open the terminal in Visual Studio Code (VS Code) using various methods, such as the menu bar, keyboard shortcuts, command palette,...", 
       link: "blog3.html" 
    },
    { 
      title: "How Algorithmic Trading Systems Work",
       type: "Blog", 
       desc: "In India, the popularity of online trading has helped transform the financial landscape. This has led to over 20% of all trading is now done via mobile...", 
       link: "blog4.html" 
    },
    { 
      title: "The Ultimate SQL Tutorial",
       type: "Blog", 
       desc: "MySQL is a database management system. A Database Management System (DBMS) is software........", 
       link: "blog5.html" 
    },
    // Blog End -------------------------------->
];

let currentFilter = 'All'; // শুরুতে 'All' সিলেক্ট থাকবে

// ২. ডায়ালগ বক্স ওপেন এবং ক্লোজ করার ফাংশন (অবশ্যই লাগবে)
function openSearch() {
    const dialog = document.getElementById('searchDialog');
    dialog.style.display = 'block';
    document.getElementById('mainSearchInput').focus(); // খোলার সাথে সাথে ইনপুটে ফোকাস হবে
}

function closeSearch() {
    const dialog = document.getElementById('searchDialog');
    dialog.style.display = 'none';
}

// বাইরের অন্ধকার জায়গায় ক্লিক করলে বন্ধ হবে
window.onclick = function(event) {
    const dialog = document.getElementById('searchDialog');
    if (event.target == dialog) {
        closeSearch();
    }
}

// ৩. ফিল্টার বাটন হ্যান্ডেল করা
function filterResults(category, btnElement) {
    // সব বাটন থেকে 'active' ক্লাস সরানো
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    // ক্লিক করা বাটনে 'active' ক্লাস যোগ করা
    btnElement.classList.add('active');
    
    currentFilter = category;
    performSearch(); // ফিল্টার বদলালে রেজাল্ট আপডেট হবে
}

// ৪. আসল সার্চ লজিক
const mainSearchInput = document.getElementById('mainSearchInput');

if(mainSearchInput) {
    mainSearchInput.addEventListener('input', () => {
        performSearch();
    });
}

function performSearch() {
    const val = mainSearchInput.value.toLowerCase();
    const searchOutput = document.getElementById('searchOutput');

    if(val === "") {
        searchOutput.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Type something to search...</p>';
        return;
    }

    // ফিল্টার: নাম মিলতে হবে + ক্যাটাগরি (All না হলে) মিলতে হবে
    const filtered = myData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(val) || item.desc.toLowerCase().includes(val);
        const matchesCategory = (currentFilter === 'All' || item.type === currentFilter);
        return matchesSearch && matchesCategory;
    });

    renderSearch(filtered, val);
}

// ৫. রেজাল্টগুলো স্ক্রিনে দেখানো
function renderSearch(results, term) {
    const searchOutput = document.getElementById('searchOutput');
    
    if(results.length === 0) {
        searchOutput.innerHTML = `<p style="text-align:center; padding:20px; color:white;">No results found in "${currentFilter}" for "${term}"</p>`;
        return;
    }

    searchOutput.innerHTML = results.map(item => `
        <a href="${item.link}" class="result-card" style="display: block; margin-bottom: 10px; padding: 15px; background: #1e1e1e; border-radius: 10px; text-decoration: none; border: 1px solid #333;">
            <div class="result-content">
                <span style="background: #3d5afe; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px;">${item.type}</span>
                <h4 style="color: white; margin: 8px 0 5px 0; font-size: 16px;">${item.title}</h4>
                <p style="color: #aaa; font-size: 13px; margin: 0;">${item.desc}</p>
            </div>
        </a>
    `).join('');
}