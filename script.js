/**
 * THE WEB HISTORY - CORE ENGINE
 * * DB: Tüm yılların verilerini ve tasarım modlarını (era) tutar.
 * Tasarımın değişmesi için her yılın içinde 'era' ve 'color' tanımlı olmalıdır.
 */
const DB = {
    tr: {
        1990: { era: "era-1990", color: "#00ff00", title: "Analog Şafak", desc: "Tim Berners-Lee CERN'de HTTP ve HTML'i icat etti. Web resmen doğdu.", tech: ["HTML 1.0", "HTTP", "CERN"], speed: "14.4 KBPS" },
        1995: { era: "era-1990", color: "#00ff00", title: "Web Ticari Oluyor", desc: "JavaScript doğdu, Amazon ve eBay kuruldu. Tarayıcı savaşları başladı.", tech: ["JavaScript", "Netscape", "SSL"], speed: "33.6 KBPS" },
        1998: { era: "era-1990", color: "#f1c40f", title: "Google Devrimi", desc: "Google kuruldu. İnternetin bilgi kaosuna düzen geldi.", tech: ["Google", "PHP 3", "MySQL"], speed: "56 KBPS" },
        2004: { era: "era-2000", color: "#00d2ff", title: "Web 2.0 Sosyal Ağı", desc: "Facebook ve YouTube ile kullanıcı içerik üreticisi oldu. Sosyal medya doğdu.", tech: ["AJAX", "Facebook", "YouTube"], speed: "512 KBPS" },
        2007: { era: "era-2000", color: "#3498db", title: "Mobil Dönüşüm", desc: "iPhone tanıtıldı. Web artık masada değil, cebimize girmeye başladı.", tech: ["iOS", "Mobile Web", "3G"], speed: "2 MBPS" },
        2012: { era: "era-2000", color: "#9b59b6", title: "Bulut Bilişim", desc: "SaaS ve Bulut servisleri standartlaştı. Veriler disklerden buluta taşındı.", tech: ["Cloud", "SaaS", "4G"], speed: "12 MBPS" },
        2016: { era: "era-2013", color: "#2ecc71", title: "Modern Frameworkler", desc: "React ve HTML5 ile web siteleri kusursuz uygulamalara dönüştü.", tech: ["React", "HTML5", "ES6"], speed: "50 MBPS" },
        2020: { era: "era-2013", color: "#e74c3c", title: "Dijitalleşen Dünya", desc: "Pandemi interneti ana yaşam alanı yaptı. Uzaktan çalışma yeni normal oldu.", tech: ["WebRTC", "APIs", "Cloud"], speed: "100 MBPS" },
        2023: { era: "era-2023", color: "#f72585", title: "AI Senfonisi", desc: "ChatGPT ile Üretken AI dönemi başladı. Web saniyeler içinde inşa edilebiliyor.", tech: ["LLMs", "GenAI", "WebGPU"], speed: "1 GBPS" },
        2026: { era: "era-2023", color: "#4cc9f0", title: "Uzamsal İnternet", desc: "6G ve holografik arayüzler. Fiziksel ve dijital dünya tamamen birleşti.", tech: ["6G", "Spatial Computing", "Web3"], speed: "10 GBPS" }
    },
    en: {
        1990: { era: "era-1990", color: "#00ff00", title: "Analog Dawn", desc: "Tim Berners-Lee invented HTTP/HTML at CERN. The Web was born.", tech: ["HTML 1.0", "HTTP", "CERN"], speed: "14.4 KBPS" },
        1995: { era: "era-1990", color: "#00ff00", title: "Commercial Web", desc: "JavaScript was born. Amazon & eBay founded. Browser wars began.", tech: ["JS", "Netscape", "SSL"], speed: "33.6 KBPS" },
        1998: { era: "era-1990", color: "#f1c40f", title: "Google Revolution", desc: "Google launched. Search algorithms organized the world's info.", tech: ["Google", "PHP 3", "MySQL"], speed: "56 KBPS" },
        2004: { era: "era-2000", color: "#00d2ff", title: "Web 2.0 Boom", desc: "Facebook & YouTube turned users into creators. Social media born.", tech: ["AJAX", "Facebook", "YouTube"], speed: "512 KBPS" },
        2007: { era: "era-2000", color: "#3498db", title: "Mobile Era", desc: "iPhone introduced. The web moved from desktops to pockets.", tech: ["iOS", "Mobile Web", "3G"], speed: "2 MBPS" },
        2012: { era: "era-2000", color: "#9b59b6", title: "Cloud Computing", desc: "Cloud services became standard. Data moved from disks to clouds.", tech: ["Cloud", "SaaS", "4G"], speed: "12 MBPS" },
        2016: { era: "era-2013", color: "#2ecc71", title: "Modern Stack", desc: "React and HTML5 turned websites into seamless applications.", tech: ["React", "HTML5", "ES6"], speed: "50 MBPS" },
        2020: { era: "era-2013", color: "#e74c3c", title: "Digitalized World", desc: "Pandemic made the web the main living space. Remote work became standard.", tech: ["WebRTC", "APIs", "Cloud"], speed: "100 MBPS" },
        2023: { era: "era-2023", color: "#f72585", title: "AI Symphony", desc: "Generative AI redefined the web. ChatGPT started a new era.", tech: ["LLMs", "GenAI", "WebGPU"], speed: "1 GBPS" },
        2026: { era: "era-2023", color: "#4cc9f0", title: "Spatial Web", desc: "6G and spatial computing. Physical and digital worlds fully merged.", tech: ["6G", "Spatial", "Web3"], speed: "10 GBPS" }
    }
};

