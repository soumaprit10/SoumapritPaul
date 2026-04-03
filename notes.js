// --- ১. কনফিগারেশন ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbyK8781Zp3eLXHFLU4rJ6QGtuS_31lZdz8eMK2P7WZ_8z7LoyKNkE-TX4PXDovEEF40cw/exec'; 
const botToken = "8723984225:AAGe3EjDO6wDaRAfPTMy68Q9e1WyhpV3CNU";
const chatId = "5031608131";
let currentNote = ""; 

// --- ২. মেনু এবং থিম টগল ---
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
    document.getElementById("navRight").classList.toggle("active");
}

const toggle = document.getElementById("themeToggle");
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

// --- ৩. নোটস ডেটা ---
const data = [
    { title:"Python Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg" },
    { title:"C Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/c.svg" },
    { title:"HTML Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg" },
    { title:"SQL Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg" },
    { title:"MongoDB Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg" },
    { title:"CSS Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg" },
    { title:"JavaScript Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg" },
    { title:"MS Office Notes", icon:"https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg" }
];

// --- ৪. কার্ড রেন্ডার করা ---
const container = document.getElementById("handbooks");
container.innerHTML = ""; 
data.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <div class="icon"><img src="${item.icon}"></div>
        <h3>${item.title}</h3>
        <p>Download Notes Here</p>
        <button class="btn" onclick="openPayment('${item.title}')">Download</button>
    `;
    container.appendChild(div);
});

// --- ৫. পেমেন্ট মোডাল ফাংশনসমূহ ---
function openPayment(title) {
    currentNote = title;
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'flex'; 
    document.getElementById('qrArea').style.display = 'none';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

function processFinalPayment(amount) {
    const upiId = "soumapritpaul@oksbi"; 
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${upiId}%26am=${amount}%26cu=INR%26tn=${currentNote.replace(/\s+/g, '_')}`;
    
    const qrArea = document.getElementById('qrArea');
    qrArea.innerHTML = `
        <div style="text-align: center;">
            <p style="color: #00ff00; font-size: 14px; margin-bottom: 10px;">Scan to pay ₹${amount}</p>
            <img id="upiQR" src="${qrUrl}" style="width: 140px; background: white; padding: 8px; border-radius: 8px;">
            <div id="statusMsg" style="margin-top: 15px;">
                <p style="font-size: 12px; color: #aaa;">টাকা পাঠানোর পর নিচের বাটনে ক্লিক করুন।</p>
                <button onclick="requestVerification()" id="verifyBtn" style="margin-top: 10px; padding: 12px 25px; background: #3d5afe; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%;">I Have Paid - Verify Now</button>
            </div>
        </div>
    `;
    qrArea.style.display = 'block';
}

// --- ৬. সরাসরি JS থেকে টেলিগ্রাম ও গুগল শিটে রিকোয়েস্ট পাঠানো ---
function requestVerification() {
    const btn = document.getElementById('verifyBtn');
    const status = document.getElementById('statusMsg');
    const userPhone = prompt("আপনার ফোন নম্বর দিন (পেমেন্ট ভেরিফাই করার জন্য):");

    if (!userPhone || userPhone.length < 10) {
        alert("সঠিক ১০ ডিজিটের ফোন নম্বর দিন!");
        return;
    }

    btn.innerText = "Processing...";
    btn.disabled = true;

    // ১. গুগল শিটে সেভ করার URL
    const finalURL = `${scriptURL}?action=save&phone=${encodeURIComponent(userPhone)}&note=${encodeURIComponent(currentNote)}`;
    
    // ২. সরাসরি টেলিগ্রাম মেসেজ পাঠানোর URL
    const message = `🔔 *New Notes Request!*\n📱 Phone: ${userPhone}\n📄 File: ${currentNote}`;
    const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    // গুগল শিটে ডাটা পাঠানো (Image method as backup)
    var img = new Image();
    img.src = finalURL;

    // সরাসরি টেলিগ্রামে মেসেজ পাঠানো
    fetch(telegramURL)
        .then(() => {
            status.innerHTML = `<p style="color: #ffcc00; font-size: 13px;">⌛ রিকোয়েস্ট পাঠানো হয়েছে! অ্যাডমিন চেক করে ওকে করলেই ডাউনলোড শুরু হবে।</p>`;
            startCheckingStatus(userPhone);
        })
        .catch(err => {
            console.log("Telegram direct send failed, trying backup...");
            status.innerHTML = `<p style="color: #ffcc00; font-size: 13px;">⌛ রিকোয়েস্ট অ্যাডমিনের কাছে পাঠানো হয়েছে। দয়া করে অপেক্ষা করুন।</p>`;
            startCheckingStatus(userPhone);
        });
}

function startCheckingStatus(phone) {
    const checkInterval = setInterval(() => {
        fetch(`${scriptURL}?action=check&phone=${phone}&note=${encodeURIComponent(currentNote)}`)
        .then(res => res.text())
        .then(resStatus => {
            if (resStatus.trim() === "Success") {
                clearInterval(checkInterval);
                document.getElementById('statusMsg').innerHTML = `<b style="color: #00ff00;">✅ Payment Verified! Downloading...</b>`;
                setTimeout(() => {
                    startFileDownload();
                    closePaymentModal();
                }, 1500);
            }
        })
        .catch(err => console.log("Waiting..."));
    }, 5000); 
}

// --- ৭. ডাউনলোড লজিক ---
function startFileDownload() {
    if (!currentNote) return;
    const fileName = currentNote.replace(/\s+/g, '') + '.pdf';
    const link = document.createElement('a');
    link.href = 'notes/' + fileName; 
    link.setAttribute('download', fileName); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


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