let currentLang = 'tr';

// Elementleri cache'leme
const el = {
    slider: document.getElementById('main-slider'),
    cursor: document.getElementById('cursor'),
    year: document.getElementById('year-display'),
    title: document.getElementById('title-display'),
    desc: document.getElementById('desc-display'),
    speed: document.getElementById('speed-display'),
    tech: document.getElementById('tech-list'),
    meter: document.getElementById('year-meter')
};

/**
 * DİL DEĞİŞTİRME FONKSİYONU
 */
function setLang(lang) {
    currentLang = lang;
    // Buton aktiflik sınıflarını yönet
    document.querySelectorAll('.lang-nav button').forEach(b => {
        b.classList.toggle('active', b.id === `btn-${lang}`);
    });
    // Mevcut slider değerine göre arayüzü İngilizce verilerle tazele
    updateUI(el.slider.value);
}

/**
 * ÖZEL CURSOR TAKİBİ
 */
document.addEventListener('mousemove', (e) => {
    if (el.cursor) {
        el.cursor.style.left = e.clientX + 'px';
        el.cursor.style.top = e.clientY + 'px';
    }
});

/**
 * ANA GÜNCELLEME MOTORU (UI/UX)
 */
function updateUI(val) {
    const year = parseInt(val);
    const years = Object.keys(DB[currentLang]).map(Number);
    
    // Girilen yıla en yakın geçmiş yılı bul (Algoritma)
    const closest = years.filter(y => y <= year).reverse()[0] || 1990;
    const data = DB[currentLang][closest];

    // 1. Tasarım Modunu Değiştir (CSS Eras)
    document.body.className = data.era;
    
    // 2. CSS Değişkenlerini (Renkleri) Güncelle
    document.documentElement.style.setProperty('--p', data.color);
    
    // HEX'i RGB'ye çevirip gölge/saydamlık için ayarla
    const hex = data.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16), 
          g = parseInt(hex.substring(2, 4), 16), 
          b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--p-rgb', `${r}, ${g}, ${b}`);

    // 3. İçerikleri Güncelle
    el.year.innerText = year;
    el.title.innerText = data.title;
    el.desc.innerText = data.desc;
    el.speed.innerText = data.speed;
    el.tech.innerHTML = data.tech.map(t => `<li>${t}</li>`).join('');
    el.meter.value = year;
}

// Slider her oynadığında motoru çalıştır
el.slider.addEventListener('input', (e) => updateUI(e.target.value));

// Sayfa açılışında 1990 ile başlat
updateUI(1990);